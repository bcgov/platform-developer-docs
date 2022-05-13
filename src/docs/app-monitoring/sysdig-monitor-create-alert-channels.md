---
title: Create alerts and notifications in Sysdig Monitor

slug: sysdig-monitor-create-alert-channels

description: Describes how to configure alerts and notifications for a team in Sysdig Monitor.

keywords: sysdig, monitoring, openshift monitoring, developer guide, team guide, team, configure, alerts, notifications

page_purpose: Details the steps for setting up notification channels and configuring them in Sysdig Monitor and RocketChat.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Shelly Han

sort_order: 2
---

# Create alert channels in Sysdig Monitor
You can create alerts on specific monitoring metrics in Sysdig Monitor to notify your team when things need attention.

You can integrate Sysdig alerts with Rocket.Chat. Here are some steps to setup the Sysdig alert notification on RC.

## On this page
- [Create a Rocket.Chat chat channel and webhook for alert messages](#create-rc-channel)
- [Create a Sysdig team notification channel](#team-notification)

## Create a Rocket.Chat chat channel and webhook for alert messages<a name="create-rc-channel"></a>

Rocket.Chat requires an incoming webhook and a script to parse the data from Sysdig. Do the following:
- Create a RC chat channel for the alert messages to arrive if there isn't one.

- Create an incoming webhook to the chat channel:

  - Click on your avatar -> Administration -> Intergrations -> New (from Incoming tab)

  - Name the webhook in the format of `sysdig-alert-webhook-<APP_TEAM_NAME>`

  - Use the following sample script for basic alert message creation:

```js
class Script {
  process_incoming_request({ request }) {
    console.log(request.content);
    var date = new Date(request.content.timestamp);

    var alertColor = "warning";
    if(request.content.resolved === "true"){ alertColor = "good"; }
    else if (request.content.status === "ACTIVE") { alertColor = "danger"; }
    return {
      content: {
        icon_url: "https://pbs.twimg.com/profile_images/1033062307352338432/AAPSOLRs_400x400.jpg",
        text: "Sysdig Notification",
        attachments: [{
          title: request.content.alert.name,
          pretext: request.content.alert.description,
          title_link: request.content.event.url,
          color: alertColor,
          fields: [
            {
              title: "State",
              value: request.content.state
            },
            {
              title: "Condition",
              value: request.content.condition
            }
          ]
      }]
      }
    };
  }
}
```

Here's how the webhook should look like:
![RC webhook config](../../images/sysdig-team-rc-alert-webhook-config.png)


## Create a Sysdig team notification channel<a name="team-notification"></a>
To create a team notification channel, do the following:
1. In Sysdig Monitor, go to your user account and click `Settings`.

1. Click `Notification Channels` and `Add Notification Channel`. Choose `Webhook` as the type.

1. Use the webhook URL generated from Rocket.Chat and configure the notification channel.

1. Click `Save` and go to the `Alerts` section or start adding custom alerts to any of your configured dashboards.

By default, the alert scope is set to `everywhere`, which means all namespaces from the cluster. Make sure you set the scope to your own namespaces. For example, you can use `kubernetes.namespace.name` and pick the ones you need.

---
Related links:
- [Set up advanced functions in Sysdig Monitor](sysdig-monitor-set-up-advanced-functions.md)
- [Set up a team in Sysdig Monitor](./sysdig-monitor-setup-team.md)

Related resources:
- [Sysdig Monitor](https://docs.sysdig.com/en/sysdig-monitor.html)
- [Sysdig Monitor Dashboards](https://docs.sysdig.com/en/dashboards.html)
- [Sysdig Alerts](https://docs.sysdig.com/en/alerts.html)
- [Sysdig Alerts with Kubernetes and PromQL](https://sysdig.com/blog/alerting-kubernetes/)
- [Sysdig Teams Blog](https://sysdig.com/blog/introducing-sysdig-teams/)
- [Sysdig Teams Docs ](https://docs.sysdig.com/en/grouping,-scoping,-and-segmenting-metrics.html#al_UUID-c54169b7-c8f5-4990-6b63-dd2e25b96cce_UUID-3dc7a7aa-2549-23a2-94e2-cee57bdd538f)
- [Sysdig User Management Docs](https://docs.sysdig.com/en/manage-teams-and-roles.html)
- [Sysdig User Roles](https://docs.sysdig.com/en/user-and-team-administration.html)

Rewrite sources:
* https://developer.gov.bc.ca/Developer-Tools/OpenShift-User-Guide-to-Creating-and-Using-a-Sysdig-Team-for-Monitoring

---
