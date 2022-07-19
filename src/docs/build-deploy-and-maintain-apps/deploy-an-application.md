---
title: Deploy an Application

slug: deploy-an-application

description: describes deployment of applications on openshift and the related processes and tools 

keywords: deploy, application, openshift

page_purpose: this page describes the process of deployment on openshift and links to relevant documentation and tools

audience: technical lead, developer

author: Matt Spencer

content_owner: Olena Mitovska

sort_order: 
---

## On this page
- 

## Heading<a name="section-name"></a>


# Deploy an Application

You can read about how the OpenShift Container Platform handles deployments in [Red Hat's Documentation](https://docs.openshift.com/container-platform/3.11/dev_guide/deployments/how_deployments_work.html) 

## Automation of CI/CD 

You can and should use automation to build, test and deploy your application. The platform services team provides [templates](/cicd-pipeline-templates-for-private-cloud-teams) to assist teams with using automation pipelines. [ArgoCD](/automation-and-resiliency/argo-cd-shared-instances) can also be integrated with automation pipelines. 

## Configuring Apps for Resiliency 

If you apply the correct design principles, applications deployed on the OpenShift platform can avoid many of the common types of outages that  would be unavoidable if working with legacy infrastructure. See the [Application Resiliency Guidelines](/automation-and-resiliency/app-resiliency-guidelines) page for more information about these principles.

## Multi-node deployment

<!-- should this section discuss the platform default of pod anti-affinity across nodes?  -->

## Resource Tuning

[Application Resource Tuning](/application-resource-tuning)
<!-- -->

## Data Backups 
<!-- is this the right content for this heading? -->
[Backup Container](https://github.com/BCDevOps/backup-container) is a simple containerized backup solution for backing up one or more supported databases to a secondary location

## Vanity Domains and TLS Certificates 

<!-- 
?do these links fit here?
* https://github.com/bcgov/common-forms-toolkit/tree/master/openshift#vanity-url-redirects 
* https://github.com/BCDevOps/certbot
-->

## Kubernetes Network Policies

<!-- what to include about Kubernetes network policies here -->

Redhat's Advanced Cluster Security (ACS) application can be used to visualise and manage network policies within OpenShift. 

---
Related links:
* https://docs.openshift.com/container-platform/3.11/dev_guide/deployments/how_deployments_work.html
*
Rewrite sources:
* 
---
