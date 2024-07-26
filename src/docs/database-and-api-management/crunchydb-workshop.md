---
title: Workshop - How to use a Postgres database on OpenShift with CrunchyDB

slug: crunchydb-workshop

description: Workshop online for setting up a highly-available Postgres database on the OpenShift platform using the Postgres Operator by CrunchyDB.

keywords: database, data, OpenShift, high-availability, backup, recovery, crunchy, crunchydb, postgres, postgresql

page_purpose: Helping teams learn the user of CrunchyDB for the platform and their applications 

audience: developer, technical lead

author: Cailey Jones

content_owner: Cailey Jones

sort_order: 5
---

# How to use a Postgres database on OpenShift with CrunchyDB

The following video workshop is intended for technical users who need to install and maintain a relational database on BCGov's OpenShift platform. The videos will walk you through the process of installing a Postgres database in your namespace using the CrunchyDB Operator, and through a few important maintenance tasks such as backing up and restoring your data. 

## Workshop videos

These are a series of 4 videos that introduces CrunchyDB, how to install it, create backups and action recovery. 


### Part 0: Prerequisites

This workshop is about the "how" of installing and maintaining a database on OpenShift. The videos will walk you through the specific technical steps involved in the various operational tasks involved in running a database. You should understand *why* each of these tasks is important in general database management, as well as why each task is relevant to the needs of your application. This information is out-of-scope for these practical videos. These "why" questions are the focus of our [Using Postgres on OpenShift with Patroni and CrunchyDB](../database-and-api-management/postgres-how-to.md#crunchydb-architecture) documentation. Please read this document before you begin!

The workshops require the following software to be installed on your machine:
- OpenShift CLI
- Git CLI (or some other method for cloning a GitHub repository)
- [Helm](https://helm.sh/docs/intro/install/)

Although experience with helm is not required to follow the instructions outlined in the video, you might find it useful to read [Helm's introductory documentation](https://helm.sh/docs/intro/using_helm/) so you can better understand some of the installation steps.

### Part 1: Introduction (6:37 min) 

<iframe width="560" height="315" src="https://www.youtube.com/embed/z4-LXybx6sk?si=er5z0-rJAOTOxb8j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Part 2: Installation (16:58 min)

<iframe width="560" height="315" src="https://www.youtube.com/embed/795WJ6tIBGg?si=DSiArN_xu_wkxrSK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Part 3: Backups (8:54 min)

<iframe width="560" height="315" src="https://www.youtube.com/embed/8PY6DD7QbNQ?si=k5YqqctyU4tM-KcA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Part 4: Recovery (7:56 min)

<iframe width="560" height="315" src="https://www.youtube.com/embed/qRD9tLL4iew?si=K-zRdpi79d-0QZPV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

