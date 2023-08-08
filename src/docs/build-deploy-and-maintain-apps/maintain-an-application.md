---
title: Maintain an application 

slug: maintain-an-application

description: Describes how to maintain an application on OpenShift as best practices of the platform.

keywords: OpenShift, app maintenance, application, OpenShift, application upkeep, application maintenance, managing an application, managing an app, application management

page_purpose: Describes the process to maintain an application in the private cloud as a Service Platform

audience: technical lead, openshift 101 students, openshift 201 students, developers, openshift users

author: Cailey Jones, Ian Watts, Shelly Han  

editor: Pilar Solares

content_owner: Olena Mitvoska

sort_order: 3
---

# Maintain an application
Last updated: **August 8, 2023**

We've covered the best practices for [building](https://docs.developer.gov.bc.ca/build-an-application/) and [deploying](https://docs.developer.gov.bc.ca/deploy-an-application/) applications. Now, let's focus on essential steps for ongoing application management in the OpenShift environment.

Here, we emphasize the importance of application maintenance to ensure smooth operations and the long-term success of your app. We'll also outline your team's responsibilities in this regard among effective communication. 

Consider this page as a comprehensive guide showcasing the significance of proactive application maintenance. It offers valuable insights into successful practices that contribute to the sustained performance of your application but also shedding light on the critical importance of proactive application security measures and monitoring. 

