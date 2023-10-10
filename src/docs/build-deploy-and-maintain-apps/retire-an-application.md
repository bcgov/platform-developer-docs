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

## Delete application

### Delete any persistent volumes on the cluster

- The registry won't delete the namespace if they're still there
- Make 100% sure everything is backed up somewhere else :)

### Delete the app in the registry

- Just what it says on the tin
- This'll delete the namespace in Openshift, any Artifactory projects/accounts, your Vault namespace, any Sysdig teams.

### Delete any objects remaining in related services

- Rocketchat webhooks and channels
- Anything hosted on common components
- Anything to remove in Backstage (once it comes out)?

### Schedule any long-term tasks

- If your data retention policy requires that you keep data for 6 more months, schedule something to delete your backups 7 months from now (and the removal of any related services, like an S3 bucket or whatever)
