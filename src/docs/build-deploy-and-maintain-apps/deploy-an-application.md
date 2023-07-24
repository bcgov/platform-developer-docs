---
title: Deploy an application

slug: deploy-an-application

description: Describes how to deploy an application as best practices of the platform. 

keywords: OpenShift, deploy, application, deployment, deploy application, 

page_purpose: Describes the process to deploy an application in the Private Cloud as a Service Platform

audience: technical lead, openshift 101 students, openshift 201 students,  developers

author: Billy Li

editor: Pilar Solares

content_owner: Olena Mitvoska

sort_order: 2
---
# Deploy an Application 
Last updated: **July 17, 2023**

Welcome to the OpenShift Application Deployment site! This page is dedicated to providing you with comprehensive insights and best practices on effectively deploying your team's application in the OpenShift platform. 

We assume you already know the best practices mentioned in [Build your application](https://docs.developer.gov.bc.ca/build-an-application/) if not, make sure to check it out before continuing with this part of the guide. 

We will cover deployment strategies, configuring resources, scaling options and important assets. 

## On this page
* [**Introduction to OpenShift deployment  and its features**](#introduction-to-openshift-deployment-and-its-features)
* [**Introduction to application deployment with OpenShift**](#introduction-to-application-deployment-with-openshift)
* [**Preparing for deployment**](#preparing-for-deployment)
* [**Deploying the application**](#deploying-the-application)
* [**Configuring deployment**](#configuring-deployment)
* [**Configuring networking and routes**](#configuring-networking-and-routes)
* [**Testing the deployment**](#testing-the-deployment)
* [**Monitoring and Logging**](#monitoring-and-logging)
* [**Scaling and managing the application**](#scaling-and-managing-the-application)
* [**Continuous deployment and maintenance**](#continuous-deployment-and-maintenance)
* [**Handling Data Storage in OpenShift**](#handling-data-storage-in-openshift)
* [**Securing the deployed application**](#securing-the-deployed-application)
* [**Conclusion**](#conclusion)
* [**Related pages**](#related-pages)
<!-- ### End of "On this page" -->
---

## Introduction to OpenShift deployment and its features

In the landscape of container orchestration platforms, Red Hat's OpenShift is an industry front-runner, offering comprehensive solutions to deploy, manage, and scale containerized applications with unique advantages:

- **Self-Service Application Stacks:** Instant access to a variety of application stacks to accelerate development
- **SCM Integration:** Seamless integration with SCM tools like Git for direct deployment from repositories
- **Build Automation:** Supports various build strategies and automatic application updates upon source code changes
- **Deployment Strategies:** Multiple deployment strategies for zero downtime releases
- **Service Discovery & Load Balancing:** Automatic service discovery and efficient load balancing of traffic
- **Automated Rollbacks:** Simplified rollback to previous application versions
- **Integrated Developer Tools:** In-built developer tools for a complete developer experience
- **Integrated Metrics and Logging:** Utilizes Prometheus metrics and centralized log management for insights and monitoring

---

## Introduction to application deployment with OpenShift

Deploying applications in OpenShift involves orchestrating application images within Pods, providing network connectivity via Services, and exposing them to users through Routes, appropriate network policy. 

This process works hand-in-hand with the build process, detailed in our [build an application](https://docs.developer.gov.bc.ca/build-an-application/) documentation . Following sections will dive deeper into each deployment stage.

---

## Preparing for Deployment

### 1. Verifying the successful build of the application and access to Image Registry

Before deploying your application on OpenShift, it's crucial to verify a successful build of your application. A successful build will push the application's image to an image registry. 

OpenShift can pull images from various sources, including [Artifactory](https://docs.developer.gov.bc.ca/image-artifact-management-with-artifactory/), [Docker.io](http://docker.io/) (Docker Hub), [Quay.io](http://quay.io/), OpenShift's integrated registry, and the RedHat image repository. 

Ensure that you have access to the registry where your image resides. If you encounter any issues, review the build logs to diagnose the problem, make sure that the credential you have for image registry is correct or make sure the service account `image-puller` has enough access.

### 2. Reviewing the Application's Requirements for Deployment

Every application has unique requirements for deployment. These may include environment variables, application secrets, configuration data, and database connectivity, among others. Review all these required parameters and ensure they works fine before deployment. 

**Remember** that sensitive data like API keys or credentials should be stored in [vault](https://docs.developer.gov.bc.ca/vault-getting-started-guide/) in OpenShift.

### 3. Ensuring the Availability of Necessary Resources in OpenShift

OpenShift allows you to fine-tune resources like CPU, memory, and storage for your application's pods. Before deploying, ensure that the necessary resources are available in OpenShift. Your application should have enough resources to perform efficiently but not too much, which can be wasteful. 

For guidance on resource tuning, refer to this [documentation](https://docs.developer.gov.bc.ca/application-resource-tuning/). You can also watch this [video](https://www.youtube.com/watch?v=rkxVZgn9icU&t=14s) for more explanation. Understanding and adjusting these resources according to your application's needs is a critical aspect of deployment preparation.

---

## Deploying the application

### 1. Creating a deployment using OpenShift CLI or Web Console

To deploy an application, you can use the OpenShift CLI (`oc new-app`) or the web console. Both offer the same capabilities and your choice will be dependent on personal preference. More information can be found in the [official OpenShift documentation](https://docs.openshift.com/container-platform/latest/applications/application_life_cycle_management/creating-applications-using-cli.html).

### 2. Configuring resource limits and scaling options

Resource limits and scaling options are an important part of managing application performance and availability. 

OpenShift allows you to set resource limits (CPU and memory) for each Container in your deployments, which can prevent a Pod from using more resources than necessary. 

Scaling options allow your application to adapt to different load levels by adjusting the number of running Pods.  The best practice is to provide the suitable resources to your application is to monitoring its normal and peak performance, and decide resources quota and number of replicas dependently. 

This is covered in detail in the [official OpenShift documentation](https://docs.openshift.com/container-platform/latest/nodes/clusters/nodes-cluster-resource-configure.html).

### 3. Get the manifest file from live instance to store as infrastructure as code

Infrastructure as Code (IaC) is a best practice for managing and provisioning technology stacks through machine-readable definition files, rather than physical hardware configuration. You can extract the configuration of a live object in OpenShift as a YAML or JSON manifest file and store it in your version control system, for example Git. This practice makes it easy to track changes, replicate configurations, and recover from mishaps. 

---

## Configuring deployment

### 1. Understanding deployment configurations and their components

Deployment Configurations  in OpenShift are a recipe for deploying your application. They consist of the following are considered as most important field:

- **Pod Template:** This defines the desired state of the pods being deployed, including the base image, ports to expose, and environment variables
- **Replicas:** The number of instances of your application that should be maintained
- **Selectors:** Labels that identify the pods managed by the deployment configuration
- **Triggers:** Events that will cause a new deployment. `DeploymentConfig` and `BuildConfig` both support image triggers and configuration change triggers. Additionally, Deployments and StatefulSets can also use [image triggers](https://docs.openshift.com/container-platform/4.12/openshift_images/triggering-updates-on-imagestream-changes.html) which initiate updates when an image stream tag that the triggering resource points to is updated.

Understanding these components is essential for correctly configuring your application's deployment. To read more about other configuration options, use `oc explain` command or this [kubernetes official documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).

### 2. Defining deployment strategies

OpenShift natively supports two deployment strategies:

- **Rolling Deployment:** Updates the application gradually while keeping it available. Useful when you need zero-downtime deployments
- **Recreate Deployment:** Replaces the entire application at once.Suitable when your application can tolerate downtime

More complex strategies need to be set up explicitly:
- **Blue-Green Deployment:** Swaps old and new applications in one operation, minimizing downtime. Requires double the resources
- **Canary Deployment:** Deploys the new version to a small subset of users before rolling it out to everyone

Choose the strategy that best meets your application's needs and expectations, considering factors like downtime tolerance, resource availability, and testing needs.

### 3. Setting up environment variables for the application

Environment variables can be defined in the `env` field of the Pod specification and can reference secrets, ConfigMaps, or just be plain text. For sensitive information, it is best to use Vault services. OpenShift can integrate with Vault to inject secrets directly into pods at runtime. This provides an extra layer of security for sensitive data. Find more information on [using Vault](https://docs.developer.gov.bc.ca/vault-secrets-management-service/).

---

## Configuring networking and routes

### 1. NetworkPolicies

Network policies (NetworkPolicies) are Kubernetes resources that control the traffic between pods and networks. They use labels to select pods and define rules which specify what traffic is allowed. The aim is to provide a secure network for your applications running on OpenShift. 

To give a deployment a very specific network policy is always the best practice to keep your application safe. For a detailed guide, read the [network policies](https://docs.developer.gov.bc.ca/openshift-network-policies/) documentation.

### 2. Exposing services using routes

In OpenShift, a `Route` is a way to expose a service at a specific host name, like www.google.ca. If you do not specify a hostname, OpenShift will automatically assign one based on a default pattern, typically including the service name and namespace name. The DNS resolver for the host name must point to the router's service IP address. Useful links:

1. Red Hat's [route official documentation](https://docs.openshift.com/container-platform/latest/networking/routes/route-configuration.html)
2. [How do I get a custom vanity URL for my application in Openshift?](https://stackoverflow.developer.gov.bc.ca/questions/172/176#176)
3. [Openshift Service and Route](https://www.densify.com/openshift-tutorial/openshift-route/)


### 3. Configuring SSL/TLS Certificates

Security is a critical part of any application deployment. With OpenShift, you can secure your routes with SSL/TLS certificates. For obtaining and managing free SSL/TLS certificates, Certbot is available. It automates the tasks related to obtaining and renewing certificates and configuring web servers to use them. Learn how to use it by checking out [this BCDevOps GitHub](https://github.com/BCDevOps/certbot) guide to Certbot.

---

## Testing the deployment

### 1. Verifying the application's functionality post-deployment

After deploying your application, it's critical to ensure that it's working as expected. You should test all the features of your application in a controlled environment. 

Pay special attention to any changes made during this deployment to ensure they have been applied successfully.

### 2. Performing Smoke Tests or Automated Tests

Smoke testing involves executing a subset of test cases that cover the most important functionality of a system, to ascertain if crucial features of the system are working as expected. 

On the other hand, automated tests are scripts that run automatically to verify the behavior of the system. Both are key to catching any major issues early in the deployment process. This can be done manually, or you can use tools to automate these tests. 

One of the tools that is available is called n8n, we have a repo that has well-documented instruction of how to leveraging this tool [here](https://github.com/bcgov/put/blob/main/docs/Introduction.md).

### 3. Disaster Recovery Testing

Disaster recovery testing is crucial for ensuring your application can handle system failures and recover quickly. This includes testing the backup and restore functionality and the high availability setup of your application. 

The goal is to minimize downtime and data loss in case of a disaster. Having your deployment configuration as Infrastructure as Code (IaC) would be really helpful for this task.

Read here for more [disaster recover plan](https://github.com/bcgov/platform-developer-docs/blob/main/src/docs/automation-and-resiliency/namespace-recovery-and-responsibilities.md).

---

## Monitoring and Logging

### 1. Setting up application monitoring and health checks

OpenShift provides robust monitoring capabilities to ensure your application is running as expected. You can utilize services like [Sysdig](https://docs.developer.gov.bc.ca/sysdig-monitor-onboarding/) for monitoring the health and performance of your application, and [Uptime.com](https://uptime.com/) for availability monitoring.

- **Alerts**: Proactive alerting is crucial for maintaining system reliability. Alerts notify you of potential issues before they become critical problems. Sysdig provides features to create alerts based on certain conditions. Learn more about [setting up alert channels in Sysdig](https://docs.developer.gov.bc.ca/sysdig-monitor-create-alert-channels/)

- **Monitoring Dashboard**: Sysdig allows you to set up a monitoring dashboard for your application. Check out this [video tutorial](https://www.youtube.com/watch?v=K4rkSCSq3C4&list=PL9CV_8JBQHiorxwU-2nA8aqM4KTzdCnfg) on how to set up your Sysdig monitoring dashboard

### 2. Configuring Application Logs with Kibana

Logs are critical for debugging and understanding the behaviour of your application. OpenShift integrates with Kibana for log aggregation. This allows you to collect, index, and visualize logs in a centralized location. For a detailed guide on [how to configure and use Kibana](https://stackoverflow.developer.gov.bc.ca/questions/906).

---

## Scaling and managing the application

### 1. Scaling the application horizontally and vertically

Scaling is a crucial part of managing your application in OpenShift. There are two ways to scale your application:

- **Horizontal Scaling**: This involves adding or removing instances of your application to match demand. It is generally used when you expect your application to serve an increasing number of requests and need more instances to handle the load. This is beneficial for applications designed with a stateless architecture.

- **Vertical Scaling**: This involves increasing or decreasing resources like CPU and memory available to your application's instances. It is used when your application needs more computational power or memory to handle tasks. This is particularly beneficial for data-intensive applications, such as databases or applications running complex computations.

Choosing the appropriate scaling method depends on your application's architecture and the nature of the workloads it handles.

Effective resource management ensures your application has the resources it needs without wasting any. This involves setting appropriate resource limits and requests, and adjusting these as necessary based on monitoring and performance testing.

### 2. Auto-scaling and Pod Disruption Budgets (PDB)

OpenShift supports auto-scaling of applications, which allows the number of running instances to automatically adjust based on resource utilization or other metrics. This uses the Horizontal Pod Autoscaler (HPA) feature to automatically scale the number of pods based on CPU usage or other selected metric. It's important however to allow at least one pod in a group to be disrupted to allow for platform patching.

In addition, OpenShift also supports Pod Disruption Budgets (PDB), a feature that limits the number of pods of an application that are down simultaneously from voluntary disruptions. This ensures that a certain number or percentage of pods will remain running, making your application more resilient to disruptions. 

### 3. Rollback

In case of a problematic deployment or other issues, you may need to rollback your application to a previous version. OpenShift provides features to rollback deployments to a previous state quickly.

### 4. Updating the Application

When you need to update your application's code or configuration, Infrastructure as Code (IoC) can help ensure your changes are applied consistently and reliably across your environments. Always update your changes in the manifest code repository. This not only helps in tracking your application's update history but also serves as a basis for continuous delivery pipelines. Applying changes via IoC promotes consistency and reduces the likelihood of manual errors during the update process.

---

## Continuous deployment and maintenance

### 1. Integrating the Deployment Process into a CI/CD Pipeline

By integrating your deployment process into a Continuous Integration/Continuous Deployment (CI/CD) pipeline streamlines your application updates, bug patches, and overall maintenance. This automated process ensures that every code change is automatically built, tested, and deployed, reducing manual errors and enhancing productivity. 

OpenShift seamlessly integrates with Tekton, empowering you to create robust CI/CD systems. With Tekton, pipeline workflows can be defined in YAML format, introducing the concept of "pipeline as code." This makes pipelines reusable, version-controlled, and easily manageable. Take advantage of Tekton's predefined pipeline configurations available in the [Tekton pipeline templates](https://github.com/bcgov/pipeline-templates). 

To efficiently manage deployments across clusters, OpenShift provides ArgoCD as an operator. It follows the practice of using Git as a 'source of truth' for declarative infrastructure and applications. ArgoCD follows the best practice of using Git as the "source of truth" for declarative infrastructure and applications.

Explore more about [ArgoCD](https://github.com/BCDevOps/openshift-wiki/blob/b1a4e6db91932fd3f29705a5c8ee44983abf8763/docs/ArgoCD/argocd_info.md)  along with [CI/CD pipeline templates](https://docs.developer.gov.bc.ca/ci-cd-pipeline-templates/).

### 2. Version Management in CD

Maintaining applications within a CD context heavily relies on version control, ensuring comprehensive tracking of changes, contributors, and timelines.

OpenShift seamlessly integrates with popular version control systems, such as Git, enabling effective version tracking and triggering deployments upon codebase updates. Additionally, OpenShift leverages image tags to monitor different versions of container images.

Image tags offer a flexible reference to images that can be modified over time, facilitating efficient implementation of versioning strategies, including semantic versioning.

Nevertheless, it is crucial to exercise caution when managing mutable tags. For detailed insights into best practices for image stream and tag management in OpenShift, please refer to the documentation on [best practices for manageing image streams](https://docs.developer.gov.bc.ca/best-practices-for-managing-image-streams/) .

### 3. Backup and Restoration in a CD Context

Regularly [backing up your application data](https://docs.developer.gov.bc.ca/recovery-responsibilities/) is crucial for safeguarding against potential risks. In a CD context, you can automate and integrate backup processes into your deployment pipeline, ensuring that backups stay up to date with any changes made. 

These backups serve as reliable resources for effective restoration in the event of data loss or a disaster. OpenShift offers diverse strategies for backup and restoration to cater to your specific requirements.

---

## Handling Data Storage in OpenShift

### 1. Understanding Persistent Storage

In OpenShift, applications operate within ephemeral containers that do not retain file state upon restart. However, if your applications require data or state persistence across sessions or instances, OpenShift offers a valuable feature known as Persistent Storage. This feature enables you to allocate a dedicated portion of the storage infrastructure to your application, ensuring data durability.

For a deep dive into persistent storage, we recommend referring to the OpenShift [Persistent Storage documentation](https://docs.openshift.com/container-platform/4.12/storage/understanding-persistent-storage.html) which provides in-dept insights and guidance. 

### 2. Configuring Persistent Volume Claims (PVCs)

Persistent Volume Claims (PVCs) empower users to request storage with specific size and access mode requirements. By utilizing PVCs within your applications, you can ensure data persistence across different deployments or instances of your application. PVCs serve as a reliable mechanism for maintaining data continuity and integrity in OpenShift.

A comprehensive guide on how to use PVCs in your deployments can be found on the [platform storage documentation](https://docs.developer.gov.bc.ca/platform-storage/).

### 3. Backing Up and Restoring Data

Data loss is a critical issue that needs attention in any environment, including OpenShift. To address this concern, the B.C. government has developed the  `backup-container` application specifically for backing up and restoring data within OpenShift.   It's designed to provide a consistent way to back up the state of applications running in OpenShift. 

You can learn more about this from the [backup-container GitHub page](https://github.com/bcgov/backup-container-compliance-enforcement). Also refer to the disastory recover documentation [Persistent volumes section](https://docs.developer.gov.bc.ca/recovery-responsibilities/#persistent-volumes) that we mentioned eariler. 

---
## Securing the deployed application

### 1. Implementing Security Measures for the Application


Ensuring security is a paramount concern throughout every stage of application deployment. It involves implementing principles like least privilege, safeguarding sensitive data, and consistently scanning for vulnerabilities in code and container images. [Advanced Cluster Security (ACS)](https://acs.developer.gov.bc.ca/) is a valuable tool that offers comprehensive functionalities for image scanning, vulnerability management, and compliance checks. 

By leveraging ACS, you can enhance your security measures and effectively mitigate potential risks in your OpenShift environment.

### 2. Configuring Access Controls and Permissions

Effective access management is a crucial aspect of securing your application, and OpenShift offers robust access control capabilities to address this need. With OpenShift, you can manage permissions at the project level, granting you the ability to control access to specific resources within your environment. 

This granular control empowers you to define and regulate who has access to what, enhancing the overall security of your application deployment in OpenShift. 

For more guidance, please read this [OpenShift Access Control Guide](https://docs.developer.gov.bc.ca/grant-user-access-openshift/).

The Registry app is a valuable tool that provides a UI for managing project access within our OpenShift Clusters. This app need IDIR authentification and can be access through [here](https://registry.developer.gov.bc.ca/).

### 3. Appropriate Role, Service Account (SA), and Role Binding 

When it comes to CI/CD or other automated tasks, it is considered a best practice to grant the minimum required permissions. OpenShift facilitates this by employing a combination of roles, service accounts, and role bindings. Roles establish a specific set of permissions, service accounts serve as identities for processes running within Pods, and role bindings link roles to users, creating a comprehensive permission structure. 

Service Accounts play a crucial role in security by allowing you to control permissions for processes running inside a Pod, separate from the user responsible for managing or creating the Pod. Service Account tokens further enhance security by enabling non-human operators like applications or CI/CD pipelines to authenticate against the API without using user credentials. These tokens do not expire, unlike tokens issued to human users, simplifying the authentication process. 

 For more information, refer to the OpenShift [RBAC documentation](https://docs.openshift.com/container-platform/4.12/authentication/using-rbac.html).

 ---

## Conclusion

### A recap of the Key Points Discussed

Throughout this guide, we have provided you with best practices for deploying applications in OpenShift, a robust and flexible platform. Our coverage included a comprehensive understanding of OpenShift deployments, pre-deployment preparations, application configuration and deployment, networking and routes setup, deployment testing, monitoring and logging, application scaling and management, as well as the implementation and maintenance of continuous deployment.

We explored the essential aspects of data storage management in OpenShift and emphasized the significance of securing your deployed applications. Each of these steps plays a pivotal role in achieving efficient deployment and operation within the OpenShift environment.

It's important to note that this guide only provides an introduction to the vast range of capabilities OpenShift has to offer. As OpenShift continues to evolve,  new features will be introduced, expanding the possibilities even further. The more you engage with OpenShift, the more confident and innovative you'll become in deploying and managing your applications. 

We highly encourage you to dive deeper, experiment with new concepts, and continuously explore the vast capabilities of OpenShift. To expand your knowledge and stay updated with the latest best practices and features, we recommend regularly referring to the official OpenShift and the B.C. government developer [documentation](https://developer.gov.bc.ca/), as it is a great resource to expand your knowledge and stay up-to-date with the latest best practices and features.

Happy deploying!

---
---

## Related pages
- [Build an application](https://docs.developer.gov.bc.ca/build-an-application/)
