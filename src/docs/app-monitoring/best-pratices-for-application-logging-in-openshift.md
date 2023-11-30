---
title: Best practices for application logging in OpenShift 

slug: best-practices-for-application-logging-in-openshift 

description: document explains best practices for logging within the OpenShift environment and the use of console logs in Kibana as well as log long term retention and best security practices 

keywords: logging, app logging, openshift logging, kibana logging, logs, console logs

page_purpose: help developers consider best practices for logging in OpenShift 

audience: developer, technical lead, OpenShift users, OpenShift developers

author: Cailey Jones, Steven Barre

content_owner: Olena Mitovska

sort_order: 8
---
# Best practices for application logging in OpenShift 
Last updated: **November 28, 2023**

This guide delves into accessing and querying logs in Kibana, highlighting best practices for efficient log storage. You will also be able to know  how to secure your container logs and gain insights into the intricacies of using logfiles for long-term retention. 

It emphasizes key considerations, including the secure use of shared resources, proactive measures against potential attacks, and the importance of tailored log retention strategies. Whether you're accessing Kibana with OpenShift credentials or fine-tuning log security, this document provides actionable insights for effective log management in your OpenShift environment.

## On this page
* **[How to include effective logging practices in your code](#how-to-include-effective-logging-practices-in-your-code)**
* **[Console logs in Kibana](#console-logs-in-kibana)**
* **[Managing logfiles and long-term log retention](#managing-logfiles-and-long-term-retention)**
* **[Logging and security](#logging-and-security)**
* **[Related pages](#related-pages)**

---
## How to include effective logging practices in your code

Most of this document will be about logging in Openshift. If you’re looking for general logging best practices while developing your application, here are some helpful resources:


* [Heroku Dev Center - Writing best practices for application logs](https://devcenter.heroku.com/articles/writing-best-practices-for-application-logs)
* [NewRelic - logging best practices](https://newrelic.com/blog/best-practices/best-log-management-practices)
* [DataSet - the 10 commandments of logging](https://www.dataset.com/blog/the-10-commandments-of-logging/)
* [Splunk - logging best practices](https://dev.splunk.com/enterprise/docs/developapps/addsupport/logging/loggingbestpractices/)


## Console logs in Kibana
In OpenShift, you can easily access application console logs through the web console or the OpenShift CLI. These logs are accessible as long as the container is running, but keep in mind that restarting the container erases logs from its previous instance.

Pods might restart to relocate from one node to another, causing logs to vanish from OpenShift unexpectedly. Stay aware that logs are tied to the container's lifecycle, and a container restart means a fresh log slate.

Kibana serves as a centralized tool that gathers log messages, known as "console logs," from the standard output and standard error streams of your application. It covers all pods running on the OpenShift platform, preserving these logs for approximately 14 days. While the retention period may vary slightly, any adjustment will not exceed 24 hours.

Should your team require log storage beyond the 14-day window, it's your responsibility to implement a solution. The Platform Team recommends leveraging the [OCIO Object Storage service](../platform-architecture-reference/platform-storage.md) for efficient log storage. For additional details, refer to the next section on logs and long-term log retention.

### Accessing Kibana with OpenShift credentials
To access Kibana, use your OpenShift credentials. If you can view a pod's console logs in the OpenShift web console, you can seamlessly access the same pod's logs in Kibana. A minimal setup in Kibana is required for log viewing and querying, especially if you're new to Kibana.

For detailed instructions on this setup process, refer to our OCP101 lab section [covering logging and visualizations](https://github.com/BCDevOps/devops-platform-workshops/blob/master/101-lab/content/12_logging_and_visualizations.md). This will guide you through the necessary steps to make the most of Kibana's features.

### Querying logs effectively on Kibana

Kibana empowers you to perform targeted log queries across various fields such as log message, time, and container name. This flexibility extends to querying logs across multiple containers and pods, simplifying the search for specific messages within a deployment or stateful set.

It's crucial to remember that Kibana operates as a shared service, and the storage it utilizes is a communal resource for all platform users. Exercise caution when utilizing log levels like DEBUG in production environments.

 In instances where your application generates an exceptionally high volume of logs, the Platform Team may reach out to address and resolve the issue. Efficient use of shared resources ensures a smoother experience for everyone on the platform.

## Managing logfiles and long-term retention

Your application logs don't have to be confined to standard output; they can also be directed to logfiles. Logfiles, usually text files, find a home on a local storage volume. Due to their nature of being written to disk, logfiles default to long-term retention. However, accessing and swiftly reading them during troubleshooting can be challenging.

Typically, logfiles are the go-to for storing logs in specific cases rather than for everyday troubleshooting or maintenance tasks. For instance, audit logs often end up in logfiles. While logfiles are great for keeping logs around for a while, they're chosen carefully due to the challenge of quick and easy access.

Once your logs find a home in a logfile on disk, they could stick around indefinitely. But, beware! Holding onto logfiles forever could lead to a significant space crunch over time. To avoid this, it's crucial to trim your logfiles, bidding farewell to the oldest ones when they're no longer needed. When deciding on a timeframe for logfile retention, consider what logs your team might require for troubleshooting or auditing purposes, and adhere to any policy or legal requirements for log retention.

The Platform Team suggests using a cronjob to automatically clear out old logfiles on a regular schedule. 

Now, if you're wondering about retaining logs sent to standard output, in short: Keep sending them there. It makes logs easy to read and ensures compatibility with Kibana's querying functionality. However, if you want to retain this data beyond Kibana's realm or use your own Kibana instance with custom retention rules, a team on our OpenShift Platform has got your back. Check out their documentation for a [handy template to deploy your own EFK stack](https://github.com/bcgov/elmsd-nodejs/tree/main/packages/openshift/templates/efk-stack) in your namespace. It's a great resource for diving deeper into log management.

## Logging and security
When dealing with container logs, remember that anyone with View permissions in your namespace can access them. It's crucial to exercise caution in revealing too much detail or sensitive information in these logs. Additionally, keep in mind that logs are transmitted in plaintext to both Kibana and SIEM systems. Avoid including confidential data like passwords, private keys, or Personally Identifiable Information (PII). 

For added security, log the connections to and from your application. This aids in auditing potential compromises down the line. Since web connections into your pods display the source IP of the Router pods, ensure you also extract the X-Forwarded-For header and log that IP. 

OpenShift adds an X-Forwarded-For header to your app in the HTTP protocol, containing the client IP connected to your web server. Logging this IP is preferred over the default source IP in your logs, as the source IP is just the OpenShift router.

If you're maintaining log files, establish proper permissions to restrict access to only authorized individuals. Additionally, regularly back up these files to the OCIO Object Store. This practice helps preserve them in case of an attack attempting to delete local logs. It's a proactive step to ensure the integrity and availability of your logs.

---
## Related pages
* [Logging and visualizations - OpenShift 101 ](https://github.com/BCDevOps/devops-platform-workshops/blob/master/101-lab/content/12_logging_and_visualizations.md)
* [Template to deploy your own EFK stack](https://github.com/bcgov/elmsd-nodejs/tree/main/packages/openshift/templates/efk-stack)
* [Heroku Dev Center - Writing best practices for application logs](https://devcenter.heroku.com/articles/writing-best-practices-for-application-logs)
* [NewRelic - logging best practices](https://newrelic.com/blog/best-practices/best-log-management-practices)
* [DataSet - the 10 commandments of logging](https://www.dataset.com/blog/the-10-commandments-of-logging/)
* [Splunk - logging best practices](https://dev.splunk.com/enterprise/docs/developapps/addsupport/logging/loggingbestpractices/)
