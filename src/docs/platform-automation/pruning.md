---
title: Pruning

slug: pruning

description: Describes the automatic object pruning that takes place in OpenShift clusters.

keywords: automation, prune, builds, deploymentconfig, imagestreams

page_purpose: Describes the automatic object pruning that takes place in OpenShift clusters.

audience: technical lead, developer

author: Steven Barre

content_owner: Olena Mitovska

sort_order: 4
---

# Pruning
Last updated: **March 8, 2024**

There are a few CronJobs set up on the OpenShift clusters to help prune old objects and keep the cluster clean. This page discusses each of the different object types and how and when they are pruned.

## On this page
* **[DeploymentConfigs](#deploymentconfigs)**
* **[Builds](#builds)**
* **[ImageStreams](#imagestreams)**
* **[Pipelines](#pipelines)**
* **[Related pages](#related-pages)**

## DeploymentConfigs

When a `DeploymentConfig` rolls out a new version, it creates a new `ReplicationController`. Over time, the accumulation of these objects can happen. Therefore, older ones are routinely removed on a daily basis through pruning as well.

A few settings are passed to the pruner job:

* Per `DeploymentConfig` object, keep the last 2 `ReplicationControllers` that have a status of `Complete` and replica count of zero.
* Per `DeploymentConfig` object, keep the last 1 `ReplicationControllers` that have a status of `Failed` and replica count of zero.
* Per `DeploymentConfig` object, keep any `ReplicationControllers` that is younger than 48 hours.
* Prune all `ReplicationControllers` that no longer have a `DeploymentConfig` object, has status of `Complete` or `Failed`, and has a replica count of zero.

## Builds

When a `BuildConfig` runs a build a new `Build` object is created along with the pods that the build runs in. Over time, the accumulation of these objects can happen. Therefore, older ones are routinely removed on a daily basis through pruning as well.

A few settings are passed to the pruner job:

* Prune all builds whose build configuration no longer exists, status is complete, failed, error, or canceled.
* Per `BuildConfig` object, keep the last 2 `Builds` whose status is `Complete`.
* Per `BuildConfig` object, keep the last 1 `Builds` whose status is `Failed`, `Error`, or `Canceled`.
* Per `BuildConfig` object, keep any `Builds` that is younger than 48 hours.

## ImageStreams

### Daily Prune

As new images are built and pushed to tags, the older copies of that tag are retained. Each of these is called a revision and is tracked with a `sha256`. Over time, the accumulation of these objects can happen. Therefore, older ones are routinely removed on a daily basis through pruning as well.

A few settings are passed to the pruner job:

* All revisions created in the last 48h are kept
* All revisions in use by a running pod, or in a deployment are kept. See [official OpenShift documentation on image prune conditions](https://docs.openshift.com/container-platform/4.13/applications/pruning-objects.html#pruning-images-conditions_pruning-objects) for a full list
* Only the most recent revision is kept
* All other revisions are pruned

### Image Registry Size warnings

The platform sends out a weekly email to teams utilizing an too much space on the shared image registry. This registry is a shared service, and if it's overused, it can result in other teams being unable to push their builds. Alternatively, it may need the platform team to purchase additional storage space.

The emails include a list of all image streams along with their tags and revisions. The provided information will indicate the size used by each, ensuring that reused layers are not double-counted. This aims to guide teams on where to concentrate their efforts in reducing image registry usage.

You can delete a whole image stream with `oc delete imagestream <is_name>` or just a tag with `oc tag -d <imagestream>:<tag>` . See [Managing Image Streams](https://docs.openshift.com/container-platform/4.13/openshift_images/image-streams-manage.html#images-imagestream-remove-tag_image-streams-managing) for more.

If you have any questions please reach out on [#devops-operations](https://chat.developer.gov.bc.ca/channel/devops-operations) and someone will be happy to help you clean up your projects image streams.

The [OpenShift 201 training](../training-and-learning/training-from-the-platform-services-team.md) features content related to image stream tags. View the [related lab exercise and video demonstration](https://github.com/bcgov/devops-platform-workshops/blob/master/openshift-201/image-management.md)

### Hard Prune

The OpenShift Container Registry can accumulate blobs that aren't referenced by the cluster’s ETCD database. The basic pruning images CronJob, therefore, is unable to operate on them. These are called orphaned blobs.

To address this, a hard pruning of the image registry is performed during OpenShift upgrades. We conduct this process on Sunday morning at 6 am, just before initiating the upgrade on Monday. Prior to performing a hard prune, the image registry is set to Read-Only mode to ensure data consistency.

As the data removed by this isn't referenced by any ImageStream or Tag it should not be impactful to any applications.

## Pipelines

As you run Tekton Pipelines it will create `PipelineRun` and `TaskRun` objects. Over time, the accumulation of these objects can happen. Therefore, older ones are routinely removed on a daily basis through pruning as well.

The pruner job will keep the 5 most recent of each object type in the namespace.

---
---

## Related pages

- [Best practices for managing image streams](../build-deploy-and-maintain-apps/imagestreams.md)
- [Red Hat’s documentation on pruning](https://docs.openshift.com/container-platform/4.13/applications/pruning-objects.html)
- [Red Hat's documentation on Pipeline pruning](https://docs.openshift.com/pipelines/1.14/install_config/customizing-configurations-in-the-tektonconfig-cr.html#default-pruner-configuration_customizing-configurations-in-the-tektonconfig-cr)
