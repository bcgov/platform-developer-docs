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

# Deploy an application

Last updated: **February 19, 2025**

Welcome to the OpenShift Application Deployment site! This guide provides comprehensive insights and best practices for deploying applications on the OpenShift platform. Before proceeding, ensure you are familiar with the best practices outlined in [Build your application](../build-deploy-and-maintain-apps/build-an-application.md). If not, review them first to streamline your deployment process.

We will cover deployment strategies, resource configuration, scaling options and essential deployment assets to help you optimize and manage your application effectively.

RedHat's OpenShift simplifies the deployment, management and scaling of containerized applications. Key features include:

- **Self-Service application stacks** - Predefined stacks to accelerate development
- **SCM integration** - Seamless integration with SCM tools like Git for direct deployment
- **Automated builds** - Supports various build strategies with automatic updates
- **Deployment strategies and automated rollbacks** - Rolling updates and rollback options for zero downtime
- **Service discovery and load balancing**  - Automatic service discovery and efficient load balancing of traffic
- **Integrated developer tools** - Built-in CLI and web console for simplified workflows
- **Centralized monitoring and logging** - Uses Prometheus for metrics and built-in logging tools

## On this page

- [**Prepare for deployment**](#prepare-for-deployment)
- [**Deployment**](#deployment)
- [**Manage deployment configuration**](#managing-deployment-configuration)
- [**Configure networking and routes**](#configure-networking-and-routes)
- [**Test the deployment**](#test-the-deployment)
- [**Monitoring and logging**](#monitoring-and-logging)
- [**Scale and manage the application**](#scale-and-manage-the-application)
- [**Continuous deployment and maintenance**](#continuous-deployment-and-maintenance)
- [**Handle data storage in OpenShift**](#handle-data-storage-in-openshift)
- [**Secure the deployed application**](#secure-the-deployed-application)
- [**Conclusion**](#conclusion)
- [**Related pages**](#related-pages)
<!-- ### End of "On this page" -->

## Prepare for deployment

### 1. Verify application build and image availability

Before deployment, ensure that:

- The application builds successfully
- The container image is stored in a registry
- You have the correct access credentials for the registry. (e.g. verifying the `image-puller` role in OpenShift)

OpenShift supports images from various sources, including:

- **OpenShift Image Streams** - Tracks image versions within OpenShift, enabling automated updates via triggers. However, images managed this way are not shareable between different clusters  
- **Artifactory** - A centralized repository for managing application artifacts, including container images. While OpenShift natively supports image streams, organizations often use Artifactory for:
  - A single, standardized repository for **all** application artifacts (not just containers)  
  - Additional scanning, caching, or proxying capabilities provided by an external repository  
  - Sharing images across multiple clusters
  - Find more details on [image and artifact management with Artifactory](../build-deploy-and-maintain-apps/image-artifact-management-with-artifactory.md)
- **External registries** - Supports sources such as [Docker Hub](http://docker.io/), [Quay.io](https://quay.io/) or RedHat image repository

### 2. Review application requirements

Every application has specific deployment needs, such as:

- **Environment variables and secrets** - Store sensitive data like API keys or credentials in [vault](../secrets-management/vault-getting-started-guide.md)
- **Configuration settings** - Ensure correct application settings before deployment
- **Database connectivity** - Validate database access and credentials

### 3. Ensure adequate resources

Allocate sufficient CPU, memory and storage based on expected workload. OpenShift allows resource tuning for optimal performance. For guidance, refer to [resource tuning](../automation-and-resiliency/application-resource-tuning.md) guide and this YouTube video about [CPU and memory utilization](https://www.youtube.com/watch?v=rkxVZgn9icU&t=14s).

---

## Deployment

### 1. Choose a deployment method

You can deploy using:

- OpenShift CLI (`oc new-app`) - More on [how to install the oc command line](../openshift-projects-and-access/install-the-oc-command-line-tool.md)
- [Web console](../openshift-projects-and-access/login-to-openshift.md)

Both offer the same capabilities and your choice will be dependent on personal preference. More information can be found in the [official OpenShift documentation](https://docs.openshift.com/container-platform/4.13/applications/creating_applications/creating-applications-using-cli.html).

### 2. Configure resource limits and scaling

To optimize performance and availability:

- Set resource limits (CPU and memory) for each container in your deployments to prevent overuse
- Enable auto-scaling to adjust pod replicas based on traffic

Best practice: Monitor performance under normal and peak loads, then set decide appropriate quotas  resources and number of replicas dependently. This is covered in detail in the [official OpenShift documentation](https://docs.openshift.com/container-platform/latest/nodes/clusters/nodes-cluster-resource-configure.html).

### 3. Configure networking and routes

To expose the application externally:

- Define services to route internal traffic
- Create routes to make the application publicly accessible. If external access is not needed, skip route configuration
- Export the manifest file from a live instance (`oc get deployment -o yaml`) to store it as Infrastructure as Code (IaC) section

Infrastructure as Code (IaC) is a best practice for managing and provisioning technology stacks through machine-readable definition files, rather than physical hardware configuration. You can extract the configuration of a live object in OpenShift as a YAML or JSON manifest file and store it in your version control system, for example Git. This practice makes it easy to track changes, replicate configurations, and recover from mishaps.

---

## Managing deployment configuration

### 1. Understand deployment components

A deployment in OpenShift consists of:

- **Strategy** - Defines the strategy used for updating the Deployment. The default strategy is RollingUpdate, where new pods are gradually rolled out while old pods are terminated. Recreate is the other option, where it deletes all old Pods before creating new ones
- **Pod Template** - Defines container specification (desired state of the pods being deployed), base image, ports and environment variables
- **Replicas** - Number of instances that should be maintained
- **Selectors** - Labels that identify the pods managed by the deployment configuration
- **Triggers** - Image triggers update deployments when a new version is available
Understanding these components is essential for correctly configuring your application's deployment. To read more about other configuration options, use `oc explain` command or this [kubernetes official documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).

### 2. Choose a deployment strategy

OpenShift natively supports two deployment strategies:

- **Rolling Deployment** Updates the application gradually while keeping it available. Useful when you need zero-downtime deployments
- **Recreate Deployment** Replaces the entire application at once.Suitable when your application can tolerate downtime

Teams may also implement:

- **Blue-Green Deployment** Swaps old and new applications in one operation, minimizing downtime. Requires double the resources
- **Canary Deployment** Deploys the new version to a small subset of users before rolling it out to everyone

Choose the strategy that best meets your application's needs and expectations, considering factors like downtime tolerance, resource availability, and testing needs.

### 3. Setting up environment variables for the application

Environment variables can be defined in the `env` field of the Pod specification and can reference secrets, ConfigMaps, or just be plain text. For sensitive information, it is best to use Vault services. OpenShift can integrate with Vault to inject secrets directly into pods at runtime. This provides an extra layer of security for sensitive data. Find more information on [using Vault](../secrets-management/vault-secrets-management-service.md).

---

## Configure networking and routes

### Networking in a deployment guide

Although networking can be managed separately, setting up how your application is accessed (or restricted) is essential for functional deployment. Without proper configuration, your deployed app may not be accessible to the intended users.

### 1. Network Policies

Network policies control traffic flow at the pod level defining which inbound and outbound connections are allowed. This enhances security and ensures controlled communication. 

Applying a specific network policy to a deployment is a best practice for to enhance security. For a detailed guide, learn more about the [network policies](../platform-architecture-reference/openshift-network-policies.md) guide.

### 2. Exposing services using routes

In OpenShift, a `Route` provides external access to an internal service. You can specify a custom hostname or use an automatically generated one. Ensure the DNS entry points to the OpenShift Router service. Useful links:

1. Red Hat's [route official documentation](https://docs.openshift.com/container-platform/latest/networking/routes/route-configuration.html)
2. [How do I get a custom vanity URL for my application in Openshift?](https://stackoverflow.developer.gov.bc.ca/questions/172/176#176)
3. [Openshift Service and Route](https://www.densify.com/openshift-tutorial/openshift-route/)

### 3. Configuring SSL/TLS Certificates

Security is a critical part of any application deployment. In OpenShift, you can secure routes with SSL/TLS certificates. To obtain a certificate from the OCIO Identity Management Services - Entrust Certificate Services, you must first generate a Certificate Signing Request (CSR) and submit it through My Services. Once issued, you can install the certificate on your application route to enable secure communication.

---

## Test the deployment

### 1. Verify the application's functionality post-deployment

After deploying your application, verifying its functionality is crucial to prevent issues in production. Test all features in a controlled environment, paying special attention to changes made during deployment.

### 2. Perform smoke tests or automated tests

Smoke testing verifies the most important functionalities of a system to ensure it works as expected. Automated tests are scripts that run to validate system behavior. Both help catch major issues early in the deployment process.

One available automation tool is n8n, an open-source workflow automation tool. Detailed instructions on leveraging this tool are available in this [GitHub repository](https://github.com/bcgov/put/blob/main/docs/Introduction.md).

### 3. Test disaster recovery

Disaster recovery testing ensures your application can handle system failures and recover quickly. This includes testing backup and restore functionality and high availability setups.

Maintaining deployment configurations as Infrastructure as Code (IaC) helps ensure consistency and simplifies disaster recovery.

Read more about [disaster recover plan](https://github.com/bcgov/platform-developer-docs/blob/main/src/docs/automation-and-resiliency/namespace-recovery-and-responsibilities.md).

---

## Monitoring and logging

### 1. Set up application monitoring and health checks

OpenShift provides robust monitoring capabilities to ensure your application is running as expected. Services like [Sysdig](../app-monitoring/sysdig-monitor-onboarding.md) help monitor health and performance, while [Uptime.com](https://uptime.com/) tracks availability.

- **Alerts** -  Proactively notify teams about potential system failures or performance issues. Sysdig enables creating alerts based on specific conditions. Learn more about [setting up alert channels in Sysdig](../app-monitoring/sysdig-monitor-create-alert-channels.md)

- **Monitoring dashboard** - Sysdig allows setting up monitoring dashboards for applications. Watch this [video tutorial](https://www.youtube.com/watch?v=K4rkSCSq3C4&list=PL9CV_8JBQHiorxwU-2nA8aqM4KTzdCnfg) on configuring a Sysdig monitoring dashboard

### 2. Configure application logs with Kibana

Logs are essential for debugging and understanding application behaviour. OpenShift integrates with Kibana for centralized log aggregation. Learn more about [configuring Kibana](https://stackoverflow.developer.gov.bc.ca/questions/906).

---

## Scale and manage the application

### 1. Scale the application horizontally and vertically

Scaling ensures applications meet demand efficiently. There are two primary scaling methods:

- **Horizontal Scaling** - Increases or decreases the number of application instances based on demand. This method is beneficial for stateless applications that need to handle fluctuating traffic

- **Vertical Scaling** - Adjusts resources (CPU and memory) allocated to an application instance. This is useful for data-intensive applications running complex computations

Choosing the appropriate scaling method depends on your application's architecture and workloads characteristics. Effective resource management, including setting appropriate resource limits and requests (based on monitoring and testing), ensures optimal performance without waste.

### 2. Auto-scaling and Pod Disruption Budgets (PDB)

OpenShift supports **auto-scaling** using the Horizontal Pod Autoscaler (HPA), which adjusts the number of running pods based on resource utilization metrics such as CPU usage. To ensure platform maintenance, allow at least one pod in a group to be disrupted.

Additionally, **Pod Disruption Budgets (PDB)** help maintain application availability by defining the minimum number of pods that must remain operational during voluntary disruptions, ensuring resilience.

### 3. Rollback deployments

In the event of deployment issues, OpenShift allows to rollback your application to a previous version. This feature minimizes downtime and mitigates risks associated with failed updates.

### 4. Update the application

Infrastructure as Code (IaC) ensures consistent and reliable updates. Always update your application configuration in the manifest code repository to track changes and support continuous deployment pipelines. Using IaC reduces the likelihood of manual errors and promotes deployment consistency.

---

## Continuous deployment and maintenance

### 1. Integrate deployment into a CI/CD Pipeline

Automating deployment with a **CI/CD pipeline** enhances efficiency by streamlining application updates, bug patches reducing errors.

- **Tekton** - OpenShift integrates with **Tekton**, empowering you to create robust CI/CD systems. With Tekton, pipeline workflows can be defined in YAML format, introducing the concept of "pipeline as code." This makes pipelines reusable, version-controlled, and easily manageable. Tekton's predefined pipeline configurations are available in the [Tekton pipeline templates](https://github.com/bcgov/pipeline-templates)

- **ArgoCD** - For multi-cluster management, OpenShift provides ArgoCD, which uses Git as the "source of truth" for declarative infrastructure and application configurations. Learn more about [ArgoCD](https://github.com/bcgov/openshift-wiki/blob/b1a4e6db91932fd3f29705a5c8ee44983abf8763/docs/ArgoCD/argocd_info.md)  along with [CI/CD pipeline templates](../automation-and-resiliency/cicd-pipeline-templates-for-private-cloud-teams.md)

### 2. Version management in Continuos Deployment (CD)

Version control plays a crucial role in tracking changes, maintaining contributor history and ensuring reliable deployment records.

OpenShift seamlessly integrates with Git for source code versioning and leverages **image tags** to manage container image versions, including semantic versioning efficiently. The integration supports automated workflows and rollback capabilities, reducing deployment risks.

To maintain consistency and avoid potential conflicts, adhere to best practices for **image stream** and **tag management** in OpenShift. Proper versioning ensures reproducibility and stability across environments. It's crucial to exercise caution when managing mutable tags, refer to  [best practices for managing image streams](../build-deploy-and-maintain-apps/imagestreams.md) for detailed guidance on optimizing your image management strategy.

### 3. Backup and restoration (CD context)

Regularly [backing up your application data](../automation-and-resiliency/namespace-recovery-and-responsibilities.md) is crucial for safeguarding against potential risks. In a CD context, you can automate and integrate backup processes into your deployment pipeline, ensuring that backups stay up to date with any changes made.

These backups serve as reliable resources for effective restoration in the event of data loss or a disaster. OpenShift offers diverse strategies for backup and restoration to cater to your specific requirements.

---

## Handle data storage in OpenShift

### 1. Understand persistent storage

OpenShift’s **persistent storage** enables data persistence beyond container restarts. This ensures application state and data integrity across deployments. The feature enables you to allocate a dedicated portion of the storage infrastructure to your application, ensuring data durability. Detailed information is available in the [OpenShift Persistent Storage](https://docs.openshift.com/container-platform/4.12/storage/understanding-persistent-storage.html) guide.

### 2. Configure Persistent Volume Claims (PVCs)

**Persistent Volume Claims (PVCs)** allow applications to request storage with specified size and access requirements. Using PVCs ensure data persistence across different deployments or instances of your application. PVCs serve as a reliable mechanism for maintaining data continuity and integrity in OpenShift. For guidance, refer to the [platform storage documentation](../platform-architecture-reference/platform-storage.md).

### 3. Backup and restore data

To safeguard data, leverage OpenShift's `backup-container` specifically for backing up and restoring data. It's designed to provide a consistent way to back up the state of applications running in OpenShift.  Learn more details in depth with the [backup-container GitHub page](https://github.com/bcgov/backup-container-compliance-enforcement). Also refer to the disaster recovery in the [persistent volumes section](../automation-and-resiliency/namespace-recovery-and-responsibilities.md#persistent-volumes).

---

## Secure the deployed application

### 1. Implement security measures

Security best practices include enforcing **least privilege access**, protecting sensitive data and scanning for vulnerabilities in code and container images. Use [Advanced Cluster Security (ACS)](https://acs.developer.gov.bc.ca/) for image scanning, vulnerability management and compliance checks.

Leveraging **ACS**, can enhance security measures and effectively mitigate potential risks in your OpenShift environment.

### 2. Configure access controls and permissions

OpenShift’s role-based access control (RBAC) allows to manage permissions at the project level, granting you the ability to control access to specific resources within your environment. Manage access using the OpenShift Access Control Guide or leverage the [Platform Services Product Registry](https://registry.developer.gov.bc.ca/)) for self-service project access management.

The granular control empowers you to define and regulate who has access to what, enhancing the overall security of your application deployment in OpenShift. For more guidance, please read this [OpenShift Access Control Guide](../openshift-projects-and-access/grant-user-access-openshift.md).

### 3. Appropriate role, Service Account (SA) and role binding

To enhance security, grant minimum required permissions for CI/CD and automated tasks. OpenShift’s security model includes:

- **Roles**: Define a specific set of permissions

- **Service Accounts (SA)**: Serve as identifies for processes running with Pods (separate from the user responsible for managing or creating the Pod). Service Account tokens further enhance security by enabling non-human operators like applications or CI/CD pipelines to authenticate against the API without using user credentials. These tokens do not expire, unlike tokens issued to human users, simplifying the authentication process

- **Role bindings**: Link roles to users

For more information, refer to the OpenShift [RBAC documentation](https://docs.openshift.com/container-platform/4.12/authentication/using-rbac.html).

---

## Conclusion

### Key takeaways

This guide covered essential best practices for deploying and managing applications in OpenShift, including:

- Application pre-deployment preparation, configuration and deployment
- Networking and route setup
- Scaling, monitoring, and logging
- Continuous deployment and version management
- Data storage and backup strategies
- Security and access management

As OpenShift evolves, new features and best practices will emerge. We encourage continuous learning and experimentation. For the latest updates, refer to the official OpenShift documentation and  the [B.C. government developer](https://developer.gov.bc.ca/) website.

Happy deploying!

---

## Related pages

- [Build an application](../build-deploy-and-maintain-apps/build-an-application.md)
- [Maintain an application](../build-deploy-and-maintain-apps/maintain-an-application.md)
- [Retire an application](../build-deploy-and-maintain-apps/retire-an-application.md)
