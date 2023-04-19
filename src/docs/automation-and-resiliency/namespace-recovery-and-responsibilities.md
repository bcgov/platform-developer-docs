---
title: Product Team Recovery Best Practices and Responsibilities

slug: recovery-responsibilities

description: What product teams should do in order to recover their namespace objects, if necessary

keywords: backup, restore, recovery

page_purpose: Provides best practice guidance on how to backup and recover your namespace

audience: developer, technical lead

author: Cailey Jones

content_owner: Cailey Jones

sort_order: 8
---

# Product Team Recovery Best Practices and Responsibilities

If you haven't done so already, please take a look at our [Shared Responsibilities](https://cloud.gov.bc.ca/private-cloud/your-product-team-in-the-private-cloud-paas/our-shared-responsibilities/) documentation. This document covers the more technical side of *how* to follow through on the responsibilities outlined in that document.

One of the benefits of working on the Private Cloud Platform is the freedom that DevOps teams enjoy. You are given complete control over your namespaces, letting you take direct control over the deployment of your application. That control comes with some responsibilities, and the Platform Team would like to help you understand and adjust to these responsibilities by providing some best practices for them!

Product Teams are responsible for everything inside their namespaces: all objects, deployment configuration and data. This means that you should be able to recover ***all*** objects, deployment configurations and data, if necessary.

In order to make this more digestible, this document is broken down according to the types of objects you might find in your namespace, with best practices for how to backup and recover each. 

## What To Backup

What would happen if some catastrophic failure completely destroyed one of the BC Government's OpenShift clusters? This is obviously not a very likely scenario, but it serves as a good thought experiment to consider what teams should think about backing up and knowing how to recover.

If something like this were to happen, the Platform Team and our friends at DXC would work together to stand up a new cluster, and would redeploy all platform services, including the Product Registry. We would end up with a cluster with complete recovered services - including Vault and Artifactory - and a cluster full of *empty* namespaces with fresh access granted according to the Product Registry's listed Product Owner and Team Lead.

This means it is the responsibility of the team to be able to recover *every* object and all data within your namespaces.

## Why Backups are Important

Obviously, it's not very likely that something will completely destroy an entire cluster. It might be easy to think about something like that and decide that, since it's so unlikely, it's not worth backing anything up - after all, what are the chances that anything on that scale might happen?

But you don't need something of that scale in order to need backups.

What if your new hire makes a mistake on their first day and deletes an important secret by accident? Would it be recoverable? How much of a problem would that pose for your team and application?

Teams should be able to recover their applications gracefully from unforeseen issues and mistakes like this. It's not always possible to cover every possible issue, but the risks can be mitigated if you follow best practices on what to backup and how to recover those objects.

## Recovering Different Types of Objects

### General Deployment Objects

General deployment objects are objects that you can recreate from scratch without suffering data loss. This class of object includes all of your Deployments, StatefulSets, pods, containers, NetworkPolicies, Services, Routes, most ConfigMaps, and some Secrets. 

In order to determine if a ConfigMap or Secret should be classed as a general deployment object, ask yourself how difficult it would be to recover your application if you lost the data stored within the ConfigMap or Secret. If it's not a big deal (either because all that data is stored in Github or because generating a new password is acceptable), then it's a general deployment object. If not, we'll talk about how to handle this in the next section.

These objects should be stored as **infrastructure-as-code**. Infrastructure-as-code means that you have stored your infrastucture configuration (ie: all the configuration of the general deployment objects) as code in your application's code repository. You can, with one (or close to one) push of a button, redeploy every object required for your application with the correct configuration.

If you have a pipeline running your deployments, most or all of your general deployment objects are probably already stored as infrastructure-as-code. You should still check to make sure that your pipeline covers all the necessary objects. If there are objects that need to be created or altered manually because they're not part of your pipeline, you should make clear note of this and either:
- add them to your pipeline, or
- make sure your team is clearly aware that these objects will require manual action to recreate, if necessary.

### Secrets and ConfigMaps

Secrets and ConfigMaps can often store stateful data - data that must remain the same, or the application will break.

For example, if you store your database password in a secret, delete the secret, and then create a new secret (with a new, randomly generated password), this will probably break your application, as the new password simply won't work to actually login to the database.

If any of your ConfigMaps or Secrets contain stateful data like this, your team should back up this data somewhere off-cluster. 

The Platform Team prefers to use our Vault instance for keeping backups of our passwords - even if those passwords aren't actually being pulled from Vault. Vault is a service that is backed up regularly, and would be restored in the event of some major cluster failure. The passwords would be recoverable and safe, and we could recreate any OpenShift Secrets from those, if necessary. 

If your team prefers to use some other service for backing up your Secrets, please feel free to do so (as long as you have spoken to your ministry security team about the security of your chosen tool, first)! The important part is just making sure that your Secrets and ConfigMaps are stored somewhere off-cluster.

ConfigMaps are less likely to contain stateful data of this type - however, if they do, please ensure that you have stored and are able to recover all the important ConfigMaps in your namespaces. The Platform Team recommends storing and backing up ConfigMaps in the same way as you have chosen to back up your Secrets.

### Images

Images built and pushed to the OpenShift internal registry are unlikely candidates for backup. Most teams should be able to rebuild images identical to any they might have lost. 

However, if your team has images that would be difficult to rebuild for any reason, backing them up would be a wise choice. Artifactory is backed up and would be recovered in the event of a large cluster issue. It would be a good choice for storing images that would be difficult to rebuild.

### Routes

If your route contains TLS certificate information, be sure that the certificates are backed up and stored somewhere so they can be recovered, if necessary.

### Persistent Volumes

Persistent volumes on the OpenShift platforms are not backed up by the Platform Team, with the exception of the `nfs-backup` PVC type. Please ensure that all important persistent data is backed up regularly to either an `nfs-backup` volume, or to another safe place off-cluster (such as the OCIO Object Storage Service).

For more information on persistent volumes, see our [Platform Storage](/platform-storage/) documentation.
