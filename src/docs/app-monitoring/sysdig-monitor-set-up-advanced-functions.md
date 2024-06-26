---
title: Set up advanced metrics in Sysdig Monitor

slug: sysdig-monitor-set-up-advanced-functions

description: Describes how to set up and configure advanced functions for a team in Sysdig Monitor.

keywords: sysdig, monitoring, openshift monitoring, developer guide, team guide, team, configure, advanced functions, custom monitoring, PromQL, Service Discovery

page_purpose: Details the steps for setting up advanced functions in Sysdig Monitor, including custom monitoring, PromQL alerts, and application metrics.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Shelly Han

sort_order: 5
---

# Set up advanced metrics in Sysdig Monitor
Last updated: **April 17, 2024**

This page is a comprehensive guide to setting up advanced metrics in Sysdig Monitor. It covers the creation of PromQL metrics, using PromQL in alerts, and employing Service Discovery to import application metrics endpoints into Sysdig. The guide includes practical examples and step-by-step instructions, serving as a valuable resource for users looking to enhance their monitoring capabilities with Sysdig.

## On this page
- [Set up advanced metrics in Sysdig Monitor](#set-up-advanced-metrics-in-sysdig-monitor)
  - [Creating PromQL metrics](#creating-promql-metrics)
  - [Create a PromQL based alert](#create-a-promql-based-alert)
  - [Use Service Discovery to import application metrics endpoints](#use-service-discovery-to-import-application-metrics-endpoints)
- [Related pages](#related-pages)


## Creating PromQL metrics
Sysdig scrapes Prometheus metrics, and you can leverage PromQL to create custom queries. PromQL is particularly beneficial for advanced metric exploration and offers flexibility in obtaining specific insights from your data. To get started, consider the following example:

![Sysdig exploring](../../images/sysdig_team_promql_explore.png)


## Create a PromQL based alert
PromQL can be used in Alerts as well. The following example shows an alert for the **Persistent Volume Utilization** when hitting 80% full. 

- If you'd like to get PVC-specific metrics, for example, get the max percentage of storage usage:

  `max(kubelet_volume_stats_used_bytes{agent_tag_cluster="gold",persistentvolumeclaim="<PVC_name>"}) / max(kubelet_volume_stats_capacity_bytes{agent_tag_cluster="gold",persistentvolumeclaim="<PVC_name>"}) * 100`

- Sample PromQL Query:

  `((avg(kubelet_volume_stats_used_bytes/kubelet_volume_stats_capacity_bytes) by (persistentvolumeclaim)) * 100) >= 80`

![Configure PromQL alert](../../images/sysdig-team-alert-config-promql.png)


## Use Service Discovery to import application metrics endpoints

Sysdig has a lightweight Prometheus server (Promscrape) that can [import your application metrics endpoint into Sysdig metrics](https://docs.sysdig.com/en/docs/sysdig-monitor/integrations/working-with-integrations/custom-integrations/collect-prometheus-metrics/migrating-from-promscrape-v1-to-v2/#migrating-from-promscrape-v1-to-v2).

To enable Promscrape to find your application metrics, do the following:

1. Make sure the application metrics endpoint is returning Prometheus metrics. To test this, you can expose the service and curl on the URL.

2. Add the following annotations to the application pods:

  ```yaml
  prometheus.io/scrape: true
  prometheus.io/port: <metrics_port>
  prometheus.io/path: <metrics_path>
  # the path is usually at /metrics
  ```

  Don't add the annotations to the pods directly. This should be part of the infrastructure code and added in the templates. For example, if the application is using an OpenShift deployment, the annotation should be added at `deployment.spec.template.metadata.annotations`.
  
3. Once the annotation is in place, Sysdig can scrape them. On the **Sysdig Explore** tab, look for the sysdig metrics there (Sysdig does relabeling of the metrics, so they will appear as native sysdig metrics now instead of coming from promQL Query)


---
---

## Related pages

- [Set up a team in Sysdig Monitor](../app-monitoring/sysdig-monitor-setup-team.md)
- [Create alert channels in Sysdig Monitor](../app-monitoring/sysdig-monitor-create-alert-channels.md)
- [devops-sysdig RocketChat channel](https://chat.developer.gov.bc.ca/channel/devops-sysdig)
- [Migrate Using Default Configuration](https://docs.sysdig.com/en/docs/sysdig-monitor/integrations/working-with-integrations/custom-integrations/collect-prometheus-metrics/migrating-from-promscrape-v1-to-v2/#migrate-using-default-configuration)
- [Sysdig Monitor](https://docs.sysdig.com/en/sysdig-monitor.html)
- [Sysdig Monitor Dashboards](https://docs.sysdig.com/en/dashboards.html)
- [Sysdig Alerts](https://docs.sysdig.com/en/alerts.html)
- [Sysdig Alerts with Kubernetes and PromQL](https://sysdig.com/blog/alerting-kubernetes/)
- [Sysdig Teams Blog](https://sysdig.com/blog/introducing-sysdig-teams/)
- [Sysdig Teams Docs ](https://docs.sysdig.com/en/grouping,-scoping,-and-segmenting-metrics.html#al_UUID-c54169b7-c8f5-4990-6b63-dd2e25b96cce_UUID-3dc7a7aa-2549-23a2-94e2-cee57bdd538f)
- [Sysdig User Management Docs](https://docs.sysdig.com/en/manage-teams-and-roles.html)
- [Sysdig User Roles](https://docs.sysdig.com/en/user-and-team-administration.html)