## On this page
* [**Maintain images**](#image-maintenance) <!-- ### Cailey Section -->
* [**Mantain reliability and resiliency**](#maintain-reliability-and-resiliency)<!-- ### Ian Section -->
* [**Monitoring and alerting**](#monitoring-and-alerting) <!-- ### Shelly Section -->
* [**Maintain security**](#maintain-security) <!-- ### Ian Section -->
* [**Effective communication in application maintenance**](#effective-communication-in-application-maintenance) <!-- ### Shelly Section -->
* [**Managing impact of personnel changes**](#managing-impact-of-personel-changes)<!-- ### Cailey Section -->
* [**Related Pages**](#related-pages)

---

## Maintain images
Keep all images used by your application up-to-date throughout its lifespan, even if you stop updating your codebase regularly.

Whenever you use an external image (whether as a parent image for your own build or for tools like a database), choose the most general version tag possible while ensuring compatibility with your application.

For instance, if you're developing a Python application, you have options like `python:3`, `python:3.8` or `python.3.8.17` as your parent image. In each case, the tag will automatically update to the latest application version within that specific number range:

* The `python:3` tag will be automatically upgraded to newer major versions, from python 3.8 to python 3.9, without requiring you to change your tag.

* The `python:3.8` tag will automatically upgrade between minor versions, going from python 3.8.17 to python 3.8.18 automatically, but will not update to python 3.9.

* The `python:3.8.17` tag will only receive patches and will never change minor versions. Many teams might prefer to use `python:3.8` as a balanced approach. This allows them to benefit from automatic minor version upgrades without a high risk of compatibility issues. Your team's requirements may differ, so choose the most general version number possible without creating a risk of compatibility problems.

### Weekly and monthly updates
You should perform the following image maintenance tasks regularly throughout the entire lifespan of your application. These tasks can all be easily automated, ensuring they don't create unnecessary burdens for your team.

**Rebuild all of your images** This involves using the most up-to-date image available for your selected parent image tag. Additionally, you will incorporate more updated versions of the packages included in your Dockerfile.

**Redeploy any externally-sourced images**, such as database images. Your pod will only pull an image once, when the pod starts. It will not be automatically updated if the pod runs uninterrupted for weeks or months. To handle this, you can use ImageSteams to automate and control the redeployment of these images. 

These routine tasks are essential to ensure that you benefit from the latest security patches and bug-fixes in your images. By automating these processes, you can keep your application running smoothly and security without imposing regular toil on your team.

### Quarterly and yearly updates
Performing these tasks generally involves some manual intervention to test changes. While automation can simplify the process, you'll need to strike a balance between performing these tasks more frequently and the time required from your team members.

Here are the tasks that require attention: 

**1.** Update the tagged versions of your parent images when necessary. For instance changing from python:3.8 to python:3.9 or python:4.0, as mentioned earlier

**2.** Update the various package versions in your Dockerfiles

**3.** Update the versions of your externally-sourced images, such as database images

These upgrades are necessary to ensure that your application continues to function on supported versions. Furthermore, keeping your application and packages up-to-date reduces the likelihood of encountering security issues in the future. By addressing these tasks diligently, you can maintain a reliable and secure environment for your application.

### Responsive updates
In addition to the regular updates mentioned earlier, it's crucial for your team to stay vigilant about new information that might require image upgrades or changes.

To assist you in this aspect, there are two scanning tools available on the platform:

**RedHat Advanced Cluster Security (ACS)**: This tool allows your team to scan the running pods in your system for security vulnerabilities. By using ACS, you can receive alerts about potential security concerns as they are detected, enabling you to take prompt action to address them. 

**JFrog Xray**: Built into Artifactory, this scanning tool has the capability to scan all images and other development artifacts within Artifactory, including artifacts pulled through caching repositories. Xray can identify securities issues and alert your team to these concerns, ensuring you can swiftly implement the necessary changes to mitigate any risks

By utilizing these scanning tools effectively, your team can proactively address security vulnerabilities and ensure the overall security and integrity of your application and development environment. 

### Image Backups
In most cases, it is typically not necessary to backup images since your team should be able to rebuild any required image whenever needed.

However, achieving perfection isn't always feasible, and there can be various reasons why rebuilding images at a moment's notice might not be possible.If your team hasn't been regularly rebuilding and updating images, you might encounter compatibility issues that could break your application when attempting to rebuild now.

Additionally, certain older versions of images might no longer be available from vendors. Moreover, there could be other tasks or dependencies that prevent you from upgrading to a more recent version.
In such situations, it becomes crucial to backup all of your required images. Storing these backups in Artifactory is appropriate because Artifactory is backed up and doesn't have automated pruning tasks that could unexpectedly remove images. 

Ensure you have backups of both built images and any necessary parent images and packages, especially if these parent images and packages are outdated. This precaution is necessary as these images and artifacts may be removed once they are no longer supported.
By maintaining proper backups, you can safeguard against unforeseen issues and ensure that you have a reliable fallback option in case rebuilding becomes challenging or impractical.

---
## Mantain reliability and resiliency

OpenShift and Kubernetes, in general, are dynamic systems. They aren't suited for traditional "set it and forget it" approaches to maintaining servers and applications. 

Your application's ecosystem should be able to handle unexpected loss of running pods, and therefore strategies need to be in place to continuously check deployment processes and fault tolerance.

Through this reliability  and resiliency section you will find: 

* [Horizontal Pod Autoscalers (HPA)](#horizontal-pod-autoscalers-hpa)
* [PDBs - Pod Disruption Budgets](#pdbs---pod-disruption-budgets)
* [Databases](#databases)
* [Recoverability](#recoverability)
* [Secrets](#secrets)
* [Storage](#storage)
* [Periodic HA Testing](periodic-ha-testing)
* [CI / CD Pipeline](#cicd-pipeline)

### Horizontal Pod Autoscalers (HPA)

Your applications may experience varying levels of traffic load. To handle sudden spikes in traffic that could overwhelm your default setup, while also avoiding unnecessary resource usage, you can set up a horizontal pod autoscaler (HPA). 

With HPA, you'll define the minimum number of pods (replicas) required to run and specify conditions for automatically adding more pods when needed. Keep in mind that the additional pods must still fit within your namespace's resource quotas. To ensure this, review the normal resource consumption of your Deployment or StatefulSet, and make sure that adding X number of pods won't lead to pod startup failures due to resource quotas.

Requirements:
* `resources` block
* Readiness probe

Horizontal Pod Autoscalers (HPAs) have triggers based on CPU consumption and/or memory consumption. When the average resource consumption of your entire deployment reaches or exceeds the defined threshold, the deployment is automatically scaled up to meet the increased demand. Conversely, when the demand drops, the deployment is scaled back down again to optimize resource usage.

For this to function properly, you need to ensure that your deployment configuration includes a resource request. The metrics controller processes this data, and the HPA reads it from the metrics API. With this information, the HPA can determine how close your deployment is to its CPU and RAM limits. This allows the HPA to make informed decisions about scaling based on resource usage.

To begin, you should identify the typical range of resource usage for your deployment. Follow these steps:

1. Log in to the OCP console
2. Go to your Deployment or StatefulSet
3. Click on the Metrics tab
4. Periodically monitor the graphs on this page during regular application usage and also during the startup phase

By observing these metrics, you can get a clear understanding of the normal resource consumption patterns for your application, helping you make informed decisions about resource allocation and autoscaling.

The "resources" block in a container configuration sets two important limits: the baseline guaranteed amount of resources and the maximum burstable resource limit. The baseline resources are always provided to the container, ensuring a minimum level of performance. On the other hand, the maximum resources are available on a best-effort basis and are generally accessible when needed.

The "resources" block is a top-level parameter for a container, allowing you to define these resource limits. 

Let's take an example: a CPU baseline allotment of 200 millicores (0.2 CPU cores) and a RAM allotment of 1280 mibibytes (approximately 1.28 GB). The container can also burst up to a maximum of 400 millicores (0.4 CPU cores) and 2 gibibytes (approximately 2.14 GB) of RAM when required. This configuration ensures a balance between guaranteed resources and the ability to handle temporary spikes in resource demands.

```
        - resources:
            requests:
              cpu: 200m
              memory: 1280Mi
            limits:
              cpu: 400m
              memory: 2Gi
```
Once you understand how your application utilizes resources during regular and peak loads, you can proceed to configure the HPA (Horizontal Pod Autoscaler). The essential elements of the HPA include:

* The target deployment
* Minimum replicas
* Maximum replicas
* Resource thresholds 

The following example is based on the previous 'resources' example. It pertains to the Deployment named "sample-app" and sets thresholds for both RAM and CPU, which can trigger automatic scaling of the deployment.

```
spec:
  scaleTargetRef:
    kind: Deployment
    name: sample-app
    apiVersion: apps/v1
  minReplicas: 3
  maxReplicas: 5
  metrics:
    - type: Resource
      resource:
        name: memory
        target:
          type: AverageValue
          averageValue: 1500Mi
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```
When the average RAM utilization surpasses 1500Mi or the average CPU utilization goes beyond 70% of the maximum, the HPA will increase the deployment from three pods to four. 

If the average utilization continues to rise above the threshold, a fifth pod will be created. However, when the average utilization remains below the threshold for several minutes, the HPA will gradually scale down the deployment. To avoid rapid scaling up and down of pods, there is a brief delay in the scaling-down process.

**Check HPA status**

Periodically check the status of your HPA with 'oc describe'.

```
$ oc describe hpa sample-app
Name:                                                  sample-app
Namespace:                                             abc123-prod
Labels:                                                app=sample-app
Annotations:                                           <none>
CreationTimestamp:                                     Fri, 26 May 2023 07:02:57 -0700
Reference:                                             Deployment/sample-app
Metrics:                                               ( current / target )
  resource memory on pods:                             1113748821333m / 1500Mi
  resource cpu on pods  (as a percentage of request):  6% (28m) / 70%
Min replicas:                                          3
Max replicas:                                          5
Deployment pods:                                       3 current / 3 desired
Conditions:
  Type            Status  Reason              Message
  ----            ------  ------              -------
  AbleToScale     True    ReadyForNewScale    recommended size matches current size
  ScalingActive   True    ValidMetricFound    the HPA was able to successfully calculate a replica count from memory resource
  ScalingLimited  False   DesiredWithinRange  the desired count is within the acceptable range
Events:           <none>
```

For more information please read the [Automatically scaling pods with the horizontal pod autoscaler](https://docs.openshift.com/container-platform/latest/nodes/pods/nodes-pods-autoscaling.html) on Red Hat's tech docs.


### PDBs - Pod Disruption Budgets
The maintenance of clusters occurs within regular business hours. It's important to note that the applications on the platform should be able to handle the sequential rotation of worker nodes.

Occasionally, this rotation might happen rapidly.  if your application takes time to start up and pass all readiness and liveness probes, then a relocated pod may still be starting up and not ready for service when another of your deployment's pods is terminated, which could cause an outage of your application.  

To avoid this situation, a concept known as a "pod disruption budget" (PDB) comes into play. A pod disruption budget enables you to define the minimum number of pods that are allowed to be offline simultaneously. This ensures that the scenario described above is prevented, safeguarding the availability of your application.

**Caution:** An improperly set up PDB has the potential to disrupt cluster maintenance operations. To support both the individuals responsible for platform maintenance and the users relying on it, it's crucial to meticulously configure your PDB. Your attention to PDB configuration is highly appreciated in order to maintain the platform's smooth functioning and user experience.

A minimal PDB contains:
* A selector that designates the pods requiring protection
* The specification of the minimum count of pods that must remain available 

For instance, let's consider a scenario where we have a StatefulSet named "sample-app." This StatefulSet is configured to have a minimum of three pods. In situations like these, a requirement might arise to guarantee that only one pod becomes inaccessible at any given moment. This condition is particularly relevant for setups like a Mongo replica set, where the availability of over half of the members must be maintained at any given time.

```
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: sample-app
```
This assumes that pods in the Deployment or StatefulSet have a label `app` with a value of `sample-app`.

Avoid setting  `minAvailable` to match the deployment's minimum pod count.  Such configuration will disrupt cluster maintenance procedures by hindering the ability to take worker nodes offline as needed. 

**Check PDB status**

Once established, periodically check on the status of your PDB.  Ensure that the total number of pods is correct and that the selector is accurate.
```
$ oc describe pdb sample-app
Name:           sample-app
Namespace:      abc123-prod
Min available:  2
Selector:       app=sample-app
Status:
    Allowed disruptions:  1
    Current:              3
    Desired:              2
    Total:                3
Events:                   <none>
```

### Databases
Setting up databases in OpenShift requires careful consideration. They need to be configured for high availability and replication. 

Refer to the provided documentation for detailed instructions on how to properly manage and maintain HA databases with these requirementsL
* [High availability database clusters](https://docs.developer.gov.bc.ca/high-availability-database-clusters/)
* [Open-source database technologies](https://docs.developer.gov.bc.ca/opensource-database-technologies/)
* [Database backup best practices](https://docs.developer.gov.bc.ca/database-backup-best-practices/)

### Recoverability

In case of unforeseen events within your namespace—like unintentional deletion of resources—would you have the capability to recover them? While a well-structured CI/CD pipeline can readily recreate numerous resources, certain elements demand additional attention. To guarantee the complete recovery of your applications following any unfortunate incident, it's essential to put in place the following preventative measures.

### Secrets
Secrets are commonly left out from CI/CD pipelines due to the necessity of maintaining a secure pipeline environment, which involves excluding secrets or implementing a system like Sealed Secrets. 

If the Secret containing your database password were to be unintentionally changed or deleted, would you have the ability to recover it? Moreover, could your team successfully restore it even in your absence?

* **Use Vault**

Vault is an on-cluster password management system that is available to all users.  It uses encryption at rest, is frequently backed up, maintains change history, and is a highly available service.  See the [**Maintain security**](#maintain-security) section for more information.

* **Use a local password management system**

In urgent situations, you could choose to have a local password management file. However, this approach is less practical, as it needs making the file accessible to all team members involved in recovery efforts and it would not be part of your pipelines.

* **Never store passwords in plain text, even in a private repository.**

### Storage
Your storage on the platform is not automatically backed up, with the exception of the `netapp-file-backup` storage class, which is not used for production workloads and is typically used only for database backup containers.  

**S3**

Amazon S3 buckets reside outside of the OpenShift clusters and are a good option for storing backup copies of non-sensitive data.  

Use an image with the 'minio' client installed to copy data to your S3 bucket, preferably by cron job.  S3 buckets can be procured through your ministry's IMB; they are not offered directly from the Platform Services team.

**Database backups**

The community supported [backup-container](https://github.com/bcgov/backup-container) is an image designed to support the automated backup of various types of database.  It is easy to set up and is well understood by our community of users, so you will be able to get support if needed.

**PersistentVolume recovery**

If you have a PVC using the 'netapp-file-backup' storage class, it could be recovered from backup, as that storage class is automatically backed up.  If you need to recover one of these backup volumes, **you will need the name of the PersistentVolume, not just the PVC name.**  You can get the volume name from the PVC details.  

For example:
```
$ oc get pvc
NAME           STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS           AGE
backup-test    Bound    pvc-02e9d855-cd63-480d-a1d7-9b638b04f6ff   20Gi       RWX            netapp-file-backup     3d19h
```
In this case, you would store the volume name `pvc-02e9d855-cd63-480d-a1d7-9b638b04f6ff` in a safe place together with the PVC name and a description of its purpose.  The Platform Team will not be able to restore from backup without that volume name.

**For extra protection, copy your DB backups to an S3 bucket**

For more details, see the [Restoring Backup Volumes on OpenShift](https://docs.developer.gov.bc.ca/netapp-backup-restore/).

**Images**

Do your applications pull images directly from Docker Hub, ghcr.io, or another off-cluster source?  

Can you be sure that the same version of the image will be available as long as you need it?  

At times,  older images are removed from container repositories. This could happen because they are no longer supported or due to security vulnerabilities.  To ensure the constant availability of your images and safeguard against potential network issues that might hinder their retrieval, consider storing your images in Artifactory.  

Reconsider the section:  [**Maintain images**](#image-maintenance) on this document for more information.

### Periodic HA Testing
After configuring HPAs and PDBs for your applications, test them periodically to make sure that they work the way that you expect and that your application remains available.  If you're testing in your Test or Dev environment, make sure they're configured the same as Prod so that you can test your Prod configuration.
* Delete a pod in a Deployment or StatefulSet
* In a DB replica set, delete a secondary member
* Delete the primary member of a DB replica set
    * Does the application or DB remain available?
* Test your PDB by trying to delete more pods than allowed.  Does it work as expected?

**Load testing**

If you need to run a load test against your application, first check with the Platform Services team to ensure that the timing and scope of the test will not impact other users of the platform.

### CI/CD Pipeline
Users of the platform have CI/CD pipelines using [Tekton](https://docs.developer.gov.bc.ca/deploy-an-application/#continuous-deployment-and-maintenance) (OpenShift Pipelines), [GitHub Actions](https://docs.github.com/en/actions), and [ArgoCD](https://github.com/BCDevOps/openshift-wiki/tree/master/docs/ArgoCD).

Review your pipelines from time to time.
* Are there any resources that were manually created that should be added to your pipeline?
* Are there Secrets that could be pulled from Vault instead of your OpenShift namespace?
* Aside from storage recovery processes, could your entire application be restored using the pipeline?

---
## Monitoring and alerting 

Application monitoring is a critical aspect of maintaining a healthy and efficient application environment. It allows you to proactively manage performance, detect and resolve issues quickly, and make informed decisions to enhance the overall user experience and business outcomes.

Once your application is running in OpenShift, you can use [Sysdig](https://cloud.gov.bc.ca/private-cloud/our-products-in-the-private-cloud-paas/monitoring-with-sysdig/) to monitor application healthiness and performance via Kubernetes metrics. Here are a list of steps to follow:

1.  [Onboard to Sysdig](https://docs.developer.gov.bc.ca/sysdig-monitor-setup-team/) and setup the OpenShift project set access to monitor your applications
2. [Create Sysdig monitoring dashboards](https://docs.developer.gov.bc.ca/sysdig-monitor-create-monitoring-dashboards) to gather important application metrics such as resource utilization and service Golden Signals
3. Merely having a monitoring dashboard isn't sufficient since you won't be actively checking it throughout the day. Instead, it's advisable to establish alerts for monitoring metrics. This approach ensures that you receive notifications when potential issues arise, allowing you to address problems in their early stages. Follow the guide on [how to setup Sysdig alerts via Rocket.Chat](https://docs.developer.gov.bc.ca/sysdig-monitor-create-alert-channels/)
4. You can setup comprehensive service monitoring with [PromQL in Sysdig](https://docs.developer.gov.bc.ca/sysdig-monitor-set-up-advanced-functions/) that includes multiple metrics and complex logics for alerting. If you'd like to expose application specific metrics, here are steps on how to create [custom/user defined monitoring](https://docs.developer.gov.bc.ca/user-defined-monitoring/)

If service availability is important to you, leverage [Uptime.com](https://uptime.com/) for uptime monitoring and public service status pages. The Platform Services Team uses it to share [the status of OpenShift clusters as well as shared services](https://status.developer.gov.bc.ca/). You can check out [the SaaS service catalog](https://digital.gov.bc.ca/cloud/saas/directory/how-to/) to explore more about Uptime.com.

By setting up comprehensive monitoring and alert systems for your application, you can greatly reduce the occurrence of service downtime or disasters. Nevertheless, it's essential to understand that these measures cannot guarantee a flawless, 100% issue-free operation of the application. In the event of any problems or downtime, you have the following options:

1. Refer to [this guide](https://docs.developer.gov.bc.ca/check-application-health-after-outage/) to identify the cause of the outage,  whether it's a platform-wide problem or specific to your application.  This guide will also provide guidance on initiating the troubleshooting process for your application's issues. Moreover, consider creating a checklist for your application. This checklist should outline the essential items to review in order to confirm that everything is functioning properly following an outage.

2. Utilize application logs as a valuable resource for troubleshooting. OpenShift is seamlessly integrated with Kibana, which facilitates log aggregation. Through this integration, you can gather, categorize, and visualize container logs in a centralized hub. For comprehensive training on application logging with Kibana refer to the [provided training materials](https://github.com/bcgov/devops-platform-workshops/blob/master/openshift-201/logging.md)

3. It's essential for your team to have a strong understanding of your application and its relevant components.  This knowledge base is crucial for effective troubleshooting and minimizing the impact of any downtime

---
## Maintain security 

The OpenShift platform boasts numerous features that enhance security compared to many traditional hosting environments. Nonetheless, certain areas demand additional focus to guarantee the security of your application.  These include:
* [Network Policies](#network-policies)
* [RoleBindings](#rolebindings)
* [Vault](#Vault)

### Network Policies
Upon creation, your namespaces are equipped with a **"deny all"** NetworkPolicy called 'platform-services-controlled-default' by default. 

 This policy effectively restricts all traffic, including within your own namespace, from reaching your services.   
 
 This default configuration prioritizes security. To make your application functional, you'll need to establish additional network policies.

* When creating network policies, **do not create an "allow all" policy.**
* Allow only specific traffic that is needed.
* For more information, see [OpenShift network policies](https://docs.developer.gov.bc.ca/openshift-network-policies/)

Review your network policies:

* Are they overly permissive?  
* Do you allow inbound traffic from the Internet to services other than those that are meant for public access?

Keep in mind that there's a production cluster called Emerald, which employs the NSX software-defined network (SDN) unlike the default OpenShift SDN used by other clusters. This choice enables more precise configuration, including thorough egress and ingress controls. 

If your application has advanced network security needs, consider utilizing the Emerald cluster. If you have any questions regarding this, don't hesitate to contact the Platform Services team.

### RoleBindings
Similar to network policies, keep your RoleBindings within namespaces as streamlined as possible. By default, anyone linked to the product in the platform's Registry will have administrative access to all four namespaces. These namespace administrators can generate additional RoleBindings as required to facilitate your application.

* Only grant namespace access to those who need it
* Grant minimal permissions.  How much access do your users need?
    * There is a 'view' ClusterRole for read-only access
    * For special cases, like ServiceAccounts, create a Role and RoleBinding to grant it only the permissions that it needs to fulfill its function
* Create separate RoleBindings for users with differing access needs.  That is, if 'User A' requires edit access and 'User B' requires only view access, create separate RoleBindings rather than give edit access to both.
* Periodically review the RoleBindings in your namespaces.  As your team changes, remove access for those that leave.

For service accounts, be sure to grant access only to accounts in your own namespace.  It is possible to mistakenly grant access to all accounts in the cluster!

A suitable RoleBinding for service accounts, if providing permissions to all service accounts in your namespace, should incorporate a 'subjects' segment that include your namespace name in the 'name' line:
```
subjects:
  - kind: Group
    apiGroup: rbac.authorization.k8s.io
    name: 'system:serviceaccounts:abc123-prod'
```
If the `name` line included only `system:serviceaccounts`, then all service accounts on cluster would be given access!

For more information, see [Grant user access in OpenShift](https://docs.developer.gov.bc.ca/grant-user-access-openshift/).

### Vault
Vault employs on-disk encryption. This means that even if a malicious actor managed to obtain a copy of the filesystem contents utilized by Vault, they wouldn't be able to access any secrets unless they also possessed the master key.

This provides a higher level of security compared to OpenShift secrets, which are **only encoded, not encrypted**, on disk. Additionally, secrets are encrypted during transit between Vault and your pods as they are being loaded.

To learn of the other advantages of Vault and to get started with it, see [Vault secrets management](https://docs.developer.gov.bc.ca/vault-secrets-management-service/).

---
## Effective communication in application maintenance

The OpenShift platform aims to ensure uninterrupted operations even during scheduled maintenance tasks like version upgrades. Nevertheless, this doesn't imply that your application is immune to further considerations once it's in production. Platform maintenance can influence your workloads in diverse manners, particularly during significant version upgrades and the removal of outdated features and APIs.

As a result, it's crucial for your team to remain informed about platform changes and maintain ongoing communication with the Platform Services Team and the broader community.

Before scheduled changes to the platform and shared services occur, the Platform Services Team will get in touch with all registered Product Owners and Technical Leads through the [Product Registry](https://registry.developer.gov.bc.ca/). To ensure your team receives timely notices about upcoming events, please maintain accurate and up-to-date contact information for POs and TLs on the Product Registry.

Moreover, it's advisable for all team members to remain engaged with the community through the following channels:

- Subscribe to [Platform Services Newsletters](https://subscribe.developer.gov.bc.ca/) so that you will receive email notifications for upcoming changes, as well as [the Platform Community MeetUp Event](https://cloud.gov.bc.ca/private-cloud/support-and-community/events-in-the-bc-gov-private-cloud-paas/) every 3 weeks for platform updates and technical demos.

- Monitor [Rocket.Chat #devops-alerts channel](https://chat.developer.gov.bc.ca/channel/devops-alerts) for service alerts and status updates. Rocket.Chat serves as the main communication method for teams on the platform to get help, share knowledge and information, and build up the community. 

- Take a look at [additional Platform activities and resources](https://cloud.gov.bc.ca/private-cloud/support-and-community/) periodically. This include events for OpenShift training , StackOverflow knowledge base, and more.
---
## Managing impacts of personnel changes

During the maintenance stage of an application's lifecycle, the development team frequently undergoes changes. Team members might leave for other positions or be assigned to new projects, and responsibilities get transferred to operational teams. These changes have a significant impact on the OpenShift platform because there are high expectations for the app team to keep their application current and promptly address platform changes.


The changes and the resulting loss of expertise have a significant impact on the OpenShift platform. This is because the app team is expected to keep their application up-to-date and respond promptly to changes on the platform. 

### Onboarding New Team Members

When a new member joins your team, they should go through a similar onboarding process as any other person joining the OpenShift platform. Along with getting familiar with the specific application(s) supported by their new team, they should also:

* Attend OpenShift 101 and 201 training
* Go through the onboarding process which can be done with your team's Product owner or by scheduling a meeting with a member of the Platform team. 
* Join the community on Rocket.Chat, Stack Overflow and our Platform Community Meetups
* Be granted access to all relevant namespaces, repositories and other services Remember to also update the Registry, if needed. 

### Managing team member departures 

It is essential to have someone available to support your application through its entire lifecycle. 

This person must confidently handle all the tasks discussed in this document. If they can't, there's a risk of application outage. 

The Platform team can cooperate with teams struggling to meet maintenance requirements, but their assistance has limits. The developers and DevOps specialists with expertise in your application are the ones who can truly support it. So, don't let that expertise leave your team until the remaining members can provide full support of your application. 

When a team member will no longer support your application, they should teach their regular development and maintenance tasks to at least one remaining team member and  should be well-documented before their departure. 

It's important to remember that the application itself is not the only technical element of supporting the application. Consider expertise and impact your departing team member possesses about pipelines, automation or other maintenance tasks like database backups. All of these should be passed along and documented as well. 



---
---

## Related pages
- [Build an application](https://docs.developer.gov.bc.ca/build-an-application/)
- [Deploy an application](https://docs.developer.gov.bc.ca/deploy-an-application/)
- [Rocket.Chat channel descriptions](https://docs.developer.gov.bc.ca/rocketchat-channel-descriptions/)
- [Automatically scaling pods with the horizontal pod autoscaler](https://docs.openshift.com/container-platform/latest/nodes/pods/nodes-pods-autoscaling.html)
-  [High availability database clusters](https://docs.developer.gov.bc.ca/high-availability-database-clusters/)
- [Open-source database technologies](https://docs.developer.gov.bc.ca/opensource-database-technologies/)
- [Database backup best practices](https://docs.developer.gov.bc.ca/database-backup-best-practices/)
- [Backup-container on GitHub](https://github.com/bcgov/backup-container)
- [Restoring Backup Volumes on OpenShift](https://docs.developer.gov.bc.ca/netapp-backup-restore/)
- [Grant user access in OpenShift](https://docs.developer.gov.bc.ca/grant-user-access-openshift/)
- [Vault secrets management](https://docs.developer.gov.bc.ca/vault-secrets-management-service/)
- [Kibana training application loggin](https://github.com/bcgov/devops-platform-workshops/blob/master/openshift-201/logging.md)
- [Check application health after outage](https://docs.developer.gov.bc.ca/check-application-health-after-outage/)


