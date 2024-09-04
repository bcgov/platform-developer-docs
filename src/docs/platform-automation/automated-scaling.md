---
title: Automated Scale-Down

slug: automated-scaling

description: Describes the automation we run to scale down crashing and old apps.

keywords: resource, reclamation, tool, automation, security

page_purpose: Describes the automation we run to scale down crashing and old apps.

audience: technical lead, developer

author: Matt Spencer, Steven Barre

content_owner: Olena Mitovska

sort_order: 2
---

# Automated Scale-Down
Last updated: **February 28, 2024**

In the past, teams using our platform haven't used CPU and RAM efficiently. For example, apps on the Silver cluster reserve nearly 50% of CPU capacity without using it. This unused capacity raises costs and hampers our ability to bring in new teams. Also, some teams forget to upkeep and update their deployment images, causing security issues, incompatibilities, and other issues.

To tackle this, we've created automated tools to keep an eye on apps on the platform.

Our tools specifically check for:

- `Deployments` and `deploymentconfigs` relying on images that haven't been updated in more than a year
- Constantly crashing `Deployments`, `deploymentconfigs`, and `statefulsets`

Emails are sent to the Product Owner and Technical Leads registered for the Product in the [Product Registry](https://registry.developer.gov.bc.ca/). To modify the recipients of the emails, please update the contact information in the Registry.


## On this page
* **[Deployments that have not changed in a year](#deployments-that-have-not-changed-in-a-year)**
* **[Deployments and statefulsets that are crashing constantly](#deployments-and-statefulsets-that-are-crashing-constantly)**
* **[Responding when deployments are scaled down by these tools](#responding-when-deployments-are-scaled-down-by-these-tools)**
* **[Timeline](#timeline)**
* **[Related pages](#related-pages)**

---

## Deployments that have not changed in a year

The tool monitors the `lastUpdateTime` in the `Progressing` section of the `status` field in Deployment. If this timestamp is nearing one year but hasn't crossed that threshold, it triggers a warning email. For deployments handled by ArgoCD, an email prompts action since ArgoCD might scale it back up after the tool has scaled it down. For deployments not managed by ArgoCD and with a timestamp exceeding one year, the tool scales down the replicas to zero and sends an email notification.

You can verify the timestamp on your deployment in the YAML under `status`. It's essential to note that the tool specifically checks the `Processing` type condition. Other conditions, such as `Available`, don't indicate updates in the pods but merely track the last time pods were restarted.

```yaml
conditions:
  - lastTransitionTime: "2021-11-25T17:04:01Z"
    lastUpdateTime: "2021-11-25T17:04:11Z"
    message: replication controller "backup-postgresql-1" successfully rolled out
    reason: NewReplicationControllerAvailable
    status: "True"
    type: Progressing
```

## Deployments and statefulsets that are crashing constantly

The tool reviews the restart count of pods and initiates a response if a pod has exceeded 100 restarts. It identifies the controlling object, whether it's a Deployment or StatefulSet. If the object is managed by ArgoCD, a warning email is generated, urging necessary action since ArgoCD might scale it back up after the tool has scaled it down. 

In cases where the object is not managed by ArgoCD and the restart count surpasses 100, the tool scales down the replicas to zero and sends an email notification.

## Responding when deployments are scaled down by these tools

Before you scale your pods back up, make sure to fix the underlying issues that caused your application to end up in one of these two groups initially.

 If your application is crashing regularly, your technical team should investigate and fix the cause of these crashes. You can see the number of times your pod has restarted in the web console or via `oc get pods` to get an idea of if it is crashing a lot.

If your application hasn't been updated in over a year, your technical team should create a new image. This ensures that your application can benefit from any security patches released in the past year. It's highly probable that your image has critical security vulnerabilities if it hasn't been updated for more than a year.

 Maintaining your application is part of the [Memorandum of Understanding](https://digital.gov.bc.ca/cloud/services/private/onboard/#memorandum) that teams working on the platform agree to. More detailed docs on [maintaining an image](../build-deploy-and-maintain-apps/maintain-an-application.md#maintain-images) are also available.

Once you have fixed these issues, you can follow the instructions in [RedHat’s documentation on editing deployments](https://docs.openshift.com/container-platform/4.12/applications/deployments/deployment-strategies.html#odc-editing-deployments_rolling-strategy) to scale your applications back up again.

Be aware that if you scale your deployment back up without addressing the underlying issues, our automated process will scale the application back down again the following week.

## Timeline

**Silver cluster timeline**

- Beginning January 23, 2024 these automated tools will run every Tuesday morning.

**Gold and Emerald cluster timeline**

- As of February 6, 2024 these scripts have not been implemented in the Gold and Emerald clusters. Implementation is planned for early 2024, and will be announced in the [devops-alerts Rocket.Chat channel](https://chat.developer.gov.bc.ca/channel/devops-alerts).

---
---

## Related pages

- [RedHat’s documentation on editing deployments](https://docs.openshift.com/container-platform/4.12/applications/deployments/deployment-strategies.html#odc-editing-deployments_rolling-strategy)
- [Memorandum of Understanding](https://digital.gov.bc.ca/cloud/services/private/onboard/#memorandum)
- [Maintaining an image](../build-deploy-and-maintain-apps/maintain-an-application.md#maintain-images)

