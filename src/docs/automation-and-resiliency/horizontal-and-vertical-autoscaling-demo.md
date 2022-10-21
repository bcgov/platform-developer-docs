---
title: Horizontal and vertical pod autoscaling demo 

slug: horizontal-and-vertical-autoscaling-demo

description: Outlines the process for using a horizontal and vertical pod autoscaler together. 

keywords: openshift, resiliency, design, 12-factor, available, deployable, recoverable, resource, community support, tools, examples

page_purpose: This demo illustrates how a VPA can be used to get resource recommendations without applying them, and then these resource recommendations can be manually applied while a HPA runs in order to scale the number of pods based on load.

audience: developer, technical lead, product owner

author: Tetsuya Morikawa

content_owner: Olena Mitovska

sort_order: 

---
# Horizontal and vertical pod autoscaling demo

## On this page: 
- [Horizontal Pod Autoscaler](#horizontal-pod-autoscaler)
- [Vertical Pod Autoscaler](#vertical-pod-autoscaler)
- [HPA + VPA For Easy Resource Tuning Demo](#hpa--vpa-for-easy-resource-tuning-demo)
- [VPA Experiments](#vpa-experiments)
- [VPA with Statefulset app, such as Patroni HA cluster](#vpa-with-statefulset-app-such-as-patroni-ha-cluster)
- [Deploy Patroni cluster template](#deploy-patroni-cluster-template)
- [Check Pods resource usages and VPA's recommendations](#check-pods-resource-usages-and-vpas-recommendations)
- [Conclusion - Can VPA be used for stateful workload?](#conclusion---can-vpa-be-used-for-stateful-workload)
- [References](#references)

## Horizontal Pod Autoscaler

### Prep for HPA demo

1. Create a project or use empty project.

    Create a project;

    ```console
    $ oc new-project <project name>
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
      namespace: <your namespace name>
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

### HPA demo

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
    example-hpa   Deployment/example   <unknown>/35Mi   1         10        0          9s

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
      namespace: <your NS>
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

### VPA demo

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
    example-74979bff7b-qp4cs   1/1     Running   0          12s     10.97.17.193   mcs-klab-app-02.dmz   <none>           <none>
    example-74979bff7b-sldt5   1/1     Running   0          2m53s   10.97.18.103   mcs-klab-app-04.dmz   <none>           <none>
    NAME                        VPA_UPDATES
    example-74979bff7b-qp4cs   Pod resources updated by example-vpa-recommender: container 0: memory request, cpu request, cpu limit, memory limit
    example-74979bff7b-sldt5   <none>
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
    example-74979bff7b-9bt4n   1/1     Running   0          69s   10.97.18.109   mcs-klab-app-04.dmz   <none>           <none>
    example-74979bff7b-qp4cs   1/1     Running   0          12m   10.97.17.193   mcs-klab-app-02.dmz   <none>           <none>
    NAME                        VPA_UPDATES
    example-74979bff7b-9bt4n   <none>
    example-74979bff7b-qp4cs   Pod resources updated by example-vpa-recommender: container 0: memory request, cpu request, cpu limit, memory limit
    NAME                        CPU_REQ    MEM_REQ    CPU_LIM    MEM_LIM
    example-74979bff7b-9bt4n   5m         10Mi       100m       100Mi
    example-74979bff7b-qp4cs   25m        262144k    500m       2500Mi
    ```

    Note: The VPA does not change the Deployment settings. Therefore, when the VPA is deleted, the Pod will revert to its original required values.

## HPA + VPA for easy resource tuning demo

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

### Use VPA to learn optimum resource settings for your deployments

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

You can check the recommendations using `oc describe vpa <vpa name>` command, check at the very bottom of output:

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
Events:          <none>
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

### Use HPA to make your deployments scalable

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

## VPA experiments

### VPA with Statefulset app, such as Patroni HA cluster

Using bcgov's patroni template, Deploy patroni HA cluster with 3 replicas and test VPA behaviors with a couple scenarios. The purpose of this experiment is to see how VPA behaves in terms of calculating recommendations and updating these pods during scale up/down when they are running under different resource conditions.

#### Deploy Patroni cluster template

```console
// Create a new project or use your test project
NS="tats-patroni-test" # use your namespace
$ oc new-project $NS

// Clone patroni template repo
$ git clone https://github.com/bcgov/patroni-postgres-container.git

//deploy patroni templates
$ cd patroni-postgres-container
$ oc -n $NS process -f samples/prerequisite.yaml -p NAME=patroni  | oc -n $NS create -f -
secret/patroni-creds created
serviceaccount/patroni created
role.rbac.authorization.k8s.io/patroni created
rolebinding.rbac.authorization.k8s.io/patroni created

$ oc -n $NS process -f samples/deploy.yaml -p NAME=patroni  | oc -n $NS create -f - 
service/patroni-master created
statefulset.apps/patroni created

// Wait for a couple of minutes and See if three pods are created.
$ oc -n $NS get pods -o wide
NAME        READY   STATUS    RESTARTS   AGE   IP             NODE                  NOMINATED NODE   READINESS GATES
patroni-0   1/1     Running   0          16m   10.97.12.159   mcs-klab-app-03.dmz   <none>           <none>
patroni-1   1/1     Running   0          15m   10.97.14.60    mcs-klab-app-01.dmz   <none>           <none>
patroni-2   1/1     Running   0          14m   10.97.17.224   mcs-klab-app-02.dmz   <none>           <none>

// Pro Tip: Checking the pods and their CPU & Memory resources at the same time.
$ oc -n $NS get pods -o wide && oc -n $NS get pods -o custom-columns="NAME:.metadata.name, CPU_REQ:.spec.containers[*].resources.requests.cpu, MEM_REQ:.spec.containers[*].resources.requests.memory, CPU_LIM:.spec.containers[*].resources.limits.cpu, MEM_LIM:.spec.containers[*].resources.limits.memory "
NAME        READY   STATUS    RESTARTS   AGE   IP             NODE                  NOMINATED NODE   READINESS GATES
patroni-0   1/1     Running   0          19m   10.97.12.159   mcs-klab-app-03.dmz   <none>           <none>
patroni-1   1/1     Running   0          17m   10.97.14.60    mcs-klab-app-01.dmz   <none>           <none>
patroni-2   1/1     Running   0          16m   10.97.17.224   mcs-klab-app-02.dmz   <none>           <none>
NAME         CPU_REQ    MEM_REQ    CPU_LIM    MEM_LIM
patroni-0   250m       512Mi      1          512Mi
patroni-1   250m       512Mi      1          512Mi
patroni-2   250m       512Mi      1          512Mi
```

#### Check Pods resource usages and VPA's recommendations

Patroni pods current resource usages:

```console
oc -n $NS adm top pod
NAME        CPU(cores)   MEMORY(bytes)
patroni-0   73m          96Mi
patroni-1   91m          77Mi
patroni-2   101m         80Mi
```

As you can see above, Each pod shows much lower resource usages than requested values in the default statefulset. Also there is a gap between the pods' resource usages. (i.e. patroni-0 uses 73m, while patroni-2 uses 101m)

Next, Deploy VPA with `Off mode` and let the VPA calculate the recommendations and see how it'll compute the appropriate resource values.

```bash
$ oc -n $NS create -f - << EOT
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: patroni-test-vpa       # Name of your vpa
  namespace: tats-patroni-test # Name of your namespace
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind:       StatefulSet
    name:       patroni
  updatePolicy:
    updateMode: "Off"
EOT
```

Let it run for a while, at least 10-15 minutes.
Check if the vpa got recommendations.

```console
// VPA recommendation summary
$ oc -n $NS get vpa
NAME               MODE   CPU    MEM       PROVIDED   AGE
patroni-test-vpa   Off    109m   262144k   True       4m19s

// Details of the VPA recommendations
$ oc -n $NS get vpa -o json | jq -r '.items[].status'
{
  "conditions": [
    {
      "lastTransitionTime": "2022-10-06T21:00:34Z",
      "status": "True",
      "type": "RecommendationProvided"
    }
  ],
  "recommendation": {
    "containerRecommendations": [
      {
        "containerName": "postgresql",
        "lowerBound": {
          "cpu": "92m",
          "memory": "262144k"
        },
        "target": {
          "cpu": "109m",
          "memory": "262144k"
        },
        "uncappedTarget": {
          "cpu": "109m",
          "memory": "262144k"
        },
        "upperBound": {
          "cpu": "267m",
          "memory": "526543173"
        }
      }
    ]
  }
}
```

**Remarks:** These values are historical percentiles - [i.e. `target` is 90th percentile](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/pkg/recommender/logic/recommender.go#L102)- of CPU and Memory resources, which means that VPA needs to collect those values decide the recommendations. The longer the data, the better to obtain correct recommendations. The current version of the VPA can collect up to a week's worth of data.

- lowerBound: `50th percentile` - If request is below this value, Pod might be evicted and set to the target.
- target: `90th percentile` - The recommended CPU request and memory request for the container. Pod will be set to this value.
- uncappedTarget: 90th percentile - The most recent resource recommendation computed by the autoscaler, based on actual resource usage, not taking into account the [ContainerResourcePolicy](https://cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler#containerresourcepolicy_v1_autoscalingk8sio)
- upperBound: `95th percentile` - If request is above this value, Pod might be evicted and set to the target.

Since these are percentile calculations on a histogram, the current VPA may not be useful. For example, the default VPA recommendation policy would not be able to capture changes in usage for regular or trendy behaviors. For more information, please read the RH blog below.

- [How to Enable a Customized VPA Recommender on OpenShift 4.11](https://cloud.redhat.com/blog/how-to-enable-a-customized-vpa-recommender-on-openshift).  

  The Customized VPA Recommender will be coming to OCP 4.11.

Check current pod status and current resource settings

```console
$ oc project $NS
$ oc get pods -o wide && oc get pods -o custom-columns="NAME:.metadata.name, CPU_REQ:.spec.containers[*].resources.requests.cpu, MEM_REQ:.spec.containers[*].resources.requests.memory, CPU_LIM:.spec.containers[*].resources.limits.cpu, MEM_LIM:.spec.containers[*].resources.limits.memory "
NAME        READY   STATUS    RESTARTS   AGE   IP             NODE                  NOMINATED NODE   READINESS GATES
patroni-0   1/1     Running   0          19m   10.97.12.159   mcs-klab-app-03.dmz   <none>           <none>
patroni-1   1/1     Running   0          17m   10.97.14.60    mcs-klab-app-01.dmz   <none>           <none>
patroni-2   1/1     Running   0          16m   10.97.17.224   mcs-klab-app-02.dmz   <none>           <none>
NAME         CPU_REQ    MEM_REQ    CPU_LIM    MEM_LIM
patroni-0   250m       512Mi      1          512Mi
patroni-1   250m       512Mi      1          512Mi
patroni-2   250m       512Mi      1          512Mi
```

Now apply `Auto` mode to the VPA object and see if how those resources will be adjusted by the VPA.

```bash
$ oc apply -f - << EOT
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: patroni-test-vpa
  namespace: tats-patroni-test
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind:       StatefulSet
    name:       patroni
  updatePolicy:
    updateMode: "Auto"
EOT

// Check if VPA is now Auto mode.
$ oc get vpa
NAME               MODE   CPU    MEM       PROVIDED   AGE
patroni-test-vpa   Auto   109m   262144k   True       3h18m


// Check if pods are updating with a target recommendations.
 $ oc get pods -o wide && oc get pods -o custom-columns="NAME:.metadata.name, CPU_REQ:.spec.containers[*].resources.requests.cpu, MEM_REQ:.spec.containers[*].resources.requests.memory, CPU_LIM:.spec.containers[*].resources.limits.cpu, MEM_LIM:.spec.containers[*].resources.limits.memory "
NAME        READY   STATUS    RESTARTS   AGE     IP             NODE                  NOMINATED NODE   READINESS GATES
patroni-0   1/1     Running   0          3m18s   10.97.12.198   mcs-klab-app-03.dmz   <none>           <none>
patroni-1   1/1     Running   0          4m18s   10.97.14.182   mcs-klab-app-01.dmz   <none>           <none>
patroni-2   1/1     Running   0          2m18s   10.97.16.100   mcs-klab-app-02.dmz   <none>           <none>
NAME         CPU_REQ    MEM_REQ    CPU_LIM    MEM_LIM
patroni-0   109m       262144k    436m       262144k
patroni-1   109m       262144k    436m       262144k
patroni-2   109m       262144k    436m       262144k
```

All three pods will be recreated(scale up or down, in this case it's down) one by one as `updateStrategy` is set to `RollingUpdate` in the statefulset. It will take a minutes or so.

In the stateful set, CPU and Memory resources are still the same as the default:

```yaml
$ oc describe sts patroni
<...> 
    Limits:
      cpu:     1
      memory:  512Mi
    Requests:
      cpu:      250m
      memory:   512Mi
<...>
```

However, in Pod's annotations and resource, you will see below:

```yaml
$ oc describe pods patroni-0
<...>
              vpaObservedContainers: postgresql
              vpaUpdates: Pod resources updated by patroni-test-vpa: container 0: cpu request, memory request, cpu limit, memory limit
<...>
// New resource values recommended by the VPA are set.
    Limits:
      cpu:     436m
      memory:  262144k
    Requests:
      cpu:      109m
      memory:   262144k
<...>
```

The VPA overrides the default statefulset's resources as described in the output above when the pod was recreated. And the VPA sees statefulset workload's historical usages from all replicated pods and calculates percentiles (recommendations). Therefore the recommendations will be applied to all pods in the statefulset.

### Conclusion - Can VPA be used for stateful workload?

1. Yes. VPA can work with stateful workloads such as HA databases as long as they run on the Openshift (Kubernetes) platform. Make sure stateful workloads are configured for HA and allow pods to be suspended (as pods are stopped and re-created by VPA).
2. If your stateful workloads are not configured for HA, Use `Off` mode or `Initial` mode. And get the recommendation and scale up your workload manually. (`Initial` mode will update the requests once the pod has rolled. -- VPA is not going to do it automatically.)
3. VPA calculates stateful set workload's percentile as recommended values, therefore the target recommendation will be applied to the stateful set, which means that all pods will have the same request values.
4. Run VPA for a while. The longer the data, the better to obtain correct recommendations. (Up to a week)
5. There is a case that VPA may not be useful. Please read : [How to Enable a Customized VPA Recommender on OpenShift](https://cloud.redhat.com/blog/how-to-enable-a-customized-vpa-recommender-on-openshift)

## References

- [HorizontalPodAutoscaler Walkthrough](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)
- [HPA - Algorithm details](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#algorithm-details)
- [Vertical Pod Autoscaling: The Definitive Guide](https://povilasv.me/vertical-pod-autoscaling-the-definitive-guide/)
- [How to Enable a Customized VPA Recommender on OpenShift](https://cloud.redhat.com/blog/how-to-enable-a-customized-vpa-recommender-on-openshift)
- [Metrics-Driven Pod Constraints](https://cloud.redhat.com/blog/metrics-driven-pod-constraints)
- [Vertical Pod Autoscaler - README](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/README.md)
- [Vertical Pod Autoscaler FAQ](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/FAQ.md)
- [6 Metrics to Watch for on Your Kubernetes Cluster](https://komodor.com/blog/6-metrics-to-watch-for-on-your-kubernetes-cluster/)


