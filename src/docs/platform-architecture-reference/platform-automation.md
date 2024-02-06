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

To date, resource utilization (the use of CPU and RAM) on our platforms has not been efficient. For example, almost 50% of CPU capacity on the Silver cluster is reserved by apps, but not actually used. This unused utilization increases costs and impacts our ability to onboard new teams.  Sometimes teams do not maintain and update the images that their deployments are based on. This can lead to security vulnerabilities, incompatibilities and other problems  
 
To address this, we’ve developed automated tools that monitor apps on the platform. 
 
These tools looks for these types of objects: 
- `Deployments` and `deploymentconfigs` that are based on images have not changed in over a year
- `Deployments`, `deploymentconfigs` and `statefulsets` that are crashing constantly 

Emails are sent to the Product Owner and Technical Leads registered for the Product in the [Product Registry](https://registry.developer.gov.bc.ca/). To modify the recipients of the emails, please update the contact information in the Registry.

## Deployments and deploymentconfigs that have not changed in a year 

This tool checks the `lastUpdateTime` of the `Progressing` block in the `status` field of the Deployment or DeploymentConfig. If it is close to a year old, but not over, a warning email will be sent. If the deployment is managed by ArgoCD then a warning email is sent asking for action to be taken. This is because ArgoCD will just scale it back up after the tool scaled it down. If not managed by ArgoCD and the timestamp is over a year then the deployment is scaled to zero replicas and an email is sent.

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

This tool looks at the restart count of pods. If a pod has more than 100 restarts it looks for the controlling object of the pod, be it a Deployment, DeploymentConfig, or StatefulSet. If the object is managed by ArgoCD then a warning email is sent asking for action to be taken. This is because ArgoCD will just scale it back up after the tool scaled it down. If not managed by ArgoCD, the object is scaled to zero replicas and an email is sent.

## Responding when deployments are scaled down by these tools

Before you simply scale your pods back up, you should consider fixing the underlying issues that placed your application in one of these two groups in the first place.

 If your application is crashing regularly, your technical team should investigate and fix the cause of these crashes. You can see the number of times your pod has restarted in the web console or via `oc get pods` to get an idea of if it is crashing a lot.
 
 If your application has not changed in over a year, your technical team should build a new image, which ensures that your application is able to take advantage of any security patches from the past year. It is highly likely your image contains Critical security vulnerabilities if it has not been updated in over a year.
 
 Maintaining your application is part of the [Memorandum of Understanding](https://digital.gov.bc.ca/cloud/services/private/onboard/#memorandum) that teams working on the platform agree to. More detailed docs on [maintaining an image](https://docs.developer.gov.bc.ca/maintain-an-application/#maintain-images) are also available.

Once you have fixed these issues, you can follow the instructions in [RedHat’s documentation on editing deployments](https://docs.openshift.com/container-platform/4.12/applications/deployments/deployment-strategies.html#odc-editing-deployments_rolling-strategy) to scale your applications back up again. 
 
Be aware that if you scale your deployment back up without addressing the underlying issues, our automated process will scale the application back down again the following week.

## Timeline 

**Silver cluster timeline**
- Starting January 23, these automated tools will run weekly on Tuesday mornings

**Gold and Emerald cluster timeline** 
- Implementation is planned for early 2024 

---
## Related pages
- [RedHat’s documentation on editing deployments](https://docs.openshift.com/container-platform/4.12/applications/deployments/deployment-strategies.html#odc-editing-deployments_rolling-strategy)
- [Memorandum of Understanding](https://digital.gov.bc.ca/cloud/services/private/onboard/#memorandum)
- [Maintaining an image](https://docs.developer.gov.bc.ca/maintain-an-application/#maintain-images)
---
