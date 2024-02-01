---
title: Platform automation

slug: platform-automation

description: Describes the automation we run on to manage the OpenShift platform.

keywords: resource, reclamation, tool, automation, security

page_purpose: Describes the automation we run on to manage the OpenShift platform.

audience: technical lead, developer

author: Matt Spencer, Steven Barre

content_owner: Olena Mitovska

sort_order: 6
---

# Platform Automation

We use some automation on the platform to help manage resource usage, alert about misconfigured objects and to encourage teams to use images that are secure and up to date. 

## Resource reclamation tool

To date, resource utilization (the use of CPU and RAM) on our platforms has not been efficient. For example, almost 50% of CPU capacity on the Silver cluster is reserved by apps, but not actually used. This unused utilization increases costs and impacts our ability to onboard new teams.  
 
To address this, we’ve developed an automated tool that monitors apps on the platform, looking for inactive or broken deployments. 

### Targets of this tool
 
The tool only monitors deployments in non-production namespaces (dev, test and tools) and there is no impact to production deployments (prod). 

The tool looks for two types of deployments: 
- Deployments that are crashing consistently 
- Deployments that have not changed in over a year

### Responding when deployments are scaled down by this tool

Before you simply scale your pods back up, you should consider fixing the underlying issues that placed your application in one of these two groups in the first place.

 If your application is crashing regularly, your technical team should investigate and fix the cause of these crashes. 
 
 If your application has not changed in over a year, your technical team should build a new image, which ensures that your application is able to take advantage of any security patches from the past year. 
 
 Maintaining your application is part of the [Memorandum of Understanding](https://digital.gov.bc.ca/cloud/services/private/onboard/#memorandum) that teams working on the platform agree to. 

Once you have fixed these issues, you can follow the instructions in [RedHat’s documentation on editing deployments](https://docs.openshift.com/container-platform/4.12/applications/deployments/deployment-strategies.html#odc-editing-deployments_rolling-strategy) to scale your applications back up again. 
 
Please be aware that if you scale your deployment back up without fixing the underlying issues, our automated process will scale the application back down again the following week.  

### Timeline 

**Silver cluster timeline**
- Starting December 5, the automation tool will run weekly on Tuesday mornings

**Gold and Emerald cluster timeline** 
- Implementation is planned for early 2024 

---
Related links:
- [RedHat’s documentation on editing deployments](https://docs.openshift.com/container-platform/4.12/applications/deployments/deployment-strategies.html#odc-editing-deployments_rolling-strategy)
---
