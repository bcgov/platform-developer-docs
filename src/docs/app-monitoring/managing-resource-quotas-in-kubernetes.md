---
title: Managing resource quotas in Kubernetes a complete guide  

slug: Managing-resource-quotas-in-kubernetes

description: The specific metrics and evidence required when applying for additional resources.

keywords: monitoring, openshift monitoring, developer guide, configure, request resource, prometheus, prom, promql, metrics, metric type, servicemonitor, observe

page_purpose: Introduction for the specific metrics and evidence required when applying for additional resources.

audience: developer, technical lead

author: Billy Li

content_owner: Billy Li

sort_order: 6
---

# Managing resource quotas in Kubernetes: A complete guide 

Managing resources effectively in Kubernetes is essential for optimizing application performance and operational efficiency. This is especially important in multi-tenant environments where resources are shared. This guide explains the key concepts of CPU and memory management, highlights the importance of resource quotas, requests, and limits, and offers practical strategies for using resources efficiently.

## Understanding CPU requests and limits

### Definitions

- **CPU requests:** The guaranteed amount of CPU for a container in Kubernetes. It helps the scheduler place pods on nodes that have enough available CPU
- **CPU limits:** The maximum amount of CPU a container can use. If the container exceeds this limit, it is throttled by OpenShift and cannot exceed its allocated share of CPU. CPU limits are no longer required on BC Gov's OpenShift platform. It is best to avoid setting CPU limits or remove existing CPU limits. Avoiding CPU limits can offer improved performance in some situations. 

### Practical example

Let's consider two containers:
- Container **A** requests 0.5 CPU and has a limit of 1 CPU
- Container **B** requests 1 CPU and has a limit of 2 CPUs

When both containers run on a node with 2 CPUs, Kubernetes ensures:

- Container **A** gets at least 0.5 CPU but can use up to 1 CPU when more CPU time is available
- Container **B** is guaranteed 1 CPU and can use up to 2 CPUs

This setup stops Container **A** from running out of resources because of  Container **B**, keeping resource usage in balance.

### Relationship between CPU requests, limits, and quotas

Kubernetes controls CPU allocation by using limits and requests set within a `ResourceQuota` object. This objects specifies the maximum total CPU and memory resources that all pods in a namespace can request.

## Best practices for CPU and memory allocation

### Resource quota object

Resource quotas set the maximum total amount of resources that can be allocated to containers in your namespace. 

Example of defining a `ResourceQuota` for a namespace:
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: example-quota
  namespace: example-namespace
spec:
  hard:
    requests.cpu: "4"   # Total CPU requests for all pods.
    requests.memory: "8Gi"  # Total memory requests.
```
The total sum of resources `requests.cpu` and `requests.memory` for containers in your namespace can not exceed the thresholds defined in the quota. 

### Case studies

**Scenario: Resolving CPU over-provisioning**
A SaaS company noticed they weren't fully utilizing their allocated resources. They set up monitoring tools to study usage patterns and adjusted their ResourceQuota accordingly. This move significantly cut costs without affecting performance. In the BCGov context, resource quotas are adjusted via the [Platform Product Registry](https://registry.developer.gov.bc.ca/) and then automatically applied to OpenShift. 

**Scenario: Managing high demand applications**
An e-commerce platform faced performance issues during peak hours. They analyzed CPU and memory requests and limits, optimizing their deployment strategy as a result. This led to better response times and increased customer satisfaction.

### Monitoring resource utilization

- **Sysdig monitoring guide**: [Sysdig guidelines for SLI and monitoring](../app-monitoring/guidelines-for-sli-and-monitoring.md)
- **Utilization dashboard**: Review resource usage through the ** "Template - Resources Quota Approve Dashboard"** on Sysdig before submitting quota increase requests

## Identifying and managing resource slack

### Why managing slack is important

When resources are requested but not used, known as "slack," they remain unavailable to other teams or projects that could use them better. This can prevent new teams from joining the platform or force the organization to spend money on extra hardware unnecessarily. Managing slack ensures resources are allocated efficiently and cost-effectively, supporting overall operational effectiveness.

### How to spot waste (slack)

1. Access the OpenShift Web Console and navigate to your dev, test, or prod namespace
2. Click on the CPU utilization graph to view details
3. Expand the view to cover the last two weeks (2w) and focus on the gap between the blue line (requested CPU) and the yellow line (actual usage)
4. A significant gap indicates under-utilization of resources, commonly referred to as slack

### Best practices for CPU and memory allocation

- **Align CPU requests with usage:** Ensure the `request.cpu` does not exceed 1.6 times the actual usage. Over-allocating `request.cpu` will not necessarily resolve performance issues. It is best to set `request.cpu` to a conservatively low value that reflects the minimum needed for your container to run
- **Don't set CPU limits:** Don't use CPU Limits. OpenShift will allocate more resources when they are available on each node
- **Environment-specific provisioning:** Adjust resource allocations based on the specific requirements of dev, test, and prod environments
- **Put unused environments to sleep:** Deactivate environments that are no longer in use to conserve resources, or set resource quotas to 0 via the registry. 

## Recommended CPU utilization rates

- **Optimal utilization:** Aim for 60-80% utilization. Below 60% may indicate over-provisioning, and above 80% could risk performance issues.

## Analyzing and optimizing resource usage

### Querying resource metrics
Use Prometheus to extract resource usage metrics:
```
sum by (namespace) ({
  __name__=~"namespace_cpu:kube_pod_container_resource_requests:sum|namespace:container_cpu_usage:sum|namespace_cpu:kube_pod_container_resource_limits:sum",
  namespace=~"project-namespace-.*"
}) BY (__name__)

```

#### Understanding CPU throttling in multi-threaded applications

### What is CPU throttling?
CPU throttling, also known as CPU capping happens when a container tries to use more CPU resources than its allocated limit. It is best to avoid setting `limit.cpu` to avoid throttling.

**Symptoms and diagnosis**
CPU throttling happens when a container tries to use more CPU than its limit. Symptoms include:

* Frequent high CPU usage alerts
* Slower application performance, especially during high-load periods
  
To diagnose CPU throttling, use the following Prometheus query to check for throttled periods:

```
avg(container_cpu_cfs_throttled_periods_total / container_cpu_cfs_periods_total {namespace=~"fc726a-.*", pod=~".*", container_name!="POD", image!=""}) BY (namespace) 
```

```
avg(container_cpu_cfs_throttled_periods_total / container_cpu_cfs_periods_total {namespace=~"4a9599-prod", pod=~".*", container_name!="POD", image!=""} * 100) BY (pod) 
```

#### Managing CPU throttling

To manage CPU throttling effectively, it is essential to adjust both the application and Kubernetes settings:

* **Remove CPU limits**: If you previously set `limit.cpu` for your containers, remove it to improve performance.
* **Optimize application performance:** Improve the application code or configuration to reduce CPU demand. For multi-threaded applications, this might involve tuning thread pool settings or optimizing resource-intensive processes
* **Horizontal scaling:** Consider scaling out (adding more pods) rather than scaling up (adding more resources to a single pod) to distribute the load more effectively. (Not suitable for High Availability  databases)

## Conclusion

Monitoring and adjusting resources based on actual usage is crucial. Set your `request.cpu` values as low as you can while still allowing your containers to run. Don't use `limit.cpu` or remove these resources definitions if they'd been set up previously. 
