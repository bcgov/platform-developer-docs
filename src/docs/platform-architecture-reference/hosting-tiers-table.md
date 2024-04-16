---
title: Hosting tiers table

slug: hosting-tiers-table

description: Describes the differences between OCP clusters 

keywords: ocp clusters, hosting tiers, product tools, clusters

page_purpose: Provide clear content regarding private cloud hosting tiers

audience: technical lead, developer

author: Steven Barre, Billy Li, Nick Corcoran

content_owner: Olena Mitovska

sort_order: 6
---

# Hosting tiers table
Last updated: **March 21, 2024**

This section presents a concise summary table highlighting key distinctions among OCP editions. These differentiators encompass target uptime (availability), maximum data sensitivity, integrated high availability (HA), disaster recovery (DR) options, release plan details, supported operators, scalability limits, and interoperability with other hosting services.  

The aim is to provide a clear and easily understandable overview of each OCP edition's unique attributes.

## On this page
* **[Silver](#silver)**
* **[Gold](#gold)**
* **[Emerald](#emerald)**
* **[Related pages](#related-pages)**

## Silver 

| Silver hosting tier | Details |
|-----------------------------------------------|-------------------------------------------------|
| **OpenShift Cluster Name** | Silver |
| **Target up time (availability)** | Platform availability for the Silver hosting tier is 90% for [single-node](#single-and-multi-node-application-deployments) and 99.5% in a rolling 30-day window for [multi-node deployments](#single-and-multi-node-application-deployments) |
| [**Maximum data sensitivity**](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security/information-security-classification) | - Protected B: Stored at rest (in a database or file storage)<br> - Protected C: Processing only (must be stored elsewhere) |
| **Integrated HA, DR options**| TransportServerClaims|
| **OpenShift upgrade plan** | Aim for N minus 1 tracking Red Hat point releases for OpenShift|                  
| **Supported operators**| - Horizontal Pod Autoscaler<br> - Vertical Pod Autoscaler<br> - Custom Metrics Autoscaler<br> - Pipelines: Tekton<br> - CrunchyDB<br> - ArgoCD<br> - Kyverno <br>- License required Red Hat integration<br> - Enterprise DB <br> - JBoss EAP |
| **Upper limit of scalability** | - 1500 CPU Cores<br> - 30TB Storage <br> - 10G Networking
| **Options for security interoperability with other hosting services** | -  Shared Egress IP for the cluster can be used in firewall rules with STMS-Classic<br> - Cluster can directly egress to the public internet<br> - Public internet can connect to cluster API and hosted apps |

--- 

## Gold

| Gold hosting tier | Details |
|-----------------------------------------------|-------------------------------------------------|
| **OpenShift Cluster Name** | Gold and GoldDR |
| **Target up time (availability)** | Platform availability for the Gold hosting tier is 99.95% in a rolling 30-day window, specifically for applications with [multi-node deployments](#single-and-multi-node-application-deployments) that have a geographic failover to the Gold DR cluster in the Calgary data centre, minimizing disruption. <br><br>**Without DR, Gold maintains the same availability as Silver** |
| [**Maximum data sensitivity**](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security/information-security-classification) | - Protected B: Stored at rest (in a database or file storage)<br> - Protected C: Processing only (must be stored elsewhere) |
| **Integrated HA, DR options**| - TransportServerClaims to connect between Gold and Gold DR<br> -Global Load Balancing between clusters for Active/Passive DR|
| **OpenShift upgrade plan** | Aim for N minus 1 tracking Red Hat point releases for OpenShift|
| **Supported operators**| - Horizontal Pod Autoscaler<br> - Vertical Pod Autoscaler<br> - Custom Metrics Autoscaler<br> - Pipelines: Tekton<br> - CrunchyDB<br> - ArgoCD<br> - Kyverno <br>- License required Red Hat integration<br> - Enterprise DB <br> - JBoss EAP |
| **Upper limit of scalability** | - 225 CPU Cores <br> - 16TB Storage <br> - 10G Networking |
| **Options for security interoperability with other hosting services** | - Shared Egress IP for the cluster can be used in firewall rules with STMS-Classic<br> - Cluster can directly egress to the public internet<br> - Public internet can connect to cluster API and hosted apps |

---
## Emerald 

| Emerald hosting tier | Details |
|-----------------------------------------------|-------------------------------------------------|
| **OpenShift Cluster Name** | Emerald |
| **Target up time (availability)** | Platform availability for the Emerald hosting tier is 90% for [single-node](#single-and-multi-node-application-deployments) application deployments and 99.5% in a rolling 30-day window for [multi-node deployments](#single-and-multi-node-application-deployments) |
| [**Maximum data sensitivity**](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security/information-security-classification) | Protected C - Storage and/or processing |
| **Integrated HA, DR options**| None|
| **OpenShift upgrade plan** | - Extended Update Support (EUS) <br> - Only upgrades to even numbered releases of OpenShift|
| **Supported operators**| - Horizontal Pod Autoscaler<br> - Vertical Pod Autoscaler<br> - Custom Metrics Autoscaler<br> - Pipelines: Tekton<br> - CrunchyDB<br> - ArgoCD<br> - Kyverno <br>- License required Red Hat integration<br> - Enterprise DB <br> - JBoss  EAP <br> - IMB MQ |
| **Upper limit of scalability** | - 175 CPU Cores <br> - 16TB Storage <br> - 10G Networking |
| **Options for security interoperability with other hosting services** | - Per Namespace Egress subnet can be used in firewall rules with STMS-Classic <br> - Only access for some workloads to the public internet and only via a proxy server <br> - API is only available inside SPANBC <br> - Hosted apps may be granted access from the public internet <br> - Access to VM-SDN workloads|

### Single and multi-node application deployments

A **single-node** means that the whole application runs on just one part of the OpenShift cluster. In this setup, everything, like the application pieces, services, and containers, is set up and handled on a single machine, whether it's a real computer or a virtual one.

 In a **multi-node** application deployment, the application isn't limited to just one part of the OpenShift cluster. Instead, it's spread across multiple nodes. This setup improves scalability, fault tolerance, and performance because the application's workload is distributed and managed on several nodes within the cluster.

## Related pages

- [Hosting tiers - explained](https://digital.gov.bc.ca/cloud/services/private/products-tools/hosting-tiers/) 
