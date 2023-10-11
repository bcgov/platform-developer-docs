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

## Shut down your application and related services

### Turn off CI/CD pipeline

- Turn off anything that might try to redeploy your app after you shut it down like Argo syncs or scheduled deployments.
- Delete any cronjobs, PDBs, or anything that might interfere with the shutdown of the pods and stuff.

### Shutting down the app

- Scale down your pods, but don't delete stuff (yet)

### Prepare dependent services for deletion

- If you have an Artifactory project, you need to delete all the repos in it, or else you can't delete the project later
- Any similar requirements for Sysdig? Vault? ACS?
- Request the deletion of your S3 bucket, if applicable
- Request deletion of SSO stuff
- Anything you need to do to prep for the deletion of common components?

### Github

- Edit your main Github READMEs with a note about how the app is no longer active
- Archive all your Github repos
- Remove github org access for team members as appropriate (but make sure they're not on other teams, first)

### Delete any objects remaining in related services
You may have resources that are indirectly connected to your application, such as:
* Rocketchat channels and integrations (webhooks)
* Accounts in Common Components, like the Common Hosted Email Service (CHES) or the Common Hosted Form Service (CHEFS)
* Documentation in public or private-facing websites

**Rocketchat**

To delete an **integration** (webhook), click the Administration link that is above the left navigation bar (it looks like three vertical dots), then Workspace, then Integrations.  Select the integration and scroll to the bottom of the form.  Click the 'Delete' button.

To delete a Rocketchat room or channel, as above, click the Administration link that is above the left navigation bar, then Workspace, then 'Rooms'.  Select the room.  In the right navigation, scroll to the bottom of the form and click 'Delete'.  Only a room owner can delete a room.  This operation cannot be undone.

For other services, consult their documentation for the removal process.

## Delete application
Once you have completed the preparatory tasks described above, you can proceed with the deletion of the project's namespaces in OpenShift, but there are a few more steps to take.

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

