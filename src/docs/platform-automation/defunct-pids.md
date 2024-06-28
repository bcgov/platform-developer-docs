---
title: Defunct Process IDs (PIDs)

slug: defunct-pids

description: Describes fixes to the issue of excess defunct processes in containers

keywords: automation

page_purpose: Describes fixes to the issue of excess defunct processes in containers

audience: technical lead, developer

author: Steven Barre

content_owner: Olena Mitovska

sort_order: 5
---

# Defunct Process IDs (PIDs) 

A cron job finds pods with too many defunct processes, it emails the Product Owner and Tech Lead for the namespace. Too many defunct processes can harm the OpenShift node stability.

## Quick solution

The quick solution is to delete the pod. This makes all extra processes exit and restarts the pod in a clean state. The pod may build up defunct processes again, but this stops the alert emails temporarily until you can fully address the issue.

## Proper solution

Traditionally, containers follow the "one container, one process" mantra. Recently, containers often run several processes, including readiness and liveness checks using exec.

The first process in a container is PID 1, and all others are its children. If PID 1 doesn't expect to parent other processes when those child processes exit in unexpected ways, they can become zombie or defunct, needing cleanup.

The proper solution is to set your container's `ENTRYPOINT` to a process that handles zombie child processes cleanup, called an init program. Examples include [Tini](https://github.com/krallin/tini), [dumb-init](https://github.com/Yelp/dumb-init), and [s6-overlay](https://github.com/just-containers/s6-overlay). Using one of these init processes as PID 1 ensures that unhandled defunct PIDs are cleaned up, preventing issues for the node's kernel.

Sometimes, minor changes to the probes can prevent them from creating zombie processes.

---
---

## Additional resources

- [Container Init process](https://devopsdirective.com/posts/2023/06/container-init-process/)
- [bitnami/mongodb fix PR](https://github.com/bitnami/charts/pull/23390/files)
- [bitnami/redis-cluster fix PR](https://github.com/bitnami/charts/pull/5335/files)
- [Kubernetes feature request to add init process to all containers](https://github.com/kubernetes/kubernetes/issues/84210)
