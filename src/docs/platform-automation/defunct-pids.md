---
title: Defunct PIDs

slug: defunct-pids

description: Describes fixes to the issue of excess defunct processes in containers

keywords: automation

page_purpose: Describes fixes to the issue of excess defunct processes in containers

audience: technical lead, developer

author: Steven Barre

content_owner: Olena Mitovska

sort_order: 5
---

# Defunct PIDs
Last updated: **June 24, 2024**

There is a cron job to find pods with excess defunct processes and email the Product Owner and Tech Lead on file for the namespace. Too many of these process can have a negative impact on OpenShift node stability.

## Quick Fix

The quick fix is to just delete the pod. That will cause all the extra processes to exit and restart the pod in a clean state. The pod will likely build up excess defunct processes again in the future, but this can be a quick fix to stop the alert emails until you have time to more fully address the issue.

## Proper fix

Traditionally in containers, the mantra is "one container, one process" but in recent times, containers will often have several processes running in them. They may also include readyness and liveness checks that use exec.

The first process to start in a container is treated as PID 1 and all other processes are treated as children of that process. If that process is not expecting to be parent to other processes, then when those child processes exit in unexpected ways they may become zombie or defunct and need to be cleaned up.

The proper fix is to ensure that the `ENTRYPOINT` of your container is a process that can handle the cleanup of zombie child processes, often called an init program. Some examples include [Tini](https://github.com/krallin/tini), [dumb-init](https://github.com/Yelp/dumb-init), and [s6-overlay](https://github.com/just-containers/s6-overlay). Having one of these init processes as your PID 1 that then runs your main container process will ensure that any unhandled defunct PIDs are cleaned up instead of hanging around causing issues for the nodes kernel.

Sometimes minor changes to the probes can also be done to prevent them from creating zombies as well.

---
---

## Additional Reading

- [Container Init Process](https://devopsdirective.com/posts/2023/06/container-init-process/)
- [bitnami/mongodb fix PR](https://github.com/bitnami/charts/pull/23390/files)
- [bitnami/redis-cluster fix PR](https://github.com/bitnami/charts/pull/5335/files)
- [Kubernetes Feature Request to add init process to all containers](https://github.com/kubernetes/kubernetes/issues/84210)
