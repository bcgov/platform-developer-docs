---
title: Build an application

slug: build-an-application

description: Describes how to build an application as best practices of the platform. 

keywords: OpenShift, build, application, hardening, security, SAST, DAST, PaaS, Risk Mitigation, build best practices, app 

page_purpose: Describes the process to build an application in the private cloud as a Service Platform

audience: technical lead, openshift 101 students, openshift 201 students,  developers

author: TBD

editor: Pilar Solares

content_owner: TBD

sort_order: 1
---


# Build an Application 
Last updated: **DATE**

Purpose of page description goes here 

## On this page
* [**LINK**](#link) 
* [**Related pages**](#related-pages)

<!-- ### End of On this page -->

<!-- ### The following topics are listed as suggestions - still to be discussed with subject matter expert  -->

## Create the code for your application
-  Choosing the programming language and framework
- Setting up your development environment 
- Creating the basic structure of your application 
- Implementing application logic and functionality
- Testing and debugging your code 
## CI/CD Pipeline (link to pipeline templates)
- Setting up a continuous integration (CI) environment
- Configuring your CI tools and integrating with OpenShift 
- Automating the build and deployment process
- Implementing database scaling and replication (Patroni)
- Working with MongoDB images and best practices 

## Database (link to DB Best Practices doc, mention Patroni and MongoDB images)
- Choosing the right database for your application
- Setting up and configuring databases in OpenShift 
- Handling data persistence and backups
- Implementing database scaling and replication (Patroni) 
- Working with MongoDB images ans best practices 
## Select a good base image from Artifactory
(link to Artifactory doc for how to pull an image through Artifactory)
- Pulling images from Artifactory
- Understanding the concept of Artifactory and its benefits
- Configuring your OpenShift environment to pull images
- Authenticating and accessing images from Artifactory
- Handling versioning and dependency management 

## Creating your image 
(recommend using S2I as an easier option, if you need more control then you can make a docker file - link to external docs on how to make a dockerfile)
- Understanding the need for custom images
- Utilizing OpenShift's Source-to-Image (S2I) feature for easy image creation
- Building custom images with Dockerfiles for more control
- Pushing and deploying custom images in OpenShift 




---
## Related pages 