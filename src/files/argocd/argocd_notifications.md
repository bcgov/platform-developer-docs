# ArgoCD Notifications

Applications in Argo CD may be configured to send a notification to an email address.

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

Services define the mode of delivery, use `localsmtp` for email.

Because the configuration of notifications is set at the namespace level, users do not have the ability to modify the existing functionality.

To configure your application, select the trigger and service to use.  See the following section for how to implement it.

For full details, see the [official documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/).

## Subscribe an application to a notification type
**Email**

For an email alert, the service name will be `localsmtp`.  Choose the trigger from the list above.  For example, if configuring the notification for sync failures:

`notifications.argoproj.io/subscribe.on-sync-failed.localsmtp`

Using the Argo CD UI, edit the Application.

* Click: Details --> Edit
* In the Annotations section, click the Plus (+) icon to add an annotation.

To configure email notification, add an annotation as follows, using the key prepared above having the desired trigger.

* Key: `notifications.argoproj.io/subscribe.on-sync-failed.localsmtp`
* Value: `YOUR-EMAIL-ADDRESS`
