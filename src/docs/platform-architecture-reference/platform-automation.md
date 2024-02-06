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
Last updated: **February 5, 2024**
We use some automation on the platform to help manage resource usage, alert about misconfigured objects and to encourage teams to use images that are secure and up to date. 

Historically, application teams working on our platform have not efficiently utilized resources such as CPU and RAM. For instance, apps reserve almost 50% of CPU capacity on the Silver cluster without actually using it. This unused utilization increases costs and impacts our ability to onboard new teams. Additionally, some teams neglect to maintain and update their deployment images, leading to security vulnerabilities, incompatibilities, and other problems.

To address this, we’ve developed automated tools that monitor apps on the platform. 
 
These tools looks for these types of objects: 
- `Deployments` and `deploymentconfigs` that are based on images have not changed in over a year
- `Deployments`, `deploymentconfigs` and `statefulsets` that are crashing constantly 

Emails are sent to the Product Owner and Technical Leads registered for the Product in the [Product Registry](https://registry.developer.gov.bc.ca/). To modify the recipients of the emails, please update the contact information in the Registry.

## Deployments and deploymentconfigs that have not changed in a year 
The tool monitors the `lastUpdateTime` of the `Progressing` block within the `status` field of the Deployment or DeploymentConfig. If this timestamp is approaching one year but has not yet exceeded it, a warning email is triggered. In the case of deployments managed by ArgoCD, an email requests action since ArgoCD may scale it back up after the tool has scaled it down. For deployments not managed by ArgoCD and with a timestamp surpassing one year, the tool scales down the replicas to zero and sends an email notification.

You can check the timestamp on your deployment in the YAML under `status`.
 
 ```yaml
   conditions:
  - lastTransitionTime: "2021-11-25T17:04:01Z"
    lastUpdateTime: "2021-11-25T17:04:11Z"
    message: replication controller "backup-postgresql-1" successfully rolled out
    reason: NewReplicationControllerAvailable
    status: "True"
    type: Progressing
  ```

## Deployments, deploymentconfigs and statefulsets that are crashing constantly

The tool examines the restart count of pods, triggering a response if a pod has surpassed 100 restarts. It then identifies the controlling object of the pod, whether it's a Deployment, DeploymentConfig, or StatefulSet. In cases where the object is managed by ArgoCD, a warning email is generated, prompting necessary action, as ArgoCD may scale it back up after the tool has scaled it down. If the object is not managed by ArgoCD and the restart count exceeds 100, the tool scales down the replicas to zero and sends an email notification.

## Responding when deployments are scaled down by these tools

Before you scale your pods back up, make sure to fix the underlying issues that caused your application to end up in one of these two groups initially.

 If your application is crashing regularly, your technical team should investigate and fix the cause of these crashes. You can see the number of times your pod has restarted in the web console or via `oc get pods` to get an idea of if it is crashing a lot.
 
If your application hasn't been updated in over a year, your technical team should create a new image. This ensures that your application can benefit from any security patches released in the past year. It's highly probable that your image has critical security vulnerabilities if it hasn't been updated for more than a year.
 
 Maintaining your application is part of the [Memorandum of Understanding](https://digital.gov.bc.ca/cloud/services/private/onboard/#memorandum) that teams working on the platform agree to. More detailed docs on [maintaining an image](https://docs.developer.gov.bc.ca/maintain-an-application/#maintain-images) are also available.

Once you have fixed these issues, you can follow the instructions in [RedHat’s documentation on editing deployments](https://docs.openshift.com/container-platform/4.12/applications/deployments/deployment-strategies.html#odc-editing-deployments_rolling-strategy) to scale your applications back up again. 
 
Be aware that if you scale your deployment back up without addressing the underlying issues, our automated process will scale the application back down again the following week.

## Timeline 

**Silver cluster timeline**
- Beginning January 23, 2024 these automated tools will run every Tuesday morning

**Gold and Emerald cluster timeline** 
- Implementation is planned for early 2024 

---
## Related pages
- [RedHat’s documentation on editing deployments](https://docs.openshift.com/container-platform/4.12/applications/deployments/deployment-strategies.html#odc-editing-deployments_rolling-strategy)
- [Memorandum of Understanding](https://digital.gov.bc.ca/cloud/services/private/onboard/#memorandum)
- [Maintaining an image](https://docs.developer.gov.bc.ca/maintain-an-application/#maintain-images)
---
