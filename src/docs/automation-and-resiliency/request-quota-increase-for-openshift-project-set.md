---
title: Request a quota increase for an OpenShift project set

slug: request-quota-increase-for-openshift-project-set

description: Describes the process to request more resource quota for an OpenShift project

keywords: openshift, resources, resource quotas, RAM, CPU, storage, optimization, claims, project

page_purpose: Discusses what a user needs to do to get the quota for a specific resource type increased on their OpenShift project set.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Cailey Jones

sort_order: 5
---
# Request a quota increase for an OpenShift project set
Last updated: **December 6, 2023**

There are three different resource types on the platform:
- CPU
- Memory (RAM)
- Storage

Before asking for more quota for your project set, check if the application is fully using the resources and confirm that the usage is expected. Use the following information to help determine the level of resource the application needs:

- [Resource management guidelines](https://github.com/BCDevOps/developer-experience/blob/master/docs/ResourceManagementGuidelines.md)
- [Application resource tuning](../automation-and-resiliency/application-resource-tuning.md)

## On this page
* **[Request a quota increase for an OpenShift project set](#request-a-quota-increase-for-an-openshift-project-set)**
* **[Set up resource monitoring with Sysdig Monitor](#set-up-resource-monitoring-with-sysdig-monitor)**
* **[Request a quota increase](#request-a-quota-increase)**
* **[Collect application metrics](#collect-application-metrics)**
* **[Related pages](#related-pages)**

## Set up resource monitoring with Sysdig Monitor

Utilize Sysdig to monitor your application, accessing dashboards that display memory, CPU, and storage usage. 

Before requesting a quota increase, it's crucial to monitor and collect metrics illustrating your application's resource utilization. If you haven't already, check out the comprehensive guide on onboarding to application monitoring with Sysdig. Visit [Onboarding to application monitoring with Sysdig](../app-monitoring/sysdig-monitor-onboarding.md) for a step-by-step instructions for onboarding onto Sysdig and utilizing default dashboards to gain insights into your application's performance. For The documentation has all you need to onboard onto Sysdig and use the default dashboards.

If you have successfully onboarded to Sysdig, we provide a dedicated document outlining the specific metrics and evidence needed when applying for additional resources. This document serves as a guide to assist you in compiling the necessary data effectively. Make sure to gather comprehensive information on resource consumption, covering CPU and memory usage, along with any other relevant metrics specific to your application. For more details on the required metrics and evidence, check the [resource monitoring dashboards](/resource-monitoring-dashboards/) guide page.

 If you have any issues onboarding to Sysdig, contact the Platform Services team on the applicable [Rocket.Chat channel](https://chat.developer.gov.bc.ca/channel/devops-sysdig).

## Request a quota increase
Before you request a quota increase, make sure that your project is using its resources efficiently. The Platform Services team wants to be very confident your project needs more quota before they grant an increase.

If you determine that your application needs a quota increase, you can have a product owner or technical lead on your project make the request on the **Project Edit** page on the [Platform Project Registry](https://registry.developer.gov.bc.ca/public-landing). The Platform Services team must approve the request before it's processed.

If you need more resources for CPU, RAM or storage in any of the four namespaces (`dev`, `test`, `tool` or `prod`), you must submit a standard quota increase request through the Platform Project Registry. For more information on quotas, see [OpenShift project resource quotas](../automation-and-resiliency/openshift-project-resource-quotas.md).

## Collect application metrics

The Platform Services team needs to know if your application is using the current quotas efficiently. If you're running out of quota, the team wants to review resource-consumption statistics. If you're preparing for an application load increase, the team wants to know the expected increase and how much growth room you still have.

Follow this process:

1. Document what you've attempted to reduce current resource consumption and outline the use cases for the quota increase
2. Present the resource monitors within your namespace to the Platform Services team. They are interested in understanding the level of resource consumption in your application and how efficiently it utilizes resources
3. Sysdig offers a pre-built dashboard template designed to visualize and analyze metrics in your OpenShift project. To simplify the process of requesting a quota increase, consider utilizing the Sysdig dashboard template. Instructions can be found in [here](../app-monitoring/sysdig-monitor-create-monitoring-dashboards.md)

   You should collect data for at least a week or however long it takes to see a pattern. Consider each component in the namespace, whether it's a part of the application or DevOps tools.

4. Use the following guidelines, depending on the resource type:

  **CPU or RAM quota increase**

  If you're requesting a CPU or memory quota increase, collect the average from each replica pod. Present the Sysdig dashboard to show more accurate figures. Use the following example:

  | Component name | Description (Optional) | # of Replicas (and range if using auto scaler) | Resource Requested | Resource Limit | Average Consumption | Spikes |
  |----------------|------------------------|------------------------------------------------|--------------------|----------------|---------------------|--------|
  | Rocket.Chat app | platform chat app | 3 (HPA min 3 max 5) | 1 core CPU | 1.5 cores CPU | 1 core | 1.4 cores |

  **Storage quota increase**

  If you're requesting a storage quota increase, list all the persistent volume claims (PVCs) that you have and the components that are mounting the volume. Together with the Sysdig dashboard, this shows past usage metrics. Use the following example:

  | Component name | Description (Optional) | PVC type | PVC size | Storage Utilization |
  |----------------|------------------------|----------|----------|---------------------|
  | Rocket.Chat DB patroni statefulset | to store persistent data | netapp-file-standard | 5GiB | 80% |

5. Compare the current resource utilization and compare it with the quota. Explain how much more quota you need and why. Include the following:
  - Current quota in the project set
  - Total CPU, memory or storage currently used
  - Expected quota increase amount with a detailed allocation plan

6. Email the request to the Platform Services team at [PlatformServicesTeam@gov.bc.ca](mailto:PlatformServicesTeam@gov.bc.ca). Make sure you provide the Sysdig dashboard and ask to book a meeting.

If you need to store a large amount of unstructured data, consider using the [S3 Object Storage Service](https://github.com/BCDevOps/OpenShift4-Migration/issues/59) provided by Enterprise Hosting.

Once the quota increase request is approved, the specified namespaces are upgraded to the next quota size.

---
## Related pages

* [Resource Management Guidelines](https://github.com/BCDevOps/developer-experience/blob/master/docs/ResourceManagementGuidelines.md)
* [Application Resource Tuning](https://github.com/BCDevOps/developer-experience/blob/master/docs/resource-tuning-recommendations.md)
* [Get Started with Sysdig Monitoring](../app-monitoring/sysdig-monitor-onboarding.md)
* [devops-sysdig RocketChat channel](https://chat.developer.gov.bc.ca/channel/devops-sysdig)
* [OpenShift 4 Project Registry](https://registry.developer.gov.bc.ca/public-landing)
* [OpenShift project resource quotas](../automation-and-resiliency/openshift-project-resource-quotas.md)
* [S3 Object Storage Service](https://github.com/BCDevOps/OpenShift4-Migration/issues/59)


