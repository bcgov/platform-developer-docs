---
title: How To Deploy and Maintain a Postgres Database

slug: postgres-how-to

description: Step-by-step guide for deploying and maintaining a high availability Postgres database in Openshift with Patroni and Crunchy

keywords: database, data, OpenShift, high-availability, postgres, patroni, crunchydb, crunchy

page_purpose: Helps teams to make informed implementation decisions for high-availability Postgres 

audience: developer, technical lead

author: Cailey Jones

content_owner: Cailey Jones

sort_order: 4
---

# How To Deploy and Maintain a Postgres Database in Openshift

## Before We Begin

- Read our [High Availability Database Clusters](/high-availability-database-clusters/) documentation. You need to know what makes a database "high availability" in an OpenShift cluster, and why that's important. 
- Read our [Open-Source Database Technologies](/opensource-database-technologies/) documentation to check out the alternatives to Patroni/Postgres. Make sure that Patroni is the right technology for your needs!
- Join the [#patroni](https://chat.developer.gov.bc.ca/patroni) and [#crunchydb](https://chat.developer.gov.bc.ca/crunchydb) channels on RocketChat for a place to ask questions and find community support.
- Have a working knowledge of the OpenShift CLI. Check out our [OC CLI](/install-the-oc-command-line-tool/) documentation for an introduction, and sign up for OpenShift 101 to learn more.
- Install the `helm` command line tool.

### What's a Cluster?

If you hear someone from the Platform Team (or the BCgov developer community) use the word "cluster", they're usually talking about one of our OpenShift clusters. However, in Postgres world, the word "**cluster**" is used to refer to a group of databases that are "clustered" together, usually for the purposes of making the database highly available. We'll be using the term in this document to refer mostly to the database sort of cluster, but there will be references to both types of cluster. We'll aim be explicit about which one we mean by referring to an "Openshift cluster" or "Patroni cluster" instead of just using the word "cluster" by itself.

## What's the Difference Between Patroni and Crunchy?

### A Note on Names

We, the Platform Team, have an admission!

Crunchy and Patroni are, technically, the same thing. CrunchyDB runs on the same Patroni software that you'll find when you install a standalone Patroni cluster without the use of the CrunchyDB operator. They're both Patroni!

So, when we talk about "Patroni vs Crunchy", we're actually discussing a *self-contained* installation of Patroni vs an installation of Patroni that is being managed by the CrunchyDB operator. In practice, this means much of the architecture is similar, but managing them is very different. 

Does this mean you can use techniques for managing a self-contained Patroni deployment with a CrunchyDB managed database? Yes, technically, you can! Tools like `patronictl` exist on CrunchyDB pods, and will work exactly the same way. However, you *shouldn't* do this, as CrunchyDB deployments expect to be managed through the operator. Making changes to your deployment without working through the operator can cause things to break.

We will continue to use the terms "Crunchy" and "Patroni" to differentiate the two types of deployment, just because it's easier than saying "self-contained Patroni" vs" "Patroni managed by the Crunchy Operator." We just want to make sure you are aware that this language might be a bit misleading!

### Which One Is Better?

It depends on your needs!

In a self-contained deployment of Patroni, the Patroni software does all of its own management of the database cluster on the database pods themselves. 
- The benefits:
    - Your database pods aren't dependent on anything else to run effectively. 
    - You have total control over both the management software and the database itself.
    - Deployment is comparatively simple and straightforward.
- The drawbacks: 
    - Because the management of your database cluster occurs entirely on the database pods, a problem with your pod also means a problem with your management software. This can make it more difficult for stand-alone Patroni to recover from an outage, since the software meant to support that recovery is also unavailable. Patroni is intentionally designed to mitigate this issue, but there's only so much that can be done if the pods are simply not running.
    - Patroni doesn't come with extra database management features such as backups. You'll need to implement those yourself.
    - You have total responsibility for the management software and the database itself. If something goes wrong, you have to take immediate and direct action to fix it, instead of depending on someone else to do that for you.

In a CrunchyDB deployment, the management of the database cluster occurs mostly within the CrunchyDB operator. Syncing is still governed by the Patroni software running on the pods.
- The benefits:
    - CrunchyDB offers a wide variety of additional database features, including backups, point-in-time recovery options, and a wider variety of storage options.
    - Because much of the database is managed by an external pod, the management and recovery functionality remains intact, even if your database pods start to fail. This makes it more likely that CrunchyDB will be able to recover on its own from an outage.
    - The responsibility for maintaining and supporting much of the database management software is passed to the Platform Team. You don't have to worry about maintenance on the management software - just on the database itself.
- The drawbacks:
    - The additional features mean that deploying CrunchyDB can be a lot more complicated than deploying stand-alone Patroni, especially the first time.
    - The long-term functioning of your database is dependent on an external pod. However, if the operator pod has a problem, this won't affect your database immediately. It will only begin to have an impact if your pods restart. 
    - Your team won't have direct control over the management software.

### Making Use of Managers

Patroni manages Postgres, and Crunchy manages Patroni.

As a general rule, you should use the highest-level manager to make changes to your deployment whenever possible. Only move down a "step" in the management hierarchy if you can't accomplish your task using the manager. 

If you're using Crunchy, use the PostgresCluster OpenShift object to manage your database cluster. If you want to make any change to your cluster, check to see if you can make it by updating the PostgresCluster object first. Avoid using `patronictl` commands or creating OpenShift objects related to your Crunchy cluster by hand.

If you're using standalone Patroni (or if you're using Crunchy and have already done your due diligence to make sure that this change isn't something you can perform with the PostgresCluster object), default to using `patronictl` to manage your database cluster. Avoid editing the configuration of your Postgres cluster directly or manual changes to the objects created by the cluster. 

## Patroni Architecture

**Hey! If you're using Crunchy, you should still read this section! The Crunchy Architecture section is going to build on this one!**

### Objects and Deployment

A typical deployment of Patroni includes the following objects:
- 1 StatefulSet containing 3 pods, all running an image containing both Postgres and Patroni software
    - 1 pod is the primary pod, which recieves all communication from the application
    - 2 pods are secondary pods, which are effectively in read-only mode and can only be updated by syncing with the primary.
- 3 ConfigMaps used to track failover status and which pod is currently the primary pod.
- 1 Secret containing the username and password information for the various database users
    - While this object can be generated automatically by Patroni, it's usually created manually, either by the user or by a deployment template such as the helm chart included below.
- 2 Services
    - one service refers to all 3 of the pods in the cluster
    - the other service points to the pod that is currently primary
- 3 PersistentVolumeClaims, all in ReadWriteOnce mode and assigned specifically one to each pod in the cluster. Each claim must be large enough to contain a copy of the entire database. They should all use the `netapp-block-standard` storage class.
- 1 ServiceAccount used by Patroni to manage all of these objects.
- 1 Role and Rolebinding associated with the ServiceAccount, granting the necessary permissions to manage these objects.

In addition to these objects, you'll need to create a few objects that aren't included in a typical Patroni deployment:
- 1 NetworkPolicy allowing your Patroni pods to communicate with each other and with other application pods as appropriate. See our [Network Policies](/openshift-network-policies/) documentation.
- 1 PodDisruptionBudget, which should be set to allow a minimum number of pods equal to 2. If your Patroni StatefulSet does not include a minimum of 3 pods, it should. But if your team has chosen to run your database with 1 or 2 pods against recommendations, please do not create a PodDisruptionBudget for it. Learn more about [PodDisruptionBudgets](https://kubernetes.io/docs/tasks/run-application/configure-pdb/).

Note that standalone Patroni does not include any backup management, so you should also make use of [https://github.com/bcgov/backup-container].

The community has put together a useful helm chart for deploying Patroni which can be found at [https://github.com/bcgov/nr-patroni-chart]. This chart sets up all the objects listed in the basic Patroni deployment, plus a NetworkPolicy with appropriate settings. You'll still need to create your own PodDisruptionBudget and backup solution.

### Management and Tools

Patroni manages its high availability features by using a combination of OpenShift's built-in functionality and the Patroni management software built into the image used to run each database pod. Syncing between pods, leader elections and failover is governed by a quorum among the different instance of Patroni running in your database cluster.

If you update the StatefulSet or a pod is killed, OpenShift follows its standard procedures for these changes within a StatefulSet. This is usually acceptable. If you want more/better control over this, CrunchyDB may be a better option.

Patroni is managed primarily using the `patronictl` command line interface. You can use the terminal on the OpenShift web console or you can use `oc ssh` to access the command line of any pod in your Patroni cluster to run `patronictl`. 

Though we won't get into details of the CLI here, get comfortable using the `patronictl list` command to check on the status of your cluster. Get used to the idea of using this CLI for regular management tasks. If you need to restart a pod, you should use `patronictl` to do so. Altering Postgres configuration should be done with `patronictl` to ensure that the config remains consistent across all three pods. 

See [Patroni's documentation](https://patroni.readthedocs.io/en/latest/README.html) for more on `patronictl`. 

## CrunchyDB Architecture

At its core, the CrunchyDB architecture is similar to that of Patroni. It uses many of the same objects, though organized and managed a little differently.

1. Everything is governed by a PostgresCluster object, which can be found at `https://console.apps.CLUSTER.devops.gov.bc.ca/k8s/ns/NAMESPACE/postgres-operator.crunchydata.com~v1beta1~PostgresCluster/CLUSTERNAME`. All changes to your cluster should be performed by updating the YAML of this object, as necessary. **This includes anything that would have used `patronictl` to govern in a standalone installation, such as any Postgres database configuration**.
    - the status of your cluster (including which pod is primary and the failover status) is tracked in the status of this object instead of ConfigMaps.
    - this object governs everything, not just the database pods themselves. That includes all Services, ServiceAccounts, PodDisruptionBudgets, Secrets and PersistentVolumeClaims
2. Instead of having 1 StatefulSet with 3 pods, your cluster is made up of 3 StatefulSets with 1 pod each. This allows the CrunchyDB Operator to take more direct control over how pods are updated and restarted when a pod fails or an image is updated. This permits less disruptive image changes and more responsive actions in the event that a pod is killed. 
    - As with standalone Patroni, syncing between pods is still governed by a quorum among the instances of Patroni running in your cluster.
3. Pods run multiple containers - between 3 and 5, depending on your configuration. The is one main container that runs Postgres and Patroni, with sidecar containers that run networking, archiving, and backups.
4. The PostgresCluster object can also include configuration for backup management via `pgbackrest` and connection pooling with `pgbouncer`.
    - The `backup` stanza of the PostgresCluster object includes all configuration for your backups, including your backup schedule and configuration of which backups you wish to retain and for how long. For more information on the different options, checkout [Crunchy's Backup Documentation](https://access.crunchydata.com/documentation/postgres-operator/latest/tutorials/backups-disaster-recovery).

For a fuller exploration of the architecture of CrunchyDB's Postgres Cluster, check out their [Architecture Docs](https://access.crunchydata.com/documentation/postgres-operator/latest/architecture).

You might notice that they have some information on a metrics dashboard that's available for Crunchy as well! The Platform Team invites any team to give it a shot. We recommend installing that element of the database service in your `tools` namespace. We have limited documentation on these features at the moment, so if you'd like to explore, we'd love to see what you come up with!

This is a lot, and represents a different approach to managing your OpenShift objects compared to what you might be used to. To make things easier, one of our fantastic community teams has put together a [helm chart for CrunchyDB](https://github.com/bcgov/crunchy-postgres), complete with some recommended defaults to get started. Note that these default settings are for a very small, very low load instance - the defaults exist in many cases to show you what options are available for you to change. Definitely be prepared to increase some of the default values once you've played around with it a bit! 

## Primaries, Elections and Syncing

The whole point of this highly available database cluster is to ensure that your database continues to function, even if your primary pod goes down. How, exactly, does this process happen?

1. You primary pod goes down. Patroni usually uses a "heartbeat" check to detect this - if a majority of Patroni pods in a cluster stop getting heartbeat responses from the primary for any reason, the cluster will consider the primary unavailable.
2. Patroni selects the new primary candidates from among the secondary database pods. These candidates must be fully synced with the last known state of the primary. If data was updated on the primary and that change wasn't synced with a secondary, that secondary pod will not be considered a viable election candidate.
3. The secondary pods vote on the new primary from among the viable election candidates. That pod "steps up" to become the new primary, entering full read-write mode. 
4. Patroni updates anything that references the primary pod outside the database pods themselves. 
    - In a stand-alone instance of Patroni, this usually means updating some configmaps, labels and a service object that points to the primary pod.
    - In CrunchyDB, this usually involves the operator updating its own internal records, the service object pointing to the primary pod, and the status of the PostgresCluster custom resource.
5. The new primary pod begins accepting connections from the application, and begins syncing changes with all the available secondary pods.
6. When the old primary pod comes back up, it re-joins the cluster. As part of this process, it learns that a new primary has been elected, so it "steps down" to a secondary pod.
7. This new secondary pod asks the primary pod to send it all changes that it missed while it was unavailable. It is now an up-to-date secondary and is available for election, if necessary.

There are a few potential points of failure in this process to be aware of:

- If there is an ongoing transaction on the primary pod when it goes down during step 1, that transaction will be lost. The secondaries are only required to have synced completed transactions in order to be considered up-to-date. When the old primary comes back up and re-joins the cluster in step 6, it will abandon any incompleted transactions when it syncs with the new timeline established by the new primary. 
    - You can limit the impact of this issue by using shorter transactions whenever possible. 
    - You can also limit the effect of this issue by ensuring that your application can detect and respond appropriately to error responses from your database.
- If none of the secondary pods are fully synced to the primary when the primary goes down, there will be no election candidates, and Patroni will not elect a new primary. If this happens, Patroni will keep the same pod as primary, even though it's unavailable. Once the primary comes back up, the Patroni cluster will resume functioning, but there will be an outage while the primary pod is down. 
    - This is one reason why 3 pods is the recommended minimum - if something prevents one secondary from syncing, the other is still there and (hopefully) synced and available to become an election candidate. 
    - Using shorter transactions can also help prevent this issue, because they are synced more quickly than longer transactions. 
    - You can also change Patroni's configuration to accept a longer delay before secondary pods are considered unsynced from the primary. This increases the risk of lost transactions, but it's up to your team to decide the correct balance between risking lost transactions vs risking an outage for this reason.
- When the old primary pod comes back up and re-joins the cluster as a secondary, it asks the new primary for all the changes that occurred while it was unavailable. The primary pod always keeps a record of recent transactions for the purposes of syncing them with member pods. It only keeps those records that it needs to sync secondaries or recover from backup. When the new secondary joins the cluster, it will ask the primary for these records going back to its last transaction. If the pod has been down for a very long time, it's possible that the primary may no longer have records going back that far. If this happens, the new secondary is unable to sync. See the Troubleshooting section below for more details on this particular issue.


## WAL, Archiving and Backups

This is a huge topic, so this section is going to be a very broad overview of WAL files and specifically how they relate to replication in Patroni. If you're looking for more information, check out the [Postgres documentation on WAL and replication](https://www.postgresql.org/docs/current/wal.html).

Postgres keeps a record of recent transactions in a write-ahead log or WAL file. Patroni uses WAL files to sync data between primary and secondaries. Instead of trying to search for differences between the primary and secondaries, the primary just keeps a record of what has changed, and then tells the secondaries what changes they need to make to keep up.

Standalone Patroni keeps WAL files only for the purpose syncing between primary and secondaries. Patroni purges WAL files if it believes they aren't needed anymore (ie: once all secondaries are synced) and once they've reached a certain age. 

CrunchyDB can set up point-in-time recovery, which allows you to restore your database to any point in time, instead of just restoring to your most recent backup. In order to do this, Crunchy keeps all the WAL files since the last backup. This would take up a lot of space, so it regularly archives older WAL files. Crunchy purges WAL files that have been archived, and purges WAL archives after a backup is taken.

There are two kinds of database backup (and they're the same for both Patroni and Crunchy): full and incremental. A full backup is just what it sounds like - it backs up all the data in the database. These are typically pretty large, so you don't want to keep a lot of them at the same time. An incremental backup is a compressed record of all the changes that have occurred since the last time a backup was taken. They're much more compressed than WAL files or WAL archives, but take a lot longer to recover from. They're much smaller than a full backup, so taking incremental backups allows you to keep many recovery points for your database without having to store a full backup for each one.

Head over to our documentation on [Database Backup Best Practices](/database-backup-best-practices/) to get some recommendations on when to take full backups vs incremental, and how many to keep. 

You'll find the options for changing your Crunchy backup schedule in your PostgresCluster objects, in the `backups` section. If you've implemented the community `backup-container`, you'll find some documentation on their repo regarding how to change the schedule and retainment settings!


## Troubleshooting Common Problems

### Secondary Pod Can't Sync

When a secondary pod syncs with the primary pod, it will usually do so by asking the primary pod for a record of all transactions that have occurred since the last time it synced. If a secondary pod has been unavailable or unable to sync for a long period of time, it may ask the primary for records that the primary no longer has. 

This can produce one of two types of error message in the logs of both the primary and secondary:
- The primary and secondary both show error messages that the secondary is requesting a specific WAL file that does not exist.
- The secondary shows error messages about a forked timeline while the primary shows messages indicating that the secondary is either requesting data from a conflicting timeline or is requesting a WAL file that doesn't exist.

If you run `patronictl list` on any of the database pods, it will show that the secondary has an extremely high lag time. 

Because CrunchyDB keeps WAL archive files, it's slightly better than standalone Patroni at recovering from this issue. However, we have seen this problem pop up using both. 

This isn't really a problem with Patroni or Postgres - it's a symptom of a problem with the larger OpenShift cluster or your namespace. As such, there isn't that much you can do to prevent it entirely. There are a couple of things you can do to make your database a little more resilient to the possibility, including:
- Make sure your volumes have enough space for temporary files like WALs to fluctuate in size. It's hard to say exactly how much space is needed because it depends a lot on how many updates occur in your database, how big they are, how likely it is that consecutive updates will write to the same rows, etc. A reasonable rule of thumb is that you always want at least 20% of your volume free, but you should keep track of how much storage your database uses to determine if that rule actually works for you. 

### Running Out of Archive/Backup Space

If you're using CrunchyDB, you may run into some issues with the WAL archive fulling up your repo volume - especially if your database is super active. 

Remember that your WAL archives get purged every time you make a backup, and backups - even incremental ones - are MUCH more space-efficient than WAL archives or WAL files. Tune your database configuration to archive your WAL files a little more often if space is a problem on the main database volume, or run backups a little more often if you're running into issues on the repo volume.

And remember, you can also send your backups to the OCIO's Object Store service for much cheaper and easier storage of backup files, so check that out as an option as well!