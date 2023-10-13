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

### Policy Requirements

Before you begin planning the technical steps of shutting down your app, you should make sure you're aware of any laws or policies that you could be required to follow.

For example, make sure your team is aware of data retention policies for your application. Do you need to keep your app's data for a certain amount of time? If so, where do you intend to store it? If the data needs to be accessed after the application is shut down, how do you plan to do that? You should consider these sorts of questions for any policy or law that might apply to your application after it's been shut down.

Contact your ministry IMB if you're not sure what policies or legislation might apply to your application.

### Communication

Before shutting down your application, you should communicate the shut-down plans to any stakeholders and users.

Make sure you have clearly documented the answers to any of the policy-related questions from the previous step, and ensure that your team (or whoever might be responsible for adhering to those laws and policies in the future) knows where to find that documentation.

Communicate the schedule for shutting down your application clearly with any users of your application, any relevant stakeholders like executives, as well as your own team and division. It's a good idea to communicate this schedule more than once. At least one communication should be done early in the process, to give as much notice as possible. Then, you should send out reminders of the upcoming shutdown closer to the date, and a final communication once the application is offline.

You'll also want to update any ServiceNow or iStore orders for TLS certificates, to let them know that you won't be renewing the certificate.

If you make use of any licensed products for your application (such as Enterprise DB or any licensed libraries), you should reach out to the vendor to discuss terminating the license.

### Backups

If you need to keep backups of any data once your application is offline, you'll need to find somewhere to store there data. You won't be able to store your data on the OpenShift cluster or within any of the services offered by the Platform Team once you've deleted your project set from the Product Registry.

The OCIO's S3-compatible object-storage service is a good option for storing data after your application has been shut down. If you're retaining data in the form of database dump files, remember that you'll need a way to recover that data into a running database in order to access it again. Make sure you have a plan for doing so, once you no longer have access to your project set in OpenShift.

Note that all of your OpenShift secrets and your Vault folder will be deleted once you delete your project set from the Product Registry. Make absolutely certain that you have saved any necessary passwords somewhere safe. If you're planning to retain any database data, remember that you'll need to keep the login credentials for your database users in order to access your backups. You'll also want to keep the access credentials for your S3 bucket (or wherever else you plan to store your data off-cluster). 

If your team has development artifacts that you've shared with the community and you're concerned that others will lose access to those objects when you delete your project set (like, for example, any images you've stored in your Artifactory Project but have shared with others), then please speak to the Platform Team about options for ensuring that these objects remain accessible. And we thank you for sharing your hard work with others!

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
