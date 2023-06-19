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
## Design and develop your application
Here are some common practices for building applications in a cloud native way that we expect your team to have the skill and knowledge before starting on OpenShift:

- follow [12 Factor App Guidance](https://12factor.net/)
- use Open Source, both building apps in the open, for example on a [public GitHub repo](https://docs.developer.gov.bc.ca/start-working-in-bcgov-github-organization/) and [using open source softwares](https://docs.developer.gov.bc.ca/evaluate-open-source-content/). 
- pick modern cloud native tech stacks with community momentum, leverage the established tech community for suggestions and [reusable components](https://docs.developer.gov.bc.ca/reusable-services-list/)
- build app according to the BCGov standards, such as [BCGov design guidance](https://docs.developer.gov.bc.ca/about-the-design-system/)
- keep good coding practices, such as consistent readable code and comments, unit testing, standard linting format, PR review process with repo branch protection, etc.
- apply [best security practices](https://docs.developer.gov.bc.ca/security-best-practices-for-apps/) while designing and building the app
- use good software development methodology. For example, Agile and Scrum practice in combination with an effective development approach, such as Behavior-Driven Development (BDD), Test-Driven Development (TDD), etc.
- document knowledge base related to the app and keep it up-to-date

## CI/CD Pipeline
- Choosing a [cloud native CI/CD pipeline solutions](https://docs.developer.gov.bc.ca/ci-cd-pipeline-templates/)
- Setting up a continuous integration (CI) environment and [pipeline templates repo](https://github.com/bcgov/pipeline-templates)
- Configuring your CI tools and integrating with OpenShift 
- Automating the build and deployment process

## Database
- Choosing the [right database](https://docs.developer.gov.bc.ca/opensource-database-technologies/) for your application
- Setting up and configuring databases in OpenShift 
- Handling data persistence and [backups](https://docs.developer.gov.bc.ca/database-backup-best-practices/)
- Implementing database scaling and replication
- Working with [High Availablity Databases](https://docs.developer.gov.bc.ca/high-availability-database-clusters/)
  - MongoDB Replicaset: https://github.com/bcgov/mongodb-replicaset-container
  - Patroni Postgres: https://github.com/bcgov/patroni-postgres-container

### Links 
* [Mongo](https://github.com/bcgov/mongodb-replicaset-container)
* [Patroni](https://github.com/bcgov/patroni-postgres-container)
* [HA database doc](https://docs.developer.gov.bc.ca/high-availability-database-clusters/) 

## Select a good base image from Artifactory
- [Image and artifact management with Artifactory ](https://docs.developer.gov.bc.ca/image-artifact-management-with-artifactory/#image-and-artifact-management-with-artifactory)
- Understanding the concept of Artifactory and its benefits 
- Pulling images from Artifactory 
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