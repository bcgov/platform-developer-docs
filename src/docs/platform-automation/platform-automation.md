---
title: Platform automation

slug: platform-automation

description: Describes the automation we run to manage the OpenShift platform.

keywords: tool, automation, security

page_purpose: Describes the automation we run to manage the OpenShift platform.

audience: technical lead, developer

author: Matt Spencer, Steven Barre

content_owner: Olena Mitovska

sort_order: 1
---

# Platform automation

Last updated: **February 26, 2024**

We use some automation on the platform to help manage resource usage, alert about misconfigured objects and to encourage teams to use images that are secure and up to date. This section has pages to cover each of those automation tools and scheduled jobs.

- [Automated Scale-Down](../platform-automation/automated-scaling.md) covers a tool that scales down deployments that have not been updated in a year, or are in a crashloop state
- [AlertManager](../platform-automation/alertmanager.md) covers some basic monitoring and alerting config added to every namespace
- [Pruning](../platform-automation/pruning.md) provides info on the automatic object pruning that takes place in OpenShift clusters
- [Kyverno Cluster Policies](../platform-automation/kyverno.md) describes policies that enforce some rules on some objects
- [Defunct PIDs](../platform-automation/defunct-pids.md) describes email alerts about zombie processes in pods and how to fix them
