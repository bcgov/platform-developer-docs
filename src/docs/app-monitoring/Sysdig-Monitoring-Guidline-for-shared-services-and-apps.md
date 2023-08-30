---
title: SRE Guideline for Platform Shared Services

slug: Sysdig-monitor-setup

description: Service Golden Signal - monitoring standards and best practices that will be applied to Platform Shared Services.

keywords: SRE, Sysdig, Sysdig monitor, SLI, monitoring, OpenShift monitoring, developer guide, team guide, team, configure

page_purpose: Documented monitoring metrics and monitoring tools that will describe the approach to monitoring and alerting that will be applied to all platform-shared services and apps.

audience: developer, technical lead

author: Billy Li

content_owner: Billy Li

sort_order: 2
---

## Intro

SRE, which stands for Site Reliability Engineering, has become an important concept to ensure an application's reliability by quickly returning the system to a steady state. Software can be used as a tool to gain full visibility into the health of an application or system, allowing us to identify and resolve issues before they impact stakeholders.

In this document, we will explore the basic concept of SRE and demonstrate how to set it up using the Registry application as an example.


#### BC Platform Services Product Registry(Regsitry)
The registry is an application where teams can submit requests for provisioning namespaces in OpenShift 4 (OCP4) clusters. The registry allows teams to:

- Request the creation of a project namespace in disered clusters;
- Update project contact details, resources quota and other metadata;
- Request other resources access such as ACS, Vault, and Artifactory repositories; 
- Have project sets managed and overseen by the platform services team and AG

The tech stack for the registry comprises a React front-end, a Node.js backend, a MongoDB database, and an automation tool named "Provisioner."
![Registry Flow Chart](../../images/registry-app-structure.png) 

### Setting up SRE
The scope of SRE encompasses the deployment, configuration, and monitoring of the app. It also covers the availability, latency, change management, emergency response, and capacity management of services in production. To ensure optimal performance and reliability, we use several tools and methodologies that align with SRE principles.


#### SLA
The client should be at the center of every aspect of your customer agreement. An incident may need fixing ten different issues on the back end. But from the client's perspective, the only thing that matters is that the system works as it should, and facts should be reflected in your SLAs and SLOs. Be sure to limit your promises to high-level, user-facing functionality, and always use plain language in SLAs. Based on this, we can come up with some SLA for the Registry:

* Normal users can successfully load the Registry dashboard within 5 seconds.
* Admin user can successfully load Registry dashboard within 13 seconds.
* An approved product request can be provisioned within an hour.
* Application is up online 99% of the time.
* Update product requests can be processed within an hour.


#### SLO 
The definition of s SLO is a service level objective: a target value or range of values for a service level that is measured by an SLI. Google has a really [good doc](https://sre.google/workbook/implementing-slos/#:~:text=For%20example%2C%20if%20you%20have,50%25%20of%20the%20error%20budget.) for how to gets the start. I will also covers a bit more for how to calculate Error Budge in the End of this documentation.

what you want to promise your customers is deciding how reliable you want your service to depend on what your customers expect. For example, if your SLA states that your customers will receive a response to each request they make in 300 milliseconds, then perhaps your SLO should state that the response will be returned in 200 milliseconds. Choosing an appropriate SLO is hard. Once we have SLA that we know can make our users happy, SLO is like the bottom line of our promise. Therefore, it is in our best interest to catch an issue before it beaches our SLA so that you have time to fix it. And this promise often comes up with consequences if we break it. Again, I will use the Registry as an example and the period is for each month:


* Retrieving all products information on dashboard should be less than 5 sec. 
* Retrieving 30 products information on dashboard should be less than 2 sec. 
* Web, API, and DB should be up 99.5% of the time
* DB should have a backup every 30 min)
* Automation jobs for OCP Project Set change requests jobs can be completed within 40 mins

