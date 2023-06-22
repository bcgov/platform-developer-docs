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

This document outlines the best practices for building applications on OpenShift.  It presents a step-by-step guide that will assist you in creating efficient applications. Overall, this page will provide a comprehensive resource to equip your team with the knowledge, resources  and techniques required to successfully develop applications on the OpenShift Platform.

## On this page
* [ **Requirements to build your application**](#requirements-to-build-your-application)
* [**Design and develop your application**](#design-and-develop-your-application)
* [**CI/CD Pipeline**](#cicd-pipeline)
* [**Database**](#database)
* [**Use Artifactory for Image Repository**](#use-artifactory-for-image-repository)
* [**Creating your image**](#creating-your-image)
* [**Related pages**](#related-pages)

<!-- ### End of "On this page" -->
## Requirements to build your application 
Here are ten common practices for building applications in a cloud native way that we strongly suggest your team follow before building an application on OpenShift:

1. Learn OpenShift basics: Acquaint your team with OpenShift's core concepts including: projects, pods, services, routes and deployments. For more information we have OpenShift training available, make sure to [check them out](https://cloud.gov.bc.ca/private-cloud/support-and-community/platform-training-and-resources/)

2. Understand application requirements: It is important that before you build  your application your team clearly defines its requirements, including dependencies, external services and resource needs.  This is particularly important in order to plan for scalability and high availability of your application

3. Understand containerization: Familiarize your team with containerization concepts and technologies like Docker.  Understand how containers work, benefits and the impact on application deployment and management

4. Gain proficiency in Kubernetes: OpenShift is built in Kubernetes and having a fundamental understanding is crucial

5. Get your team used to the command-line interface (CLI): OpenShift provides CLI tool (oc) to interact with the platform. Find out more on how to install it [here](https://docs.developer.gov.bc.ca/install-the-oc-command-line-tool/)

6. Learn YAML syntax: YAML is used in OpenShift and it helps defining deployment, configurations, service definitions, etc.  Understanding YAML can propel your ability to write and modify configuration files effectively

7. Use Open Source for building apps in the open for example [public GitHub repo](https://docs.developer.gov.bc.ca/start-working-in-bcgov-github-organization/) and [using open source softwares](https://docs.developer.gov.bc.ca/evaluate-open-source-content/)

8. Knowledge is power: Pick modern cloud native tech stacks with community momentum, leverage the established tech community for suggestions and [reusable components](https://docs.developer.gov.bc.ca/reusable-services-list/).  Also documenting knowledge base related to the application and keeping it up to date

9. Follow B.C. Government standards: Building an application requires a design system, you can find more information about it [here](https://docs.developer.gov.bc.ca/about-the-design-system/). Keeping with good coding practices such as consistent readable code and comments, unit testing, standard linting format, peer review process with repo branch protection among [Security best practices](https://docs.developer.gov.bc.ca/security-best-practices-for-apps/) is vital

10. Make use of good software development methodology: For example, Agile and Scrum practice in combination with an effective development approach such as Behaviour-Driven Development (BDD), Test-Driven Development (TDD), etc. 

## Design and develop your application


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

## Use Artifactory for Image Repository
- [Understanding the concept of Artifactory and its benefits](https://docs.developer.gov.bc.ca/image-artifact-management-with-artifactory/)
- [Pulling images from Artifactory](https://docs.developer.gov.bc.ca/push-pull-artifacts-artifactory/)
- [Configuring your OpenShift environment to pull images](https://docs.developer.gov.bc.ca/setup-artifactory-project-repository/)
- [Authenticating and accessing images from Artifactory](https://docs.developer.gov.bc.ca/setup-artifactory-service-account/)
- [Handling versioning and dependency management](https://docs.developer.gov.bc.ca/best-practices-for-managing-image-streams/)

## Creating your image
(recommend using S2I as an easier option, if you need more control then you can make a docker file - link to external docs on how to make a dockerfile)
- Understanding the need for custom images
- Utilizing OpenShift's Source-to-Image (S2I) feature for easy image creation
- Building custom images with Dockerfiles for more control
- Pushing and deploying custom images in OpenShift 
- [Using RHEL base images](https://docs.developer.gov.bc.ca/build-with-rhel-base-images/)
- [Leveraging pre-built images from the platform](https://docs.developer.gov.bc.ca/prebuilt-images/)


---
## Related pages
- [OpenShift Quick Start Demo](https://github.com/bcgov/quickstart-openshift)
