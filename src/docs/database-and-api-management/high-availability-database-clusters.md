---
title: High availability database clusters

slug: high-availability-database-clusters

description: Describes high availability database clusters and why it's necessary to use them on OpenShift

keywords: database, data, OpenShift, high-availability

page_purpose: Provides information on what high availability database cluster are, how they work, and why they need to be used on a containerized platform like OpenShift

audience: developer, technical lead

author: Cailey Jones

content_owner: Cailey Jones

sort_order: 1
---

# High availability database clusters

Your database must be highly available (HA) to run well on the OpenShift Platform.

The platform has a very high uptime. Maintenance can take place without requiring downtime and it can continue to function even in the event of a hardware failure.

But, you must design your applications to take advantage of this high up-time. For databases, this means that they *must* be highly-available. If you try to run a database that is not highly-available, your database may suffer outages and data corruption even more often than it would on traditional infrastructure.

## Database basics

Before we talk a little more about highly-available databases, we should cover some key information about databases in general and common terms that you'll see both in these documents and in database-related documentation elsewhere.

**DBMS** stands for DataBase Management Software. Postgres, MongoDB, MySQL and MSSQL are all examples of different DBMS.

**Database High Availability Manager** (or DB HA Manager) refers to the software that allows your database to be highly-available. Sometimes, the DB HA Manager is built-in to the DBMS: MongoDB has a built-in DB HA Manager. In other cases, the DB HA Manager is separate: for example, both Patroni and the CrunchyDB Operator are DB HA Managers for Postgres. 

## Highly-available databases are different

A typical highly-available deployment has 3+ pods. All the pods are running the same application. Traffic can connect to any one of them, and they all share the same storage. If any pod goes down, the other two are there to run the application while another pod spins up to replace the one that failed. It doesn't matter which pod is which, because they're all doing the same stateless things.

This approach doesn't work for databases. If we were to take this approach, it would mean that we have three instances of a database, all writing to the same data. It would be possible to have two of these instances try to edit the same data in different ways. This is a type of data corruption. Most database management software requires strict and exclusive control over its datafiles to avoid this problem. This strict control also provides greater security. This is why only one database instance can touch any datafile, and only one database instance can write data at a time.

Highly-available database clusters meet both of these requirements. Each database instance gets its own copy of the datafiles on its own persistent volume claim (PVC). The cluster elects a primary instance, which is the only instance permitted to write data. The other two instances are secondary or member instances, and are read-only. The primary instance will constantly stream updates to the secondary instances.

If the primary instance goes down, the secondary instances will elect a new primary right away. When another pod spins up to take the place of the original failed primary, it will join the cluster as a new secondary instance. This election process is usually fast enough to be unnoticeable.

So, what does this mean for your software architecture?
* Since HA clusters require 3 pods and each pod needs its own copy of the database, your storage requirements will be triple the size of your database. 
* The primary instance will have more load than the secondary instances. Since any member of the cluster can be elected as primary, you need provide all instances with enough compute resources to act as the primary instance.
* Your application must be able to handle connecting to a new instance at any time.

## High availability database options

For information on open-source and free options for highly-available database software, check out our [Open-Source Database Technologies](/opensource-database-technologies/) documentation.

If your team is looking for a licensed database option to benefit from enterprise support, check out our [Licensed Database Products](/licensed-database-products/) documentation.