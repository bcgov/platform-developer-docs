---
title: Kyverno cluster policies

slug: kyverno

description: Describes the Kyverno Cluster Policies that impact product teams in OpenShift clusters.

keywords: kyverno, policy, cronjob

page_purpose: Describes the Kyverno Cluster Policies that impact product teams in OpenShift clusters.

audience: technical lead, developer

author: Steven Barre

content_owner: Olena Mitovska

sort_order: 5
---

# Kyverno cluster policies
Last updated: **March 8, 2024**

Platform Services makes use of [Kyverno](https://kyverno.io/) ClusterPolicies to enforce some rules on the OpenShift clusters.

## On this page
* **[CronJobs](#cronjobs)**
* **[DataClass Labels](#dataclass-labels)**
* **[Related pages](#related-pages)**

## CronJobs

CronJobs that are set to run too often put a large burden on the Kubernetes API, storage service and the platform in general. To address this, there are two Kyverno policies to prevent the creation of the following type of CronJobs:
- CronJobs that are scheduled to run more often than every 5 minutes
- CronJobs with a PVC (PersistentVolumeClaim) mounted, while scheduled to run more often than every XXX minutes

If you try to create a CronJob like this you will get an error:

```text
error: cronjobs.batch "my-cronjob" could not be patched: admission webhook "validate.kyverno.svc-fail" denied the request:

policy CronJob/1234-test/my-cronjob for resource violation:

validate-cron-schedule:
  no-fast-cronjob: Cronjobs schedule may not execute faster than once every 5 minutes.
```

Past versions of Kubernetes and OpenShift you could add an environment variable to the `schedule` of the CronJob to set the timezone. This is now deprecated and may break in the future. There is now a Kyverno policy to detect this and advise of the correct way to specify a timezone for your CronJob.

An attempt to put a `CRON_TZ=` into the schedule will generate an error like this

```text
error: cronjobs.batch "my-cronjob" could not be patched: admission webhook "validate.kyverno.svc-fail" denied the request:

policy CronJob/1234-test/my-cronjob for resource violation:

validate-cron-schedule:
  no-unsupported-timezone: Cronjobs specifying a timezone in the schedule are not
    officially supported. Please use spec.timeZone instead.
```

### Alternatives to CronJobs:

#### go-crond solution:
If you have a need to run scheduled work frequently and a PVC is needed for persistent data, it is better to create a deployment and an always running pod with a cron daemon in it to run the task. This saves the overhead of starting and stopping pods frequently, and reduce the volume mount/unmount requests. Here we provide an example of switching from a cronjob to a deployment with [go-crond](https://github.com/webdevops/go-crond).

**Step 1.** Add go-crond into the image used by the original CronJob
  - Create the `crontab` file, where you specify the schedule of all jobs that need to run.
  ```txt
  # comment
  SHELL=/bin/bash

  # Two options to specify the schedule. Note, the user doesn't really matter on Openshift, so just put down nobody is fine

  # m h  dom mon dow user command
    * *   *  *   *   nobody <your_script>
  # @every timeperiod user command
    @every 1m         nobody <your_script>
  ```
  - include the go-crond installation in Dockerfile:
  ```Dockerfile
  # Original Docker content
  ...

  # Change timezone to PST for convenience
  ENV TZ=PST8PDT

  # Set the workdir to be root
  WORKDIR /

  # Copy over the crontab file together with the task script
  COPY crontab /etc/crontab
  COPY hello.sh <your_script>
  RUN chmod +x <your_script>

  # ========================================================================================================
  # Install go-crond (from https://github.com/webdevops/go-crond)
  #
  # CRON Jobs in OpenShift:
  #  - https://blog.danman.eu/cron-jobs-in-openshift/
  # --------------------------------------------------------------------------------------------------------
  ARG SOURCE_REPO=webdevops
  ARG GOCROND_VERSION=23.2.0
  ADD https://github.com/$SOURCE_REPO/go-crond/releases/download/$GOCROND_VERSION/go-crond.linux.amd64 /usr/bin/go-crond

  USER root

  RUN chmod +x /usr/bin/go-crond
  # ========================================================================================================
  # Perform operations that require root privileges here ...
  # --------------------------------------------------------------------------------------------------------
  RUN echo $TZ > /etc/timezone
  # ========================================================================================================

  # Reset to the base image user account
  USER 1001

  # Important - in Openshift a random UID will be assigned to the container, make sure to add the option --allow-unprivileged
  CMD ["go-crond", "--allow-unprivileged", "/etc/crontab"]
  ```
  - rebuild the image from the existing build config. It's better to give a new imageTag for testing purpose

**Step 2.** Turn the CronJob into an Deployment, by updating the following specs:
  - Change `kind` to `Deployment`
  - Remove the `schedule` and `jobTemplate` sections
  - Adjust `restartPolicy` to `Always`
  - If a new imageTag is used in the previous step, don't forget to point the deployment to it!

**Step 3.** Test the deployment:
  - Most of the other specs should work for the deployment, including serviceAccount and volumeMounts, etc.
  - If you are using a RWO PVC for volume, make sure to stop the CronJob before testing

#### temporary quick fix:
If you just need a quick way to resolve the issue for now, and implement go-crond later on, here's a quick hack for the short term:

**Step 1.** In stead of using a proper cron daemon, add a sleep loop in the container Command or Args:
  ```
  while true; do
    <your_script>
    sleep 300
  done
  ```

Step 2. Follow Step 2 and 3 from above

Note that this is only a temporary solution, please implement a proper cron daemon in the deployment for the long run!

## DataClass Labels

In NSX clusters (Emerald), every pod must have a DataClass label. This ensures proper enforcement of guardrail rules by NSX, such as preventing connections between DataClass `Low` and `High`. To avoid unexpected issues, a Kyverno policy assigns a DataClass label of `Invalid` to any pod lacking a `Low`, `Medium`, or `High` label. This makes the NSX firewall easily identify and block all network traffic to or from these labeled pods.

---
---

## Related pages

- [Kyverno Policy documentation](https://kyverno.io/docs/kyverno-policies/)
- [Red Hat’s documentation on CronJob Timezones](https://docs.openshift.com/container-platform/4.13/nodes/jobs/nodes-nodes-jobs.html#nodes-nodes-jobs-creating-cron_nodes-nodes-jobs)
- [Emerald documentation](https://digital.gov.bc.ca/technology/cloud/private/internal-resources/emerald/)
