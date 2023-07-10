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

To deploy an application, you can use the OpenShift CLI (`oc create-app`) or the web console. Both offer the same capabilities and your choice will be dependent on personal preference. More information can be found in the [official OpenShift documentation](https://docs.openshift.com/container-platform/latest/applications/application_life_cycle_management/creating-applications-using-cli.html).

### B. Configuring Resource Limits and Scaling Options

Resource limits and scaling options are an important part of managing application performance and availability. OpenShift allows you to set resource limits (CPU and memory) for each Pod in your deployments, which can prevent a Pod from using more resources than necessary. Scaling options allow your application to adapt to different load levels by adjusting the number of running Pods.  Best practice to provide the suitable resources to your application is to monitoring its normal and peak performance, and decide resources quota and number of replicas dependently. This is covered in detail in the [official OpenShift documentation](https://docs.openshift.com/container-platform/latest/nodes/clusters/nodes-cluster-resource-configure.html).

### C. Get the Manifest File from Live Instance to Store as Infrastructure as Code

Infrastructure as Code (IaC) is a best practice for managing and provisioning technology stacks through machine-readable definition files, rather than physical hardware configuration. You can extract the configuration of a live object in OpenShift as a YAML or JSON manifest file and store it in your version control system, for example Git. This practice makes it easy to track changes, replicate configurations, and recover from mishaps. 
## Configuring Deployment

### A. Understanding Deployment Configurations and Their Components

Deployment Configurations  in OpenShift are a recipe for deploying your application. They consist of the following are considered as most important field:

- **Pod Template:** This defines the desired state of the pods being deployed, including the base image, ports to expose, and environment variables.
- **Replicas:** The number of instances of your application that should be maintained.
- **Selectors:** Labels that identify the pods managed by the deployment configuration.
- **Triggers:** Events that will cause a new deployment, such as a new image build.

Understanding these components is essential for correctly configuring your application's deployment. To read more about other configuration options, use `oc explain` command or this [documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).

### B. Defining Deployment Strategies

OpenShift supports several deployment strategies, including:

- **Rolling Deployment:** Updates the application gradually while keeping it available. Useful when you need zero-downtime deployments.
- **Recreate Deployment:** Replaces the entire application at once. Suitable when your application can tolerate downtime.
- **Blue-Green Deployment:** Swaps old and new applications in one operation, minimizing downtime. Requires double the resources.
- **Canary Deployment:** Deploys the new version to a small subset of users before rolling it out to everyone.

Choose the strategy that best meets your application's needs and expectations, considering factors like downtime tolerance, resource availability, and testing needs.

### C. Setting Up Environment Variables for the Application

Environment variables can be defined in the `env` field of the Pod specification and can reference secrets, ConfigMaps, or just be plain text. For sensitive information, it is best to use Vault services. OpenShift can integrate with Vault to inject secrets directly into pods at runtime. This provides an extra layer of security for sensitive data. You can find more information on using Vault in our [documentation](https://docs.developer.gov.bc.ca/vault-secrets-management-service/).

## Configuring Networking and Routes

### A. Network Policies

Network policies are Kubernetes resources that control the traffic between pods and networks. They use labels to select pods and define rules which specify what traffic is allowed. The aim is to provide a secure network for your applications running on OpenShift. To give  deployement very specific network policy is always the best practice to keep your application safe. For a detailed guide on OpenShift network policies, read [this documentation](https://docs.developer.gov.bc.ca/openshift-network-policies/).
### B. Exposing Services using Routes

In OpenShift, a `Route` is a way to expose a service at a specific host name, like www.google.ca. If you do not specify a hostname, OpenShift will automatically assign one based on a default pattern, typically including the service name and namespace name. The DNS resolver for the host name must point to the router's service IP address. Useful links:
1. Red hat route official [doc](https://docs.openshift.com/container-platform/latest/networking/routes/route-configuration.html).
2. [How do I get a custom vanity URL for my application in Openshift?](https://stackoverflow.developer.gov.bc.ca/questions/172/176#176)
3. [Openshift Service and Route](https://www.densify.com/openshift-tutorial/openshift-route/)



### C. Configuring SSL/TLS Certificates

Security is a critical part of any application deployment. With OpenShift, you can secure your routes with SSL/TLS certificates. For obtaining and managing free SSL/TLS certificates, Certbot is available. It automates the tasks related to obtaining and renewing certificates and configuring web servers to use them. Learn how to use it by checking out this [link](https://github.com/BCDevOps/certbot).


## Testing the Deployment

### A. Verifying the Application's Functionality Post-deployment

After deploying your application, it's critical to ensure that it's working as expected. You should test all the features of your application in a controlled environment. Pay special attention to any changes made during this deployment to ensure they have been applied successfully.

### B. Performing Smoke Tests or Automated Tests

Smoke testing involves executing a subset of test cases that cover the most important functionality of a system, to ascertain if crucial features of the system are working as expected. On the other hand, automated tests are scripts that run automatically to verify the behavior of the system. Both are key to catching any major issues early in the deployment process. This can be done manually, or you can use tools to automate these tests. One of the tools that is available is called n8n, we have a repo that has well-documented instruction of how to leveraging this tool [here](https://github.com/bcgov/put/blob/main/docs/Introduction.md)

### C. Disaster Recovery Testing

Disaster recovery testing is crucial for ensuring your application can handle system failures and recover quickly. This includes testing the backup and restore functionality and the high availability setup of your application. The goal is to minimize downtime and data loss in case of a disaster. Having your deployment configration as Infrastructure as Code (IaC) would be really helpful for this task.

Read here for more [disaster recover plan](https://github.com/bcgov/platform-developer-docs/blob/main/src/docs/automation-and-resiliency/namespace-recovery-and-responsibilities.md).


