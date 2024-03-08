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
Last updated: **March 6, 2024**

There are a few CronJobs set up on the OpenShift clusters to help prune old objects and keep the cluster clean. This page discusses each of the different object types and how and when they are pruned.

## On this page
* **[DeploymentConfigs](#deploymentconfigs)**
* **[Builds](#builds)**
* **[ImageStreams](#imagestreams)**
* **[Pipelines](#pipelines)**
* **[Related pages](#related-pages)**

## DeploymentConfigs

When a `DeploymentConfig` rolls out a new version, it creates a new `ReplicationController`. After some time, the number of these can pile up. So older ones are pruned daily.

A few settings are passed to the pruner job:

* Per `DeploymentConfig` object, keep the last 2 `ReplicationControllers` that have a status of `Complete` and replica count of zero.
* Per `DeploymentConfig` object, keep the last 1 `ReplicationControllers` that have a status of `Failed` and replica count of zero.
* Per `DeploymentConfig` object, keep any `ReplicationControllers` that is younger than 48 hours.
* Prune all `ReplicationControllers` that no longer have a `DeploymentConfig` object, has status of `Complete` or `Failed`, and has a replica count of zero.

## Builds

When a `BuildConfig` runs a build a new `Build` object is created along with the pods that the build runs in. After some time, the number of these can pile up. So older ones are pruned daily.

A few settings are passed to the pruner job:

* Prune all builds whose build configuration no longer exists, status is complete, failed, error, or canceled.
* Per `BuildConfig` object, keep the last 2 `Builds` whose status is `Complete`.
* Per `BuildConfig` object, keep the last 1 `Builds` whose status is `Failed`, `Error`, or `Canceled`.
* Per `BuildConfig` object, keep any `Builds` that is younger than 48 hours.

## ImageStreams

### Daily Prune

As new images are built and pushed to tags, the older copies of that tag are retained. Each of these is called a revision and is tracked with a `sha256`. After some time, the number of these can pile up. So older ones are pruned daily.

A few settings are passed to the pruner job:

* All revisions created in the last 48h are kept
* All revisions in use by a running pod, or in a deployment are kept. See [the docs](https://docs.openshift.com/container-platform/4.13/applications/pruning-objects.html#pruning-images-conditions_pruning-objects) for a full list
* Only the most recent revision is kept
* All other revisions are pruned

### Image Registry Size warnings

The platform will now be sending a weekly email to teams that are using too much space on the registry. The image registry is a shared service and overuse of it can lead to other teams being unable to push their builds, or to the platform team having to buy more storage space.

The emails will list all the image streams, their tags, and revisions. It will show the size used by each of these ensuring to not double-count layers that are reused. This should help provide info on where to focus efforts to reduce image registry usage.

You can delete a whole image stream with `oc delete imagestream <is_name>` or just a tag with `oc tag -d <imagestream>:<tag>` . See [Managing Image Streams](https://docs.openshift.com/container-platform/4.13/openshift_images/image-streams-manage.html#images-imagestream-remove-tag_image-streams-managing) for more.

If you have any questions please reach out on [#devops-operations](https://chat.developer.gov.bc.ca/channel/devops-operations) and someone will be happy to help you clean up your projects image streams.

The [OpenShift 201 training](/training-from-the-platform-services-team/) features content related to image stream tags. View the [related lab exercise and video demonstration](https://github.com/BCDevOps/devops-platform-workshops/blob/master/openshift-201/image-management.md)

### Hard Prune

The OpenShift Container Registry can accumulate blobs that aren't referenced by the cluster’s ETCD database. The basic pruning images CronJob, therefore, is unable to operate on them. These are called orphaned blobs.

To address this a hard prune of the image registry is performed during OpenShift upgrades. We complete this Sunday morning at 6am before the upgrade is started on Monday. To perform a hard prune, the image registry must first be put into a Read-Only mode to ensure data consistency.

As the data removed by this isn't referenced by any ImageStream or Tag it should not be impactful to any applications.

## Pipelines

As you run Tekton Pipelines it will create `PipelineRun` and `TaskRun` objects. After some time, the number of these can pile up. So older ones are pruned daily.

A few settings are passed to the pruner job:

* Keep the 5 most recent of each object type in the namespace

---
---

## Related pages

- [Best practices for managing image streams](/best-practices-for-managing-image-streams/)
- [Red Hat’s documentation on pruning](https://docs.openshift.com/container-platform/4.13/applications/pruning-objects.html)
- [Red Hat's documentation on Pipeline pruning](https://docs.openshift.com/pipelines/1.14/install_config/customizing-configurations-in-the-tektonconfig-cr.html#default-pruner-configuration_customizing-configurations-in-the-tektonconfig-cr)
