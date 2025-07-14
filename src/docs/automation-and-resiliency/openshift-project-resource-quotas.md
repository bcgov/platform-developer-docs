---
title: OpenShift project resource quotas

slug: openshift-project-resource-quotas

description: Lists the project quota levels for each type of resource on an OpenShift project set.

keywords: openshift, resources, resource quotas, RAM, CPU, storage, optimization, claims, project, quota

page_purpose: Lists the different levels users can have on their OpenShift project sets. The different resources available are CPU, memory, and storage.

audience: developer, technical lead

author: Jonathan Bond, Matt Spencer

content_owner: Luke Gonis

sort_order: 4
---
# OpenShift project resource quotas
Last updated: **January 29, 2025**

New project sets provisioned in **all clusters** of the BC Gov Private Cloud PaaS have the following default resource quotas that include a certain amount of CPU, RAM and storage:

- **CPU**: 0.5 cores of CPU request 
- **RAM**: 2 GB of memory request
- **Storage**: 60 PVC count , 1 GB overall storage with 521 MB for backup storage and five snapshots

**Note**: The Platform Services team may approach your team to discuss a downgrade in your quota if they find your application isn't using all of the resources within the current quota.

If the default allocations aren't sufficient for your application, [you can ask for a quota increase](../automation-and-resiliency/request-quota-adjustment-for-openshift-project-set/). You'll need a Sysdig dashboard that shows that your application needs more of a specific resource type (CPU, RAM or storage) in a specific namespace. Provide this proof to the Platform Services team before they can approve a quota increase that you submit in the [Platform Product Registry](https://registry.developer.gov.bc.ca/login).

## On this page
- [CPU quotas](#cpu-quotas)
- [Memory quotas](#memory-quotas)
- [Storage quotas](#storage-quotas)
- [Related pages](#related-pages)

## CPU request quotas

CPU request quotas can be set to the desired level via the [Platform Product Registry](https://registry.developer.gov.bc.ca/login).  All CPU requests quotas are shown in cores (not millicores) and represent the total **maximum** for the combined CPU request **all long-running pods in a namespace**. These quotas are managed by the object `compute-long-running-quota`

## Memory quotas

Memory request qutoas can be set to the desired level via the [Platform Product Registry](https://registry.developer.gov.bc.ca/login). All memory requests and limits are shown in GiB and represent the total **maximum** for the combined RAM request or RAM limit values for **all long-running pods in the namespace**. These quotas are managed by the object `compute-long-running-quota`. 

## Storage quotas
Storage quotas can be set to the desired level via the [Platform Product Registry](https://registry.developer.gov.bc.ca/login). All storage sizes are in GiB and represent the **maximum** for the combined storage for **all PVCs within the namespace**. All storage quotas allow for up to 60 persistent volume claims (PVCs).

## Short-running pods
Pods which are run once off as 'jobs, builds or deployers' have a seperate resource quota which called `compute-time-bound-quota`. 

## Best effort pods
Pods that have their requests and limits both set to 0 run only when resources are available. These too have a seperate quota called `compute-best-effort-quota`. This configuration should only be used for pods performing tasks which are not time sensitive. 


---
---

## Related pages
* [Request a quota increase for an OpenShift project set](../automation-and-resiliency/request-quota-increase-for-openshift-project-set.md)
* [Platform Product Registry](https://registry.developer.gov.bc.ca/)


