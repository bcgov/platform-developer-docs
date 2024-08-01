---
title: Tutorial - Learn to use Postgres on OpenShift with CrunchyDB

slug: crunchydb-tutorial

description: Tutorial online for setting up a highly-available Postgres database on the OpenShift platform using the Postgres Operator by CrunchyDB.

keywords: database, data, OpenShift, high-availability, backup, recovery, crunchy, crunchydb, postgres, postgresql, tutorial

page_purpose: Helping teams learn the user of CrunchyDB for the platform and their applications 

audience: developer, technical lead

author: Cailey Jones

content_owner: Cailey Jones

sort_order: 5
---

# Tutorial: Learn to use Postgres on OpenShift with CrunchyDB

This video tutorial is for technical users who need install and maintain a relational database on BCGov's OpenShift platform. The videos guide you through installing a Postgres database in your namespace using the CrunchyDB Operator. They also cover important maintenance tasks such as backing up and restoring your data

---

## Tutorial videos

This series of 4 videos introduces CrunchyDB. It shows how to install it, create backups, and action recovery

### Part 0: Prerequisites

This tutorial covers the 'how' of installing and maintaining a database on OpenShift. The videos guide you through the technical steps for various database tasks.

Understanding why each task is important for general database management and your application is out-of-scope for these videos. For those details, read our [Using Postgres on OpenShift with Patroni and CrunchyDB](../database-and-api-management/postgres-how-to.md#crunchydb-architecture) documentation. Please read this document before you begin!

The tutorial requires the following software installed on your machine:

- [OpenShift CLI](../openshift-projects-and-access/install-the-oc-command-line-tool.md)
- Git CLI or some other method for cloning a GitHub repository
- [Helm](https://helm.sh/docs/intro/install/)

Experience with Helm is not required to follow the video instructions. However, you may find it useful to read [Helm's introductory documentation](https://helm.sh/docs/intro/using_helm/) for better understanding of some of the installation steps. 

### Part 1: Introduction (6:37 min) 

<iframe width="560" height="315" src="https://www.youtube.com/embed/z4-LXybx6sk?si=er5z0-rJAOTOxb8j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Part 2: Installation (16:58 min)

<iframe width="560" height="315" src="https://www.youtube.com/embed/795WJ6tIBGg?si=DSiArN_xu_wkxrSK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- Access the [Crunchy-Postgres GitHub repo](https://github.com/bcgov/crunchy-postgres)

**Commands used in the video** (for easy copy-paste):

- `helm upgrade --install hippo-tools ./charts/tools` to install the tools chart
- `helm upgrade --install hippo-ha ./charts/crunchy-postgres` to install the PostgresCluster object

### Part 3: Backups (8:54 min)

<iframe width="560" height="315" src="https://www.youtube.com/embed/8PY6DD7QbNQ?si=k5YqqctyU4tM-KcA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Part 4: Recovery (7:56 min)

<iframe width="560" height="315" src="https://www.youtube.com/embed/qRD9tLL4iew?si=K-zRdpi79d-0QZPV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**Commands used in the video** (for easy copy-paste):

* `psql` to connect to the Postgres database running on the PostgresCluster's primary pod
* `SELECT * FROM users;` to select the dummy data inserted into the database
* `helm list` to view all helm charts installed in a namespace
* `helm uninstall hippo-ha` to uninstall the PostgresCluster helm chart
* `helm upgrade --install hippo-ha ./charts/crunchy-postgres` to re-install the PostgresCluster helm chart

If you would like to insert the dummy data used in the video into your own test database, use these commands:

To create a table called "users":

```CREATE TABLE users (
 id serial PRIMARY KEY,
 name text NOT NULL,
 created_on timestamptz
);
```

This SQL command defines a table with columns for user ID, name, and the creation timestamp.

---
## Related pages

* [Using Postgres on OpenShift with Patroni and CrunchyDB](docs/database-and-api-management/postgres-how-to.md) 
