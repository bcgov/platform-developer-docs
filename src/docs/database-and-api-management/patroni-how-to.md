---
title: How To Deploy and Maintain a Patroni Database

slug: patroni-how-to

description: Step-by-step guide for deploying and maintaining a high availability Postgres database in Openshift with Patroni

keywords: database, data, OpenShift, high-availability, postgres, patroni

page_purpose: Helps teams to make informed implementation decisions for high-availability Postgres 

audience: developer, technical lead

author: Cailey Jones

content_owner: Cailey Jones

sort_order: 4
---

# How To Deploy and Maintain a Patroni Database

## Before We Begin

- Read our [High Availability Database Clusters](/high-availability-database-clusters/) documentation. You need to know what makes a database "high availability" in an OpenShift cluster, and why that's important. 
- Read our [Open-Source Database Technologies](/opensource-database-technologies/) documentation to check out the alternatives to Patroni/Postgres. Make sure that Patroni is the right technology for your needs!
- Join the [#patroni](https://chat.developer.gov.bc.ca/patroni) channel on RocketChat for a place to ask questions and find community support.
- Have a working knowledge of the OpenShift CLI. Check out our [OC CLI](/install-the-oc-command-line-tool/) documentation for an introduction, and sign up for OpenShift 101 to learn more.
- Install the `helm` command line tool.

## Patroni Architecture

![Patroni Architecture Diagram](https://raw.githubusercontent.com/bcgov/platform-developer-docs/f7ea8af99fdd0b2d217a5ff14bc7dd9fa429950b/src/images/patroni.jpg)

The diagram above shows the basic parts of a Patroni deployment. It includes:
 - 3 database pods, each running an instance of a Postgres database and the Patroni management software
 - 

