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
Last updated: **February 4, 2025**

This document outlines the best practices for building applications on OpenShift.  It presents a step-by-step guide that will assist you in creating efficient applications. Overall, this page will provide a comprehensive resource to equip your team with the knowledge, resources  and techniques required to successfully develop applications on the OpenShift Platform.


## On this page
* [**Requirements to build your application**](#requirements-to-build-your-application)
* [**Design and development considerations**](#design-and-development-considerations)
* [**Project set quotas and adjustment requests**](#project-set-quotas-and-adjustment-requests)
* [**Setting up an automated CI/CD Pipeline**](#setting-up-an-automated-cicd-pipeline)
* [**Data storage considerations**](#data-storage-considerations)
* [**Best practices for creating your image**](#best-practices-for-creating-your-image)
* [**Related pages**](#related-pages)

<!-- ### End of "On this page" -->
---
## Requirements to build your application 
Here are ten common practices for building applications in a cloud native way that we strongly suggest your team follow before building an application on OpenShift:

1. **Learn OpenShift basics**: Understand OpenShift's core concepts including projects, pods, services, routes and deployments. Sign up for the [OpenShift training](https://digital.gov.bc.ca/cloud/services/private/support/#platform)

2. **Define application requirements**: Clearly define its requirements, including dependencies, external services and resource needs for scalability and high availability

3. **Understand containerization**: Learn how Docker and containers impact deployment and management

4. **Learn Kubernetes fundamentals**: OpenShift is built on Kubernetes, so basic knowledge is essential

5. **Use the command-line interface (CLI)**: OpenShift provides CLI tool (oc) to interact with the platform. Learn how to [how to install it](../openshift-projects-and-access/install-the-oc-command-line-tool.md)

6.  **Understand YAML syntax**: YAML is essential in OpenShift and it helps defining deployment, configurations, service definitions, etc. YAML can propel your ability to write and modify configuration files effectively

7. **Use Open Source**: Build apps in the open for example [public GitHub repo](../../bc-developer-guide/use-github-in-bcgov/start-working-in-bcgov-github-organization/) and [using open source softwares](../../bc-developer-guide/use-github-in-bcgov/evaluate-open-source-content/)

8. **Review reusable components**: Pick modern cloud native tech stacks with community momentum, leverage the established tech community for suggestions and [reusable components](../reusable-code-and-services/reusable-services-list.md). Also documenting knowledge base related to the application and keeping it up to date

9. **Follow B.C. government standards**: Ensure compliance with  [privacy guidelines](../security-and-privacy-compliance/privacy-compliance-and-guidance.md), understand the [security controls](../security-and-privacy-compliance/platform-security-compliance.md) in place for OpenShift that actively protects applications and data. Stay up to date with [security best practices](../security-and-privacy-compliance/security-best-practices-for-apps.md) 

10. **Adopt Agile methodologies**: Use an effective development approaches such as [Behaviour-Driven Development (BDD)](https://openpracticelibrary.com/practice/behavior-driven-development/) and [Test-Driven Development (TDD)](https://openpracticelibrary.com/practice/test-driven-development/) for efficiency 

---
## Design and development considerations 
Developing applications in OpenShift requires a cloud-native mindset. By considering these points during the design and development phase, you can optimize your application for the OpenShift environment and ensure its stability, security, and scalability:

* Adopt containerization: Design applications using container images and microservices for modularity and scalability

* Prepare for deployment reviews: OpenShift requires application review before deployment to meet security and compliance standards.  Understand this process and factor it into your deployment timeline and expectations  

* Maintain and update application stability: OpenShift manages infrastructure and orchestration, but your team remains responsible for code, dependencies and configurations

* Plan service interactions: Ensure pods can restart independently and use readiness and liveness probes for resilience. For example, keep in mind that pods, the smallest unit of deployment, don't restart in a specific order if they go down

* Consider Single Sign-On (SSO): Determine if SSO benefits your application and plan its implementation when designing your application architecture on OpenShift. 

* Leverage built-in components: Use OpenShift's databases, message queues and caching systems for optimized performance. Evaluate these components based on your app's requirements and decide if incorporating them will enhance functionality, performance, or security. Consider how these components fit into your overall design and plan for their deployment and configuration

* Optimize resource usage: Ensure that external tools or frameworks like WordPress align with OpenShift's containerized environment and won't cause resource usage issues. Consider their resource requirements and evaluate if they align with the resources available within your OpenShift cluster

* Ensure high availability: Design for redundancy, consider strategies like replication, load balancing and fault tolerance to maintain application uptime architecture accordingly. Leverage OpenShift's capabilities, such as replica sets, deployments, and scaling mechanisms, to achieve the desired level of availability

## Project set quotas and adjustment requests

OpenShift provides new project sets with predefined CPU, RAM, and storage allocations. [Review OpenShift project resource quotas](../automation-and-resiliency/openshift-project-resource-quotas.md) to understand CPU requests, memory, and storage limits. 
If your application requires additional resources, follow the prerequisites and steps to [request a quota adjusment](../automation-and-resiliency/request-quota-adjustment-for-openshift-project-set.md).

## Setting up an automated CI/CD Pipeline

Automating build, test, and deployment processes with  [Continuous Integration](https://openpracticelibrary.com/practice/continuous-integration/) / [Continuous Deployment](https://openpracticelibrary.com/practice/continuous-deployment/) (CI/CD) pipeline ensures efficient and secure software delivery. It also fosters a culture of continuous improvement and collaboration.
Choose a cloud-native CI/CD pipeline that fits your team’s workflow. [Explore recommended CI/CD pipeline solutions](../automation-and-resiliency/cicd-pipeline-templates-for-private-cloud-teams.md) or if you prefer a hands-on approach, try pipeline templates with a demo app from this [GitHub repo](https://github.com/bcgov/pipeline-templates).

## Data storage considerations

Most applications need some data to persist across different sessions or connections. You should consider how to store and secure this data as part of the architecture of your application. Your persistent data can generally be divided into two categories: files (such as images or PDFs) and database data.

### Storing files

* Use `netapp-file-standard` persistent volumes for small storage. You can find out more about persistent volume claims in our [Platform Storage](../platform-architecture-reference/platform-storage.md) documentation

* Choose OCIO Object Storage for large-scale file storage (more than 100Gi) or user-uploaded files

* Avoid storing files in a database (also known as "blobs"), as it degrades performance. Instead, store your files according to the recommendations in the previous two points, and then reference file locations in a database table. This approach allows you to leverage the powerful querying capabilities of a database without burdening the database storage with unsuitable data.

### Database storage and software

* Run databases within your OpenShift namespace using `netapp-block-standard` persistent volumes 

* Always use [persistent volumes](../platform-architecture-reference/platform-storage.md) for database storage to ensure data durability and availability 

* Ensure databases meet [high-availability standards](../database-and-api-management/high-availability-database-clusters.md)

* Understand what makes a database work in OpenShift, your next step is to choose the [right database software](../database-and-api-management/opensource-database-technologies.md) for your application

* Plan for backups and recovery follow the [Database Backup Best Practices](../database-and-api-management/database-backup-best-practices.md) documentation as it will provide a good starting point for creating a backup and recovery plan

## Best practices for creating your image

Once your application code is ready, you'll need to build an image in order to deploy it to a pod on the OpenShift cluster. [OpenShift 101](https://digital.gov.bc.ca/cloud/services/private/support/openshift-101/) training provides a step-by-step walkthrough to build an image. If you haven't taken it already, please do so! 
This section will primarily  focus  on best practices for building your image - 'what you should do' rather than 'how to do it'. 

### Using prebuilt images

Use OpenShift's prebuilt images for common tools like databases and message queues to reduce maintenance overhead. If you're deploying code, you'll need  a custom image for that code. However, if you're deploying a pre-existing tool as part of your application such as a database or queuing system, you may be able to use  [pre-built images from the platform](../build-deploy-and-maintain-apps/prebuilt-images.md) instead of needing to build and maintain the image yourself.

### Building a custom image with Source-to-Image (S2I)

In many cases, you can use OpenShift's Source-to-Image (S2I) method to build your image. This typically involves selecting a base image for your stack or language (e.g., a Python image if your application is built in Python) that supports S2I and providing an entry-point script. OpenShift will then make a few standard assumptions about your applications requirements based on the language. 

Using S2I means giving up precise control over the image configuration.  OpenShift and the image's creators handle the creation of suitable standards. These standards are typically well-designed and will work for basic applications. So, if your image doesn't require any specific configuration, using S2I can make the build process easier for your team and reduce the need for ongoing maintenance.

### Building a custom image with a Dockerfile

If your application requires specific configuration, you should use the [Dockerfile](https://docs.docker.com/engine/reference/builder/) build method. You'll still need a base image, but you also have  more freedom in which base image to select, since S2I compatibility is no longer required. Additionally, you must include a Dockerfile in your code repository, which should contain a full set of instructions for installing all required software and code on the image.

Creating a Dockerfile requires more effort, and it is your team's responsibility to ensure that all necessary components for your application are present on the image and kept up-to-date. On the bright side this method grants your team complete control over what gets installed on the image, where and how. If your application requires specialized configuration, the Dockerfile build method allows you to cater to those needs.

### Base Images

Whether you decide to use S2I or Dockerfile as your build method, you will need a parent image. A parent image serves as a foundation of basic configuration for your image, allowing you to build and execute your code. In some cases, the parent image may only provide essential operating system configuration. On other occasions, you can utilize a parent image that already includes the required software to run your code (for instance, an image pre-installed with Python runtimes for your Python application).

You can typically find these images in container registries such as Dockerhub, GitHub Container Registry, Google Cloud Registry, and others. These registries are open communities where anyone can upload an image for others to utilize. However, it is crucial to use images from trusted sources. In these public registries, you will usually find platform-specific indicators of community trust that can serve as a guide for selecting reliable images.

We also have access to the RedHat container registry, which serves as a private and carefully curated registry. You can access it through Artifactory at `artifacts.developer.gov.bc.ca/redhat-docker-remote`. Teams are encouraged to use images from the RedHat registry since they're more likely to be compatible with OpenShift.  Additionally, the RedHat registry provides access to [RHEL base images](../build-deploy-and-maintain-apps/build-with-rhel-base-images.md).

---
## Related pages
- [Deploy an application](../build-deploy-and-maintain-apps/deploy-an-application.md)
- [Maintain an application](../build-deploy-and-maintain-apps/maintain-an-application.md)
- [Retire an application](../build-deploy-and-maintain-apps/retire-an-application.md)
- [B.C. Government DevOps OpenShift Quickstart demo](https://github.com/bcgov/quickstart-openshift)
- [Training from the Platform Services team](../training-and-learning/training-from-the-platform-services-team.md)
- [Template for building application: Quick start OpenShift ](https://github.com/bcgov/quickstart-openshift)
- [Template for Tekton pipeline repo](https://github.com/bcgov/pipeline-templates/tree/main/tekton#tekton-pipelines)
- [Image and artifact management with Artifactory](../build-deploy-and-maintain-apps/image-artifact-management-with-artifactory.md)
- [Install the oc command line tool](../openshift-projects-and-access/install-the-oc-command-line-tool.md)