The reason for breaking those objects or booking maintenance windows needs to be announced in [#internal-devops-registry](https://chat.developer.gov.bc.ca/group/internal-devops-registry). 

**The frequency of backups** (e.g., every 30 minutes) relates directly to a system's Recovery Point Objective (RPO), which is a key metric in disaster recovery and business continuity planning. **RPO** defines the maximum acceptable amount of data loss measured in time. It answers the question: "How much data can we afford to lose before it impacts business operations?". The reason that I setit up for 30 mins is becuase of the unique of Registry app. Registry will "Backup" most of its important data in github repos, and the time for provisioner to process each request is normally less than 30 minutes. 

**Why is this Important?**
Determining an appropriate RPO is crucial for business continuity planning. If data is lost:

* *With a 30-minute RPO*: The team can restore data up to the point of the last backup, which would be a maximum of 30 minutes prior to the incident.
* *Without a defined RPO (or with infrequent backups)*: The team risks significant data loss, which could have severe business implications, from financial losses to reputational damage.

A backup every 30 minutes matches an RPO of 30 minutes. This would be suitable for systems where up to 30 minutes of data loss is acceptable in the event of a disaster. Determining the right RPO (and thus backup frequency) should be based on business needs and the potential impact of data loss.

#### SLIs

SLI golden signals include request latency, availability, error rate, and system throughput. Those matrices define what it means for the system to be “healthy”. and Understanding the relationship and distinction between SLIs,SLOs, and SLAs is crucial.

While there are numerous methods to quantify an SLI, each offers its unique advantages and limitations. These methods are often referred to as SLI Implementations. To illustrate, let's consider the metric of page-loading time. This SLI could be implemented through various means, such as:

* Utilizing the latency field within the application server's request log.
* Leveraging metrics provided directly by the application server.
* Extracting metrics from a load balancer positioned ahead of the application servers.
* Deploying a black-box monitoring service that  tests how long our system takes to respond.
* Using code in the user's web browser that tells us how fast the page loaded for them.

The registry has the following monitoring standards built based on those four aspects.

**1.Dashboard Load Time for Normal Users:**
  * **SLI**: 99.8% of the product entries retrieved from the registry will be accurate and up-to-date.
  * **Reason**: Accurate data is vital for users and systems relying on the registry. Ensuring the highest data accuracy minimizes errors and ensures trust in the system.
  
**2.Response Time for Data Retrieval::**
  * **SLI**: 99.5% of data retrieval requests from the registry will be completed in less than 500ms.
  * **Reason**: Users expect a snappy response when querying the registry. A fast retrieval ensures user satisfaction and efficient downstream operations.


**3.Dashboard Load Time for Normal Users:**
  * **SLI**: 98% of approved product provisioning requests will be successfully processed without errors.
  * **Reason**:  Users rely on the system to provision products seamlessly. A high success rate ensures the reliability of the registry's provisioning functionality.

and etc.

**Performance Monitoring Tools:** Tools like Prometheus, Grafana, or New Relic can be used to continuously monitor and visualize system performance metrics, including response times.

**Logging**: Ensure that the Application system logs the time taken for each data retrieval request. Analyze these logs periodically or use log aggregation tools like ELK Stack (Kibana, Logstash, and etc) to get insights.

**Threshold Alerts**: Set up alerts to notify system administrators or engineers when response times exceed the threshold.

As for the Registry, Sysdig and Uptime.com are tools that I use to get SLI metrics and setup Alert.

### Resources monitoring with Sysdig (Saturation)

The saturation is a high-level overview of the utilization of the system. How much more capacity does the service have? When is the service maxed out? Because most systems begin to degrade before utilization hits 100%, we also need to determine a benchmark for a “healthy” percentage of utilization. What level of saturation ensures service performance and availability for the user?

We monitor resources from CPU, ram, and storage.

#### Using PromQL

The Prometheus Query Language (PromQL) is the standard for querying Prometheus metric data. PromQL is designed to allow the user to select and aggregate time-series data. And building a dashboard in Sysdig is heavily reliant on PromQL. The PromQL language is documented at [Prometheus Query Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/). To start monitroing with Sysdig, please read [this documentation.](https://docs.developer.gov.bc.ca/sysdig-monitor-setup-team/)


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

Ideally, the SLI directly measures a service level of interest, but sometimes only a proxy is available because the desired measure may be hard to obtain or interpret. In our case, client-side latency is often the more user-relevant metric, but it might only be possible to measure latency at the server. Therefore Amount of time to service requests is the metric that we do care about, and we can get that value easily by just getting the **Max** value of `sysdig_connection_net_request_time`(The number of average times to serve a network request.) And set up an alert based on your SLI and SLO. Normally `lower bound` ≤ `SLI` ≤ `upper bound`. 

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
If we see a high error number, we would be expecting that there may exist a logic bug or API/DB connection error. We do want to achieve 99.95% availability, thus, if the rate is at 5%, Sysdig will need to send notifications.



 It’s also important to define which errors are critical and which ones are less dangerous. This can help teams identify the true health of service in the eyes of a customer and take rapid action to fix frequent errors.

## Importance of Monitoring and Alerting in SRE

Site Reliability Engineering (SRE) emphasizes the significance of maintaining and improving the reliability, availability, and performance of applications and systems. At the heart of this discipline lies a crucial component: **monitoring and alerting**.

Monitoring provides a window into the health and performance of a system in real-time. By continuously observing system metrics and logs, we can gain insights into how the system behaves under various conditions and loads. This data is invaluable not just for identifying issues but also for proactive performance tuning and capacity planning.

Alerting, on the other hand, is the mechanism that notifies relevant stakeholders when something goes awry. Effective alerting ensures that potential issues are flagged and addressed promptly, often before users even notice. In the SRE world, quick response times can make the difference between a minor hiccup and a major outage.

Together, monitoring and alerting form a feedback loop, enabling teams to maintain high service levels and meet their Service Level Objectives (SLOs). As we delve deeper into tools like "Uptime.com" and concepts like "Runbook", it's essential to remember the foundational role that monitoring and alerting play in ensuring the reliability and resilience of our systems.

### Sysdig dashboard
One thing that I recommended to start with, is to leverage what someone has already built. We can always use dashboard template that been pre-build by Sysdig dashboard team. And here is a [demo video](https://www.youtube.com/watch?v=K4rkSCSq3C4&list=PL9CV_8JBQHiorxwU-2nA8aqM4KTzdCnfg) for how to set it up.
![Sysdig dashboard Flow Chart](../../images/Sysdig-built-in-dashboard.png)

In the dashboard library, you can find dashboards tailored for different purposes. If you wish to edit a dashboard, select it, then click on the __Copy to My Dashboards__ button at the top right to make it your own and modify the queries as needed. If you find a particular dashboard useful, you can click on the __Star__ button in the top right corner. This will save it to your favorites, allowing you to access it quickly in the future.

![Markdown Flow Chart](../../images/favorite-dashboard.png)

### Uptime.com

#### Uptime.com: A Brief Overview

[Uptime.com](https://www.uptime.com/) is a comprehensive website monitoring platform. It provides real-time insights into your website's availability, performance, and functionality. By continuously checking websites from multiple locations around the globe, Uptime.com ensures that end-users have the best possible experience.

Key features of Uptime.com include:

- **Availability Monitoring**: Checks if your site is accessible and notifies you immediately if it detects any downtime.
- **Performance Monitoring**: Measures site speed, helping identify bottlenecks that could impact user experience.
- **Domain Health Check**: Monitors SSL certificates, domain expirations, and more to ensure the health and security of your domain.
- **Transactional Tests**: Simulates user paths and interactions on your site, ensuring critical processes like logins or shopping cart checkouts work flawlessly.

By integrating tools like Uptime.com into the SRE toolkit, teams can proactively address issues, ensuring optimal user experience and meeting established Service Level Objectives (SLOs).

We can set up a transactional test for the registry. This test continually loads the dashboard page to ensure all components are successfully loaded. Uptime.com provides insights into the uptime and downtime of your application and can display the percentage of uptime over a specified period. Additionally, it can send out notifications, enabling us to respond promptly.




#### Runbook

Achieving 99.5% uptime means we can only afford 7m 12s of downtime per day. This is where RunBooks come in handy. In SRE, the goal is to automate as many processes as possible. Within the context of cloud operations, Runbooks are lists of actions executed by SREs to fulfill specific tasks. These tasks can range from incident responses, cost management, clearing performance hurdles, and more.

##### Runbook for Incident Response

One of the primary responsibilities of SREs is incident response. What steps might an SRE take during an outage? Here's a typical sequence:

1. Trigger
2. Troubleshooting
3. Root cause analysis
4. Fix

Runbooks can have embedded logic (like if-else statements and loops) and other functionalities apart from just being a list of actions. For instance, they can include features like waiting for a resource. Essentially, a Runbook provides instructions on the actions to take or the processes for an automated system to follow when an SLO is breached. This ensures we don't violate our SLA.

For a simple example: 

- When there are a few requests to the database that fail or timeout:
  - Execute a command in our backup-container to save the current data in our database.
  - Allocate more resources to the primary service.

- When the dashboard load time nears our SLO:
  - Scale up and terminate the old pod.
  - Notify the development team to assess the network status.

For more insights on automation runbooks, refer to this [source](https://www.xenonstack.com/insights/automation-runbook-for-sre). We are also introducing [runwhen](https://www.runwhen.com/) on our platform to aid in this automation process.

### How to Calculate Error Budget
**Calculate the Error Budget:**
```
Error Budget=1−SLO
```
For the example above where the SLO is 95%, the error budget would be:
```
Error Budget=1−0.95=0.05 or 5%
```
This means that the service can be "unreliable" or "down" for 5% of the time without violating the SLO.

For more infomation, I highly recommend reading this [documentation](https://www.atlassian.com/incident-management/kpis/error-budget).


## Wrapping Up and What's Next

We've gone through a bunch of important stuff about Site Reliability Engineering (SRE) in this doc. From diving deep into monitoring to setting up tools like Uptime.com and crafting those handy Runbooks, it's all geared towards making sure our systems stay up and running smoothly.

**Quick Recap**:
- **Monitoring**: It's not just about keeping an eye on things; it's our first line of defense against issues. The sooner we spot something, the quicker we can jump on it.
- **Alerts**: When something does go sideways, getting a heads-up ASAP makes all the difference. That's where tools like Uptime.com come into play.
- **Tools & Tricks**: Speaking of tools, they're not just fancy add-ons. They're essential pieces of the puzzle that help us get the job done right.

**Moving Forward**:
1. **Play Around with the Tools**: If you haven't yet, get your hands dirty with the tools we talked about. You'll get a better feel for how they fit into the bigger picture.
2. **Feedback? Bring It On**: If you try something out and it works (or doesn't), let me know on Rocketchat and we can figure it out to. The more we share, the better we get.
3. **Stay in the Loop**: SRE's a fast-moving field. Keep an eye out for updates, new tools, and fresh techniques.
4. **Team Up**: Got a question? Stuck on something? Reach out. We're all in this together, and two heads are often better than one.

