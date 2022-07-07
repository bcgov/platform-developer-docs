---
title: App Resiliency Guidelines

slug: app-resiliency-guidelines

description: Describes the design and implementation process for creatin resilient applications

keywords: openshift, resiliency, design, 12-factor, available, deployable, recoverable, resource, communtiy support, tools, examples

page_purpose: To provide an overview of the methodology for designing resilient applications

audience: developer, technical lead, product owner

author: Matt Spencer

content_owner: Olena Mitovska

sort_order: 2
---
# Application resiliency guidelines

One of the most amazing benefits of working on OpenShift is that, when your application has been designed with a few key ideas in mind, you can avoid many of the regular outages that are almost unavoidable on legacy infrastructure. All that time you used to spend with your application down because you needed to patch a server? Gone. If a node needs to go down for patching purposes, a correctly designed application can simply spin up another pod on another node, and your users won't even notice. Sounds great, right? But the question is, then: how do you design an application for OpenShift if it's so different from applications designed for legacy infrastructure?


## On this page
- [What does "Correctly Designed" mean?](#correctly-designed)
- [A Monitored App](#monitored)
- [A Highly Available App](#highly-available)
- [An Easily Deployable App](#easily-deployable)
- [A Recoverable App](#recoverable)
- [A Correctly Resourced App](#resourced)
- [A Well Behaved App](#behaved)
- [Community Support](#community-support)
- [Tools](#tools)
- [Examples](#examples)

## What does correctly designed mean?<a name="correctly-designed"></a>

All you need to do is make sure that your application takes advantage of OpenShift through some specific design requirements. These are outlined through the concept of a [12 factor application](https://12factor.net/). 

**Note:** If you're a technical user looking for some help on how to make a 12-factor application, go to the bottom of this document for examples of applications that run in a resilient manner on the platform. Feel free to ask those teams for some advice on how they got there.

## A monitored application<a name="monitored"></a>

An application that runs without failing most of the time is great, but things happen. Maintenance, failures, network problems and sneaky little issues in the design or implementation of your application can cause strange behaviours or outages. The platform is extremely highly available, (99.98% available for the last 12 months as of mid-2022) but that doesn't mean you should assume that your application is guaranteed the same availability. Application outages can happen for reasons other than full platform outages.

The best way to keep on top of these issues in a proactive manner is to monitor your application and ensure that there are appropriate notifications of issues. There are many ways that such a monitoring can be implemented, including:

* Pod health checks
* Uptime dashboards
* API health checks
* Storage health checks

Many of these notification options provide your team an opportunity to act to prevent an outage before it starts. Finding out, for example, that your storage is almost full before it fills up means that your team can act to deal with the storage issue before it causes an outage or service issue. Other notifications can let you know the moment an outage starts and can provide extremely valuable information about the cause of the outage, so your team can begin troubleshooting right away without having to wait for users to inform you of the problem.

Your team should also ensure you are in the [#devops-alerts channel](https://chat.developer.gov.bc.ca/channel/devops-alerts) in Rocket.Chat where notices of upcoming maintenance are posted. There are not many messages sent in this channel, so we recommend switching your Rocket.Chat notification settings for the channel to **All messages**.

## A highly available application<a name="highly-available"></a>

The platform may have very high availability in general, but our individual nodes do not. This doesn't mean the nodes are unstable or difficult to use. It just means that the way we approach maintenance and infrastructure problems are a little different from the way things work in the legacy application world. Did you know that we don't guarantee a single node will be up for more than 24 hours at a time? That's right. Our nodes will be restarted or changed very often. This might sound like a big problem with the platform, but it's actually a feature. It means that the platform team can be extremely proactive about keeping the platform's physical infrastructure in great shape.

Legacy infrastructure is designed to ensure that a specific server will have the highest possible uptime. OpenShift works a little differently. Instead, we ensure that you will always have some infrastructure to use for your application. We don't ensure that the infrastructure will be the same, or that it will remain up forever. Now that your team is aware of that, it's simply a matter of architecting your application accordingly.

There are plenty of options for ensuring that this change in approach helps your application stay up even longer than it might on legacy infrastructure. After all, your application's ability to jump in an agile manner from one node to the next means that you don't have to endure maintenance outages. If one node goes down for maintenance, your application can simply spin up on another. Or, even better, if your application is already running on multiple nodes, taking down one node has no impact at all.

![Markdown Flow Chart](../../images/availability.png)

## An easily deployable application<a name="easily-deployable"></a>

Because all applications on OpenShift should be architected with the expectation that any node can go down at any time, it's imperative that applications be easy and quick to redeploy. This requires - most importantly - **no human interaction in the process**. Once the platform is given the command to deploy your software on a new pod, the process between starting up that new pod and having an accessible and usable application should require no human interference whatsoever.

This means that all of your deployment configurations should be automated and kept in source-control to ensure that it is easily accessible, consistent, and up-to-date at all times. That includes any side processes like your monitoring tasks from the section above.

## A recoverable application<a name="recoverable"></a>

This part isn't so different from legacy applications. If you need to recover your application due to data corruption or some other significant failure, it's important that your application be architected to do so quickly and easily. Most of this is covered by having an application that is easily deployable, but it's also important that you have the ability to recover any stateful data or configurations that cannot be held in a repository. In other words, you need to be able to recover your database and application passwords.

## A correctly resourced application<a name="resourced"></a>

Ensuring your application has the resources it needs, without taking too much, is a balancing act. Different applications and environments will also need different levels of service.

Pods can define [compute resources](https://docs.openshift.com/container-platform/3.11/dev_guide/compute_resources.html#dev-compute-resources) via requests and limits for CPU and memory. A **request** is a guaranteed amount dedicated exclusively to your pod. A **limit** is a maximum you cannot exceed. Requests are dedicated and the amount of CPU cores and RAM in the cluster is limited, so only request the resources you need. If the cluster becomes full additional pods will simply fail to start.

It is preferable to scale horizontally, instead of vertically. Use smaller request and limit values for CPU and memory and use a [horizontal pod autoscaler](https://docs.openshift.com/container-platform/3.11/dev_guide/pod_autoscaling.html) to scale up the number of pods to meet demand.

Use the [quality of service](https://docs.openshift.com/container-platform/3.11/dev_guide/compute_resources.html#quality-of-service-tiers) options available to ensure your pods are correctly resourced and treated appropriately by the scheduler.

If your pod has its requests and limits set to `0` it will run BestEffort and use whatever spare capacity is available on its node. This can be good for things like batch jobs that want to go as fast as they can, but don't care about being slowed down from time to time. It will also be the first to be evicted from an overloaded node. Assigning `0` as a request or limit must be done through the CLI or directly in the manifest.

If your pod has limits higher than its requests it will run Burstable and get at minimum the requested amount and be burst up to its limit depending on how busy the node is with other pods.

If your pod has the requests and limits set to the same value then it will run Guaranteed QoS class. It will have preferential access to compute resources and will be the last to be evicted if a node should become overloaded. This is best for applications in the prod namespace as they need the best uptime.

## A well behaved application<a name="behaved"></a>

It is important to ensure your application is well behaved and doesn't impede the cluster's Operator work or impact the cluster's ability to heal.

Review the Kubernetes documentation on [pod terminations](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination) to understand the full sequence of events. Ensure that your pods will gracefully exit. This means not setting the `terminationGracePeriod` too high, and ensuring your containers command properly listens for the `SIGTERM` and responds.

When draining nodes for patching, the Platform Operations team will cap the grace period to 600s and force kill anything left running after that.

If your application is making use of [pod disruption budgets](https://kubernetes.io/docs/tasks/run-application/configure-pdb/), make sure that it is set to allow some disruption. Setting `maxUnavailable` to zero will be overridden by the Platform Operations team.

Ensure that your pods are not in a `CrashLoopBackOff` state for too long. If they have been crashing for more than a day the Platform Operations team might just delete them or scale down their replicaset.

## Community support<a name="community-support"></a>

You may note that this document is pretty vague about the "hows" of these principles. This is because it can vary from application to application, and technology stack to technology stack. The design needs for a highly available chat application are very different from those of a highly available static website.

If you're looking for some general guidance on what high availability options exist in OpenShift, attend our [OpenShift 101] training.(https://developer.gov.bc.ca/ExchangeLab-Course:-Openshift-101) This course covers a number of options, including how to deploy a basic application with high availability.

This is where the community comes in. If you have a highly available application, please feel free to fork this document and add links to examples from your application (along with information about your stack and any explanations you feel might be necessary). The more you reach out to help your fellow developers, the stronger a community we will be.

It's also very important to remember that in the B.C. government, we are part of a larger, international community of developers working to create better and more resilient applications. There are a lot of great resources available on the broader internet that we could never hope to match here.

## Tools<a name="tools"></a>

The Developer Exchange community is full of great developers seeking ways to help the rest of the community. Here are some examples of tools that you can use to help build a more resilient application:

**[BCDevOps/backup-container](https://github.com/BCDevOps/backup-container)**

* Features a separate container that can spin up on a schedule in your namespace, which connects to your database to perform a backup and/or to perform a test recovery of the most recent backup
* Currently works for both Postgres and MongoDB

**[BCDevOps/Platform-Services/Patroni](https://github.com/BCDevOps/platform-services/tree/master/apps/pgsql/patroni)**

* An open-source option for creating a highly available Postgres cluster


## Examples<a name="examples"></a>

The following are some fantastic examples of applications that operate on the platform with high resiliency design, as well as a couple of quick summaries of how and why the teams who built the applications made the decisions they did. If you're aiming to build something similar to an application shown here, please always feel free to ask the team in question for their advice on how to make your application more resilient as well.

**Note:** While these examples all include resilient design, they're not going to be perfect for everyone. Use them as starting points for your own decisions about the best architecture for your application, not as rules for how you are "supposed" to do things. If you have an idea for how any of these projects might improve, offer your ideas to the application's team (and maybe even a helping hand).

**[Rocket.Chat](https://github.com/BCDevOps/platform-services/tree/master/apps/rocketchat)** - Platform Services team

* A highly available implementation of Rocket.Chat with an autoscaler that can change the total number of pods from a minimum of three to a maximum of five, based on CPU usage
* A highly available implementation of a MongoDB stateful set
* Pod anti-affinity ensures that no two pods are ever spun up on the same node
* MongoDB backups are currently performed using a straightforward cronjob that spins up a pod to connect to the database and perform the backup

**[Keycloak](https://github.com/bcgov/ocp-sso)** - Platform Services team

* A highly available implementation of Keycloak
* An example of how to implement Patroni (in the future, this will become an example of a highly-available Enterprise DataBase (EDB) instead)

**[DevHub](https://github.com/bcgov/devhub-app-web)** - Developer Experience team

* Three replica Deployment
* a chain-build gastby (react app) that builds nodejs into a caddy server

**Note:** If your team has a resilient design of any kind - even if you haven't perfected it - please fork this document and add your repository as an example. Nobody is perfect, and in-progress examples are a great help for teams trying to learn where to start.


---
Related links:
* [12 Factor App](https://12factor.net/)
* [Openshift: Compute Resources](https://docs.openshift.com/container-platform/3.11/dev_guide/compute_resources.html#dev-compute-resources)
* [Horizontal Pod Autoscaler](https://docs.openshift.com/container-platform/3.11/dev_guide/pod_autoscaling.html)
* [Quality of Service](https://docs.openshift.com/container-platform/3.11/dev_guide/compute_resources.html#quality-of-service-tiers)

* [Pod Terminations](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination)
* [Openshift 101](https://developer.gov.bc.ca/ExchangeLab-Course:-Openshift-101)
* [PodDisruptionBudgets](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)
* [Tools: BCDevOps Backup Container](https://github.com/BCDevOps/backup-container)
* [Tools: Patroni](https://github.com/BCDevOps/platform-services/tree/master/apps/pgsql/patroni)
* [Example: Rocketchat](https://github.com/BCDevOps/platform-services/tree/master/apps/rocketchat) - Platform Team
* [Example: Keycloak](https://github.com/bcgov/ocp-sso) - Platform Team
* [Example: Devhub](https://github.com/bcgov/devhub-app-web) - Developer Experience

Rewrite sources:
* https://developer.gov.bc.ca/Developer-Tools/Resiliency-Guidelines
---
