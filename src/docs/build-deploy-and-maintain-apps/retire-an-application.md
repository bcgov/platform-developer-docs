---
title: Retire an application

slug: retire-an-application

description: Describes how to retire an application as best practices of the platform.

keywords: OpenShift, retire, application, hardening, security, ci/cd pipeline, risk mitigation, app, requirements, data storage, best practices for retiring an application, database storage, design application

page_purpose: Describes the process to retire an application in the private cloud as a Service Platform

audience: technical lead, openshift 101 students, openshift 201 students, developers, app developers

author: Ian Watts, Shelly Han, Cailey Jones

editor: Pilar Solares

content_owner: Olena Mitvoska

sort_order: 4
---

# Retire an application
Last updated: **October 24, 2023**

This guide helps you retire applications on OpenShift. It gives you a step-by-step guide to help you remove, shut down, and archive different parts of your application, but also emphasizes the importance of a solid plan. A well thought-out plan ensure that all necessary steps are schedule and executed smoothly. 

Before planning to retire an application, it's vital to check policies and legislation. Understanding and adhering to those guidelines are essential, this ensures compliance and helps avoid potential issues for the process

Let's dive in! 
## On this page
* [**Preparing to retire application**](#preparing-to-retire-application)
* [**Shut down application and related services**](#shut-down-application-and-related-services)
* [**Related pages**](#related-pages)

<!-- ### End of "On this page" -->
---
## Preparing to retire application

### Policy Requirements
Before you start planning the technical steps to shut down your application, make sure you're aware of any laws or policies you need to follow.

For instance, ensure your team knows about data retention policies for your application:

* Do you have to keep your app's data for a specific time? If yes, where do you plan to store it? 
* If the data needs to be accessed post-application shutdown, how do you intend to do that? 

Consider these questions for any policy or law that might apply to your application after it's shut down. If you're uncertain about applicable policies or legislation, please be sure to contact your ministry IMB. Some key contacts for this purpose are your:

*  [Ministry Information Security Officer (MISO)](https://www2.gov.bc.ca/gov/content/governments/services-for-government/policies-procedures/information-security-policy-and-guidelines/role-of-miso)
*  [Ministry Privacy Officer (MPO)](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/resources/privacy-officers) 
*  [Ministry Records Officer (MRO)](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/records-management/records-contacts/ministries)

### Communication
Before shutting down your application, inform stakeholders and users about the shutdown plans.

Ensure you've documented clear answers to any policy-related questions from the previous step, and make sure your team (or whoever is responsible for adhering to those laws and policies in the future) knows where to find that documentation.

Clearly communicate the shutdown schedule to users, stakeholders, executives, and your team and division. It's wise to communicate this schedule more than once. The first communication should happen early in the process to provide ample notice. Subsequently, send reminders closer to the shutdown date and a final communication once the application is offline.

Update any ServiceNow or iStore orders for TLS certificates to indicate that you won't be renewing the certificate.

If your application uses licensed products (such as Enterprise DB or licensed libraries), contact the vendor to discuss terminating the license.

### Backups

If you need to keep backups of any data after your application is offline, you'll need to find a place to store that data. You can't store it on the OpenShift cluster or within any services provided by the Platform Team once you've deleted your project set from the Product Registry.

Consider using the OCIO's S3-compatible object-storage service to store data post-application shutdown. If you're retaining data as database dump files, ensure you have a plan to recover that data into a running database for future access. Plan for this recovery process once you no longer have access to your project set in OpenShift.

Keep in mind that deleting your project set from the Product Registry will also delete all OpenShift secrets and your Vault folder. Make sure you've securely saved any necessary passwords. If retaining database data, preserve login credentials for database users to access backups. Additionally, keep access credentials for your S3 bucket or any other off-cluster data storage.

If your team shares development artifacts with the community, and you're concerned about others losing access when you delete your project set (e.g., shared images in your Artifactory Project), talk to the Platform Team at PlatformServicesTeam@gov.bc.ca about options to ensure continued accessibility. We appreciate your collaboration and sharing of hard work!

---
## Shut down application and related services
Once you have completed the preparatory tasks described above, you can proceed to shutdown the application workloads. With no workloads running anymore, you can safely proceed with deletion of the project set namespaces from Registry. Here are the recommended orders of shutting down things.

### Turn off your automation
In order to successfully shutdown the application in the namespace,  start by turning off anything that could hinder the deletion of the pods:

**CI/CD pipeline**
Typically, a CI/CD pipeline automates the building and deployment of your application. Some pipelines also verify that your application components are in a specified state. For instance, if ArgoCD identifies a deployment missing pods compared to the desired state, it immediately recreates it in the namespace. Therefore, it's crucial to initially disable anything that could attempt to redeploy your app.

**PodDisruptionBudget (PDB)**
A Pod Disruption Budget (PDB) guarantees a specific number of pods running for your workload. Before scaling down your app, confirm that you've deleted all PDBs in the namespaces.

**AutoScaler**
If you've configured HorizontalAutoScalers (HPA) or VerticalAutoScalers (VPA), it's advisable to remove them before scaling down the app. This precaution is necessary in case they determine that your application needs more replicas during the shutdown.

**Cronjobs**
Cronjobs are another object that might interact with or create objects in the namespace. Ensure that those are removed as well before proceeding.

### Shutting down the app
Scale down all the running pods. Verify by running `oc get pods` to ensure that all application workloads have been shut down.

### Prepare dependent services for deletion
Most likely, you've utilized some of the Platform services or BCGov common components while running the application. It's crucial to properly offboard from those services as part of the application retirement, as they could block the Product Registry when you request to remove the project set there.

* If you have an [Artifactory project](https://artifacts.developer.gov.bc.ca), delete all the **repos** in Artifactory
* If you've setup any notification alerts from Sysdig Monitoring,  delete the [Sysdig notification channels](https://app.sysdigcloud.com/#/settings/notifications) from your Sysdig team
* If you've used [Vault](https://vault.developer.gov.bc.ca/) to store secrets, there's nothing you need to delete. However, please make sure to take a copy of the secret values that you need
* If you have team members (other than Product Owners and Technical Leads) onboarded to [ACS](https://acs.developer.gov.bc.ca/), please email PlatformServicesTeam@gov.bc.ca to request access removal

### Github
Don't overlook your application source code and relevant resources from BCGov GitHub organizations.

* Edit your main GitHub README files to include a note indicating the retirement of your application service.
* Archive all your GitHub repositories from the following GitHub Organizations:
  * [bcgov](https://github.com/bcgov)
  * [bcgov-c](https://github.com/bcgov-c)
* If you have any GitHub Actions or Webhook setup, be sure to disable them. Archiving a repo does **not** stop or disable the existing GitHub Actions workflows.
* Delete GitHub Teams if you have created any. Also request to [remove GitHub Organization access](https://github.com/bcgov/devops-requests) for team members that do not need access to the OpenShift platform.

### Delete persistent volumes
To protect users against accidental data deletion, PersistentVolumes must be removed by the user before the final automated deletion process. In each of the project's namespaces, check for the presence of any PVCs. Assess the data in the storage and ensure it's properly backed up if needed. You may need to check with colleagues to confirm that the data can be safely removed.

If you need to copy data from a PVC, one option is to start a pod that mounts the PVC, then copy it to your workstation using the `oc rsync` command.

When ready, delete all PVCs in all namespaces of the project, including the 'tools' namespace.

### Delete pods
Similar to storage, pods must be removed by the user before the automated deletion process can continue.  This ensures that the application is intentionally decommissioned by the product owner and that no parts of the application are overlooked or unprepared for removal.

* Scale down any workloads such as  Deployments and StatefulSets.

* Delete all pods in all of the project's namespaces, including the 'tools' namespace.

* Ensure that anything that might automatically create new pods has been stopped, such as CronJobs or Argo CD Applications.

**Very important to note**: The registry will not delete a project if there are any PVCs or pods in any of the namespaces.

### Delete the app in the Platform Product Registry
Log in to the [Platform Product Registry](https://registry.developer.gov.bc.ca) and select the product to be deleted.  On the product details page, click the trash can icon in the upper right corner. If it passes the pre-deletion check, you'll see a confirmation form. Review the information in the form carefully.

The deletion process will remove the following resources:

* Artifactory service accounts
* Vault role and accounts
* Sysdig teams
* Argo CD project and applications
* OpenShift namespaces

**Note that the deletion process cannot be undone!**

If you're still ready to proceed, enter the license plate and the email address of the product owner, then click the ****DELETE** button. 

### Schedule any long-term tasks
If your organization requires that you keep data related to this application for a certain period of time, document where the data is stored and when,  make arrangements for its removal after the retention period has elapsed.

### Delete any objects remaining in related services
You may have resources that are indirectly connected to your application, such as:

* Rocketchat channels and integrations (webhooks)
  * To delete an **integration** (webhook), click the Administration link that is above the left navigation bar (it looks like three vertical dots), then Workspace, then Integrations.  Select the integration and scroll to the bottom of the form.  Click the 'Delete' button.
  * To delete a **Rocket.Chat** room or channel, as above, click the Administration link that is above the left navigation bar, then Workspace, then 'Rooms'.  Select the room.  In the right navigation, scroll to the bottom of the form and click 'Delete'.  Only a room owner can delete a room.  This operation cannot be undone.
* Remove or update documentation in public or private-facing websites.
* If you've requested for other BCGov resources or Common Components, please also request for resource and access remove with the corresponding teams. Some of the common ones are Single Sign-On (SSO), S3 storage, Common Hosted Email Service (CHES) or the Common Hosted Form Service (CHEFS), etc. You can find a list of them for reference from the [Saas Directory](https://digital.gov.bc.ca/cloud/services/saas/directory/).
---
---
## Related pages 
- [Build an application](../build-deploy-and-maintain-apps/build-an-application.md)
- [Deploy an application](../build-deploy-and-maintain-apps/deploy-an-application.md)
- [Maintain an application](../build-deploy-and-maintain-apps/maintain-an-application.md)
