---
title: OpenShift project resource quotas

slug: openshift-project-resource-quotas

description: Lists the project quota levels for each type of resource on an OpenShift project set.

keywords: openshift, resources, resource quotas, RAM, CPU, storage, optimization, claims, project, quota

page_purpose: Lists the different levels users can have on their OpenShift project sets. The different resources available are CPU, memory, and storage.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Olena Mitovska

sort_order: 4
---
# OpenShift project resource quotas

New project sets provisioned in **all clusters** of the BC Gov Private Cloud PaaS OpenShift platform have the following default resource quotas that include a certain amount of CPU, RAM and storage:
- **CPU**: 0.5 cores as requested, 1.5 cores as the limit
- **RAM**: 2 GB as requested, 4 GB as the limit
- **Storage**: 60 PVC count , 1 GB overall storage with 521 MB for backup storage and five snapshots

**Note**: The Platform Services team may approach your team to discuss a downgrade in your quota if they find your application isn't using all of the resources within the current quota.

## On this page
- [CPU quotas](#cpu)
- [Memory quotas](#memory)
- [Storage quotas](#storage)

If the default allocations aren't sufficient for your application, [you can ask for a quota increase](./request-quota-increase-for-openshift-project-set.md). You'll need a Sysdig dashboard that shows that your application needs more of a specific resource type (CPU, RAM or storage) in a specific namespace. Provide this proof to the Platform Services team before they can approve a quota increase that you submit in the [Platform Project Registry](https://registry.developer.gov.bc.ca/public-landing).

## CPU quotas<a name="cpu"></a>

The following CPU quotas are currently available on the platform. All CPU requests and limits are shown in cores (not millicores) and represent the maximum for the combined CPU request or CPU limit values for **all pods in a namespace**.

```
cpu-request-0.5-limit-1.5: CPU Request 0.5 core, CPU Limit 1.5 cores
cpu-request-1-limit-2: CPU Request 1 core, CPU Limit 2 cores
cpu-request-2-limit-4: CPU Request 2 cores, CPU Limit 4 cores
cpu-request-4-limit-8: CPU Request 4 cores, CPU Limit 8 cores
cpu-request-8-limit-16: CPU Request 8cores, CPU Limit 16 cores
cpu-request-16-limit-32: CPU Request 16 cores, CPU Limit 32 cores
cpu-request-32-limit-64: CPU Request 32 cores, CPU Limit 64 cores
```

## Memory quotas<a name="memory"></a>

The following RAM quotas are currently available on the platform. All memory requests and limits are shown in GiB and represent the **maximum** for the combined RAM request or RAM limit values for **all pods in the namespace**.

```
memory-request-2-limit-4: RAM Request 2 GiB, RAM Limit 4 GiB
memory-request-4-limit-8: RAM Request 4 GiB, RAM Limit 8 GiB
memory-request-8-limit-16: RAM Request 8 GiB, RAM Limit 16 GiB
memory-request-16-limit-32: RAM Request 16 GiB, RAM Limit 32 GiB
memory-request-32-limit-64: RAM Request 32 GiB, RAM Limit 64 GiB
memory-request-64-limit-128: RAM Request 64 GiB, RAM Limit 128 GiB
```

## Storage quotas<a name="storage"></a>

The following storage quotas are currently available on the platform. All storage sizes are in GiB and represent the **maximum** for the combined storage for **all PVCs within the namespace**. All storage quotas allow for up to 60 persistent volume claims (PVCs).

```
storage-1: Overall Storage: 1 GiB, Backup Storage: 0.5 GiB
storage-2 Overall Storage: 2 GiB, Backup Storage: 1 GiB
storage-4 Overall Storage: 4 GiB, Backup Storage: 2 GiB
storage-16 Overall Storage: 16 GiB, Backup Storage: 8 GiB
storage-32 Overall Storage: 32 GiB, Backup Storage: 16 GiB
storage-64 Overall Storage: 64 GiB, Backup Storage: 32 GiB
storage-128 Overall Storage: 128 GiB, Backup Storage: 64 GiB
storage-256 Overall Storage: 256 GiB, Backup Storage: 128 GiB
storage-512 Overall Storage: 512 GiB, Backup Storage: 256 GiB
```
---
Related links:
* [Request a quota increase for an OpenShift project set](./openshift-project-resource-quotas/)
* [Platform Project Registry](https://registry.developer.gov.bc.ca/public-landing)

Rewrite sources:
* https://github.com/BCDevOps/developer-experience/blob/master/docs/resourceTuning/project-resource-quotas.md
---
