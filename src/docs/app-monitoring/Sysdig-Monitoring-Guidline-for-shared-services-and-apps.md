---
title: title: SRE Guideline for Platform Shared Services

slug: Sysdig-monitor-setup

description: Service Golden Signal - monitoring standards and best practices that will be applied to Platform Shared Services.

keywords: SRE, Sysdig, Sysdig monitor, SLI, monitoring, OpenShift monitoring, developer guide, team guide, team, configure

page_purpose: Documented monitoring metrics and monitoring tools that will describe the approach to monitoring and alerting that will be applied to all platform shared services and apps.

audience: developer, technical lead

author: Billy Li

content_owner: Billy Li

sort_order: 2
---

## Intro

SRE stand for Site Reliability Engineering, it becomes an important concept to ensure applications' reliability by getting system back to steadystate as quick. We can use software as tools to gain full visibility into application/system's health, and being able to identify and solve the issue before it affect application's stakeholder. 


In this documentation, we will go through basica concept of SRE and setup a SRE for Registry application as an example.



#### Registry
Registry is an application where teams can submit requests for provisioning namespaces in OpenShift 4 (OCP4) clusters, as well as perform other tasks such as:

* Update project contact details and other metadata;
* Request their project namespace set be created additional clusters;
* Request other resources be provisioned such as KeyCloak realms or Artifactory pull-through repositories.
 managed by platform services team


