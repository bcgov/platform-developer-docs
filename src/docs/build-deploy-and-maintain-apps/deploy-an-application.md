---
title: Deploy an Application

slug: deploy-an-application

description: describes deployment of applications on openshift and the related processes and tools 

keywords: deploy, application, openshift, application, pod, identify, cpu utilization, monitoring, liveliness, logs, alerts, downscale, upscale, service, api endpoint, cicuit breakers, resources, memory allocation, reoccuring patters

page_purpose: this page describes the process of deployment on openshift and links to relevant documentation and tools

audience: technical lead, developer

author: Matt Spencer

content_owner: Olena Mitovska

sort_order: 
---

## On this page
- 

## Heading<a name="section-name"></a>


# Deploy an Application Overview #
Deploying an application is very simple on the BC platform as a service. However, as part of moving to a platform as a service that works as a containerization service in OpenShift, you need to make sure that your application is modernized. What does it actually mean to be modernized? Well, it'll be modernized it means that the application has been set up in a meet with immutable architectures. And the application itself is decoupled with its dependencies packaged up ready to be pushed into a containerized environment. The containerized environment that's being deployed to is an OpenShift cluster. The OpenShift cluster resides its data centers on an on prem infrastructure. The OpenShift cluster does allow for the capability to use Tekton or OpenShift pipelines in order to migrate the application over into a Kubernetes environment. As part of modernizing the application, you need to make sure that the application does come with its binaries or dependencies with that being said, you want to make sure that the binaries and the dependencies that need to come along with the application are pushed into an artifact repository. Or a J frog Artifactory repository.
Now as we migrate the application, over to the platform as a service, the application is just one piece of the puzzle. We understand that the databases that need to be migrated as well over to the platform as a service. And this approach the applications are able to use hybrid approach databases, meaning that the databases can still reside on on prem infrastructure. However, it is very recommended to use certain technologies such as no SQL or to utilize Postgres to migrate relational databases.
As part of migrating an application over to an open shift environment, there's a couple of things that you might want to consider to make sure that the environments are or the applications are able to be migrated. The first recommendation is to make sure that you keep the application configured outside the image. Basically what that means is you don't want to specify environment specific type of things that need to happen with the application, such as you know, identifying a dev QA or a prod, you want to make sure that that image is immutable. You also want to specify the resources request and resources limits in the pod definitions. It is very critical to make sure that you identify the proper amount of CPU resources. One of the biggest things that I've seen and the platform is a service is a high intense of memory allocation with a low intensive CPU utilization. And when that happens, the CPUs are not being utilized and more memory is being utilized. Therefore, it's causing basically a missing gap of CPU utilization across the nodes. Always define liveliness and readiness probes in the pod definition so as an application is becoming available to a to the service, such as the load balancer or such as the API endpoint. You want to make sure that the application is actually ready and active. And the way that you would do that is you would identify one when the pod is actually ready. And to you would identify when the pod it liveliness is continued to be good to go. So when the pod is actually running, if you see that a service or something like that is inactive or no longer available, then you can identify whether or not that pod needs to actually be rebooted automatically or notified with any kind of alerts. You want to protect the application with POD distribution budgets. You want to identify to make sure that you do not run into a situation where your budget is being increased. So that way, you can either auto scale to a certain extent, or downscale at any point in time. You want to ensure that the application pod terminates gracefully. So you want to make sure that it doesn't have a critical failure or anything like that when the pod is going down, and another one is being stood up. You also want to run one process per container. So if you're running a process that needs to be done, please run it per container and do not run multiple processes within one container. You want to implement application and monitoring alerts. We utilize cystic for some of our monitoring alerts, but it is recommended that you identify the SLOs which is the service level objective is to identify what exactly it is that you are monitoring. What is it that you are measuring as well, as part of that you want to identify the opposite observability as well as you want to identify the any kind of reoccurring patterns. As you're starting to do your monitoring. You want to implement application, monitoring and alerting on specific things to remove noise. You want to configure the applications to write their logs to see you know, standard out or basically allowing the capability instead of log files but allow the capability to actually see the logs from the containers perspective what actually goes and looks at the logs of the container. You want to consider implementing the following resilient measures, such as circuit breakers, timeout, retries and rate limits

# Utilizing Helm to Deploy #
So the question is what is Helm? Helm is a way to utilize YAML "yet another markup language" to identify a stack of resources that need to deploy to the OpenShift cluster. Now the home itself is an orchestration tool of the full stack. The order of operations that is identified is based upon the cluster itself. For example, a service may be dependent upon a deployment therefore, the service resource is going to be deployed prior to the deployment itself. The same thing goes for persistent volume claims, or anything that's dependent prior to the deployment actually being executed. Now, how allows for more things than just deploying resources? There is a set structure for helm that is identified by utilizing templates and then it also is utilized by determining values. By determining values you can utilize what is called string interpolation, allowing the capability to dynamically populate values in the resources instead of changing each one, one by one prior to deployment. How also allows the capability of utilizing version control version control is set up in a symmetric versioning. Therefore allowing the capability to do full stack upgrades based on changes in the version that is deployed.

