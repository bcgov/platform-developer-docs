---
title: Create alerts and notifications in Sysdig Monitor

slug: sysdig-monitor-create-alert-channels

description: Describes how to configure alerts and notifications for a team in Sysdig Monitor.

keywords: sysdig, monitoring, openshift monitoring, developer guide, team guide, team, configure, alerts, notifications

page_purpose: Details the steps for setting up notification channels and configuring them in Sysdig Monitor and RocketChat.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Shelly Han

sort_order: 3
---

# Create alerts and notifications in Sysdig Monitor
Last updated: **December  18, 2023**

This document helps you create alerts based on monitoring dashboards in Sysdig Monitor that help notify your team when something needs attention.

Additionally, you can find steps on how to set up Sysdig alerts with [Rocket.Chat](https://chat.developer.gov.bc.ca/).

## On this page
- [Create alerts and notifications in Sysdig Monitor](#create-alerts-and-notifications-in-sysdig-monitor)
- [Create a Rocket.Chat chat channel and webhook for alert messages](#create-a-rocketchat-chat-channel-and-webhook-for-alert-messages)
- [Create a Sysdig team notification channel](#create-a-sysdig-team-notification-channel)
- [Creating an alert](#creating-an-alert)
- [Related pages:](#related-pages)

<!-- ### End of On this page -->

## Create a Rocket.Chat chat channel and webhook for alert messages

Rocket.Chat requires an incoming webhook to parse the data from Sysdig.

1. Create a RC chat channel for the alert messages to arrive if there isn't one.

   **Note:** You can do this by clicking on the 'Create New' menu in the left navigation pane and selecting `New Channel`.
    ![RC webhook config](../../images/sysdig-team-rc-create-channel.png)

2. Create an incoming webhook for the chat channel:

   - In the left navigation pane of Rocketchat, click on the ellipsis menu icon-> Workspace -> Integrations -> New (on the right top corner). or at https://chat.developer.gov.bc.ca/admin/integrations -> New
   - Name the webhook in the format of `sysdig-alert-webhook-<APP_TEAM_NAME>`.

   This is how the webhook should look:

   ![RC webhook config](../../images/sysdig-team-rc-alert-webhook-config.png)

## Create a Sysdig team notification channel

Create a Sysdig team notification channel(For Edit and Admin Role):

1. In Sysdig Monitor, go to your user account and click `Settings`.
2. Click `Notification Channels` and `Add Notification Channel`. Choose `Custom Webhook` as the type.
3. Use the webhook URL generated from Rocket.Chat(with the token) and configure the notification channel. Name the channel in the format of `Rocketchat-alert-channel-<APP_TEAM_NAME>`.
4. Attach the following script into Editor. **Note:** This is just an example; please update accordingly based on your use case:

```
   {
     "text": "Sysdig Notification",
     "attachments": [
       {
         "title": "{{@event_title}}",
         "title_link": "{{@alert_url}}",
         "pretext": "{{@alert_description}}",
         "color": "#f93b10",
         "fields": [
           {
             "title": "State",
             "short": true,
             "value": "{{@event_state}}"
           },
           {
             "title": "Alert level",
             "short": true,
             {{#if_severity_high}}
             "value": "incident"
             {{#else}}
             "value": "warning"
             {{/if}}
           },
           {
             "title": "Condition",
             "short": false,
             "value": "{{@alert_warning_condition}}"
           },
           {
             "title": "Link to the Alert",
             "short": false,
             "value": "{{@alert_url}}"
           }
         ]
       }
     ]
   }
```

5. To test this notification, you have to pick one of the  **Select Alert Types** before you can **Send Test Notification**. Send test notification should send you a notification example in your channel if everything configured correctlly

6. After tested, Click `Save` and  you should be able to see this notification option available in alert

## Creating an alert

It's recommended to create alerts from an application monitoring metrics, which helps to define good alerting thresholds.

1. Navigate to the `Alerts` section on the left hand navigation bar, you can see all the alerts within this Sysdig team scope

2.  To create an alert from metrics, head over to the dashboard. Pick the metric panel and click on `Create Alert` from kebab menu icon
![Create alert from metric](../../images/sysdig-team-alert-create.png)
   
3. The `Alert Library` is also accessible [here](https://app.sysdigcloud.com/#/alerts/library/all), allowing us to select from pre-built templates

4. It contains other available type of alert for you to choose based on your use-case:
    ![different alert type](../../images/sysdig-team-alert-type.png)

- The alert contains:

  - `Metric`: make sure if has the correct aggregation. **Note**: For PromQL based alerts, triggering threshold is defined as part of the metric query. See picture below:
  ![Configure PromQL alert](../../images/sysdig-team-alert-example-promql.png)


  - `Scope`: The alert scope by default is set to `everywhere`, which means all namespaces from the cluster. Make sure you set the scope to your own namespaces if not specified. For example, you can use `kube_namespace_name` and `kube_cluster_name`

  - `Trigger`: The triggering threshold should be based on the statistic from past monitoring. You can also refer to the data from `Preview` section on the right

  - `Notify`: Pick the Sysdig notification channel to send alert messages to

  - `Others`: Feel free to explore other features available for alerting!


---
--- 

## Related pages
- [Set up advanced functions in Sysdig Monitor](/sysdig-monitor-set-up-advanced-functions/)
- [Set up a team in Sysdig Monitor](/sysdig-monitor-setup-team/)
- [Sysdig Monitor](https://docs.sysdig.com/en/sysdig-monitor.html)
- [Sysdig Monitor Dashboards](https://docs.sysdig.com/en/dashboards.html)
- [Sysdig Alerts](https://docs.sysdig.com/en/alerts.html)
- [Sysdig Alerts with Kubernetes and PromQL](https://sysdig.com/blog/alerting-kubernetes/)
- [Sysdig Teams Blog](https://sysdig.com/blog/introducing-sysdig-teams/)
- [Sysdig User Management Docs](https://docs.sysdig.com/en/manage-teams-and-roles.html)
- [Sysdig User Roles](https://docs.sysdig.com/en/user-and-team-administration.html)

---
