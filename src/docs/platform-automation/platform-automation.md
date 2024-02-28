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

- [Automated Scale Down](/automated-scaling/) covers a tool that scales down deployments that have not been updated in a year, or are in a crashloop state
- [AlertManager](/alertmanager/) covers some basic monitoring and alerting config added to every namespace
