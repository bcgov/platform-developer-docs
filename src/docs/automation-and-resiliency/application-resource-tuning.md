---
title: Application resource tuning

slug: application-resource-tuning

description: Describes how to tune resource limits and requests in OpenShift.

keywords: Tuning, Resource, Limit, Request, Application OpenShift,

page_purpose: Discusses application tuning, and provides resources and references for product teams.

audience: developer

author: Matt Spencer

content_owner: Tatsuya Morikawa

sort_order: 2
---

# Application resource tuning

As touched upon in the [resiliency guidelines](/app-resiliency-guidelines/), deploying applications with appropriate [CPU and memory requests and limits](https://docs.openshift.com/container-platform/3.11/admin_guide/overcommit.html#requests-and-limits) is critical to ensure:

* Resource availability for your own applications
* Resource availability for other tenant applications

While [resource quotas](/openshift-project-resource-quotas/) are quite generous, these quotas must be seen as a tool to allow tenants enough resources to temporarily burst usage for experimentation, rather than an upper limit of consistent use. The platform is not sized to support every tenant fully utilizing their _resource quota_.

**Resource requests**  
Resource requests are guaranteed and reserved for the pod. _Pod scheduling decisions are made based on the request_ to ensure that a node has enough capacity available to meet the requested value. Inefficient use of requests lead to having to buy more licenses and hardware for the platform.

**Resource limits**  
Resource limits set an upper limit of what a pod can burst to if the resources are available on the node.

## On this page
- [Settings requests and limits](#setting-requests-and-limits)
- [Jenkins resource configuration recommendations](#jenkins-resource-configuration-recommendations)
- [Tools namespaces resource quota recommendations](#tools-namespaces-resource-quota-recommendations)
- [Horizontal and Vertical Pod Autoscaler Demo](#horizontal-and-vertical-pod-autoscaler-demo)

## Setting requests and limits <a name="#setting-request-and-limits"></a>

❗ **If you set a resource limit, you should also set a resource request.** Otherwise the request will match the limit. For example, a deployment with _no_ defined CPU request and a defined CPU limit of 1 core will _result in a pod with a request of 1 CPU and a limit of 1 CPU_.

**General guidelines**  
☑ Set requests and limits.  
☑ Set requests to the _minimum_ of what your application needs.  
☑ Set limits to a reasonable burstable number of what a single pod should support.  
☑ Use horizontal pod autoscalers where possible, rather than large CPU and memory limits.

**Being a good resource citizen**

⭐ ⭐ ⭐

Having a **3:1 ratio** of CPU request:CPU utilization is a good starting place for new applications that haven't yet been tuned. Using a 3:1 ratio makes you a **good community member**.

⭐ ⭐ ⭐ ⭐

Having a **2:1 ratio** of CPU request:CPU utilization is a great next step for teams whose projects are working and stable, and who are in a position to start tuning their application more effectively - especially those who are seeking to make better use of horizontal scaling. Using a 2:1 ratio makes you a **great community member**.

⭐ ⭐ ⭐ ⭐ ⭐

Having a **1.5:1 ratio** of CPU request:CPU utilization is an amazing goal for teams who have already started tuning their applications and are looking to make the best possible use of the platform's capabilities. Using a 1.5:1 ratio makes you an **amazing community member**.

### CPU and Memory Utilization

[Watch a four-minute video](https://youtu.be/rkxVZgn9icU) that includes an example of resource tuning for a sample OpenShift application.


### Resources

**Deploying pods without specifying a limit or a request** 

If you deploy pods without setting limits or requests, they will be deployed with the following defaults:

* CPU request: 100m
* CPU limit: 250m
* Memory request: 256Mi
* Memory limit: 1Gi

This is NOT the same as specifying a resource request or limit of 0\.

**Setting the request and limits to 0**  
If you set requests and limits to 0, pods will run under the [BestEffort QoS class](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/), using whatever spare capacity is available on the node.

🔺 Assigning `0` as a request or limit must be done through the CLI or directly in the manifest. The Web Console will not accept `0` as a request or limit while editing the resources on a deployment; it will apply the platform defaults outlined in the previous answer.

**Specifying a limit value only**  
If you only specify a limit value, but not a request value, your pods will be deployed with a request that is identical to the limit.

**Specifying a request value only**   
If you only specify a request value, pods will be deployed with the configured request, and will have the default limit applied of:

* CPU limit: 250m
* Memory limit: 1Gi

**Creating a deployment with a request that is higher than the default limit**  
If you create a deployment with a request value that is higher than the default limits above, you will be required to define a limit.

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

_Note:  unless you're running a scientific application or you know it's multithreaded you should not be giving an app any more than 1-core._

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

_Note:  unless you're running a scientific application or you know it's multithreaded you should not be giving an app any more than 1-core._


## Jenkins resource configuration recommendations <a name="#jenkins-resource-configuration-recommendations"></a>

Tuning the resources of Jenkins deployments can have a large effect on the available resources of the platform. As of writing, Jenkins accounts for the largest user of CPU requests and limits on the platform. Recent analysis has indicated:

* **15-25% of CPU requests** on the platform are related to Jenkins
* **7% of the CPU requests** are actually used, on average, over 1 day
* **10% or more CPU requests** for the overall platform can be saved by tuning Jenkins resources

### Recommended configuration

Based on the performance testing details below, the following recommendations are suggested for Jenkins deployments:

* CPU request: 100m
* CPU limit: 1000m (May vary depending on usage)
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
      cpu: "1"
      memory: "1Gi"
```
The following command can also be used to update a Jenkins DeploymentConfig:

```bash
oc patch dc/jenkins -p '{"spec": {"template": {"spec": {"containers":[{"name":"jenkins", "resources":{"requests": {"cpu":"100m", "memory":"512Mi"}, "limits": {"cpu":"1", "memory":"1Gi"}}}]}}}}'
```

### Performance testing details

The reason that Jenkins is often deployed with such high CPU and memory requests was related to previous scheduler issues that have since been fixed on the platform. As a result, the templates **and existing Jenkins deployments** should be tuned to reduce the CPU requests.

A test was performed to collect the startup time of Jenkins under various resource configurations. Each test was performed three times and the startup time was averaged out across each iteration. The name of each test is in the format of `[cpu_requests_in_millicores]-[cpu_limits_in_millicores]-[memory_requests_in_mb]`.

![Jenkins performance test results](https://github.com/BCDevOps/developer-experience/blob/master/docs/images/jenkins_performance_test_results.png?raw=true)

| Test Name                  | Average Startup Time (s) |   
|----------------------------|--------------------------|
| 100m-req-500m-limit-128m   | 295                      | 
| 100m-req-500m-limit-512m   | 248                      |   
| 100m-req-500m-limit-128m   | 368                      |  
| 100m-req-1000m-limit-128m  | 163                      |   
| 100m-req-500m-limit-512m   | 185                      |  
| 100m-req-1000m-limit-512m  | 77                       |   
| 100m-req-2000m-limit-512m  | 80                       |   
| 500m-req-1000m-limit-128m  | 137                      |   
| 500m-req-1000m-limit-512m  | 91                       | 
| 1000m-req-2000m-limit-128m | 131                      |
| 1000m-req-2000m-limit-512m | 73                       |   

The observations from the testing can be summarized as follows:

* CPU limit has the largest effect on startup performance
* CPU request has little effect on startup performance
* The gain from a CPU limit of 500m to 1000m is major
* The gain from a CPU limit of 1000m to 2000m is minor
* One ideal configuration looks like this:
  * CPU request: 100m
  * CPU limit: 1000m+
  * Memory request: 512M
  * Memory limit: 1-2GB (May vary depending on usage)

### Advanced Jenkins resource tuning

Consider monitoring the upper and lower bounds of CPU and memory usage of Jenkins instances over time. When idle, it has been observed that Jenkins uses under `5m` of CPU and about `650Mi` of memory. As per the **General Guidelines** above, "set requests to the _minimum_ of what your application needs." It is ideal to reserve resources conservatively (especially for workloads that are often idle), and leverage resource limits to burst when active.

![Jenkins CPU usage](https://github.com/BCDevOps/developer-experience/blob/master/docs/images/jenkins-cpu-usage.png?raw=true)

Also, consider other workloads you may need to run in the tools namespace when accounting for requests/limits allocation to be within the allotted maximums.

## Tools namespaces resource quota recommendations <a name="#tools-namespaces-resource-quota-recommendations"></a>

Every product in a cluster is provided a license plate and a namespace for each environment (dev, test, prod). These products also have a **tools** namespace defined as `<license>-tools`, where tooling such as Jenkins are deployed.

As of writing, there is a discrepancy between compute resources (especially CPU) requested compared to actual usage.

On average, Jenkins instances in tools namespaces across the cluster are requesting much more resources than they are utilizing. These overcommitted Jenkins instances are one of the largest contributors to this over-allocation problem.

In short, the recommendation is to lower compute resource requests and leverage resource limits in a burstable fashion.

This section identifies the problem and mitigation recommendation of resource over-allocation in tools namespaces.

### Decoupling tools namespaces quotas and limit ranges

It is recommended to decouple the quotas and limits sizing of the tools namespace from the other environment namespaces (dev, test, prod), to separately adjust the quotas and limits of the tools namespaces.

### OpenShift template considerations for reduced quota

When deploying a workload such as Jenkins from the OpenShift catalog, you may not be prompted to configure all of the CPU and memory requests and limits. In the case of Jenkins, you may only define the memory limit (defaults to 1Gi) which will set the memory requests to the same value.

To accommodate a reduced project quota, the `oc patch` command (depicted above) should be used with more appropriate CPU and memory requests and quotas for all workloads in the tools project. Otherwise, these workloads may not become schedulable if their combined total requests/limits exceed the maximums defined by project quotas.

### Viewing quota usage

You can identify current resource quota consumption and properly size resource requests and limits of existing/new workloads using either the OpenShift web console or `oc` command-line tool.

#### Viewing quota usage (GUI)

From the OpenShift web console, in the **Administrator** perspective, proceed to **Administration** \> **ResourceQuotas** and select the appropriate `ResourceQuota` (i.e., `compute-long-running-quota`). Here is an example:

![tools example compute-long-running-quota](https://github.com/BCDevOps/developer-experience/blob/master/docs/images/tools-example-compute-long-running-quota.png?raw=true)

#### Viewing quota usage (CLI)

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

### Risks associated with reducing resource reservation

Consider these risks when reducing resource quotas (and subsequently, requests/limits).

See [Configuring your cluster to place pods on overcommitted nodes](https://docs.openshift.com/container-platform/latest/nodes/clusters/nodes-cluster-overcommit.html) for more details.

#### Simultaneous resource claiming

Reducing resource requests ["works on the assumption that not all the pods will claim all of their usable resources at the same time"](https://cloud.redhat.com/blog/full-cluster-part-2-protecting-nodes).

Consideration must be made to determine if several workloads across the cluster would be bursting above their requests simultaneously at a specific time of day.

#### Node CPU saturation

Very low CPU requests (i.e., `5m`) may be assigned to workloads such as Jenkins that have minuscule CPU usage when idle, and rely on CPU limits to burst during pipeline runs. A potential risk with this configuration is if the node a workload is scheduled on is being heavily utilized. The workload will not be able to burst much higher than the given CPU requests, potentially causing a significant slowdown.

However, this will not cause pod evictions. CPU throttling (extensively below CPU limits) can be mitigated, ensuring nodes across the cluster are evenly balanced and not over-utilized.

#### Node memory saturation

Nodes running out of memory can be more troublesome than CPU saturation. Regardless of node capacity, workloads that consume beyond their configured memory limits will immediately be terminated. However, if the workload is above its memory requests (but within its memory limits) and its node is running out of memory, the workload may be evicted (depending on the scheduler and priority) to reclaim that memory.

Because memory is incompressible, memory requests and limits should be a little more generous to mitigate pod eviction/termination.

## Horizontal and Vertical Pod Autoscaler Demo <a name="#horizontal-and-vertical-pod-autoscaler-demo"></a>

The demonstrations below demonstrate how to create a basic horizontal pod autoscaler (HPA) and Vertical Pod Autoscaler (VPA). The demonstration then details how a HPA and VPA can be used together. In this combination the VPA is used to gather resource recommendations only. These values are applied manually to the pods, then  the HPA is used to scale pods based on load.

## Horizontal Pod Autoscaler

### Prep for HPA Demo

1. Create a project or use empty project.

    Create a project;

    ```console
    $ oc new-project 
    ```

    In this Demo, `tats-hpa-test` is created.

2. Deploy the example deployment.

    From `tats-hpa-test` project, Navigate to `Workloads` > `Deployment`, Click `Create Deployment`. Add resources and click `Create`.

    The resources you will add are like below:

    ```yaml
    <...>
    resources:
    limits:
      cpu: 100m
      memory: 512Mi
    requests:
      cpu: 50m
      memory: 70Mi
    <...>
    ```

    Note: These resource values are just demonstrations; you can try other values for them while playing with the HPA.

    If you prefer to to use CLI, use the deployment example yaml below;

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: example
      namespace: 
    spec:
      selector:
        matchLabels:
          app: httpd
      replicas: 3
      template:
        metadata:
          labels:
            app: httpd
        spec:
          containers:
            - name: httpd
              image: >-
                image-registry.openshift-image-registry.svc:5000/openshift/httpd:latest
              ports:
                - containerPort: 8080
              resources:
                limits:
                  cpu: 100m
                  memory: 512Mi
                requests:
                  cpu: 50m
                  memory: 70Mi
    ```

    save the yaml as `example-deployment` above and run the oc command;

    ```console
    $ oc create -f example-deployment.yaml
    deployment.apps/example created

    $ oc get deploy
    NAME      READY   UP-TO-DATE   AVAILABLE   AGE
    example   3/3     3            3           6s
    ```

3. Check if the example Deployment has been deployed and created 3 pods.

    ```console
    $ oc get pods
    NAME                      READY   STATUS    RESTARTS   AGE
    example-787f749bb-lt2sm   1/1     Running   0          11s
    example-787f749bb-qpkc6   1/1     Running   0          11s
    example-787f749bb-twjns   1/1     Running   0          11s

    ```

### HPA Demo

1. HPA yaml file

    From `tats-hpa-test` project, Navigate to Workloads > HorizontalPodAutoscalers, Click `Create HorizontalPodAutoscaler` to create the example HPA. (Change parameters as you test. eg, change averageUtilization etc)

    Or use the HPA example below:

    ```yaml
    apiVersion: autoscaling/v2beta2
    kind: HorizontalPodAutoscaler
    metadata:
      name: example-hpa
      namespace: tats-test3
    spec:
      scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: example
      minReplicas: 2
      maxReplicas: 10
      metrics:
      - type: Resource
        resource:
          name: memory
          target:
            type: AverageValue
            averageValue: 35Mi
    ```

    Note: This yaml is using memory metrics for testing. The example that will be created by the console is using CPU, which is a bit difficult to test with. (you have to let CPU busy.)

2. Create an HPA object and check pods.

    ```console
    # Check original state of pods - 3 pods should be running by the example deployment.
    $ oc get pods
    NAME                       READY   STATUS    RESTARTS   AGE
    example-5697576c5f-p8qd5   1/1     Running   0          2m39s
    example-5697576c5f-pw92r   1/1     Running   0          2m39s
    example-5697576c5f-trxj2   1/1     Running   0          2m39s


    $ oc create -f example-hpa.yaml
    horizontalpodautoscaler.autoscaling/example-hpa created
    
    # Check if HPA is created and calculating the target:
    $ oc get hpa
    NAME          REFERENCE            TARGETS          MINPODS   MAXPODS   REPLICAS   AGE
    example-hpa   Deployment/example   /35Mi   1         10        0          9s

    # After a few seconds or so you should see the TARGET field:
    $ oc get hpa
    NAME          REFERENCE            TARGETS             MINPODS   MAXPODS   REPLICAS   AGE
    example-hpa   Deployment/example   47516330666m/35Mi   1         10        3          16s

    # After a minutes or so, Additional 7 pods has been spin up by the hpa.  This is because maxReplicas is set to 10, and current deployment's memory is not matched to the target memory resource.
    $ oc get pods
    NAME                       READY   STATUS    RESTARTS   AGE
    example-5697576c5f-4vlt2   1/1     Running   0          15s
    <...>
    example-5697576c5f-pw92r   1/1     Running   0          3m6s
    example-5697576c5f-trxj2   1/1     Running   0          3m6s

    # See what happened if the hpa is deleted and check pods.

    $ oc delete hpa example-hpa
    horizontalpodautoscaler.autoscaling "example-hpa" deleted

    # Added pods are still running. 
    $ oc get pods
    NAME                       READY   STATUS    RESTARTS   AGE
    example-5697576c5f-4vlt2   1/1     Running   0          4m15s
    example-5697576c5f-9gnhk   1/1     Running   0          3m
    example-5697576c5f-dkrtc   1/1     Running   0          105s
    example-5697576c5f-h6lq2   1/1     Running   0          3m
    example-5697576c5f-hwb7b   1/1     Running   0          44s
    example-5697576c5f-jg5l7   1/1     Running   0          105s
    example-5697576c5f-p8qd5   1/1     Running   0          7m6s
    example-5697576c5f-pw92r   1/1     Running   0          7m6s
    example-5697576c5f-trxj2   1/1     Running   0          7m6s
    example-5697576c5f-xvb8x   1/1     Running   0          44s

    # delete all pods manually one by one and check pods

    $ oc delete pods example-5697576c5f-4vlt2 example-5697576c5f-9gnhk example-5697576c5f-dkrtc example-5697576c5f-h6lq2 example-5697576c5f-hwb7b example-5697576c5f-jg5l7 example-5697576c5f-p8qd5 example-5697576c5f-pw92r example-5697576c5f-trxj2 example-5697576c5f-xvb8x --grace-period=0 --force
    pod "example-5697576c5f-4vlt2" deleted
    <...>
    pod "example-5697576c5f-trxj2" deleted
    pod "example-5697576c5f-xvb8x" deleted

    # Still 10 pods will be running - This is because the deployment object had been over written by the hpa and it's still remained even though the hpa object is deleted.
    $ oc get pods
    NAME                       READY   STATUS    RESTARTS   AGE
    example-5697576c5f-5fnlg   1/1     Running   0          37s
    example-5697576c5f-8c8dl   1/1     Running   0          36s
    example-5697576c5f-bjj5n   1/1     Running   0          36s
    <...>
    example-5697576c5f-w2kk5   1/1     Running   0          37s
    example-5697576c5f-zhhbl   1/1     Running   0          37s

    # Check `example` deployment is still set to 10. 
    $ oc get deployment example -o=jsonpath='{.status.replicas}' | jq
    10

    # Check event see what they say about hpa.
    $ oc get event
    <...>
    horizontalpodautoscaler/example-hpa   New size: 3; reason: Current number of replicas below Spec.MinReplicas
    16m         Warning   FailedGetResourceMetric        horizontalpodautoscaler/example-hpa   failed to get memory utilization: unable to get metrics for resource memory: no metrics returned from resource metrics API
    16m         Warning   FailedComputeMetricsReplicas   horizontalpodautoscaler/example-hpa   invalid metrics (1 invalid out of 1), first error is: failed to get memory utilization: unable to get metrics for resource memory: no metrics returned from resource metrics API
    22m         Normal    SuccessfulRescale              horizontalpodautoscaler/example-hpa   New size: 3; reason:
    12m         Normal    SuccessfulRescale              horizontalpodautoscaler/example-hpa   New size: 2; reason: All metrics below target
    2m7s        Normal    SuccessfulRescale              horizontalpodautoscaler/example-hpa   New size: 3; reason: memory resource above target
    52s         Normal    SuccessfulRescale              horizontalpodautoscaler/example-hpa   New size: 4; reason: memory resource above target
    26m         Normal    ScalingReplicaSet              deployment/example                    Scaled down replica set example-5697576c5f to 2
    26m         Normal    ScalingReplicaSet              deployment/example                    Scaled up replica set example-6f4ffd89c to 1
    26m         Normal    ScalingReplicaSet              deployment/example                    Scaled down replica set example-5697576c5f to 1
    <...>
    12m         Normal    ScalingReplicaSet              deployment/example                    (combined from similar events): Scaled down replica set example-69b64c8949 to 2
    3m47s       Normal    ScalingReplicaSet              deployment/example                    Scaled up replica set example-7cf7dbd7f6 to 2
    2m7s        Normal    ScalingReplicaSet              deployment/example                    Scaled up replica set example-7cf7dbd7f6 to 3
    52s         Normal    ScalingReplicaSet              deployment/example                    Scaled up replica set example-7cf7dbd7f6 to 4
    <...>

## Vertical Pod Autoscaler

### Prep for VPA

1. Create `tats-vpa-test` project:

    ```console
    $ oc new-project tats-vpa-test
    Now using project "tats-vpa-test" on server "https://api.klab.devops.gov.bc.ca:6443".
    ```

2. Deploy `example` deployment:

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: example
      namespace: 
    spec:
      selector:
        matchLabels:
          app: httpd
      replicas: 2
      template:
        metadata:
          labels:
            app: httpd
        spec:
          containers:
            - name: httpd
              image: >-
                image-registry.openshift-image-registry.svc:5000/openshift/httpd:latest
              ports:
                - containerPort: 8080
              resources:
                limits:
                  cpu: 100m
                  memory: 512Mi
                requests:
                  cpu: 5m
                  memory: 10Mi
    ```

    Note: In this Demo, `tats-vpa-test` is used. Also, CPU and Memory requests are set to be small on purpose.

### VPA Demo

1. Create `Off mode` vpa yaml:

    ```yaml
    apiVersion: autoscaling.k8s.io/v1beta2
    kind: VerticalPodAutoscaler
    metadata:
      name: example-vpa-recommender
    spec:
      targetRef:
        apiVersion: "apps/v1"
        kind: Deployment
        name: example
      updatePolicy:
        updateMode: "Off"
    ```

2. Deploy a VPA

    ```console
    $ oc create -f example-vpa-off.yaml
    verticalpodautoscaler.autoscaling.k8s.io/example-vpa-recommender created

    # After a minutes or so you should get CPU and MEM recommendation fields 
    $ oc get vpa
    NAME                      MODE   CPU   MEM       PROVIDED   AGE
    example-vpa-recommender   Auto   25m   262144k   True       5s
    ```

3. Check recommendation

    Let it run for a while, and check if Recommendation has been calculated:

    ```console
    $ oc get vpa example-vpa-recommender -o=jsonpath='{.status.recommendation}' | jq
    ```

    ```json
    {
      "containerRecommendations": [
        {
          "containerName": "httpd",
          "lowerBound": {
            "cpu": "25m",
            "memory": "262144k"
          },
          "target": {
            "cpu": "25m",
            "memory": "262144k"
          },
          "uncappedTarget": {
            "cpu": "25m",
            "memory": "262144k"
          },
          "upperBound": {
            "cpu": "25m",
            "memory": "262144k"
          }
        }
      ]
    }
    ```

4. Turn on `Auto` mode:

    ```console
    $ oc edit vpa  example-vpa-recommender
    ```

    ```yaml
    <...>
      updatePolicy:
        updateMode: Off   # change this to Auto
    <...>
    ```

5. Run it for a while and Check status:

    ```console
    $ watch 'oc get pods -o wide && oc get pods  -o custom-columns="NAME:.metadata.name, VPA_UPDATES:.metadata.annotations.vpaUpdates" && oc get pods  -o custom-columns="NAME:.metadata.name, CPU_REQ:.spec.containers[*].resources.requests.cpu, MEM_REQ:.spec.containers[*].resources.requests.memory, CPU_LIM:.spec.containers[*].resources.limits.cpu, MEM_LIM:.spec.containers[*].resources.limits.memory " && echo "--" && oc get vpa && echo "--"&& oc get hpa'

    // VPA starts recreating pods one by one according to the recommendation -  CPU 25m, Memory 260 Mi:

    NAME                       READY   STATUS    RESTARTS   AGE     IP             NODE                  NOMINATED NODE   READINESS GATES
    example-74979bff7b-qp4cs   1/1     Running   0          12s     10.97.17.193   mcs-klab-app-02.dmz              
    example-74979bff7b-sldt5   1/1     Running   0          2m53s   10.97.18.103   mcs-klab-app-04.dmz              
    NAME                        VPA_UPDATES
    example-74979bff7b-qp4cs   Pod resources updated by example-vpa-recommender: container 0: memory request, cpu request, cpu limit, memory limit
    example-74979bff7b-sldt5   
    NAME                        CPU_REQ    MEM_REQ    CPU_LIM    MEM_LIM
    example-74979bff7b-qp4cs   25m        262144k    500m       2500Mi
    example-74979bff7b-sldt5   5m         10Mi       100m       100Mi
    --
    NAME                      MODE   CPU   MEM       PROVIDED   AGE
    example-vpa-recommender   Auto   25m   262144k   True       2m22s
    --
    No resources found in tats-vpa-test namespace.
    ```

    ```console
    // both pods are updated:
    NAME                        CPU_REQ    MEM_REQ    CPU_LIM    MEM_LIM
    example-74979bff7b-hdh92   25m        262144k    500m       2500Mi
    example-74979bff7b-qp4cs   25m        262144k    500m       2500Mi
    ```

6. Delete the VPA object and pods

    ```console
    // Delete VPA
    $ oc delete vpa example-vpa-recommender
    verticalpodautoscaler.autoscaling.k8s.io "example-vpa-recommender" deleted

    $ oc get vpa
    No resources found in tats-vpa-test namespace.

    // Delete one of pod
    $ oc delete pod example-74979bff7b-hdh92 --grace-period=0 --force
    warning: Immediate deletion does not wait for confirmation that the running resource has been terminated. The resource may continue to run on the cluster indefinitely.
    pod "example-74979bff7b-hdh92" force deleted
 
    // Pod will be recreated with the original CPU and Memory requests by the deployment:

    NAME                       READY   STATUS    RESTARTS   AGE   IP             NODE                  NOMINATED NODE   READINESS GATES
    example-74979bff7b-9bt4n   1/1     Running   0          69s   10.97.18.109   mcs-klab-app-04.dmz              
    example-74979bff7b-qp4cs   1/1     Running   0          12m   10.97.17.193   mcs-klab-app-02.dmz              
    NAME                        VPA_UPDATES
    example-74979bff7b-9bt4n   
    example-74979bff7b-qp4cs   Pod resources updated by example-vpa-recommender: container 0: memory request, cpu request, cpu limit, memory limit
    NAME                        CPU_REQ    MEM_REQ    CPU_LIM    MEM_LIM
    example-74979bff7b-9bt4n   5m         10Mi       100m       100Mi
    example-74979bff7b-qp4cs   25m        262144k    500m       2500Mi
    ```

    Note: The VPA does not change the Deployment settings. Therefore, when the VPA is deleted, the Pod will revert to its original required values.

## HPA + VPA FOR EASY RESOURCE TUNING DEMO

The best practices in our OpenShift are the following 7 steps;

- Use VPA to learn optimum resource settings for your deployments:

    Step 1: Identify deployments in your namespace that you think need a resource increase/decrease

    Step 2: Create a VPA object for these deployments

    Step 3: Let the VPA object(s) run for 2-7 days to collect data
  
    Step 4:  Review the report with the recommendations for resource allocations generated by the VPA objects

    Step 5: Implement for resource allocations for CPU Request/Limit and Memory Request/Limit recommended by the VPA objects

- Use HPA to make your deployments scalable:

    Step 6: Create a HPA object for the deployment that is expected to burst and set the threshold for scaling out to the CPU Limit set for the deployment

    Step 7: Run a load test to generate a load that will trigger the HPA and increase the number of replicas to confirm everything works as expected

### Use **VPA** to learn optimum resource settings for your deployments

#### Step 1

Identify deployments in your namespace that you think need a resource increase/decrease

Follow the steps in [Example Nginx Application Deployment](ExampleAppDeployment.md) and deploy a demo app in your namespace. In this Demo, `tats-autoscaling-demo` namespace is used.

#### Step 2

Create a VPA object for the deployments you have created in the previous step. Here, it's `nginx-hello-world-as-demo` deployment

```console
$ oc get deployment
NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
nginx-hello-world-as-demo   2/2     2            2           3h40m
```

```console
vi example-vpa-recommender.yaml
```

```yaml
---
apiVersion: autoscaling.k8s.io/v1beta2
kind: VerticalPodAutoscaler
metadata:
  name: example-vpa-recommender
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind: Deployment
    name: nginx-hello-world-as-demo
  updatePolicy:
    updateMode: "Off"
```

Run `oc create -f example-vpa-recommender` and check if vpa is created;

```console
$ oc get vpa
NAME                      MODE   CPU   MEM       PROVIDED   AGE
example-vpa-recommender   Off    12m   131072k   True       78s
```

You should see vpa's calculations after a minutes or so.

#### Step 3

Let the VPA object(s) run for 2-7 days to collect data - For the demo, lit it run for a few minutes.

#### Step 4

Review the report with the recommendations for resource allocations generated by the VPA objects

You can check the recommendations using `oc describe vpa ` command, check at the very bottom of output:

```console
$ oc describe vpa example-vpa-recommender

<...>
Spec:
  Target Ref:
    API Version:  apps/v1
    Kind:         Deployment
    Name:         nginx-hello-world-as-demo
  Update Policy:
    Update Mode:  Off
Status:
  Conditions:
    Last Transition Time:  2022-05-13T00:07:27Z
    Status:                True
    Type:                  RecommendationProvided
  Recommendation:
    Container Recommendations:
      Container Name:  nginx
      Lower Bound:
        Cpu:     12m
        Memory:  131072k
      Target:
        Cpu:     12m
        Memory:  131072k
      Uncapped Target:
        Cpu:     12m
        Memory:  131072k
      Upper Bound:
        Cpu:           12m
        Memory:        131072k
      Container Name:  date
      Lower Bound:
        Cpu:     22m
        Memory:  131072k
      Target:
        Cpu:     35m
        Memory:  131072k
      Uncapped Target:
        Cpu:     35m
        Memory:  131072k
      Upper Bound:
        Cpu:     55m
        Memory:  131072k
Events:          
```

With the ExampleApp deployment, Two containers' recommendations should be in the output like above, one for `nginx`, another one for `date`.

Run below if you want to see the recommendation part only;

```console
$ oc get vpa example-vpa-recommender -o=jsonpath='{.status.recommendation}' | jq
```
  
```json
{
  "containerRecommendations": [
    {
      "containerName": "nginx",
      "lowerBound": {
        "cpu": "12m",
        "memory": "131072k"
      },
      "target": {
        "cpu": "12m",
        "memory": "131072k"
      },
      "uncappedTarget": {
        "cpu": "12m",
        "memory": "131072k"
      },
      "upperBound": {
        "cpu": "12m",
        "memory": "131072k"
      }
    },
    {
      "containerName": "date",
      "lowerBound": {
        "cpu": "22m",
        "memory": "131072k"
      },
      "target": {
        "cpu": "35m",
        "memory": "131072k"
      },
      "uncappedTarget": {
        "cpu": "35m",
        "memory": "131072k"
      },
      "upperBound": {
        "cpu": "55m",
        "memory": "131072k"
      }
    }
  ]
}
```

### Use **HPA** to make your deployments scalable

#### Step 5

Implement for resource allocations for CPU Request/Limit and Memory Request/Limit recommended by the VPA objects - **This step re-creates the pod. Take special care when performing this procedure with the PROD application.**

The `resources` for the example deployments should have been set like below:

```console
$ oc get deployment nginx-hello-world-as-demo -o yaml
```

```yaml
    <...>
    spec:
      containers:
      - image: image-registry.apps.klab.devops.gov.bc.ca/tats-autoscaling-demo/nginx-hello-world-as-demo
        imagePullPolicy: Always
        name: nginx
        resources:
          limits:
            cpu: 50m
            memory: 200Mi
          requests:
            cpu: 10m
            memory: 50Mi
        <...>
        name: date
        resources:
          limits:
            cpu: 25m
            memory: 200Mi
          requests:
            cpu: 10m
            memory: 25Mi
            <...>
```

Change these resources to the values that the recommendation is indicating. (Manually scale up/down pods vertically after you got the fair recommendations)

There are many discussions, calculations, and tools on how to set CPU and memory resources. One simple way to set the `limit` and `request` for these resources is to use the vpa recommender's `lowerBound` or `target` as the `request` and `upperBound` as the `limit`.

```console
oc edit deployment nginx-hello-world-as-demo
```

```yaml
<...>
        name: nginx
        resources:
          limits:
            cpu: 24m         # Changed to 24m
            memory: 131072k  # Changed to 131072k
          requests:
            cpu: 12m         # Changed to 12m
            memory: 131072k  # Changed to 131072k
        <...>
        imagePullPolicy: IfNotPresent
        name: date
        resources:
          limits:
            cpu: 55m         # Changed to 55m
            memory: 131072k  # Changed to 131072k
          requests:
            cpu: 22m         # <--- Changed to 22m
            memory: 131072k  # <--- Changed to 131072k
<...>
```

Pods will be terminated and recreated with these new resource requests. Check if both cpu and memory requests have been updated with new pods.

```console
$ oc get pods -o custom-columns="NAME:.metadata.name, CPU_REQ:.spec.containers[*].resources.requests.cpu, MEM_REQ:.spec.containers[*].resources.requests.memory, CPU_LIM:.spec.containers[*].resources.limits.cpu, MEM_LIM:.spec.containers[*].resources.limits.memory"

<...>
NAME                                         CPU_REQ    MEM_REQ       CPU_LIM    MEM_LIM
nginx-hello-world-as-demo-1-build           50m        256Mi         250m       1Gi
nginx-hello-world-as-demo-5444d994f-5466n   12m,22m    131Mi,131Mi   24m,55m    137Mi,131Mi
nginx-hello-world-as-demo-5444d994f-58kqf   12m,22m    131Mi,131Mi   24m,55m    137Mi,131Mi

```

To find out a appropriate resource requests and limits, Please read the followings:

- [Set appropriate resource requests and limits](https://cloud.google.com/architecture/best-practices-for-running-cost-effective-kubernetes-applications-on-gke#set_appropriate_resource_requests_and_limits)
- [Autoscaler and over-provisioning](https://cloud.google.com/architecture/best-practices-for-running-cost-effective-kubernetes-applications-on-gke#autoscaler_and_over-provisioning)

#### Step 6

Create a HPA object for the deployment that is expected to burst and set the threshold for scaling out to the CPU `Limit` set for the deployment

Create an HPA object for the deployment you have created in the step 2. Here, it's `nginx-hello-world-as-demo` deployment and using `Average CPU Utilization` to scale pods horizontally.

HPA constantly monitors the total `request` value in the pod and calculates the usage/utilization for it. In this demo, we have a total `34m CPU requests` and a total `79m CPU limit`. So, if we want to set 80% CPU utilization against the `limit` as the threshold for the HPA, the calculation would be as follows;

```text
HPA threshold = 79 (total cpu limit) * 0.8 (target %) / 34 (total cpu request)
              = 1.859 (about 186 % of total cpu request) 
```

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: example-hpa-cpu-metrics
  namespace: tats-autoscaling-test
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-hello-world-as-demo
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 186 
```

Run `oc create -f example-hello-world-hpa-demo-memory.yaml` to create an hpa object, and run `oc get hpa` to see it;

```console
$ oc get hpa
NAME                          REFERENCE                              TARGETS    MINPODS   MAXPODS   REPLICAS   AGE
hello-world-as-demo-hpa-cpu   Deployment/nginx-hello-world-as-demo   72%/186%   1         10        9          2m
```

Note: You can deploy hpa using `oc autoscale` command, but on OUR OCP 4.8, it creates hpa object using `autoscaling/v1` API. If you want to use more metrics, `autoscaling/v2beta2` is a better choice. Therefore, the deployment method by yaml file is used here.

#### Step 7

Run a load test to generate a load that will trigger the HPA and increase the number of replicas to confirm everything works as expected

Use load test tool such as [K6](https://k6.io) or a custom script that runs your test, Try a test close to actual operation to see how the HPA adds/removes pods.

Note: HPA scales out pods in about 1 minute, but scale-down takes about 5 minutes per pod to smooth out the effects of rapidly fluctuating metric values, like below;

```console
$ oc describe hpa hello-world-as-demo-hpa-cpu
<...>
Events:
  Type    Reason             Age   From                       Message
  ----    ------             ----  ----                       -------
  Normal  SuccessfulRescale  35m   horizontal-pod-autoscaler  New size: 9; reason: All metrics below target
  Normal  SuccessfulRescale  31m   horizontal-pod-autoscaler  New size: 8; reason: All metrics below target
  Normal  SuccessfulRescale  27m   horizontal-pod-autoscaler  New size: 7; reason: All metrics below target
  Normal  SuccessfulRescale  23m   horizontal-pod-autoscaler  New size: 6; reason: All metrics below target
  Normal  SuccessfulRescale  18m   horizontal-pod-autoscaler  New size: 5; reason: All metrics below target
```
---
Related links:
* [AUTOSCALING - HPA and VPA​ ppt](https://advsolcan.sharepoint.com/:p:/r/sites/ManagedContainerServicesMCS/_layouts/15/Doc.aspx?sourcedoc=%7B25D8DD76-8672-4ED8-8379-DC3B0093A65F%7D&file=2022-xx-xx%20AUTOSCALING%20-%20HPA%20and%20VPA.pptx&action=edit&mobileredirect=true&cid=93ab4cf3-8fc6-4de6-8c81-8efc5f475efc)
* [Deliver presentation on HPA and VPA to PS Team#223](https://app.zenhub.com/workspaces/platform-experience-5bb7c5ab4b5806bc2beb9d15/issues/bcdevops/developer-experience/2235)
* [HorizontalPodAutoscaler Walkthrough](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)
* [HPA - Algorithm details](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#algorithm-details)

Rewrite sources:
* https://developer.gov.bc.ca/Developer-Tools/Resource-Tuning-Recommendations
* https://bcgov-my.sharepoint.com/:p:/g/personal/olena_mitovska_gov_bc_ca/EXNhWAvKZA5OiR1eMKaug7QBMI-tGiK2FZ_c04p8JI0RGw
---
