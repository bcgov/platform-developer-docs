---
title: Reusable services list

slug: reusable-services-list

description: Provides an index of reusable services for developers and related information.

keywords: reusable services, plugins, tools, services

page_purpose: Provides brief details on specific reusable services and links out to useful documentation or resources on the given service.

audience: developer, technical lead

author: Jonathan Bond, Shelly Han

content_owner: Olena Mitovska

sort_order: 1
---
# Reusable services list
Last updated: **November 28, 2023**

This document covers some of the most popular reusable components designed to enhance the feature and infrastructure of your applications. You can find out more about the services and tools below, and guidance on how to integrate them into your application. This list crosses with the [BCGov Common Components](https://digital.gov.bc.ca/common-components/) as well as the [BCGov Software as a Service (SaaS) catalog](https://digital.gov.bc.ca/cloud/services/saas/), feel free to check out from all three places when looking for a component to use!

## On this page
* **[Backup container](#backup-container)**
* **[BC Address Geocoder](#bc-address-geocoder)**
* **[CI/CD Pipeline templates](#cicd-pipeline-templates)**
* **[Common Document Generation Service](#common-document-generation-service)**
* **[Common Hosted Email Service](#common-hosted-email-service)**
* **[Common Object Management Service](#common-object-management-service)**
* **[Get Token](#get-token)**
* **[Fathom](#fathom)**
* **[go-crond](#go-crond)**
* **[Matomo OpenShift](#matomo-openshift)**
* **[OWASP ZAP security vulnerability scanning](#owasp-zap-security-vulnerability-scanning)**
* **[Pathfinder Single Sign-On Keycloak](#pathfinder-single-sign-on-keycloak)**
* **[SonarQube and SonarCloud](#sonarqube-and-sonarcloud)**
* **[WeasyPrint HTML to PDF/PNG microservice](#weasyprint-html-to-pdfpng-microservice)**
* **[Related pages](#related-pages)**

---
<!-- 
Topic format:

## Title
### Features 
## How-to
-->

## Backup Container
The [Backup Container](https://github.com/bcgov/backup-container) is an easy backup system. It helps you back up one or more databases to another place. You can also test restoring the database backups to make sure they work when needed. The code and documentation was originally pulled from [HETS Project](https://github.com/bcgov/hets).

### Features
These are the supported databases:
- MongoDB
- PostgresSQL
- MSSQL (MSSQL requires the NFS DB volume is shared with the database for backups to function correctly)
- MariaDB

### How-to
You can run Backup Container for supported databases separately or in a mixed environment. The service can be hosted as either a deployment with scheduled Database (DB) tasks or as a Cronjob in OpenShift. For more details on how to set it up, refer to the [backup-container repository](https://github.com/bcgov/backup-container).

## BC Address Geocoder
The BC Address Geocoder REST API lets you integrate real-time standardization, validation and geocoding of physical addresses into your applications. The current baseUrl for the online geocoder is `https://geocoder.api.gov.bc.ca/`.

### Features
The Geocoder helps you:
- Validate and geocode addresses (including public and related business occupants)
- Find physical sites, intersections and occupants
- Find sites, intersections and occupants near a point or within an area

### How-to
Follow the [BC Address Geocoder Developer Guide](https://github.com/bcgov/api-specs/blob/master/geocoder/geocoder-developer-guide.md) to get started. Please note that the URL allows both public and gated access. Gated access requires an APIkey. 

To get a sandbox APIkey with a maximum rate of 1000 requests per minute, visit the [Geocoder API console](https://catalogue.data.gov.bc.ca/dataset/bc-address-geocoder-web-service). 

You can get an unrestricted APIkey for use in government applications by opening a ticket with the [Data Systems & Services request system](https://api.gov.bc.ca/).

## CI/CD Pipeline templates

[The Pipeline templates repository](https://github.com/bcgov/pipeline-templates) provides different options to setup your CI/CD pipeline in OpenShift. You can find pipeline samples that contain common CI/CD pipeline stages to reuse for your project.

### Features
CI/CD Pipeline Templates and GitHub Actions templates.

- OpenShift Pipeline (aka Tekton) examples:
    - Installation guide on how to setup pipeline on either your local workspace or from a docker container
    -  React app build and deploy
    -  Using builda to build and push an image
    -  Build and deploy application via helm
    -  Maven build
    -  Codeql scan
    -  Sonar scan
    -  Trivy scan
    -  Owasp scan

### How-to
- Find out how to use OpenShift Pipeline with [this guide](https://github.com/bcgov/pipeline-templates/tree/main/tekton)
- OpenShift 201 [training video](https://github.com/bcgov/devops-platform-workshops/blob/master/openshift-201/pipelines.md) about OpenShift Pipeline 

- Use Github Actions [guide](https://github.com/bcgov/pipeline-templates/blob/main/docs/github.md)

## Common Document Generation Service
Use the Common Document Generation Service (CDOGS) to generate PDF or XML-based documents (ex: docx, xlsx, pptx, odt, ods, odp, and html). The CDOGS API can merge complex datasets into document templates. It supports any XML-based document templates including but not limited to Microsoft Office, LibreOffice, and OpenOffice.

### Features
Use the Common Document Generation Service to:
- Create custom letters to clients, including detailed information related to their files
- Create requests for proposals and related standard-form contracts
- Generate monthly reports by automatically inserting data into documents

### How-to
For more information on CDOGS, see the following pages:
* [Common Document Generation Service (CDOGS) product overview](https://digital.gov.bc.ca/common-components/common-document-generation-service)
* [Common Document Generation Service (CDOGS) documentation](https://bcgov.github.io/common-service-showcase/services/cdogs.html)

## Common Hosted Email Service
Use the Common Hosted Email Service (CHES) to send emails programmatically.

### Features
Use the Common Hosted Email Service to:
- Notify a list of clients of individual appointments or schedule changes
- Request information regarding specific items
- Advise contacts of process changes that apply to their cases

### How-to
For more information on CHES, see the following pages:
* [Common Hosted Email Service (CHES) product overview](https://digital.gov.bc.ca/common-components/common-hosted-email-service)
* [Common Hosted Email Service (CHES) documentation](https://bcgov.github.io/common-service-showcase/services/ches.html)

## Common Object Management Service
Use the Common Object Management Service (COMS) to cut costs on storage for your business apps. Pick an authorization and authentication method that fits your app's needs. COMS is a secure REST API that connects your app to any S3 bucket.

### Features
Use COMS to:
- Upload, download, manage and delete objects
- Discover, update and manage object versions
- Toggle general public access to objects
- Grant and manage refined user object permissions
- Flexible search and filter capabilities of metadata and tags based on user permissions

### How-to
For more information on COMS, see the following pages:
* [Common Object Management Service (COMS) product overview](https://digital.gov.bc.ca/common-components/common-object-management-service)
* [Common Object Management Service (COMS) documentation](https://bcgov.github.io/common-service-showcase/services/coms.html)

## Get Token 
Get Token (also known as GETOK) is a web-based tool for development teams to manage their application’s secure access to Common Services. Users can create and deploy service clients instantly to gain access to common service APIs like email notifications, document management, or document generation.

### Features
- Communicate with Keycloak realms to generate service clients
- Secure password generation and transmission via public/private key encryption

### How-to
Refer to the [nr-get-token repository](https://github.com/bcgov/nr-get-token) to get started. 
You can leverage the [quick start guide](https://github.com/bcgov/nr-get-token/blob/master/app/README.md). 

To install the service on OpenShift, refer to [this guide](https://github.com/bcgov/nr-get-token/blob/master/openshift/README.md).

## Fathom

Fathom analytics provide simple website statistics without tracking or storing personal data. [fathom-openshift](https://github.com/BCDevOps/fathom-openshift) is a set of OpenShift configurations to set up an instance of the Fathom web analytics server.

### How-to
Refer to the [Fathom repository](https://github.com/BCDevOps/fathom-openshift) to get started. If you require more comprehensive analytics, a Google Analytics alternative, where data ownership and privacy compliance are still a concern check out [Matomo Openshift](https://github.com/BCDevOps/matomo-openshift).

## go-crond
go-crond is a cron daemon crafted in Go, designed specifically for Docker images.

### Features
- system crontab (with username inside)
- user crontabs (without username inside)
- run-parts support
- Logging to STDOUT and STDERR (instead of sending mails)
- Keep current environment (eg. for usage in Docker containers)
- Supports Linux, MacOS, ARM/ARM64 (Rasbperry Pi and others)

### How-to
Refer to the [go-crond repository](https://github.com/webdevops/go-crond) to get started. You can find the installation guidance and n the repo.

## Matomo OpenShift
Matomo is a full web analytics server. It's a choice to consider instead of Google Analytics if you're worried about owning your data and meeting privacy rules.

### How-to
[Matomo OpenShift](https://github.com/BCDevOps/matomo-openshift) provides a set of OpenShift configurations to set up an instance of the Matomo web analytics server. You can also find out more about [Matomo](https://matomo.org/).

## OWASP ZAP security vulnerability scanning
The OWASP Zed Attack Proxy (ZAP) automatically finds security vulnerabilities in web applications.

### Features
- Active and Passive Scans
- Running Scans: Desktop and API
- Authenticated Security Scanning
- WebSockets
- OWASP ZAP Fuzzer
- AJAX Spidering

### How-to
The public docker registry version of OWASP's Zed Attack Proxy (ZAP) is not compatible with OpenShift without using privileged containers. Use [this Docker image](https://github.com/BCDevOps/owasp-zap-openshift) resolves that issue. You can also check out ZAP scanning integration with pipeline from the [pipeline-template repo](https://github.com/bcgov/pipeline-templates).

## Pathfinder Single Sign-On Keycloak
The Pathfinder Single Sign-On (SSO) team provides the Common Hosted Single Sign-On (CSS) App. This is a self-service app that allows you to integrate with B.C. government approved login services (identity providers). The Pathfinder SSO service is built on the foundations of Keycloak/Redhat SSO.

### Features
- Easy setup with integrations to the following identity providers:
    - IDIR and AzureAD IDIR (BC Common Logon Page)
    - BCeID Basic (BC Common Logon Page) -- Allows login only with BCeID Basic
    - BCeID Business (BC Common Logon Page) -- Allows login only with BCeID Business
    - BCeID Basic & Business(BC Common Logon Page) -- Allows login with BCeID Basic or BCeID Business
    - GitHub associated with BC Gov Org -- Allows login of GitHub BC Gov Org members
- OIDC protocol
- Session Management
- High Availability Requirements

### How-to
Start with a [Request a SSO integration](https://bcgov.github.io/sso-requests/). You can find out the steps in integrate SSO service to your application from the [wiki page](https://github.com/bcgov/sso-keycloak/wiki).

## SonarQube and SonarCloud
[SonarQube](https://www.sonarqube.org/) is an automatic code review tool you can use to detect bugs, vulnerabilities and code smells in your code. It smoothly fits into your current workflow, making continuous code inspection happen across your project branches and pull requests.

[SonarCloud](https://www.sonarsource.com/products/sonarcloud/) is a cloud service offered by SonarSource and based on SonarQube. It has been enabled on BCGov github organizations.

### Features
SonarQube:
- Static code analysis for over 17 languages
- Review security hotspots, detect bugs and vulnerabilities
- Track code smells and fix your technical debt
- Code quality metrics, history, and CI/CD integration
- Extensible with more than 50 community plugins

SonarCloud (in addition to SonarQube advantages):
- Automatically analyzes and decorates pull requests on GitHub
- Can be invoked from your workstation, OpenShift pipeline and your GitHub actions on top of that it will run for every pull request automatically
- Will save precious OpenShift resources
- Is free for Open Source projects (that's us!)

### How-to
Refer to the [SonarQube repository](https://github.com/BCDevOps/sonarqube) to get started. The repo container instruction on how to install your own instance of SonarQube in OpenShift. If you are looking for SonarCloud, [here](https://github.com/BCDevOps/sonarqube#sonarcloud) are more details. To get started, you will need to submit a request for SonarCloud integration from [DevOps Requests](https://github.com/BCDevOps/devops-requests).

## WeasyPrint HTML to PDF/PNG Microservice
The [docker-weasyprint](https://github.com/BCDevOps/docker-weasyprint) project bundles WeasyPrint into a simple, OpenShift-compatible, HTML to PDF/PNG microservice with a simple REST interface. [WeasyPrint](https://weasyprint.org/) is a open source solution that helps web developers to create PDF documents.

### Features
- Support for modern CSS3 and HTML5 standards, pagination and page layout control
- Support for layout techniques like Flexbox and Grid, and handling of fonts, typography, MathML, and SVG

### How-to
Refer to the [docker-weasyprint repository](https://github.com/BCDevOps/docker-weasyprint) to get started.

---

## Related pages
* [BCGov Common Components Website](https://digital.gov.bc.ca/common-components/)
* [BCGov Saas Website](https://digital.gov.bc.ca/cloud/services/saas/)


