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

CronJobs that are set to run too often put a large burden on the Kubernetes API and platform. To address this there is a Kyverno policy to prevent the creation of CronJobs that are scheduled to run more often than every 5 minutes. If you have a need to run some scheduled work more often than that it is better to create a deployment and an always running pod with a cron daemon in it to run the task. This saves the overhead of starting and stopping pods frequently.

If you try to create a CronJob like this you will get an error like this

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

## DataClass Labels

In NSX clusters (Emerald), every pod must have a DataClass label. This ensures proper enforcement of guardrail rules by NSX, such as preventing connections between DataClass `Low` and `High`. To avoid unexpected issues, a Kyverno policy assigns a DataClass label of `Invalid` to any pod lacking a `Low`, `Medium`, or `High` label. This makes the NSX firewall easily identify and block all network traffic to or from these labeled pods.

---
---

## Related pages

- [Kyverno Policy documentation](https://kyverno.io/docs/kyverno-policies/)
- [Red Hat’s documentation on CronJob Timezones](https://docs.openshift.com/container-platform/4.13/nodes/jobs/nodes-nodes-jobs.html#nodes-nodes-jobs-creating-cron_nodes-nodes-jobs)
- [Emerald documentation](https://digital.gov.bc.ca/cloud/services/private/internal-resources/emerald/)
