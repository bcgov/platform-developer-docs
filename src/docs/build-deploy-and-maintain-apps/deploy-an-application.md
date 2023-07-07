# Deployment doc

### A.**Introduction to OpenShift deployment and its benefits(feature):**

In the landscape of container orchestration platforms, Red Hat's OpenShift is an industry front-runner, offering comprehensive solutions to deploy, manage, and scale containerized applications with unique advantages:

- **Self-Service Application Stacks:** Instant access to a variety of application stacks to accelerate development.
- **SCM Integration:** Seamless integration with SCM tools like Git for direct deployment from repositories.
- **Build Automation:** Supports various build strategies and automatic application updates upon source code changes.
- **Deployment Strategies:** Multiple deployment strategies for zero downtime releases.
- **Service Discovery & Load Balancing:** Automatic service discovery and efficient load balancing of traffic.
- **Automated Rollbacks:** Simplified rollback to previous application versions.
- **Integrated Developer Tools:** In-built developer tools for a complete developer experience.
- **Integrated Metrics and Logging:** Utilizes Prometheus metrics and centralized log management for insights and monitoring.

### B.Introduction to Application Deployment with OpenShift

Deploying applications in OpenShift involves orchestrating application images within Pods, providing network connectivity via Services, and exposing them to users through Routes, appropriate network policy. This process works hand-in-hand with the build process, detailed in our [build documentation](https://raw.githubusercontent.com/bcgov/platform-developer-docs/7b088a54b6b4d03176198bdcc90ce7361ca02201/src/docs/build-deploy-and-maintain-apps/build-an-application.md). Following sections will dive deeper into each deployment stage.

## Preparing for Deployment

### A. Verifying the Successful Build of the Application and Access to Image Registry

Before deploying your application on OpenShift, it's crucial to verify a successful build of your application. A successful build will push the application's image to an image registry. OpenShift can pull images from various sources, including [Docker.io](http://docker.io/) (Docker Hub), [Quay.io](http://quay.io/), OpenShift's integrated registry, and the RedHat image repository. Ensure that you have access to the registry where your image resides. If you encounter any issues, review the build logs to diagnose the problem, make sure that the credential you have for image registry is correct or make sure the service account `image-puller` has enough access.

### B. Reviewing the Application's Requirements for Deployment

Every application has unique requirements for deployment. These may include environment variables, application secrets, configuration data, and database connectivity, among others. Review all these required parameters and ensure they works fine  before deployment. Remember that sensitive data like API keys or credentials should be stored as [secrets](https://docs.openshift.com/container-platform/4.1/nodes/pods/nodes-pods-secrets.html) in OpenShift.

### C. Ensuring the Availability of Necessary Resources in OpenShift

OpenShift allows you to fine-tune resources like CPU, memory, and storage for your application's pods. Before deploying, ensure that the necessary resources are available in OpenShift. Your application should have enough resources to perform efficiently but not too much, which can be wasteful. For guidance on resource tuning, refer to this [documentation](https://docs.developer.gov.bc.ca/application-resource-tuning/). You can also watch this [video](https://www.youtube.com/watch?v=rkxVZgn9icU&t=14s) for more explanation. Understanding and adjusting these resources according to your application's needs is a critical aspect of deployment preparation.

## Deploying an Application

### A. Creating a Deployment using OpenShift CLI or Web Console

To deploy an application, you can use the OpenShift CLI (`oc`) or the web console. Both offer the same capabilities and your choice will be dependent on personal preference. More information can be found in the [official OpenShift documentation](https://docs.openshift.com/container-platform/latest/applications/application_life_cycle_management/creating-applications-using-cli.html).

### B. Configuring Resource Limits and Scaling Options

Resource limits and scaling options are an important part of managing application performance and availability. OpenShift allows you to set resource limits (CPU and memory) for each Pod in your deployments, which can prevent a Pod from using more resources than necessary. Scaling options allow your application to adapt to different load levels by adjusting the number of running Pods.  Best practice to provide the suitable resources to your application is to monitoring its normal and peak performance, and decide resources quota and number of replicas dependently. This is covered in detail in the [official OpenShift documentation](https://docs.openshift.com/container-platform/latest/nodes/clusters/nodes-cluster-resource-configure.html).

### C. Get the Manifest File from Live Instance to Store as Infrastructure as Code

Infrastructure as Code (IaC) is a best practice for managing and provisioning technology stacks through machine-readable definition files, rather than physical hardware configuration. You can extract the configuration of a live object in OpenShift as a YAML or JSON manifest file and store it in your version control system, for example Git. This practice makes it easy to track changes, replicate configurations, and recover from mishaps. This is also the recommend practice for [disaster recover plan](https://github.com/bcgov/platform-developer-docs/blob/main/src/docs/automation-and-resiliency/namespace-recovery-and-responsibilities.md).