# Utilizing Source to Image #
Understanding source to image source to image is the capability of taking the source which in this case is a git repository and then processing it image. It is a tool that Red Hat created specifically for the OpenShift environment, allowing quickly the capability of building automatically from a git repository, the image that's going to be used to deploy into the OpenShift cluster

# Tekton (OpenShift Pipelines) Best Practices #
So what is Tekton? Tekton is a cloud native pipeline capability Tekton allows the capability to be able to run a full pipeline from build, compile to deploy, and various other tasks such as utilizing some software as a service tools such as sonar cube integrations, to verify gate checks, but Tekton in general allows the capability of a cloud native pipeline Tekton is utilized very closely to get ops approaches where Git repositories are the single source of truth except for the build process is done in a cloud native environment in this case, the OpenShift. Now and OpenShift Tekton is considered open shift pipelines and open shift pipelines. You are given different screens and different gooeys graphical user interface, allowing the capability to expand upon Tekton in general and and allowing the open shift capabilities

# Continous Monitoring of CVEs
So as part of continuous monitoring of the applications as they're actually deployed into the environment that is going to be done with certain tools such as artifacts, or ACs. These particular tools will scan for open source analysis, which are just packages such as if you have an image that contains RPMs or AAPT packages, or any packages that were deployed with the operating system as well. packages such as JAR files, or NPM packages that were deployed as part of the image that is going out to be in the containerized environment. As part of that, if the image itself was actually deployed to Artifactory, this is using a particular architecture called open container initiative. open container initiative sets the standards of the specifications for runtime and build manifest processes, and therefore the artifact repository would scan that image for any open source analysis associated to it as well. Now, just because I mentioned open source analysis, does it actually mean that it's only scanning open source, what it means is it's actually going to scan utilizing the National Vulnerability Database plus additional databases to identify any Common Vulnerabilities and Exposures with the particular dependencies that are used as part of the operating system?

# What is the difference between Artifactory and ACS
Now one question may be asked, what is the difference between Artifactory and ACS? The difference is, is when the images are actually scanned? Are the images actually being scanned at the time of Artifactory? Yes, they are. But that is usually an immutable architecture and a static at that time providing CVs of what is deployed into the actual environment. However, ACS is utilized in real time. Meaning that the images themselves and the container that's actually deployed are scanned. In the sense that container is not scanned for penetration test or any of that nature, but what instead it is tested to make sure that it doesn't, the image itself does not have any CVE IDs associated to it. However, if there are CVS associated to it, they're just reported to the product teams allowing them to make the decision on the next steps forward.

# Deploy an Application

You can read about how the OpenShift Container Platform handles deployments in [Red Hat's Documentation](https://docs.openshift.com/container-platform/3.11/dev_guide/deployments/how_deployments_work.html) 

## Automation of CI/CD 

You can and should use automation to build, test and deploy your application. The platform services team provides [templates](/cicd-pipeline-templates-for-private-cloud-teams) to assist teams with using automation pipelines. [ArgoCD](/automation-and-resiliency/argo-cd-shared-instances) can also be integrated with automation pipelines. 

## Configuring Apps for Resiliency 

If you apply the correct design principles, applications deployed on the OpenShift platform can avoid many of the common types of outages that  would be unavoidable if working with legacy infrastructure. See the [Application Resiliency Guidelines](/automation-and-resiliency/app-resiliency-guidelines) page for more information about these principles.

## Multi-node deployment

<!-- should this section discuss the platform default of pod anti-affinity across nodes?  -->

## Resource Tuning

[Application Resource Tuning](/application-resource-tuning)
<!-- -->

## Data Backups 
<!-- is this the right content for this heading? -->
[Backup Container](https://github.com/BCDevOps/backup-container) is a simple containerized backup solution for backing up one or more supported databases to a secondary location

## Vanity Domains and TLS Certificates 

<!-- 
?do these links fit here?
* https://github.com/bcgov/common-forms-toolkit/tree/master/openshift#vanity-url-redirects 
* https://github.com/BCDevOps/certbot
-->

## Kubernetes Network Policies

<!-- what to include about Kubernetes network policies here -->

Redhat's Advanced Cluster Security (ACS) application can be used to visualise and manage network policies within OpenShift. 

---
Related links:
* https://docs.openshift.com/container-platform/3.11/dev_guide/deployments/how_deployments_work.html
*
Rewrite sources:
* 
---
