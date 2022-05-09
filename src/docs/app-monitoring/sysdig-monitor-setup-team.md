---
title: Set up a team in Sysdig Monitor

slug: sysdig-monitor-setup-team

description: Describes how to set up and configure a team in Sysdig Monitor.

keywords: sysdig, sysdig monitor, sysdig team, monitoring, openshift monitoring, developer guide, team guide, team, configure

page_purpose: Details the steps for setting up a team and reviewing the capabilities of Sysdig Monitor.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Shelly Han
---

# Set up a team in Sysdig Monitor

[Sysdig Monitor](https://sysdig.com/products/monitor/) provides system-level monitoring of Kubernetes hosts and the ability to create custom dashboards, alerts and operational-level captures to diagnose application or platform-level issues.

The Sysdig Teams Operator runs in the cluster and enables a team to create and manage access to a dedicated Sysdig Team account for BC Gov Private Cloud PaaS OpenShift platform users. The team is scoped to the OpenShift namespaces that belong to the team. Sysdig also provides a default dashboard to identify system [resources, limits and actual usage](/docs/automation-and-resiliency/openshift-project-resource-quotas.md).

For more information on Sysdig Monitor, see [Monitoring with Sysdig](New page on Wordpress site).

## On this page
- [Sign in to Sysdig](#sign-in-sysdig)
- [Create Sysdig team access](#create-access)
- [Create a Sysdig Team](#create-team)
- [Sign in to your Sysdig Team](#sign-in)
- [Review your monitoring dashboards](#review-dashboards)

## Sign in to Sysdig<a name="sign-in-sysdig"></a>
You and your team must sign in to Sysdig to create the user account. The B.C. government Sysdig uses OpenID Connect and requires a GitHub account.

Go to the [BCDevOps Sysdig Monitor](https://app.sysdigcloud.com/api/oauth/openid/bcdevops). You can also sign in on [the Sysdig site](https://app.sysdigcloud.com). Select OpenID and type `BCDevOps` as the company.

On the default page, you can find the icon for your account and the email address associated with it. You may be directed to the **Catchall Team** page, which doesn't have access to resources until you create team access.

Sysdig identifies users by the email, so it's important to use the correct email address for yourself as well as your team members.

## Create Sysdig team access<a name="create-access"></a>
The OpenShift Operator runs in the background and creates a Sysdig RBAC and dashboard for you. The operator looks for a `sysdig-team` custom resource from your `*-tools` namespace. The `sysdig-team` resource does the following:

- Creates a Custom Resource in your project's `tools` namespace.

- Creates an access control list within the Custom Resource that identifies users by the email address.

**Note**: All team members need to sign in to Sysdig first. Each user can find the email address on the [Sysdig User Profile](https://app.sysdigcloud.com/#/settings/user).

Only GitHub IDs are currently configured from SSO. Once the Custom Resource is created, two teams are also created:
  - **[license-plate]-team**: All Kubernetes-related objects can be monitored here, except persistent volume claim (PVC) metrics.

  - **[license-plate]-team-persistent-storage**: You can monitor PVC utilization here.

**Note**: PVC metrics are scraped from kubelet services, which are no longer available from `kubernetes.*` scope.

### Sample sysdig-team object
```yaml
apiVersion: ops.gov.bc.ca/v1alpha1
kind: SysdigTeam
metadata:
  name: 101ed4-sysdigteam
  namespace: 101ed4-tools
spec:
  team:
    description: The Sysdig Team for the Platform Services Documize
    users:
    - name: shelly.han@gov.bc.ca
      role: ROLE_TEAM_MANAGER
    - name: patrick.simonian@gov.bc.ca
      role: ROLE_TEAM_EDIT
    - name: billy.li@gov.bc.ca
      role: ROLE_TEAM_STANDARD
    - name: olena.mitovska@gov.bc.ca
      role: ROLE_TEAM_READ
```

### Available roles
You can use the following available roles:
- `ROLE_TEAM_MANAGER (Team Manager, mandatory)`: This role can create, edit or delete dashboards, alerts or other content. They can also add or delete team members or change team member permissions. You must have at least one team manager, otherwise the operator can't create default templates for you.

- `ROLE_TEAM_EDIT (Advanced User)`: This role can create, edit or delete dashboards, alerts or other content.

- `ROLE_TEAM_STANDARD (Standard User)`: This advanced user doesn't have access to the **Explore** page. For example, for developers who are not interested in monitoring information.

- `ROLE_TEAM_READ (View-only User)`: This role has read access to the environment in the team scope, but can't create, edit or delete dashboards, alerts or other content.

Apply role updates to the Custom Resource, not the Sysdig Monitor user interface. Reconciliation of the SysdigTeams Operator overwrites any UI changes to team roles.

## Create a Sysdig Team<a name="create-team"></a>
Use `oc apply` with the [sysdig-team object](#sysdig-team-object) custom resource yaml in your `tools` namespace so the operator creates the Sysdig Team. For example:

  ```shell
  oc project 101ed4-tools
  oc apply -f sysdigteam-sample.yml
  ```
Use `oc describe sysdig-team <your_sysdig_team_cr_name>` to validate that the Sysdig Team was created:

  ```shell
  Name:         101ed4-sysdigteam
  Namespace:    101ed4-tools
  Labels:       <none>
  API Version:  ops.gov.bc.ca/v1alpha1
  Kind:         SysdigTeam
  Metadata:
    Creation Timestamp:  2021-04-15T22:42:20Z
    ...
  Spec:
    Team:
      Description:  The Sysdig Team for the Platform Services Documize
      Users:
        Name:  shelly.han@gov.bc.ca
        Role:  ROLE_TEAM_MANAGER
        Name:  patricksimonian@gmail.com
        Role:  ROLE_TEAM_EDIT
        ...
  Status:
    Conditions:
      Ansible Result:
        Changed:             0
        Completion:          2021-08-18T20:10:43.665524
        Failures:            0
        Ok:                  30
        Skipped:             13
      Last Transition Time:  2021-08-05T18:54:24Z
      Message:               Awaiting next reconciliation
      Reason:                Successful
      Status:                True
      Type:                  Running
  Events:                    <none>
  ```

Check the following:
- In the **Message:**, it should say `Awaiting next reconciliation`.

- In the **Reason:**, it should say `Successful`.

If both of these show, the Sysdig Team was created successfully. If you don't see `Awaiting next reconciliation`, contact the Platform Services team on the [#devops-sysdig Rocket.Chat channel](https://chat.developer.gov.bc.ca/channel/devops-sysdig!).

If your project set is on Gold and GoldDR clusters, only create the sysdig-team Custom Resource in the Gold cluster. The Sysdig operator can create the dashboards for your applications across both clusters.

## Sign in to your Sysdig Team<a name="sign-in"></a>
Now that you've created the Custom Resource, go back to Sysdig to see the new team scope and default dashboards.

**Note:** You may need to wait some time between creating the team before the resources show.

## Review your monitoring dashboards<a name="review-dashboards"></a>
Two Sysdig Teams were created and now have the following dashboards:
- A resource dashboard provides an overview of limits and requests across all team namespaces.

- A persistent storage dashboard provides an overview of all PVC utilization. PVCs must be attached to a running pod for their metrics to show on this dashboard.

- A series of predefined dashboards exist for general use or to help users with appropriate permissions to create custom dashboards. Click `Dashboards`, then click `Add Dashboard` and `Create from Template`

The Platform Services team recommends that teams use the [Sysdig API](https://docs.sysdig.com/en/docs/developer-tools/sysdig-rest-api-conventions/) to keep your dashboards code. Each dashboard is assigned to an account on Sysdig for ownership. If you delete the user (whether from the console or Custom Resource), all of the dashboards are deleted. Sysdig cloud is a software as a service (SaaS) and not run locally, so there's no way for us to retain the deleted dashboards for a user.

### Fix issues with default dashboards<a name="fix-issues"></a>
If you don't see default dashboards in your Sysdig team, check the following:
1. Make sure you're on the correct Sysdig team scope.

1. Check your Sysdig account profile and match it to the email address that you have provided on the `sysdig-team custom resource` in the `tools` namespace. If the administrator's email doesn't match the corresponding user on Sysdig, it won't be able to create the dashboards. Delete the `sysdig-team` from `tools` namespace and recreate it.

  **Note**: If you created custom dashboards already, make sure to import them as code using the [Sysdig API](https://docs.sysdig.com/en/docs/developer-tools/sysdig-rest-api-conventions/) first before deleting the Custom Resource.

---
Related links:
- [Set up advanced functions in Sysdig Monitor](./sysdig-monitor-set-up-advanced-functions.md)
- [Create alert channels in Sysdig Monitor](sysdig-monitor-create-alert-channels.md)
- [Sysdig Monitor](https://sysdig.com/products/monitor/)
- [OpenShift project resource quotas](/docs/automation-and-resiliency/openshift-project-resource-quotas.md)
- [Sysdig API](https://docs.sysdig.com/en/docs/developer-tools/sysdig-rest-api-conventions/)
- [BCDevOps Sysdig Monitor](https://app.sysdigcloud.com/api/oauth/openid/bcdevops)
- [Sysdig](https://app.sysdigcloud.com)
- [Monitoring with Sysdig](New page on Wordpress site)
- [Sydig User Profile](https://app.sysdigcloud.com/#/settings/user)
- [devops-sysdig RocketChat channel](https://chat.developer.gov.bc.ca/channel/devops-sysdig!)
- [Migrate Using Default Configuration](https://docs.sysdig.com/en/docs/sysdig-monitor/integrations-for-sysdig-monitor/configure-monitoring-integrations/migrating-from-promscrape-v1-to-v2/#migrate-using-default-configuration)

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
