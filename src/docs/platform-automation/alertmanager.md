---
title: AlertManager

slug: alertmanager

description: Describes the per namespace AlertManager configuration.

keywords: alert, prometheus, tool, automation, security

page_purpose: Describes the per namespace AlertManager configuration.

audience: technical lead, developer

author: Matt Spencer, Steven Barre

content_owner: Olena Mitovska

sort_order: 3
---

# AlertManager

Last updated: **February 26, 2024**

To help product teams be more aware about the health of their applications some basic monitoring and alerting has been added to the OpenShift clusters. This will send alerts to the contacts listed in the Product Registry to alert them to a few common issues their apps may experience.

## Alert Contacts

Alert emails come from `CLUSTER AlertManager <PlatformServicesTeam@gov.bc.ca>` where CLUSTER is the name of the cluster generating the alert; eg: `GOLD`.

All alerts are sent to the Tech Leads for the Product. Critical level alerts in the `-prod` namespace are also sent to the Product Owner.

## Frequency

Critical level alerts are re-sent every 48 hours if they remain unresolved. Warning and Info level alerts are re-sent every 5 days if they remain unresolved.

Alerts are only fired after 1 hour of the condition existing to reduce sending alerts while changes are being made.

## Alerts

| **Name** | **Severity** | **Description** |
|---|---|---|
| KubePodCrashLooping | Critical | Pod is stuck in a CrashLoop |
| KubePodNotReady | Critical | Pod is not passing its Readyness probe |
| KubeDeploymentReplicasMismatch | Warning | Deployment has the wrong number of replicas |
| KubeDeploymentGenerationMismatch | Warning | Indicates that the Deployment has failed but has not been rolled back |
| KubeStatefulSetReplicasMismatch | Warning | StatefulSet has the wrong number of replicas |
| KubeStatefulSetGenerationMismatch | Warning | Indicates that the StatefulSet has failed but has not been rolled back |
| KubeStatefulSetUpdateNotRolledOut | Warning | StatefulSet update has not been rolled out |
| KubeContainerWaiting | Critical | Container has been in a waiting state for too long |
| KubeJobNotCompleted | Warning | Job has taken more than 12 hours to complete |
| KubeJobFailed | Warning | Job has failed |
| KubeHpaReplicasMismatch | Warning | HPA does not matched the desired number of replicas, often a quota issue |
| KubeHpaMaxedOut | Warning | HPA is running at max replicas |
| KubePodNotScheduled | Critical | Pod cannot be scheduled to a node |
| KubeQuotaAlmostFull | Info | Quota is 90% used |
| KubeQuotaFullyUsed | Info | Quota is 100% used |
| KubeQuotaExceeded | Warning | Quota is over 100% used |
| KubePersistentVolumeUnbound | Warning | PVC is not bound to a PV |
| KubePersistentVolumeFillingUp | Warning | PVC is 97% full |
| KubePersistentVolumeFillingUp | Warning | PVC is predicted to be full in 4 days |
| KubePersistentVolumeInodesFillingUp | Warning | PVC is running out of free inodes |
| KubePersistentVolumeInodesFillingUp | Warning | PVC is predicted to run out of inodes in 4 days |
| PodDisruptionBudgetAtLimit | Warning | The pod disruption budget is at the minimum disruptions allowed level. The number of current healthy pods is equal to the desired healthy pods. |
| PodDisruptionBudgetLimit | Critical | The pod disruption budget is below the minimum disruptions allowed level and is not satisfied. The number of current healthy pods is less than the desired healthy pods. |

## View in web console

In the **Developer** perspective, select **Observe** -> **<project_name>** -> **Alerts**. In this perspective, alerts, silences, and alerting rules are all managed from the **Alerts** page. The results shown in the **Alerts** page are specific to the selected project.

## Objects

There is a `AlertManagerConfig` object named `platform-services-controlled-alert-routing` that controls who the emails are sent to. No changes to this are possible.

There is a `PrometheusRule` object named `platform-services-controlled-alert-rules` that specifies each of the alert rules and their conditions. No changes to this are possible.

If you wish, you can create additional `PrometheusRule` objects that will be sent to the existing contacts.

## Timeline

**Gold and Gold DR cluster timeline**

- Beginning August 28, 2023 these alerts are sent out to Product Owners and Tech Leads.

**Silver and Emerald cluster timeline**

- Implementation is planned for early 2024, and will be announced in the [devops-alerts rocketchat channel](https://chat.developer.gov.bc.ca/channel/devops-alerts).

---

## Related pages

- [RedHat’s documentation on Managing Alerts](https://docs.openshift.com/container-platform/4.13/monitoring/managing-alerts.html)

---
