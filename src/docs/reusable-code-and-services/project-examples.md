---
title: Project examples

slug: project-examples

description: 

keywords: reusable services, plugins, tools, services, project examples

page_purpose: Provide examples built with OpenShift and tools with Platform Services 

audience: developer, technical lead

author: Shelly Han

content_owner: Olena Mitovska

sort_order: 1
---
# Project examples
Last updated: **December 6, 2023**

<!-- Document description goes here and answers: why this document is helpful, what it is and how to use it -->

## On this page
* **[Product Registry](#link)**
* **[SSO Service](#project-b---single-sign-on-sso-service)**
* **[Title](#link)**
* **[Title](#link)**
* **[Related pages](#related-pages)**

---

# Project A

## Project overview
<!-- A brief description of the project, its purpose, and the problems it aims to solve. -->

## Key technologies used
<!-- Highlight the main technologies, frameworks, or programming languages that powered your project. -->

## Challenges and Solutions / Lessons Learned
<!-- Share any hurdles your team faced during development and how you overcame them. Alternatively, if there are valuable lessons learned in the process, those would be fantastic to include. -->

## Code or link to repository (if available)

## Architecture overview (if available)

# Project B - Single Sign On (SSO) Service

## Project overview
<!-- A brief description of the project, its purpose, and the problems it aims to solve. -->

The Pathfinder Single Sign On (SSO) team builds products and services that enable Government digital delivery teams to get single sign-on login options for their applications. These are applications for businesses and residents of British Columbia.

The Pathfinder SSO team uses a DevOps continuous improvement approach towards its Common Hosted Single Sign On Application https://bcgov.github.io/sso-requests and support its custom realm clients. The Agile team will use the Agile Methodology, human-centred design, open source languages and frameworks, and RedHat Keycloak Single Sign On (standard protocols like OAuth 2.0, OpenID Connect, SAML 2.0.)

## Architecture overview

- RedHat Single Sign On Product aka Keycloak technology: We have three environments (dev, test, and prod) and each one has its own keycloak instance. All three keycloak instances are in environment specific namespaces in the Private Cloud hosted in Kamloops Gold Data center. We do also have a Disaster Recovery (DR) site hosted in Calgary GoldDR Data center, which ensures service continuity in case of any disaster or calamity. We have setup a data replication process to maintain the data consistency between Keycloak instances hosted in Gold and GoldDR datacenters, which ensures no data loss for the failover to DR site. Refer [more details](https://github.com/bcgov/sso-switchover-agent/blob/main/docs/switchover-logic-and-the-gslb.md) on how we have achieved the automation to failover to DR site in case of any disaster or calamity.

- Common Hosted Single Sign-on (CSS): Our front-end is hosted on GitHub pages and the backend is deployed in AWS as a set of Lambda functions that connect to AWS RDS for the data persistence. All the lambdas are protected by AWS API Gateway, which provides an API Endpoint that is used by the UI to send requests. We have implemented IAC using terraform to update these resources and maintain the state in our AWS S3 buckets.


## Key technologies used
<!-- Highlight the main technologies, frameworks, or programming languages that powered your project. -->

The Pathfinder Single Sign On Services uses:
- RedHat SSO, aka Keycloak, which is an open-source Identity and Access Management solution aimed at modern applications and services. It makes it easy to secure applications and services with little to no code. This includes:
  - Private Cloud Openshift Platform - Gold and GoldDR clusters
  - Java (as the primary language of KeyCloak)
  - Helm for DevOps manifest management
  - Patroni Postgres Database (including backup container)
  - Python
  - GitHub Registry
- Common Hosted Single Sign-on (CSS):
  - Next.js, Typescript
  - GitHub (pages, actions)
  - Terraform
  - CHES Email Service
  - deployed in Public Cloud (AWS)
  - IDIM/BCeID Web Service for authentication
- Realm Registry:
  - Next.js, Typescript
  - hosted on Azure Web Service
- Monitoring:
  - Grafana, Loki, Promtail
  - cronjobs
  - Uptime.com and Sysdig
- Alerting and Communication:
  - MSTeams and RocketChat
  - Uptime.com and  OpsGenie

## Challenges and Solutions / Lessons Learned
<!-- Share any hurdles your team faced during development and how you overcame them. Alternatively, if there are valuable lessons learned in the process, those would be fantastic to include. -->

We strive to deliver value for our customers. We've focused the last few years on system stability and reliability. We offer business continuity aka disaster recovery for our service. Learn more about our [Service Levels](https://github.com/bcgov/sso-keycloak/wiki/Alerts-and-Us#service-levels).

## Code or link to repository (if available)

Below are some of our main repositories:
- [bcgov/sso-requests](https://github.com/bcgov/sso-requests): The request process workflow tool for the RedHat SSO Dev Exchange service (github.com) – CSS (Common Hosted Single Sign On)
- [bcgov/sso-keycloak](https://github.com/bcgov/sso-keycloak) – RedHat SSO Keycloak
- [bcgov/sso-realm-registry](https://github.com/bcgov/sso-realm-registry) – SSO Realm Registry

# Project C
## Project overview
## Key technologies used
## Challenges and Solutions / Lessons Learned
## Code or link to repository (if available)
## Architecture overview (if available)

# Project D

## Project overview
## Key technologies used
## Challenges and Solutions / Lessons Learned
## Code or link to repository (if available)
## Architecture overview (if available)


--- 

## Related pages 
* [Reusable services list](/reusable-services-list/)

