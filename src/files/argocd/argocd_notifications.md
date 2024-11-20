# ArgoCD Notifications

Applications in Argo CD may be configured to send a notification to a RocketChat channel or to an email address.

## Triggers and Services
Notifications are configured by selecting the type of event that triggers the notification and the service template to use to send it.

There are 8 different triggers for alerts, which are associated with events that happen in your ArgoCD Application.

Triggers - events that may trigger a notification include:

* on-created
* on-deleted
* on-deployed
* on-health-degraded
* on-sync-failed
* on-sync-running
* on-sync-status-unknown
* on-sync-succeeded

Services define the mode of delivery, either `localsmtp` for email or one of the Rocketchat services listed below.

Because the configuration of notifications is set at the namespace level, users do not have the ability to modify the existing functionality.

To configure your application, select the trigger and service to use.  See the following section for how to implement it.

For full details, see the [official documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/).

## Subscribe an application to a notification type
**RocketChat**

In order to send a notification to RocketChat, you must first [create an Integration](#create-webhook-integration).  This provides a unique webhook token used for posting messages to the given channel or user.

Next, choose a trigger from the list above and the corresponding service name from these Rocketchat services:

* rocketchat-on-created
* rocketchat-on-deleted
* rocketchat-on-deployed
* rocketchat-on-health-degraded
* rocketchat-on-sync-running
* rocketchat-on-sync-status-unknown
* rocketchat-on-sync-succeeded
* rocketchat-sync-failure

The subscription name will be in the form of `notifications.argoproj.io/subscribe.TRIGGER_NAME.SERVICE_NAME`.  For example:

`notifications.argoproj.io/subscribe.on-sync-failed.rocketchat-sync-failure`

Using the Argo CD UI, edit the Application.

* Click: Details --> Edit
* In the Annotations section, click the Plus (+) icon to add an annotation.

To configure a RocketChat notification, add two annotations, setting the Subscription key to the desired value:

Subscription

* Key: `notifications.argoproj.io/subscribe.on-sync-failed.rocketchat-sync-failure`
* Value: `""`

Webhook token

* Key: `rocketchatWebhookToken`
* Value: `YOUR-WEBHOOK-TOKEN`

Currently, just one type of Rocketchat notification can be configured per Application.

**Email**

For an email alert, the service name will be `localsmtp`.  Choose the trigger from the list above.  For example, if configuring the notification for sync failures:

`notifications.argoproj.io/subscribe.on-sync-failed.localsmtp`

Using the Argo CD UI, edit the Application.

* Click: Details --> Edit
* In the Annotations section, click the Plus (+) icon to add an annotation.

To configure email notification, add an annotation as follows, using the key prepared above having the desired trigger.

* Key: `notifications.argoproj.io/subscribe.on-sync-failed.localsmtp`
* Value: `YOUR-EMAIL-ADDRESS`

Note that one application may have both subscriptions.

## Create a RocketChat webhook integration <a name="create-webhook-integration"></a>
For each RocketChat channel that will be used for notifications, create a webhook integration.  In the RocketChat app, go to:
Administration --> Integrations --> Incoming --> New

Enter the channel name to post to and post as `rocket.cat` (yes, that's rocket.CAT, not chat).

Click Save.

Copy the webhook URL for use in the configuration described above.

Once the setup is complete, you should receive the notification after the failure of a synchronization.

