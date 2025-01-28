---
title: Application resource tuning

slug: application-resource-tuning

description: Describes how to tune resource limits and requests in OpenShift.

keywords: Tuning, Resource, Limit, Request, Application OpenShift,

page_purpose: Discusses application tuning, and provides resources and references for product teams.

audience: developer

author: Matt Spencer

content_owner: 

sort_order: 2
---

# Application resource tuning
Last updated: **May 3, 2024**

As touched upon in the [resiliency guidelines](../automation-and-resiliency/app-resiliency-guidelines.md), deploying applications with appropriate [CPU and memory requests and limits](https://docs.openshift.com/container-platform/3.11/admin_guide/overcommit.html#requests-and-limits) is critical to ensure:

* Resource availability for your own applications
* Resource availability for other tenant applications

**Resource requests**  
Resource requests are guaranteed and reserved for the pod. **Pod scheduling decisions are made based on the request** to ensure that a node has enough capacity available to meet the requested value. Inefficient use of requests lead to having to buy more licenses and hardware for the platform.

**Resource limits**  
Resource limits set an upper limit of what a pod can burst to if the resources are available on the node. For perfomance reasons, CPU limits should not be set, but memory limits can be. 

## Setting requests and limits

Request CPU – should be set, ideal to set to the minimum resource level required to run your container
Limit CPU - doesn’t need to be set, best not to set for performance reasons
Request Memory – should be set, ideal to set to the minimum resource level required to run your container
Limit Memory – doesn’t need to set, still a good idea to set

You should define your own resource values for your containers based on their usage. If you don't set these, default values for `request.cpu` and `request.memory` will be set which are usually too high and therefore inefficient. 

**General guidelines**  
☑ Set cpu and memory requests and set memory limits. Do not set cpu limits. 
☑ Set requests to the _minimum_ of what your application needs.  
☑ Use horizontal pod autoscalers where possible

**Being a good resource citizen**

⭐ ⭐ ⭐

Having a **3:1 ratio** of CPU request:CPU utilization is a good starting place for new applications that haven't yet been tuned. Using a 3:1 ratio makes you a **good community member**.

⭐ ⭐ ⭐ ⭐

Having a **2:1 ratio** of CPU request:CPU utilization is a great next step for teams whose projects are working and stable, and who are in a position to start tuning their application more effectively - especially those who are seeking to make better use of horizontal scaling. Using a 2:1 ratio makes you a **great community member**.

⭐ ⭐ ⭐ ⭐ ⭐

Having a **1.5:1 ratio** of CPU request:CPU utilization is an amazing goal for teams who have already started tuning their applications and are looking to make the best possible use of the platform's capabilities. Using a 1.5:1 ratio makes you an **amazing community member**.

## Resources

**Deploying pods without specifying a limit or a request** 

If you deploy pods without setting limits or requests, they will be deployed using the `LimitRange` value, which you can find out via `oc get LimitRange default-limits -o yaml`. The `LimitRange` specifies the default value for CPU and memory resoruce config for containers. This is **not** the same as specifying a resource request or limit of 0.

**Setting the request and limits to 0**  
If you set requests and limits to 0, pods will run under the [BestEffort QoS class](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/), using whatever spare capacity is available on the node.

🔺 Assigning `0` as a request or limit must be done through the CLI or directly in the manifest. The Web Console will not accept `0` as a request or limit while editing the resources on a deployment; it will apply the platform defaults outlined in the previous answer.

**Specifying a limit value only**  
If you only specify a limit value, but not a request value, your pods will be deployed with a request that is identical to the limit.

**Checking CPU consumption of running pods in a namespace"** 

There is a way that requires you to make use of the `oc` client versus using the web console. Additional math will be required past this point as there is no way of automating this in a cross-platform fashion using just `oc`.

```console
$ oc adm top pod
NAME CPU(cores) MEMORY(bytes) 
<redacted> 3m 285Mi 
<redacted> 3m 299Mi 
<redacted> 3m 285Mi 
<redacted> 0m 13Mi 
<redacted> 9m 61Mi 
<redacted> 4m 98Mi 
<redacted> 0m 28Mi 
<redacted> 2  26Mi
```

For the above, the column of numbers involving `CPU(cores)` is what you want to add up. the `m` suffix stands for millicores, so for the above, add up the numbers and divide by 1000 to get the actual consumption of CPU cores by the pods in the current project. If the CPU usage has no `m` suffix, then that is just measured in cores, and not millicores. For the above example, the total would then be 2 + (3+3+3+9+4)/1000 = 2.022 CPU cores of actual CPU consumption.

**Note:**  unless you're running a scientific application or you know it's multithreaded you should not be giving an app any more than 1-core.

The vertical pod autoscaling tool can be used to calculate resource recommendations based on the real time resources used by your pods. [This video demonstration](https://youtu.be/nZMtJRQR3jY) shows how it can be done.

**Get current request values with oc command**  To get the current value of CPU requests allowed for the project currently logged into with `oc` The following one-liner will display the current value of CPU requests as currently allotted for the current project.

```bash
oc get quota compute-long-running-quota -o=custom-columns=Requests:.status.used."requests\.cpu"
```
Below is an example output of the above command, the `m` at the end again means millicores, so dividing the number by 1000 tells us the current project per this example has a total allotted CPU requests value of 14.5 CPU cores.

```console
oc get quota compute-long-running-quota -o=custom-columns=Requests:.status.used."requests\.cpu"
Requests
14500m
```
**Note:**  unless you're running a scientific application or you know it's multithreaded you should not be giving an app any more than 1-core._

## Jenkins resource configuration recommendations

The platform team recommends migrating away from Jenkins to a more modern CI/CD pipeline tool such as OpenShift Pipelines, ArgoCD and/or GitHub Actions. However, we recognize that a migration represents a significant amount of work and isn't always a realistic immediate solution to the resourcing problems posed by a Jenkins installation. The following section contains recommendations for Jenkins configurations that can be used to help ease resourcing issues while your team plans their migration to another CI/CD tool.

The platform team recommends migrating away from Jenkins to a more modern CI/CD pipeline tool such as OpenShift Pipelines, ArgoCD and/or GitHub Actions. However, we recognize that a migration represents a significant amount of work and isn't always a realistic immediate solution to the resourcing problems posed by a Jenkins installation. The following section contains recommendations for Jenkins configurations that can be used to help ease resourcing issues while your team plans their migration to another CI/CD tool.

Tuning the resources of Jenkins deployments can have a large effect on the available resources of the platform. As of writing, Jenkins accounts for the largest user of CPU requests and limits on the platform. Recent analysis has indicated:

* **15-25% of CPU requests** on the platform are related to Jenkins
* **7% of the CPU requests** are actually used, on average, over 1 day
* **10% or more CPU requests** for the overall platform can be saved by tuning Jenkins resources

**Recommended configuration**

Based on the performance testing details below, the following recommendations are suggested for Jenkins deployments:

* CPU request: 100m
* CPU limit: do not set
* Memory request: 512M
* Memory limit: 1-2GB (May vary depending on usage)

On a typical Jenkins deployment, the following snippet can be used if you are editing the yaml:

```yaml
spec:
  resources:
    requests:
      cpu: "100m"
      memory: "512Mi"
    limits:
      memory: "1Gi"
```
The following command can also be used to update a Jenkins DeploymentConfig:

```bash
oc patch dc/jenkins -p '{"spec": {"template": {"spec": {"containers":[{"name":"jenkins", "resources":{"requests": {"cpu":"100m", "memory":"512Mi"}, "limits": {"memory":"1Gi"}}}]}}}}'
```

## Advanced Jenkins resource tuning

Consider monitoring the upper and lower bounds of CPU and memory usage of Jenkins instances over time. When idle, it has been observed that Jenkins uses under `5m` of CPU and about `650Mi` of memory. As per the **General Guidelines** above, "set requests to the _minimum_ of what your application needs." It is ideal to reserve resources conservatively (especially for workloads that are often idle), and leverage resource limits to burst when active.

![Jenkins CPU usage](../../images/jenkins-cpu-usage.png)

Also, consider other workloads you may need to run in the tools namespace when accounting for requests/limits allocation to be within the allotted maximums.

## Tools namespaces resource quota recommendations

Every product in a cluster is provided a license plate and a namespace for each environment (dev, test, prod). These products also have a **tools** namespace defined as `<license>-tools`, where tooling such as Jenkins are deployed.

As of writing, there is a discrepancy between compute resources (especially CPU) requested compared to actual usage.

On average, Jenkins instances in tools namespaces across the cluster are requesting much more resources than they are utilizing. These overcommitted Jenkins instances are one of the largest contributors to this over-allocation problem.

In short, the recommendation is to lower CPU resource requests and avoid setting cpu resource limits. 

This section identifies the problem and mitigation recommendation of resource over-allocation in tools namespaces.

## OpenShift template considerations for reduced quota

When deploying a workload such as Jenkins from the OpenShift catalog, you may not be prompted to configure all of the CPU and memory requests and limits. In the case of Jenkins, the wizard will allow you to proceed while only defining the memory limit (defaults to 1Gi) which will set the memory requests to the same value.

To accommodate a reduced project quota, the `oc patch` command (depicted above) should be used with more appropriate CPU and memory requests and quotas for all workloads in the tools project. Otherwise, these workloads may not become schedulable if their combined total requests/limits exceed the maximums defined by project quotas.

## Viewing quota usage

You can identify current resource quota consumption and properly size resource requests and limits of existing/new workloads using either the OpenShift web console or `oc` command-line tool.

**Viewing quota usage (GUI)**

From the OpenShift web console, in the **Administrator** perspective, proceed to **Administration** \> **ResourceQuotas** and select the appropriate `ResourceQuota` (i.e., `compute-long-running-quota`). Here is an example:

![Tools example compute long running quota dashboard](../../images/tools-example-compute-long-running-quota.png)

**Viewing quota usage (CLI)**

To describe a specific quota, use the `oc` tool:

```console 
$ oc describe resourcequotas compute-long-running-quota # -n <project>
Name:       compute-long-running-quota
Namespace:  <license>-tools
Scopes:     NotBestEffort, NotTerminating
 * Matches all pods that have at least one resource requirement set. These pods have a burstable or guaranteed quality of service.
 * Matches all pods that do not have an active deadline. These pods usually include long running pods whose container command is not expected to terminate.
Resource         Used    Hard
--------         ----    ----
limits.cpu       1860m   8
limits.memory    5184Mi  32Gi
pods             9       100
requests.cpu     610m    4
requests.memory  2752Mi  16Gi
```

## Risks associated with reducing resource reservation

Consider these risks when reducing resource quotas (and subsequently, requests/limits).

See [Configuring your cluster to place pods on overcommitted nodes](https://docs.openshift.com/container-platform/latest/nodes/clusters/nodes-cluster-overcommit.html) for more details.

**Simultaneous resource claiming**

Reducing resource requests ["works on the assumption that not all the pods will claim all of their usable resources at the same time"](https://cloud.redhat.com/blog/full-cluster-part-2-protecting-nodes).

Consideration must be made to determine if several workloads across the cluster would be bursting above their requests simultaneously at a specific time of day.

**Node CPU saturation**

Very low CPU requests (i.e., `5m`) may be assigned to workloads such as Jenkins that have minuscule CPU usage when idle, and if properly configured by setting no CPU limits, will be able to burst to use available resources on the node during pipeline runs. 

**Node memory saturation**

Nodes running out of memory can be more troublesome than CPU saturation. Regardless of node capacity, workloads that consume beyond their configured memory limits will immediately be terminated. However, if the workload is above its memory requests (but within its memory limits) and its node is running out of memory, the workload may be evicted (depending on the scheduler and priority) to reclaim that memory.

Because memory is incompressible, memory requests and limits should be a little more generous to mitigate pod eviction/termination.

## Related training content

The [OpenShift 101 and 201 training](../training-and-learning/training-from-the-platform-services-team.md) covers some of the principles of resource tuning. There is a related [OpenShift 201 resource management lab exercise and video demonstration](https://github.com/bcgov/devops-platform-workshops/blob/master/openshift-201/resource-mgmt.md).

---
## Related pages

* [Autoscaling with HPA and VPA presentation](https://bcgov-my.sharepoint.com/:p:/g/personal/olena_mitovska_gov_bc_ca/EXNhWAvKZA5OiR1eMKaug7QBMI-tGiK2FZ_c04p8JI0RGw) (IDIR required)


