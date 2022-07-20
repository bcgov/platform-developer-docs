---
title: Sysdig Monitoring Guildline for shared services and apps

slug: sysdig-monitor-setup

description: Default monitoring standards that will be applied to all our services and apps.

keywords: sysdig, sysdig monitor, SLI , monitoring, openshift monitoring, developer guide, team guide, team, configure

page_purpose: Documented monitoring metrics and monitoring tools that will describe the approach to monitoring and alerting that will be applied to all platform shared services and apps.

audience: developer, technical lead

author: Billy Li

content_owner: Billy Li

sort_order: 2
---

# Why
We need monitor the rate of errors happening across the entire system but also at the individual service level. Whether those errors are based on manually defined logic or they’re explicit errors such as failed HTTP requests, as long as we can detect them early, we can then better meet our SLO and reduce application down time.


The four golden signals of SRE are latency, traffic, errors, and saturation. SRE’s golden signals define what it means for the system to be “healthy.”  And our monitoring standard will be build based on those four aspect.

# Resources monitoring with Sysdig(Saturation)


The saturation is a high-level overview of the utilization of the system. How much more capacity does the service have? When is the service maxed out? Because most systems begin to degrade before utilization hits 100%, we also need to determine a benchmark for a “healthy” percentage of utilization. What level of saturation ensures service performance and availability for user?