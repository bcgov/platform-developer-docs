---
title: Reture an application

slug: retire-an-application

description: Describes how to retire an application as best practices of the platform. 

keywords: OpenShift, retire, application, hardening, security, ci/cd pipeline, risk mitigation, app, requirements, data storage, best practices for image creation, database storage, design application, 

page_purpose: Describes the process to retire an application in the private cloud as a Service Platform

audience: technical lead, openshift 101 students, openshift 201 students,  developers

author: Pilar Solares, Shelly Han, Cailey Jones

editor: Pilar Solares

content_owner: Olena Mitvoska

sort_order: 1
---


# Retire an application 
Last updated: **date**

This document outlines the best practices for retiring applications on OpenShift.  It presents a step-by-step guide that will assist you in removing, shutting down and archiving the various parts of your application across our 


## On this page
* [**Requirements to build your application**](#requirements-to-build-your-application)
* [**Design and develop your application**](#design-and-develop-your-application)
* [**Introduction to CI/CD Pipeline**](#introduction-to-cicd-pipeline)
* [**Data storage**](#data-storage)
* [**Best practices for creating your image**](#best-practices-for-creating-your-image)
* [**Related pages**](#related-pages)

<!-- ### End of "On this page" -->
---
## Preparing to retire your application

This section is about the tasks your team should take before you actually shut down your application.

### Policy Requirements

- Are there any legal requirements related to the shutdown of your app?
- Data retention?
- Do you need to keep your PIA/STRA or whatever?

### Communication

- Communicate with your team about the schedule/policy stuff
- Document any policy-related requirements about data retention or whatever
- Communicate with users
- Tell the TLS people that you won't need another cert
- Discuss the termination of any licenses (for EDB or whatever)

### Backups

- Need to backup data? Where? Not on the cluster!
- Remember to back-up secrets, especially if you're backing up data. Your vault will get deleted, so don't use that.

## Shut down and delete your application and related services
Once you have completed the preparatory tasks described above, you can proceed to shutdown the application workloads. With no workloads running anymore, you can safely proceed with deletion of the project set namespaces from Registry. Here are the recommended orders of shutting down things.

### Turn off your automation
In order to successfully shutdown the application in the namespace, you'll need to first turn off anything that might interfere with the deletion of the pods:

**CI/CD pipeline**
In general, a CI/CD pipeline is in charge of automatically building and deployment your application, some of them will also ensure your application components are in specified state. For example, when ArgoCD detects a deployment is missing pods compared to the desired state, it will immediately recreate it in the namespace. Thus, it's important to first turn off anything that might try to redeploy your app.

**PodDisruptionBudget (PDB)**
A PDB will ensure that there are a certain number of pods running for your workload. Before scaling down your app, make sure you have deleted all the PDBs in the namespaces.

**AutoScaler**
If you have setup HorizontalAutoScalers (HPA) or VerticalAutoScalers (VPA), it's a good idea to also remove them before scaling the app in case they consider your application need more replicas during the shutdown.

**Cronjobs**
Cronjobs are another object that might be used to interact with or create objects in the namespace, make sure those are removed as well.


### Shutting down the app
Scale down all the running pods. You can run `oc get pods` to make sure the all the application workloads have been shutdown.

### Prepare dependent platform services for deletion
Most likely you've leveraged some of the Platform services or BCGov common components while running the application. It's important to properly offboard from those services as part of the application retirement, otherwise they will block the Product Registry when you request to remove the project set there.

- If you have an [Artifactory project](https://artifacts.developer.gov.bc.ca), you need to delete all the **repos** in Artifactory.
- If you have setup any notification alerts from Sysdig Monitoring, make sure to delete the [Sysdig notification channels](https://app.sysdigcloud.com/#/settings/notifications) from your Sysdig team.
- If you have used [Vault](https://vault.developer.gov.bc.ca/) to store secrets, there's nothing you need to delete. But please take a copy of the secret values that you need.
- If you have team members (other than Product Owners and Technical Leads) onboarded to [ACS](https://acs.developer.gov.bc.ca/), please email PlatformServicesTeam@gov.bc.ca to request access removal.


### Github
Don't forget your application source code and relevant resources from BCGov GitHub organizations.
- Edit your main Github README files with a note to indicate the retirement of your application service.
- Archive all your Github repos from the following GitHub Organizations:
    - [bcgov](https://github.com/bcgov)
    - [bcgov-c](https://github.com/bcgov-c)
    - [enterprise GitHub](https://github.com/enterprises/bcgov-ent)
    - [BCDevOps](https://github.com/bcdevops)
- If you have any GitHub Actions or Webhook setup, make sure to disable them. Archiving a repo does NOT stop or disable the existing GitHub Actions workflows.
- Delete GitHub Teams if you have created any. Also request to [remove GitHub Organization access](https://github.com/BCDevOps/devops-requests) for team members that do not need access to the OpenShift platform.

### Delete any objects remaining in related services
You may have resources that are indirectly connected to your application, such as:
- Rocketchat channels and integrations (webhooks)
    - To delete an **integration** (webhook), click the Administration link that is above the left navigation bar (it looks like three vertical dots), then Workspace, then Integrations.  Select the integration and scroll to the bottom of the form.  Click the 'Delete' button.
    - To delete a Rocketchat room or channel, as above, click the Administration link that is above the left navigation bar, then Workspace, then 'Rooms'.  Select the room.  In the right navigation, scroll to the bottom of the form and click 'Delete'.  Only a room owner can delete a room.  This operation cannot be undone.
- Remove or update documentation in public or private-facing websites.
- If you've requested for other BCGov resources or Common Components, please also request for resource and access remove with the corresponding teams. Some of the common ones are Single Sign-On (SSO), S3 storage, Common Hosted Email Service (CHES) or the Common Hosted Form Service (CHEFS), etc. You can find a list of them for reference from the [Saas Directory](https://digital.gov.bc.ca/cloud/services/saas/directory/).


### Delete persistent volumes
In order to protect users against accidental deletion of data, PersistentVolumes must be removed by the user prior to the final, automated deletion process.  In each of the project's namespaces, check for the presence of any PVCs.  Consider what data might be in the storage and if it is properly backed up, if needed.  You may need to check with colleagues to be sure that the data can be safely removed.

If you need to copy data from a PVC, one option is to start a pod that mounts the PVC, then copy it to your workstation using the `oc rsync` command.

When ready, delete all PVCs in all namespaces of the project, including the 'tools' namespace.

### Delete pods
Similar to storage, pods must be removed by the user before the automated deletion process can continue.  This is to ensure that the application is intentionally decommissioned by the product owner and that no parts of the application are overlooked or unprepared for removal.

Scale down any Deployments, DeploymentConfigs, or StatefulSets.

Delete all pods in all of the project's namespaces, including the 'tools' namespace.

Ensure that anything that might automatically create new pods has been stopped, such as CronJobs or Argo CD Applications.

The registry will not delete a project if there are any PVCs or pods in any of the namespaces.

### Delete the app in the registry
Log in to <a href="https://registry.developer.gov.bc.ca" target="_blank">the registry</a> and select the product to be deleted.  On the product detail page, click on the trash can icon in the upper right corner of the page.  If it passes the pre-deletion check, you will be presented with a confirmation form.  Carefully review the information in the form.

The deletion process will remove the following resources:
* Artifactory service accounts
* Vault role and accounts
* Sysdig teams
* Argo CD project and applications
* OpenShift namespaces

**Note that the deletion process cannot be undone!**

If you're still ready to proceed, enter the license plate and the email address of the product owner, then click the DELETE buton.  

### Schedule any long-term tasks
If your organization requires that you keep data related to this application for a certain period of time, be sure to document where the data has been stored and when, and make arrangements for its removal after the retention period has passed.  

