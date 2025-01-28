---
title: Request a quota adjustment for an OpenShift project set

slug: request-quota-increase-for-openshift-project-set

description: Describes the process to request more resource quota for an OpenShift project

keywords: openshift, resources, resource quotas, RAM, CPU, storage, optimization, claims, project

page_purpose: Discusses what a user needs to do to get the quota for a specific resource type increased on their OpenShift project set.

audience: developer, technical lead

author: Jonathan Bond, Cailey Jones

content_owner: Cailey Jones

sort_order: 5
---
# Request a quota adjustment for an OpenShift project set

This guide shows you how to request more resources for your OpenShift project set on the [Platform Product Registry](https://registry.developer.gov.bc.ca/).

## On this page
* **[Prerequisites](#prerequisites)**
* **[Steps to request quota adjustment](#steps-to-request-quota-adjustment)**
* **[Essential resources to improve your quota increase request](#essential-resources-to-improve-your-quota-increase-request)**
* **[Related pages](#related-pages)**


## Prerequisites 
Before initiating the request, make sure you have completed the following steps:

1. **Evaluate resource usage:** Analyze your project's resource consumption to determine if a quota increase is necessary. Utilize tools like the OpenShift Dashboard or the command-line interface (CLI) for resource monitoring. Use the following information to help determine the level of resource the application needs:

  * [Resource management guidelines](https://github.com/bcgov/developer-experience/blob/master/docs/ResourceManagementGuidelines.md)

  * [Application resource tuning](../automation-and-resiliency/application-resource-tuning.md)

2. **Familiarize yourself with Sysdig (optional):** Setting up Sysdig can provide comprehensive insights into your project's performance and resource utilization. However, it is not mandatory for requesting a quota increase and you can use a different system to provide the information the Platform Services Team requires to process your request increase.  If you are using it we provide more information in the section: [Setting up resource monitoring with Sysdig Monitor](#setting-up-resource-monitoring-with-sysdig-monitor)
   1. We have provided a dashboard named "Template - Resources Quota Approve Dashboard" in Sysdig to assist your team in better understanding and managing your application's resource utilization. This tool is designed to help you monitor and optimize your usage, with a target utilization rate of around 35% for both CPU and memory to ensure resources are used efficiently. Requests that consistently show long-term utilization above this 35% threshold for both CPU and memory will be automatically approved, streamlining the process and encouraging optimal resource management.

3. **Get in touch with the Platform Services Team**
This process suggests good communication from your team and the Platform Services Team particularly if you have questions prior your quota increase request, please reach out to them at [PlatformServicesTeam@gov.bc.ca](mailto:PlatformServicesTeam@gov.bc.ca) and enter  subject: Quota request with your inquiry.

## Steps to request quota adjustment
As part of our ongoing efforts to optimize resource allocation across our OpenShift environments, we request teams seeking a quota increase to provide detailed justifications. This structured approach ensures that all requests are evaluated fairly and resources are used efficiently.

It is important to note that any requests for **quota decreases** are automatically approved. 

### Step 1: Access the Platform Product Registry 
Access the [Platform Product Registry](https://registry.developer.gov.bc.ca/) and use the dashboard of your chosen product to adjust the quota.

### Step 2: Identify page and potential changes for each section
The product page has different sections: 

1. **Product description:** Includes fields like product name, description, ministry and hosting tier. 

2. **Team contacts:** Product Owner and Technical Lead(s). The contacts need to have an IDIR, if you need to change them, editing the email field will autopopulate their new information. 

There is an optional field to add an after-hours support contact. This field is for Business Mission Critical Applications only. Enter the phone number of the team member to contact if an issue arises outside business hours.

3. **Quotas:**   If you need more resources for CPU, RAM or storage in any of the four namespaces, this is the place to make changes to them. This is also the section where we will be focusing on this guide.

  * Production `prod`
  * Test `test`
  * Tools `tools`
  * Development `dev`

4. **Common components** This is an optional field where you can choose different components through a list of them.

### Step 3: Prepare the request 

In the **quotas** section of the page adjust your new quota request for each of the 4 namespaces `prod`, `test`, `tools`, `dev` if needed. Use the following guidelines, depending on the resource type:

  **CPU or RAM quota increase**

  If you're requesting a CPU or memory quota increase, collect the average from each replica pod. Present the Sysdig dashboard to show more accurate figures if you use it or through your tool preference. 
  
  Use the following example:

  | Component name | Description (Optional) | # of Replicas (and range if using auto scaler) | Resource Requested | Average Consumption | Spikes |
  |----------------|------------------------|------------------------------------------------|--------------------| ---------------------|--------|
  | Rocket.Chat app | platform chat app | 3 (HPA min 3 max 5) | 1 core CPU | 1.5 cores CPU | 1.4 cores |

  **Storage quota increase**

  If you're requesting a storage quota increase, list all the persistent volume claims (PVCs) that you have and the components that are mounting the volume. Together with the Sysdig dashboard, this shows past usage metrics. Use the following example:

  | Component name | Description (Optional) | PVC type | PVC size | Storage Utilization |
  |----------------|------------------------|----------|----------|---------------------|
  | Rocket.Chat DB patroni statefulset | to store persistent data | netapp-file-standard | 5GiB | 80% |


### Step 4: Gather information for your request 

Be ready to respond to the following **3** questions: 

#### 1. Why do you need to increase your quota? 

This should be just 1 or 2 sentences that clearly outlines exactly what you're trying to accomplish that requires more quota:

* **Proposed increase:** Clearly outline the additional resources you require, along with supporting rationale. Explain how much more quota you need and why.  Include the following:

  * Expected quota increase amount with a detailed allocation plan

* **Justification for increase:** Clearly state the reasons for requesting a quota increase, such as anticipated growth, bursty workload patterns, or specific project requirements.

* **Impact Assessment:** Assess the impact of the increased quota on your project's performance, scalability, and budget.

If you need help answering this question [check these examples](#examples-of-answers).

#### 2. Can you tell us more about the current and desired states of the relevant Openshift objects?

Please provide information about how much resources the important pods are using right now.  If you can, also let us know how their resource usage will change if we increase the quota. You don't need to give us details about every single pod or deployment in your namespace. Just focus on the ones that matter for why you're asking for this increase.

 **Collect your application metrics:** Compare the current resource utilization and compare it with the quota. Specify your project's current resource quotas and usage.

 *  Current quota in the project set
  * Total CPU, memory or storage currently used and any other resources relevant to your application's requirements
  * Present the resource monitors within your namespace in order to understand  the level of resource consumption in your application and how efficiently it utilizes resources
  * Sysdig offers a pre-built dashboard template designed to visualize and analyze metrics in your OpenShift project. To simplify the process of requesting a quota increase, consider utilizing the Sysdig dashboard template. Instructions can be found in [here](../app-monitoring/sysdig-monitor-create-monitoring-dashboards.md)

Metrics recorded in OpenShift and Sysdig are stored over time so you can review a history of your application resource useage. Be sure to consider this usage over time, especially if you expect the load on your application to change day-to-day, week-to-week or season-to-season. Consider each component in the namespace, whether it's a part of the application or DevOps tools.

If you need help answering this question [check these examples](#examples-of-answers).

#### 3. What steps have you taken to try to fit your application into your current quota?

* Think about if there's anything you can do to use your current quota more efficiently. Can you decrease the resources assigned to your existing pods to free up more quota? 

* Write down what you've already done to lower current resource usage and explain why you need the quota increase. Be honest - if you've tried everything and still need more quota, that's okay. Sometimes, there's nothing you can reasonably do to make your existing quota work. If you can, explain why you think you shouldn't change anything

  This part might include references to pods or objects you haven't mentioned before. Even if you're asking for more quota to run more frontend application pods, you might find that your database pods are using up more resources than they need. Explain why you can't reduce the resource allocation of these other pods, or try doing that before asking for more quota. For more information on quotas, see [OpenShift project resource quotas](../automation-and-resiliency/openshift-project-resource-quotas.md).

* Before we move forward with your quota change request, expect to discuss with the Platform Services team ways to optimize your application within your current quota. We usually don't approve quota requests without trying to make the existing quota work first. The more details you provide in your initial request, the shorter this conversation is likely to be!

  If you need help answering this question [check these examples](#examples-of-answers).

### Step 5: Submit edit request changes 

The Platform Services team needs to know if your application is using the current quotas efficiently. 

* Once all the information has been compiled from [**Step 4**](#step-4-gather-information-for-your-request) click on the `Submit edit request` button

* A pop-up will appear to allow space to include all the information you have collected and gathered. This place only allows for text information

### Step 6: Wait for an email from the Platform Services team

For the last step, you'll receive an email from the Platform Services team providing you with approval or requesting further information from your quota increase request (remember that quota decreases are automatically approved). 

If the Platform Services team requires more information, they'll likely ask for: 

* A screenshot of Sysdig dashboard (if available)
* Additional images or files that supplement the already submitted information in the previous step
* More context about your plan and what your team's objectives are by obtaining the extra quota

If the Platform Services team doesn't  hear back from you within 2 weeks, we'll need to close your request, and you'll need to submit a new one.

## Essential resources to improve your quota increase request 

### Examples of requests
These examples mainly concentrate on particular pods or deployments. When you're asking for a quota increase, it's typically to support a specific deployment or group of deployments. Focus your request explanations on these - there's no need to spend time outlining the resource allocations for every single pod in your namespace, just provide the information that's relevant to the request.

If you're unsure, it's better to include more information than less, the Platform Services team is here to help!

#### Example 1: More space for database backups

> **Why do you need a quota increase?**
> I need more storage space because my database backup PVC is filling up.
> 
> **Outline the current and desired states of the relevant OpenShift objects.**
> My database backup PVC is currently 10Gi, and already uses 8Gi. This 8Gi includes 3 full backups (one per week) and up to 6 incremental backups (1 for each day since the last full backup). I would like to retain 4 full backups per week plus 1 per month going back 6 months. This means the PVC would need to be able to hold 9 full backups, plus up to 6 incremental backups. I estimate this will require around 20Gi, so I need at least 12Gi more backup storage quota. I'm requesting 15Gi more, just in case the backups change in size a little bit over time.
> 
> **What steps have you taken to fit your application into your current quota?**
> My database backup process already tars and zips the backup files to make the most efficient possible use of the space available. My application is required to retain 6 months of backups, so the total number of backups stored can't be reduced.

This quota request is likely to get approved without many (or any) follow-up questions from the Platform Services Team. The requester did a great job giving all the necessary information and explaining why the storage is needed. Storage quota requests are simpler than CPU or memory quota requests, so it's easier to provide all the needed information upfront.

#### Example 2: Increasing from 2 to 3 replicas per deployment

> **Why do you need a quota increase?**
> My deployments are all only 2 pods each and I would like to bump them up to the recommended 3, but I hit the CPU request quota when I try to do that.
> 
> **Outline the current and desired states of the relevant OpenShift objects.**
> I have 4 deployments that each run 2 pods. They are all deployed from vendor-provided helm charts and use the default resource allocations included in the charts. I would like to increase the number of replicas in each deployment to 3, but my namespace doesn't have enough quota to do so. 
> 
> **What steps have you taken to fit your application into your current quota?**
> I am currently using the vendor-recommended resource allocations, so I don't want to reduce the allocations and would prefer to increase the namespace quota.


This request might need more involvement from the Platform Services Team and probably won't be approved immediately. While we understand the importance of following vendor-recommended resource allocation, we've noticed that most vendor defaults are much larger than necessary. 

Providing detailed information about your application's actual resource usage (not just allocation) will help justify using the vendor-recommended defaults, if your team believes they're necessary.

#### Example 3: Temporary quota for a migration between Patroni and CrunchyDB

> **Why do you need a quota increase?**
> I am trying to switch from Patroni to Crunchy and migration would be much easier if I could run both simultaneously. My current quota is fine for just one database cluster, but I require more quota temporarily so I can run two during the migration process.
> 
> **Outline the current and desired states of the relevant OpenShift objects.**
> My Patroni pods currently use 250m CPU request and 256Mi memory request for each pod. I would estimate that each Crunchy pod should be given around the same resources, so I'll need enough extra quota to allow for three more pods of approximately this resource allocation to start up.
> 
> **What steps have you taken to fit your application into your current quota?**
> My Patroni pods are sometimes a bit unstable, so I don't want to reduce the resource allocation in case that increases the instability even more.

This request might need more input from the Platform Services Team and might not be approved right away. Patroni stability problems aren't always caused by not having enough resources, especially when Patroni pods already have quite a bit of resources allocated to them.

If you can share more details about how reducing resource allocation affects the stability of your Patroni instance, and if you can provide information about the resource usage of your Patroni pods, it will help the Platform Services Team understand why you think your Patroni's stability issues are related to resource allocation. 

This will increase the chances of us approving your request quickly (or helping you find the actual cause of these stability issues).

#### Example 4: HPA can't scale up enough pods

> **Why do you need a quota increase?**
> When my prod app is under high load, the HPA tries to start more pods than the quota allows, and then it gets stuck trying to spin up a pod that isn't allowed to start because the namespace has used up all of its quota.
> 
> **Outline the current and desired states of the relevant OpenShift objects.**
> My frontend app pods use 100m CPU request each. Currently, the HPA can spin up 6 of these before I hit the CPU request quota for my namespace. I don't know how many pods the HPA would attempt to spin up if given more quota, so I'm not sure how much CPU request I should expect to use. For now, I am requesting a single core increase in my CPU quota, and will revisit if I continue to encounter this problem.
>  
> **What steps have you taken to fit your application into your current quota?**
> I tried running my frontend app pods with 80m CPU request instead, but that caused problems with the application during high load, because the existing pods weren't able to handle load spikes temporarily while the HPA was spinning up new pods. I don't want to try to reclaim CPU request from my database pods because they're only running at 100m CPU request, and it's not best practice to run a database pod with very low requests.
>
> **When will automatic approval happen?**
> 1. If your request for more CPU and Memory meets all of the following requirements, it will be automatically approved:
> * For memory quota adjustments, if your namespace’s current usage exceeds 85% of its total memory limit.
> * Your namespace’s resource utilization rate is at least 35%.
> * The requested adjustment either meets the minimum values of 1 core for CPU and 2GB for memory, or increases the quota by no more than 50%.
> 2. If your request for more Storage meets all of the following requirements, it will be automatically approved:
> * Your namespace’s current usage exceeds 80% of its PVC limit.
> * The requested adjustment either meets the minimum values of 32GB, or increases the quota by no more than 50%.

This request is likely to get approved with just a few follow-up questions from the Platform Services Team. Even though it doesn't provide a clear picture of how the namespace's resource usage should look in the future, the requester has explained why they lack that information. They've also made a reasonable request for a single-step increase, planning to request more only if there's evidence they need it.

If the request includes statistics on the resource usage of the front-end pods, confirming the explanation about the load problems caused by running the pods with a lower CPU request, this might be one of those rare CPU requests that could be approved without any further questions from the Platform Services Team!
 

### Setting up resource monitoring with Sysdig Monitor - why it's important to consider it

As explained in the [steps](#steps-to-request-quota-increase) to request a quota increase adjustment, it's crucial to monitor and collect metrics illustrating your application's resource utilization. Much of the information needed to justify a quota increase can be found in the OpenShift web console, but requires navigating through many different pages to collect a full view of the resource usage of your entire namespace. Sysdig makes the collection of this information much easier, for both the purposes of requesting a quota increase and for day-to-day namespace maintenance and monitoring. Additionally there is also a template called: **Resources Quota Approve Dashboard** that exists in your Sysdig dashboard list. 

If you haven't already, check out the comprehensive guide on onboarding to application monitoring with Sysdig. Visit [Onboarding to application monitoring with Sysdig](../app-monitoring/sysdig-monitor-onboarding.md) for a step-by-step instructions for onboarding onto Sysdig and utilizing default dashboards to gain insights into your application's performance. For The documentation has all you need to onboard onto Sysdig and use the default dashboards.

If you have successfully onboarded to Sysdig, we provide a dedicated document outlining the specific metrics and evidence needed when applying for additional resources. This document serves as a guide to assist you in compiling the necessary data effectively. Make sure to gather comprehensive information on resource consumption, covering CPU and memory usage, along with any other relevant metrics specific to your application. 

* For more details on the required metrics and evidence, check the [resource monitoring dashboards](../app-monitoring/resource-monitoring-dashboards.md) guide page

* If you have any issues onboarding to Sysdig, contact the Platform Services team on the applicable [Rocket.Chat channel](https://chat.developer.gov.bc.ca/channel/devops-sysdig)

* If you need to store a large amount of unstructured data, consider using the [S3 Object Storage Service](https://github.com/bcgov/OpenShift4-Migration/issues/59) provided by Enterprise Hosting. This service is provided by the OCIO and is not hosted on OpenShift, so data stored in an S3 bucket will not count towards the storage quota in your namespace.

Once the quota increase request is approved, the specified namespaces are upgraded to the next quota size.

---
## Related pages

* [Resource Management Guidelines](https://github.com/bcgov/developer-experience/blob/master/docs/ResourceManagementGuidelines.md)
* [Application Resource Tuning](https://github.com/bcgov/developer-experience/blob/master/docs/resource-tuning-recommendations.md)
* [Get Started with Sysdig Monitoring](../app-monitoring/sysdig-monitor-onboarding.md)
* [devops-sysdig RocketChat channel](https://chat.developer.gov.bc.ca/channel/devops-sysdig)
* [Platform Product Registry](https://registry.developer.gov.bc.ca/)
* [OpenShift project resource quotas](../automation-and-resiliency/openshift-project-resource-quotas.md)
* [S3 Object Storage Service](https://github.com/bcgov/OpenShift4-Migration/issues/59)
* [devops-sysdig RocketChat channel](https://chat.developer.gov.bc.ca/channel/devops-sysdig)
* [Platform Product Registry](https://registry.developer.gov.bc.ca/)
* [OpenShift project resource quotas](../automation-and-resiliency/openshift-project-resource-quotas.md)
* [S3 Object Storage Service](https://github.com/bcgov/OpenShift4-Migration/issues/59)