For more details of what is Registry app and how it works can be found in [here](https://github.com/bcgov/platform-services-registry/blob/master/docs/Whole-project-workflow.md).

### Setting up SRE
The scope of SRE includes the deployment, configuration, and monitoring of app, as well as the availability, latency, change management, emergency response, and capacity management of services in production. We use several essential tools: `SLO, SLA and SLI` in SRE planning and practice, you can find google's definnation for those terms in [here](https://cloud.google.com/blog/products/devops-sre/sre-fundamentals-slis-slas-and-slos). And to identify those is always the first step. 
I will Use Registry as an example to walk through this process.

#### SLA
The client should be at the centre of every aspect of your customer agreement. An incident may need fixing ten different issues on the back end. But from the client's perspective, the only thing that matters is that the system works as it should, and facts should be reflected in your SLAs and SLOs. Be sure to limit your promises to the high-level, user-facing functionality, and always use plain language in SLAs. Based on this, we can comeup some SLA for Registry:

* Normal user can  successfully load Registry dashboard within 5 seconds.
* Admin user can  successfully load Registry dashboard within 13 seconds.
* An approved product request can be provisioned within an hour.
* Application is up online 99% of the time.
* Update product request can be processed within an hour.


#### SLO 
The defination of s SLO is: a service level objective: a target value or range of values for a service level that is measured by an SLI. Google have a really [good doc](https://sre.google/workbook/implementing-slos/#:~:text=For%20example%2C%20if%20you%20have,50%25%20of%20the%20error%20budget.) for how to gets start.
what do you want to promise your customers is deciding how reliable you want your service to be depends on what your customers expect. For exapmle if your SLA states that your customers will receive a response to each request they make in 300 milliseconds, then perhaps your SLO should state that the response will be returned in 200 milliseconds. Choosing an appropriate SLO is hard. Once we have SLA that we know can make our user happy, SLO is like the botton line of our promise. Therefore, it is in our best interest to catch an issue before it breaches our SLA so that you have time to fix it. And this promise often comes up with consequences if we breake it. Again, I will use Registry as an exapmle and the time period is for each month:


* Retriving all products information from db should be less than 8 sec. 
* Retriving 30 products information from db should be less than 2 sec. 
* Web, API, and DB should be up 99.5% of the time
* DB should have backup every 30 mins
* Provisioner jobs can be completed within 40 mins


The reason of breaking those objects or booking a maintance windows need to be annanced  in [#internal-devops-registry](https://chat.developer.gov.bc.ca/group/internal-devops-registry). 

#### SLIs

SLI golden signals include request latency, availability, error rate, and system throughput. Those matrices define what it means for the system to be “healthy”. 

Registry has those following monitoring standards be built based on those four aspects.

* Number of successful HTTP requests / total HTTP requests (success rate) should be greater than 99.99%
* The response time per request should be less than 300ms
* Web and API resources utilization (used/request) should be less than 80%


Sysdig and Uptime.com are some tools that I use to get SLI metrices for Registry

### Resources monitoring with Sysdig (Saturation)

The saturation is a high-level overview of the utilization of the system. How much more capacity does the service have? When is the service maxed out? Because most systems begin to degrade before utilization hits 100%, we also need to determine a benchmark for a “healthy” percentage of utilization. What level of saturation ensures service performance and availability for the user?

We monitor resources from CPU, ram, and storage.

#### Using PromQL

The Prometheus Query Language (PromQL) is the standard for querying Prometheus metric data. PromQL is designed to allow the user to select and aggregate time-series data. And building a dashboard in Sysdig is heavily reliant on PromQL. The PromQL language is documented at [Prometheus Query Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/).

### Team Scope

#### CPU:

Get application CPU usage by using:
```
avg(avg_over_time(sysdig_container_cpu_cores_used{$__scope,kube_pod_label_app= "<YOUR_APP_LABEL_NAME>", kube_statefulset_label_app = '<YOUR_APP_LABEL_NAME>'}[$__interval]))
```
Get application requested CPU  by using:
```
avg(avg_over_time(kube_pod_sysdig_resource_requests_cpu_cores{$__scope, kube_pod_label_app= "<YOUR_APP_LABEL_NAME>", kube_statefulset_label_app = '<YOUR_APP_LABEL_NAME>'}[$__interval]))
```


We can learn how many resources the application is using vs how much it requested, and get resource utilization based on that. CPU Used vs Requested(Utilization) where it the percentage between `sysdig_container_cpu_cores_used` and `kube_pod_sysdig_resource_requests_cpu_cores`. 


```
sum(last_over_time(sysdig_container_cpu_cores_used{kube_cluster_name=~$Cluster,kube_namespace_name=~$Namespace, kube_deployment_label_app = "<YOUR_APP_LABEL_NAME>"}[$__interval])) / (sum(last_over_time(kube_pod_sysdig_resource_requests_cpu_cores{kube_cluster_name=~$Cluster,kube_namespace_name=~$Namespace, kube_deployment_label_app = "<YOUR_APP_LABEL_NAME>"}[$__interval])) ) * 100
```

CPU Used vs Limited(Threshold) where is the percentage between `sysdig_container_cpu_cores_used` and `kube_pod_sysdig_resource_limits_cpu_cores`. We can learn how much more resources are available for the application
```
sum(last_over_time(sysdig_container_cpu_cores_used{kube_cluster_name=~$Cluster,kube_namespace_name=~$Namespace}[$__interval])) / (sum(last_over_time(kube_pod_sysdig_resource_limits_cpu_cores{kube_cluster_name=~$Cluster,kube_namespace_name=~$Namespace}[$__interval])) ) * 100
```

For Utilization, we would like to achieve as much high as possible. However, 80% or above is not always achievable, but we will try our best while making sure the application meets other SLO.

As for the Limitations aspect for namespaces, we can set up an alert so that when it's 80%, it will send a Rocket Chat message to notify us to give it more resources as it almost runs out. we can then give it more resources or do a Horizontal auto-scale depending on the situation.
```
sum(last_over_time(sysdig_container_cpu_cores_used{kube_cluster_name=~"silver",kube_namespace_name=~"platform-registry-prod"}[10s])) / (sum(last_over_time(kube_pod_sysdig_resource_limits_cpu_cores{kube_cluster_name=~"silver",kube_namespace_name=~"platform-registry-prod"}[10s])) ) > 0.8
```



#### Memory

Similar to CPU, RAM monitoring will also focus on Limitations and Utilization.

Application Memory Usage can be get by query:
```
avg(avg_over_time(sysdig_container_memory_used_bytes{$__scope, kube_pod_label_app= "<YOUR_APP_LABEL_NAME>", kube_statefulset_label_app = '<YOUR_APP_LABEL_NAME>'}[$__interval]))
```

Application requested Memory can be retrieved by query: 

```
avg(avg_over_time(kube_pod_sysdig_resource_requests_memory_bytes{$__scope, kube_pod_label_app= "<YOUR_APP_LABEL_NAME>", kube_statefulset_label_app = '<YOUR_APP_LABEL_NAME>'}[$__interval]))
```
Utilization will be calculated by the `sysdig_container_memory_used_bytes`/`kube_resourcequota_sysdig_requests_memory_used`, to achieve 80% or above is still desired.
```
sum(last_over_time(sysdig_container_memory_used_bytes{kube_cluster_name=~$Cluster,kube_namespace_name=~$Namespace, kube_pod_label_app= "<YOUR_APP_LABEL_NAME>", kube_statefulset_label_app = '<YOUR_APP_LABEL_NAME>'}[$__interval])) / (sum(last_over_time(kube_pod_sysdig_resource_requests_memory_bytes{kube_cluster_name=~$Cluster,kube_namespace_name=~$Namespace, kube_pod_label_app= "<YOUR_APP_LABEL_NAME>", kube_statefulset_label_app = '<YOUR_APP_LABEL_NAME>'}[$__interval]))) * 100
```

Threhold for the namespace will be the ration between `sysdig_container_memory_used_bytes` and `kube_pod_sysdig_resource_limits_memory_bytes`

```
sum(last_over_time(sysdig_container_memory_used_bytes{kube_cluster_name=~$Cluster,kube_namespace_name=~$Namespace}[$__interval])) / (sum(last_over_time(kube_pod_sysdig_resource_limits_memory_bytes{kube_cluster_name=~$Cluster,kube_namespace_name=~$Namespace}[$__interval]))) * 100
```


#### Latency
Most services consider request latency—how long it takes to return a response to a request—as a key SLI. Other common SLIs include the error rate, often expressed as a fraction of all requests received, and system throughput, typically measured in requests per second. The measurements are often aggregated: i.e., raw data is collected over a measurement window and then turned into a rate, average, or percentile.

Define a benchmark for “good” latency rates. Then, monitor the latency of successful requests against failed requests to keep track of health. Tracking latency across the entire system can help identify which services are not performing well and allows teams to detect incidents faster. The latency of errors can help improve the speed at which teams identify an incident – meaning they can dive into incident response faster.

Ideally, the SLI directly measures a service level of interest, but sometimes only a proxy is available because the desired measure may be hard to obtain or interpret. In our case, client-side latency is often the more user-relevant metric, but it might only be possible to measure latency at the server. Therefore Amount of time to service requests is the metric that we do care about, and we can get that value easily by just getting the **Max** value of `sysdig_connection_net_request_time`(The number of average time to serve a network request.) And set up an alert based on your SLI and SLO. Normally `lower bound` ≤ `SLI` ≤ `upper bound`. 

So for example, We do want to keep our response time within 3 seconds as our SLO upper boundary. We will set our sysdig_connection_net_request_time SLO at any request that takes longer than 5 sec to be served and will trigger a notification (increase more quota or refine algorithms ).

#### Traffic Monitoring

It’s a good idea to add metrics or metric labels that allow the dashboards to break down served traffic by status code (unless the metrics your service uses for SLI purposes already include this information). Here are some recommendations:

* For HTTP traffic, monitor all response codes, even if they don’t provide enough signal for alerting, because some can be triggered by incorrect client behavior.
* If you apply rate limits or quota limits to your users, monitor aggregates of how many requests were denied due to lack of quota.

Therefore, we will build our monitoring on 
* Number of HTTP Requests
```
Using sysdig_connection_net_request_count to monitor The total number of network requests per second. Note, this value may exceed the sum of inbound and outbound requests because this count includes requests over internal connections. So you might want to select explicitly your application API pod with the label.
```
* Number of Sessions : 
```
Using sysdig_connection_net_connection_total_count to monitor the avg/max open session for the application
```
* Transactions Speed
```
Using sysdig_connection_net_total_bytes to monitor the upload and download speed of the application.
```


#### Errors:

We need to monitor the rate of errors happening across the entire system but also at the individual service level. Whether those errors are based on manually defined logic or they’re explicit errors such as failed HTTP requests, as long as we can detect them early, we can then better meet our SLO and reduce application downtime.

The rate of Failed Requests is very important, The number of errors encountered by network system calls, such as connect(), send(), and recv() at a specified time by using 
```
sum(rate(sysdig_container_net_http_error_count))
```
If we see a high error number, we would be expecting that there may exist a logic bug or api/DB connection error. We do want to achieve 99.95% availability, thus, if the rate is at 5%, Sysdig will need to send notifications.



 It’s also important to define which errors are critical and which ones are less dangerous. This can help teams identify the true health of service in the eyes of a customer and take rapid action to fix frequent errors.


### Uptime.com

I also set up a transactional test for registry, this will keep loading the dashboard page and make sure components are successfully loaded. 
Uptime.com is able to provide the uptime/downtime of your application and the percentage of the uptime for a period of time. And it can also send out notification to us so we can take reactions.

#### Runbook
To achieve 99.5% of the uptime, means that we only allows to have 7m 12s of downtime perday. And this is where RunBooks come to help. 
In SRE, we want to automate things as much as possible. Runbooks in the context of cloud operations are a list of actions executed by SREs to complete a particular task. These jobs could involve responding to incidents, managing costs, clearing performance obstacles and more. 


##### Runbook for Incident Response
One of the regular responsibilities of SREs is incident response. What steps might an SRE take to address the outage? 
1. Trigger
2. Troubleshooting
3. Root cause analysis
4. Fix

Runbooks can incorporate logic (such as if-else statements and loops) and other features in addition to being merely a list of actions (e.g. wait for a resource). It is a instruction tells us or automation system when SLO gets break, what should we do to bring system back to normal so we don't break our SLA. 

For simple example: 
* When couple of the request to db failed/timeout happens one or two times: 
  - we want to run a command in our backup-container to backup whatever we currently have in our db.
  - give primary more quota

*  when dashboard load time approch to our SLO
 - we want to scale up and kill the old pod.
 - report to dev team to check network status

Here's some [reference](https://www.xenonstack.com/insights/automation-runbook-for-sre) for automation runbook. Also we are introducing [runwhen](https://www.runwhen.com/) on our platform to help you automated this process. 

