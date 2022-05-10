---
title: Request a quota increase for an OpenShift project set

slug: request-quota-increase-for-openshift-project-set

description: Describes the process to request more resource quota for an OpenShift project

keywords: openshift, resources, resource quotas, RAM, CPU, storage, optimization, claims, project

page_purpose: Discusses what a user needs to do to get the quota for a specific resource type increased on their OpenShift project set.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Cailey Jones
---
# Request a quota increase for an OpenShift project set

There are three different resource types on the platform:
- CPU
- Memory (RAM)
- Storage

Before asking for more quota for your project set, check if the application is fully using the resources and confirm that the usage is expected. Use the following information to help determine the level of resource the application needs:
- [Resource Management Guidelines](https://github.com/BCDevOps/developer-experience/blob/master/docs/ResourceManagementGuidelines.md)
- [Application Resource Tuning](https://github.com/BCDevOps/developer-experience/blob/master/docs/resource-tuning-recommendations.md)

## On this page
- [Set up resource monitoring with Sysdig Monitor](#setup-sysdig)
- [Request a quota increase](#request-increase)
- [Collect application metrics](#collect-metrics)

## Set up resource monitoring with Sysdig Monitor<a name="setup-sysdig"></a>

Use Sysdig to monitor your application. You can access dashboards that show your application memory, CPU and storage usage.

Before you ask for a quota increase, the Platform Services team wants you to monitor and collect metrics to show how much resource your application uses. For more information, see [Get Started with Sysdig Monitor](https://developer.gov.bc.ca/OpenShift-User-Guide-to-Creating-and-Using-a-Sysdig-Team-for-Monitoring). The documentation has all you need to onboard onto Sysdig and use the default dashboards. If you have any issues onboarding to Sysdig, contact the Platform Services team on the applicable [Rocket.Chat channel](https://chat.developer.gov.bc.ca/channel/devops-sysdig).

## Request a quota increase<a name="request-increase"></a>
**Note**: Before you request a quota increase, make sure that your project is using its resources efficiently. The Platform Services team wants to be very confident your project needs more quota before they grant an increase.

If you determine that your application needs a quota increase, you can have a product owner or technical lead on your project make the request on the **Project Edit** page on the [Platform Project Registry](https://registry.developer.gov.bc.ca/public-landing). The Platform Services team must approve the request before it's processed.

If you need more resources for CPU, RAM or storage in any of the four namespaces (`dev`, `test`, `tool` or `prod`), you must submit a standard quota increase request through the Platform Project Registry. For more information on quotas, see [OpenShift project resource quotas](./openshift-project-resource-quotas.md).

## Collect application metrics<a name="collect-metrics"></a>

The Platform Services team needs to know if your application is using the current quotas efficiently. If you're running out of quota, the team wants to review resource-consumption statistics. If you're preparing for an application load increase, the team wants to know the expected increase and how much growth room you still have.

Use the following process:
1. Collect details on what you've already tried to reduce the current resource consumption and the use cases for the quota increase.
2. Show the Platform Services team the resource monitors you have in the namespace. The team wants to know what level the resource consumption is in your application and how efficiently it's using resources.

  **Note**: You should collect data for at least a week or however long it takes to see a pattern. Consider each component in the namespace, whether it's a part of the application or DevOps tools.

3. Use the following guidelines, depending on the resource type:

  **CPU or RAM quota increase**

  If you're requesting a CPU or memory quota increase, collect the average from each replica pod. Present the Sysdig dashboard to show more accurate figures. Use the following example:

  | Component name | Description (Optional) | # of Replicas (and range if using auto scaler) | Resource Requested | Resource Limit | Average Consumption | Spikes |
  |----------------|------------------------|------------------------------------------------|--------------------|----------------|---------------------|--------|
  | Rocket.Chat app | platform chat app | 3 (HPA min 3 max 5) | 1 core CPU | 1.5 cores CPU | 1 core | 1.4 cores |

  **Storage quota increase**

  If you're requesting a storage quota increase, list all the persistent volume claims (PVCs) that you have and the components that are mounting the volume. Together with the Sysdig dashboard, this shows past usage metrics. Use the following example:

  | Component name | Description (Optional) | PVC type | PVC size | Storage Utilization |
  |----------------|------------------------|----------|----------|---------------------|
  | Rocket.Chat DB patroni statefulset | to store persistent data | netapp-file-standard | 5Gi | 80% |

4. Compare the current resource utilization and compare it with the quota. Explain how much more quota you need and why. Include the following:
  - Current quota in the project set
  - Total CPU, memory or storage currently used
  - Expected quota increase amount with a detailed allocation plan
5. Email the request to the Platform Services team at [PlatformServicesTeam@gov.bc.ca](PlatformServicesTeam@gov.bc.ca). Make sure you provide the Sysdig dashboard and ask to book a meeting.

  If you need to store a large amount of unstructured data, consider using the [S3 Object Storage Service](https://github.com/BCDevOps/OpenShift4-Migration/issues/59) provided by Enterprise Hosting.

Once the quota increase request is approved, the specified namespaces are upgraded to the next quota size.

---
Related links:
* [Resource Management Guidelines](https://github.com/BCDevOps/developer-experience/blob/master/docs/ResourceManagementGuidelines.md)
* [Application Resource Tuning](https://github.com/BCDevOps/developer-experience/blob/master/docs/resource-tuning-recommendations.md)
* [Get Started with Sysdig Monitoring](https://developer.gov.bc.ca/OpenShift-User-Guide-to-Creating-and-Using-a-Sysdig-Team-for-Monitoring)
* [devops-sysdig RocketChat channel](https://chat.developer.gov.bc.ca/channel/devops-sysdig)
* [Openshift 4 Project Registry](https://registry.developer.gov.bc.ca/public-landing)
* [OpenShift project resource quotas](./openshift-project-resource-quotas.md)
* [S3 Object Storage Service](https://github.com/BCDevOps/OpenShift4-Migration/issues/59)

Rewrite sources:
* https://github.com/BCDevOps/developer-experience/blob/master/docs/resourceTuning/request-for-quota-increase.md
---
