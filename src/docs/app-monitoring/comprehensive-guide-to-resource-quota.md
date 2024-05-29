---
title: Comprehensive Guide to Resource Quota Management in Kubernetes

slug: Comprehensive-Guide-to-Resource-Quota-Management-in-Kubernetes

description: The specific metrics and evidence required when applying for additional resources.

keywords: monitoring, openshift monitoring, developer guide, configure, request resource, prometheus, prom, promql, metrics, metric type, servicemonitor, observe

page_purpose: Introduction for the specific metrics and evidence required when applying for additional resources.

audience: developer, technical lead

author: Billy Li

content_owner: Billy Li

sort_order: 6
---

# Comprehensive Guide to Resource Quota Management in Kubernetes

## Introduction
Effective resource management in Kubernetes is crucial for optimizing application performance and operational efficiency, especially in multi-tenant environments where resource competition can occur. This guide explores key concepts in CPU and memory management, details the importance of resource quotas, requests, and limits, and provides practical strategies for achieving optimal resource utilization.

## Understanding CPU Requests and Limits

### Definitions
- **CPU Requests:** The amount of CPU that Kubernetes guarantees to a container. It influences the scheduler's decisions by placing pods on nodes with sufficient available CPU.
- **CPU Limits:** The maximum CPU a container is allowed to use. If this limit is exceeded, the container experiences CPU throttling, which restricts it from using more than its allocated share.

### Practical Example
Imagine two containers:
- Container A requests 0.5 CPU and has a limit of 1 CPU.
- Container B requests 1 CPU and has a limit of 2 CPUs.

If both containers run on a node with 2 CPUs, Kubernetes ensures:
- Container A gets at least 0.5 CPU but can burst up to 1 CPU when additional CPU time is available.
- Container B is guaranteed 1 CPU and can use up to 2 CPUs.

This setup prevents Container A from being starved by Container B, maintaining a balanced resource usage.

### Relationship Between CPU Requests, Limits, and Quotas
Kubernetes manages CPU allocation using limits and requests defined within a `ResourceQuota` object, which specifies the maximum total CPU and memory resources that can be requested by all pods in a namespace.

## Best Practices for CPU and Memory Allocation

### Resource Quota Object
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
    limits.cpu: "6"     # Total CPU limits for all pods.
    requests.memory: "8Gi"  # Total memory requests.
    limits.memory: "16Gi"   # Total memory limits.

```
### Case Studies
**Scenario: Resolving CPU Over-Provisioning**
A SaaS company noticed frequent underutilization of allocated resources. They implemented monitoring tools to analyze usage patterns and adjusted their ResourceQuota to better match actual needs, significantly reducing costs without impacting performance.

**Scenario: Managing High Demand Applications**
An e-commerce platform experienced performance degradation during peak times. By analyzing the CPU and memory requests and limits, they optimized their deployment strategy, resulting in improved response times and customer satisfaction.


### Monitoring Resource Utilization
- **Sysdig Monitoring Guide**: S[ysdig Guidelines for SLI and Monitoring](https://developer.gov.bc.ca/docs/default/component/platform-developer-docs/docs/app-monitoring/guidelines-for-sli-and-monitoring/)
- **Utilization Dashboard**: Review resource usage through the "Resources Quota Approve Dashboard" on Sysdig before submitting quota increase requests.

## Identifying and Managing Resource Slack

### Why Managing Slack is Important
When resources are requested but not utilized, known as "slack," they are unavailable to other teams or projects that could use them effectively. This can limit new teams from onboarding onto the platform or force the organization to unnecessarily invest in additional hardware. Managing slack ensures that resources are allocated efficiently and cost-effectively, supporting overall operational effectiveness.

### How to Spot Waste (Slack)
1. Access the OpenShift Web Console and navigate to your dev, test, or prod namespace.
2. Click on the CPU utilization graph to view details.
3. Expand the view to cover the last two weeks (2w) and focus on the gap between the blue line (requested CPU) and the yellow line (actual usage).
4. A significant gap indicates under-utilization of resources, commonly referred to as slack.

### Best Practices for CPU and Memory Allocation
- **Align CPU Requests with Usage:** Ensure the `request.cpu` does not exceed 1.6 times the actual usage, and use `limit.cpu` to accommodate occasional spikes.
- **Focus on CPU Limits for Performance:** Only the `limit.cpu` setting impacts performance directly. Over-allocating `request.cpu` will not necessarily resolve performance issues.
- **Environment-Specific Provisioning:** Adjust resource allocations based on the specific requirements of dev, test, and prod environments.
- **Put Unused Environments to Sleep:** Deactivate environments that are no longer in use to conserve resources.
- **Differentiate Between Request and Limit Values:** Keep `limit.cpu` higher than `request.cpu` to manage unexpected spikes and performance issues.

## Recommended CPU Utilization Rates
- **Optimal Utilization:** Aim for 60-80% utilization. Below 60% may indicate over-provisioning, and above 80% could risk performance issues.

## Analyzing and Optimizing Resource Usage
### Querying Resource Metrics
Use Prometheus to extract resource usage metrics:
```
sum by (namespace) ({
  __name__=~"namespace_cpu:kube_pod_container_resource_requests:sum|namespace:container_cpu_usage:sum|namespace_cpu:kube_pod_container_resource_limits:sum",
  namespace=~"project-namespace-.*"
}) BY (__name__)

```

#### Understanding CPU Throttling in Multi-Threaded Applications

### What is CPU Throttling?
CPU throttling, also known as CPU capping, occurs when a container attempts to use more CPU resources than its allocated limit. This mechanism prevents a single pod from using excessive CPU resources, which could degrade performance for other pods on the same node.

**Symptoms and Diagnosis**
CPU throttling occurs when a container attempts to use more CPU than its limit. Symptoms include:

* Frequent high CPU usage alerts.
* Performance degradation in applications, especially during high-load periods.
  
To diagnose CPU throttling, use the following Prometheus query to check for throttled periods:

```
avg(container_cpu_cfs_throttled_periods_total / container_cpu_cfs_periods_total {namespace=~"fc726a-.*", pod=~".*", container_name!="POD", image!=""}) BY (namespace) 
```

```
avg(container_cpu_cfs_throttled_periods_total / container_cpu_cfs_periods_total {namespace=~"4a9599-prod", pod=~".*", container_name!="POD", image!=""} * 100) BY (pod) 
```

#### Managing CPU Throttling
To manage CPU throttling effectively, it is essential to adjust both the application and Kubernetes settings:

* **Increase CPU Limits**: Adjust the CPU limits appropriately if consistent throttling is observed and justified by application performance needs.
* **Optimize Application Performance:** Enhance application code or configuration to reduce CPU demand. For multi-threaded applications, this might include tuning thread pool settings or optimizing resource-intensive processes.
* **Horizontal Scaling:** Consider scaling out (adding more pods) rather than scaling up (adding more resources to a single pod) to distribute the load more effectively.(Not suit for HA DB)

## Conclusion
Monitoring and adjusting resources based on actual usage are crucial. While monitoring both usage/limits and usage/requests provides insights, focusing on usage relative to limits is generally recommended for understanding resource efficiency more precisely. This approach ensures optimal application performance without unnecessary resource expenditure.