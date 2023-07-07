---
title: Build an application

slug: build-an-application

description: Describes how to build an application as best practices of the platform. 

keywords: OpenShift, build, application, hardening, security, ci/cd pipeline, risk mitigation, build best practices, app, requirements, best practices to build an app, data storage, best practices for image creation, database storage, design application, 

page_purpose: Describes the process to build an application in the private cloud as a Service Platform

audience: technical lead, openshift 101 students, openshift 201 students,  developers

author: Pilar Solares, Shelly Han, Cailey Jones

editor: Pilar Solares

content_owner: Olena Mitvoska

sort_order: 1
---


# Build an application 
Last updated: **July 7, 2023**

This document outlines the best practices for building applications on OpenShift.  It presents a step-by-step guide that will assist you in creating efficient applications. Overall, this page will provide a comprehensive resource to equip your team with the knowledge, resources  and techniques required to successfully develop applications on the OpenShift Platform.


## On this page
* [**Requirements to build your application**](#requirements-to-build-your-application)
* [**Design and develop your application**](#design-and-develop-your-application)
* [**Introduction to CI/CD Pipeline**](#introduction-to-cicd-pipeline)
* [**Data storage**](#data-storage)
* [**Best practices for creating your image**](#best-practices-for-creating-your-image)
* [**Related pages**](#related-pages)

<!-- ### End of "On this page" -->
---
## Requirements to build your application 
Here are ten common practices for building applications in a cloud native way that we strongly suggest your team follow before building an application on OpenShift:

1. **Learn OpenShift basics**: Acquaint your team with OpenShift's core concepts including projects, pods, services, routes and deployments. For more information we have OpenShift training available, make sure to [check it out](https://cloud.gov.bc.ca/private-cloud/support-and-community/platform-training-and-resources/)

2. **Understand application requirements**: It is important that before you build  your application your team clearly defines its requirements, including dependencies, external services and resource needs.  This is particularly important in order to plan for scalability and high availability of your application

3. **Understand containerization**: Familiarize your team with containerization concepts and technologies such as Docker.  Gain an understanding of how containers work, their benefits, and their impact on application deployment and management

4. **Gain proficiency in Kubernetes**: OpenShift is built on Kubernetes and having a fundamental understanding of it is crucial

5. **Get your team used to the command-line interface (CLI)**: OpenShift provides CLI tool (oc) to interact with the platform. Find out more on how to install it [here](https://docs.developer.gov.bc.ca/install-the-oc-command-line-tool/)

6. **Learn YAML syntax**: YAML is used in OpenShift and it helps defining deployment, configurations, service definitions, etc.  Understanding YAML can propel your ability to write and modify configuration files effectively

7. **Use Open Source**: Build apps in the open for example [public GitHub repo](https://docs.developer.gov.bc.ca/start-working-in-bcgov-github-organization/) and [using open source softwares](https://docs.developer.gov.bc.ca/evaluate-open-source-content/)

8. **Knowledge is power**: Pick modern cloud native tech stacks with community momentum, leverage the established tech community for suggestions and [reusable components](https://docs.developer.gov.bc.ca/reusable-services-list/).  Also documenting knowledge base related to the application and keeping it up to date

9. **Follow B.C. Government standards**: Building an application requires a design system, you can find more information about it [here](https://docs.developer.gov.bc.ca/about-the-design-system/). Keeping with good coding practices such as consistent readable code and comments, unit testing, standard linting format, peer review process with repo branch protection among [Security best practices](https://docs.developer.gov.bc.ca/security-best-practices-for-apps/) is vital

10. **Make use of good software development methodology**: For example, Agile and Scrum practice in combination with an effective development approach such as [Behaviour-Driven Development (BDD)](https://openpracticelibrary.com/practice/behavior-driven-development/) and [Test-Driven Development (TDD)](https://openpracticelibrary.com/practice/test-driven-development/)
---
## Design and develop your application

![Container with a checklist and security icons to describe the two points below when developing applications ](../../images/container-checklist-security.png)

When developing your application it is very important to have a team that is **conscious about the differences** when developing an application compared to traditional legacy applications.

* Developing applications in OpenShift requires a different mindset as it leverages containerization concepts, understand how to define container images, and consider microservices architecture approach for building modular and scalable applications

* When it comes to deploying your applications on OpenShift, they typically follow a review process before being made accessible. This  ensures the app meets certain standards, security requirements and of course follows  best practices.  Understand this process and factor it into your deployment timeline and expectations  
<br>

![Application maintenance considerations shows an individual sitting by their desk thinking of them](../../images/app-maintenance-graphic.png)
**Don't assume** that OpenShift will take care of all aspects of app maintenance and stability: 

* While OpenShift provides a robust platform for deploying and managing applications, it's essential to remember that app maintenance and stability are still your responsibility as a development team. OpenShift handles the underlying infrastructure and orchestration, but you need to ensure your application code, dependencies, and configurations are properly maintained and updated to ensure stability and security

* When designing your application architecture on OpenShift, consider how different components and services connect with each other. For example, keep in mind that pods, which are the smallest unit of deployment, don't restart in a specific order if they go down. Plan your application's resilience and communication patterns accordingly, considering concepts like readiness and liveness probes to handle pod failures gracefully
<br>

![Cloud with a key and below an individual to demonstrate Single Sign On](../../images/sso-graphic.png)
Think about whether **Single Sign-On (SSO) is necessary** for your app and what it would look like if implemented:

* Single Sign-On is a mechanism that allows users to authenticate once and access multiple applications seamlessly. Consider whether your application would benefit from SSO, especially if you have multiple applications within your OpenShift environment
<br> 

![Team of developers exploring different components and external tools making sure they are compatible with a container environment](../../images/common-components-external-tools.png)

**Explore the common components** available and decide if you want to integrate any of them into your app:

* OpenShift provides several common components, such as databases, message queues, and caching systems, that can be integrated into your application architecture. Evaluate these components based on your app's requirements and decide if incorporating them will enhance functionality, performance, or security. Consider how these components fit into your overall design and plan for their deployment and configuration

If you plan to use **external tools or frameworks** like WordPress, be mindful of their resource usage and compatibility with a container environment:

* External tools and frameworks, such as WordPress, may offer specific functionalities that you want to leverage in your OpenShift application. However, ensure that these tools are compatible with container environments and won't cause resource usage issues. Consider their resource requirements and evaluate if they align with the resources available within your OpenShift cluster

* Make sure your app meets your high availability requirements:
High availability ensures that your application remains accessible even during failures or high traffic situations. Evaluate your app's high availability needs and design your architecture accordingly. Consider strategies like replication, load balancing, and fault tolerance to ensure that your app remains accessible and resilient. Leverage OpenShift's capabilities, such as replica sets, deployments, and scaling mechanisms, to achieve the desired level of availability

By considering these points during the design and development phase, you can optimize your application for the OpenShift environment and ensure its stability, security, and scalability.

---
## Introduction to  CI/CD Pipeline

Before building and deploying your application, it's highly recommended to set up an automated [CI](https://openpracticelibrary.com/practice/continuous-integration/)/[CD](https://openpracticelibrary.com/practice/continuous-deployment/) pipeline as the foundation of building, testing and deploying application components on the OpenShift platform. It helps to establish good development practices, reduces the risk of errors, and streamlines the entire software development lifecycle. It fosters a culture of continuous improvement, collaboration, and reliable software delivery.

As you develop your application for deployment to the B.C. Gov Private Cloud PaaS OpenShift platform, you should create a pipeline that automatically builds and tests your code so that your software delivery is efficient and secure. Use our pipeline templates to help you get started.

There are many different CI/CD pipeline solutions, your team should pick a tech stack that is cloud native and works well with your team's setup. If you are not sure what to choose or how to start, take a look at our recommended [cloud native CI/CD pipeline solutions](https://docs.developer.gov.bc.ca/ci-cd-pipeline-templates/).

If you are looking for something that's more hands-on, try out some pipeline templates with a demo app from [this repo](https://github.com/bcgov/pipeline-templates).

---
## Data storage

Most applications need some data to persist across different sessions or connections. You should consider how to store and secure this data as part of the architecture of your application.

Your persistent data can generally be divided into two categories: files (such as images or PDFs) and database data.

### Storing files

If your application uses a limited number of files, such as image assets for a website,  you should probably store them on a `netapp-file-standard` persistent volume on the OpenShift cluster. You can find out more about persistent volume claims in our [Platform Storage](https://docs.developer.gov.bc.ca/platform-storage) documentation.

If your application uses a very large number of files (more than 10Gi) or if your application allows users to upload files, then you should consider using the OCIO Object Storage service. You can find out more about provisioning an object storage bucket from your ministry DevOps specialist, or from the [#object-storage](https://chat.developer.gov.bc.ca/channel/object-storage)  channel on RocketChat.

You can also store files inside a database, but it's generally considered bad practice. Storing files in a database can slow down its performance and consume storage that is better suited for typical database data.  If your team deals with both files and database data, it is advisable to store the files in an object storage bucket, and include a link to the file in a database table. This approach allows you to leverage the powerful querying capabilities of a database without burdening the database storage with unsuitable data.

### Database storage and software

Most teams run their own databases on the OpenShift cluster, within the same namespace as their application. That means you'll need to make your own decisions about database architecture when designing your application.

As a general rule, databases should make use of the `netapp-block-standard` persistent volume type. You can find out more about persistent volume claims in our [Platform Storage](https://docs.developer.gov.bc.ca/platform-storage) documentation.

Like everything else, databases in OpenShift must be highly-available. That's why managing a database in Openshift is slightly different from managing a database in other, more traditional architectures. You can find out more about what that means in our [High Availability Database](https://docs.developer.gov.bc.ca/high-availability-database-clusters/) documentation.

Once you understand what makes a database work in OpenShift, your next step is to choose the [right database software](https://docs.developer.gov.bc.ca/opensource-database-technologies/) for your application.

When deciding on your database software and architecture, remember that you should be able to easily backup and recover your database, if needed. Our [Database Backup Best Practices](https://docs.developer.gov.bc.ca/database-backup-best-practices/) documentation will provide a good starting point for creating a backup and recovery plan. 

---
## Best practices for creating your image

Once your application code is ready, you'll need to build an image in order to deploy it to a pod on the OpenShift cluster.

The Platform Team's [OpenShift 101](https://cloud.gov.bc.ca/private-cloud/support-and-community/platform-training-and-resources/openshift-101/) training provides a step-by-step walkthrough to build an image. If you haven't taken it already, please do so! This section will primarily  focus  on best practices for building your image - 'what you should do' rather than 'how to do it'. 

### Using prebuilt images

If you're deploying code, you'll need  a custom image for that code. However, if you're deploying a pre-existing tool as part of your application such as a database or queuing system, you may be able to use  [pre-built images from the platform](https://docs.developer.gov.bc.ca/prebuilt-images/) instead of needing to build and maintain the image yourself.

### Building a custom image with Source-to-Image (S2I)

In many cases, you can use OpenShift's Source-to-Image (S2I) method to build your image. This typically involves selecting a base image for your stack or language (e.g., a Python image if your application is built in Python) that supports S2I and providing an entry-point script. OpenShift will then make a few standard assumptions about your applications requirements based on the language. 

Using S2I means giving up precise control over the image configuration.  OpenShift and the image's creators handle the creation of suitable standards. These standards are typically well-designed and will work for basic applications. So, if your image doesn't require any specific configuration, using S2I can make the build process easier for your team and reduce the need for ongoing maintenance.

### Building a custom image with a Dockerfile

If your application requires specific configuration, you should use the [Dockerfile](https://docs.docker.com/engine/reference/builder/) build method. You'll still need a base image, but you also have  more freedom in which base image to select, since S2I compatibility is no longer required. Additionally, you must include a Dockerfile in your code repository, which should contain a full set of instructions for installing all required software and code on the image.

Creating a Dockerfile requires more effort, and it is your team's responsibility to ensure that all necessary components for your application are present on the image and kept up-to-date. On the bright side this method grants your team complete control over what gets installed on the image, where and how. If your application requires specialized configuration, the Dockerfile build method allows you to cater to those needs.

### Base Images

Whether you decide to use S2I or Dockerfile as your build method, you will need a parent image. A parent image serves as a foundation of basic configuration for your image, allowing you to build and execute your code. In some cases, the parent image may only provide essential operating system configuration. On other occasions, you can utilize a parent image that already includes the required software to run your code (for instance, an image pre-installed with Python runtimes for your Python application).

You can typically find these images in container registries such as Dockerhub, GitHub Container Registry, Google Cloud Registry, and others. These registries are open communities where anyone can upload an image for others to utilize. However, it is crucial to use images from trusted sources. In these public registries, you will usually find platform-specific indicators of community trust that can serve as a guide for selecting reliable images.

We also have access to the RedHat container registry, which serves as a private and carefully curated registry. You can access it through Artifactory at `artifacts.developer.gov.bc.ca/redhat-docker-remote`. Teams are encouraged to use images from the RedHat registry since they're more likely to be compatible with OpenShift.  Additionally, the RedHat registry provides access to [RHEL base images](https://docs.developer.gov.bc.ca/build-with-rhel-base-images/).

---
---
## Related pages
- [B.C. Government DevOps OpenShift Quickstart demo](https://github.com/bcgov/quickstart-openshift)
- [Training from the Platform Services team](https://docs.developer.gov.bc.ca/training-from-the-platform-services-team/)
- [Template for building application: Quick start OpenShift ](https://github.com/bcgov/quickstart-openshift)
- [Template for Tekton pipeline repo](https://github.com/bcgov/pipeline-templates/tree/main/tekton#tekton-pipelines)
- [Image and artifact management with Artifactory](https://docs.developer.gov.bc.ca/image-artifact-management-with-artifactory/)
