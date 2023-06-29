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
* [**Requirements to build your application**](#requirements-to-build-your-application)
* [**Design and develop your application**](#design-and-develop-your-application)
* [**CI/CD Pipeline**](#cicd-pipeline)
* [**Database**](#database)
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

10. Make use of good software development methodology: For example, Agile and Scrum practice in combination with an effective development approach such as Behaviour-Driven Development (BDD) and Test-Driven Development (TDD)

## Design and develop your application

When developing your application it is very important to have a team that is conscious about the differences when developing an application compared to traditional legacy applications.

![Container with a checklist and security icons to describe the two points below when developing applications ](../../images/container-checklist-security.png)

* Developing applications in OpenShift requires a different mindset as it leverages containerization concepts, understand how to define container images, and consider microservices architecture approach for building modular and scalable applications

* When it comes to deploying your applications on OpenShift, they typically follow a review process before being made accessible. This  ensures the app meets certain standards, security requirements and of course follows  best practices.  Understand this process and factor it into your deployment timeline and expectations  

Don't assume that OpenShift will take care of all aspects of app maintenance and stability: 

![Application maintenance considerations shows an individual sitting by their desk thinking of them](../../images/app-maintenance-graphic.png)

* While OpenShift provides a robust platform for deploying and managing applications, it's essential to remember that app maintenance and stability are still your responsibility as a development team. OpenShift handles the underlying infrastructure and orchestration, but you need to ensure your application code, dependencies, and configurations are properly maintained and updated to ensure stability and security

* When designing your application architecture on OpenShift, consider how different components and services connect with each other. For example, keep in mind that pods, which are the smallest unit of deployment, don't restart in a specific order if they go down. Plan your application's resilience and communication patterns accordingly, considering concepts like readiness and liveness probes to handle pod failures gracefully

Think about whether Single Sign-On (SSO) is necessary for your app and what it would look like if implemented:

![Cloud with a key and below an individual to demonstrate Single Sign On](../../images/sso-graphic.png)

* Single Sign-On is a mechanism that allows users to authenticate once and access multiple applications seamlessly. Consider whether your application would benefit from SSO, especially if you have multiple applications within your OpenShift environment

Explore the common components available and decide if you want to integrate any of them into your app:

![Team of developers exploring different components and external tools making sure they are compatible with a container environment](../../images/common-components-external-tools.png)

* OpenShift provides several common components, such as databases, message queues, and caching systems, that can be integrated into your application architecture. Evaluate these components based on your app's requirements and decide if incorporating them will enhance functionality, performance, or security. Consider how these components fit into your overall design and plan for their deployment and configuration

If you plan to use external tools or frameworks like WordPress, be mindful of their resource usage and compatibility with a container environment:

* External tools and frameworks, such as WordPress, may offer specific functionalities that you want to leverage in your OpenShift application. However, ensure that these tools are compatible with container environments and won't cause resource usage issues. Consider their resource requirements and evaluate if they align with the resources available within your OpenShift cluster

* Make sure your app meets your high availability requirements:
High availability ensures that your application remains accessible even during failures or high traffic situations. Evaluate your app's high availability needs and design your architecture accordingly. Consider strategies like replication, load balancing, and fault tolerance to ensure that your app remains accessible and resilient. Leverage OpenShift's capabilities, such as replica sets, deployments, and scaling mechanisms, to achieve the desired level of availability

By considering these points during the design and development phase, you can optimize your application for the OpenShift environment and ensure its stability, security, and scalability.

## CI/CD Pipeline

Before building and deploying your application, it's highly recommended to setup an automated CI/CD pipeline as the foundation of building, testing and deploying application components on the OpenShift platform. It helps to establish good development practices, reduces the risk of errors, and streamlines the entire software development lifecycle. It fosters a culture of continuous improvement, collaboration, and reliable software delivery.

As you develop your application for deployment to the B.C. Gov Private Cloud PaaS OpenShift platform, you should create a pipeline that automatically builds and tests your code so that your software delivery is efficient and secure. Use our pipeline templates to help you get started.

There are many different CI/CD pipeline solutions, your team should pick a tech stack that is cloud native and works well with your team's setup. If you are not sure what to choose or how to start, take a look at our recommended [cloud native CI/CD pipeline solutions](https://docs.developer.gov.bc.ca/ci-cd-pipeline-templates/).

If you are looking for something that's more hands-on, try out some pipeline templates with demo app from [this repo](https://github.com/bcgov/pipeline-templates).


## Database
- Choosing the [right database](https://docs.developer.gov.bc.ca/opensource-database-technologies/) for your application
- Setting up and configuring databases in OpenShift 
- Handling data persistence and [backups](https://docs.developer.gov.bc.ca/database-backup-best-practices/)
- Implementing database scaling and replication
- Working with [High Availablity Databases](https://docs.developer.gov.bc.ca/high-availability-database-clusters/)
  - MongoDB Replicaset: https://github.com/bcgov/mongodb-replicaset-container
  - Patroni Postgres: https://github.com/bcgov/patroni-postgres-container

<!-- ### Move section to Deployment   
## Use Artifactory for Image Repository
- [Understanding the concept of Artifactory and its benefits](https://docs.developer.gov.bc.ca/image-artifact-management-with-artifactory/)
- [Pulling images from Artifactory](https://docs.developer.gov.bc.ca/push-pull-artifacts-artifactory/)
- [Configuring your OpenShift environment to pull images](https://docs.developer.gov.bc.ca/setup-artifactory-project-repository/)
- [Authenticating and accessing images from Artifactory](https://docs.developer.gov.bc.ca/setup-artifactory-service-account/)
- [Handling versioning and dependency management](https://docs.developer.gov.bc.ca/best-practices-for-managing-image-streams/)
  -->


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
