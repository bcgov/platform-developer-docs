---
title: Reusable services list

slug: reusable-services-list

description: Provides an index of reusable services for developers and related information.

keywords: reusable services, plugins, tools, services

page_purpose: Provides brief details on specific reusable services and links out to useful documentation or resources on the given service.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Olena Mitovska

sort_order: 2
---
# Reusable services list
Last updated: **November 16, 2023**

<!-- Could we have a few sentences about what this page is about? 
Inspiration: 
If someone landed in this page what would that visitor find? How could we help the visitor understand this page's purpose?  -->

Find details on the following services or tools you can use as part of your project in `bcgov`.

## On this page
* **[Backup container](#backup-container)**
* **[BC Address Geocoder](#bc-address-geocoder)**
* **[Common Document Generation Service](#common-document-generation-service)**
* **[Common Hosted Email Service](#common-hosted-email-service)**
* **[Common Object Management Service](#common-object-management-service)**
* **[Get Token](#get-token)**
* **[Fathom](#fathom)**
* **[go-crond](#go-crond)**
* **[Matomo OpenShift](#matomo-openshift)**
* **[OWASP ZAP security vulnerability scanning](#owasp-zap-security-vulnerability-scanning)**
* **[Pathfinder Single Sign-On Keycloak](#pathfinder-single-sign-on-keycloak)**
* **[SonarQube in the BC Gov Private Cloud PaaS](#sonarqube-in-the-bc-gov-private-cloud-paas)**
* **[SonarQube on OpenShift](#sonarqube-on-openshift)**
* **[WeasyPrint HTML to PDF/PNG microservice](#weasyprint-html-to-pdfpng-microservice)**


<!-- 
For each of the topics above, could we have a description and a features or benefits section if applicable? 

Let's follow the format below:

## Title
### Features 
-->

## Backup Container

[Backup Container](https://github.com/BCDevOps/backup-container) is a simple, containerized backup solution used to backup one or more supported databases to a secondary location. The code and documentation was originally pulled from [HETS Project](https://github.com/bcgov/hets).

### Features
You can use the following databases:
* MongoDB
* PostgresSQL
* MSSQL (MSSQL requires the NFS DB volume is shared with the database for backups to function correctly)
* MariaDB

You can run Backup Container for supported databases separately or in a mixed environment.

For more information on Backup Container, see the following pages:
* [backup-container repository](https://github.com/BCDevOps/backup-container)
* [jag-cullencommission repository](https://github.com/bcgov/jag-cullencommission/tree/master/openshift)

## BC Address Geocoder

The BC Address Geocoder REST API lets you integrate real-time standardization, validation and geocoding of physical addresses into your applications. See [the Data Catalogue](https://catalogue.data.gov.bc.ca/dataset/bc-address-geocoder-web-service) for information on aspects of the REST API that aren't covered in the OpenAPI definition.

The Geocoder helps you validate and geocode addresses (including public and related business occupants); find physical sites, intersections and occupants; and find sites, intersections and occupants near a point or within an area. The current baseUrl for the online geocoder is `https://geocoder.api.gov.bc.ca/`.

The URL allows both public and gated access. Gated access requires an APIkey. To get a sandbox APIkey with a maximum rate of 1000 requests per minute, visit the [Geocoder API console](https://catalogue.data.gov.bc.ca/dataset/bc-address-geocoder-web-service/resource/40d6411e-ab98-4df9-a24e-67f81c45f6fa/view/1d3c42fc-53dc-4aab-ae3b-f4d056cb00e0). You can get an unrestricted APIkey for use in government applications by opening a ticket with the [Data Systems & Services request system](https://dpdd.atlassian.net/servicedesk/customer/portal/1/group/7/create/15).

For more information on the BC Address Geocoder, see the following pages:
* [BC Address Geocoder Developer Guide](https://developer.gov.bc.ca/Community-Contributed-Content/BC-Address-Geocoder-Developer-Guide)
* [BC Address Geocoder repository](https://github.com/bcgov/api-specs/blob/master/geocoder)

## Common Document Generation Service

Use the Common Document Generation Service (CDOGS) to generate PDF or XML-based documents (ex: docx, xlsx, pptx, odt, ods, odp, and html). The CDOGS API can merge complex datasets into document templates. It supports any XML-based document templates including but not limited to Microsoft Office, LibreOffice, and OpenOffice.

For more information on CDOGS, see the following pages:
* [Common Document Generation Service (CDOGS) product overview](https://digital.gov.bc.ca/common-components/common-document-generation-service)
* [Common Document Generation Service (CDOGS) documentation](https://bcgov.github.io/common-service-showcase/services/cdogs.html)

## Common Hosted Email Service

Use the Common Hosted Email Service (CHES) to send emails programmatically. For more information on CHES, see the following pages:
* [Common Hosted Email Service (CHES) product overview](https://digital.gov.bc.ca/common-components/common-hosted-email-service)
* [Common Hosted Email Service (CHES) documentation](https://bcgov.github.io/common-service-showcase/services/ches.html)

## Common Object Management Service

Using the Common Object Management Service (COMS), take advantage of more cost-effective storage solutions for your new or existing business applications with an authorization and authentication method that suits your application’s business requirements. COMS is a secure REST API that lets you connect your application to any S3 bucket.

For more information on COMS, see the following pages:
* [Common Object Management Service (COMS) product overview](https://digital.gov.bc.ca/common-components/common-object-management-service)
* [Common Object Management Service (COMS) documentation](https://bcgov.github.io/common-service-showcase/services/coms.html)

## Get Token

Get Token (also known as GETOK) is a self-serve web interface that provides onboarding and access management of API services using OAuth client credentials.

For more information, visit:

[nr-get-token repository](https://github.com/bcgov/nr-get-token)

## Fathom

Fathom analytics provide simple website statistics without tracking or storing personal data. [fathom-openshift](https://github.com/BCDevOps/fathom-openshift) is a set of OpenShift configurations to set up an instance of the Fathom web analytics server.

For more information, see the following pages:
* [Fathom](https://developer.gov.bc.ca/Community-Contributed-Content/Fathom)
* [fathom-openshift](https://github.com/BCDevOps/fathom-openshift)

## go-crond

[go-crond](https://github.com/webdevops/go-crond#readme) is a cron daemon written in Go for use in Docker images. For more information, see the following pages:
* [go-crond repository](https://github.com/webdevops/go-crond)

## Matomo OpenShift

Matomo is a comprehensive web analytics server and an alternative to Google Analytics when data ownership and privacy compliance are a concern.

Matomo OpenShift provides a set of OpenShift configurations to set up an instance of the Matomo web analytics server. For more information, see the following pages:
* [Matomo OpenShift](https://developer.gov.bc.ca/Community-Contributed-Content/Matomo-OpenShift)
* [Matomo](https://matomo.org/)

## OWASP ZAP security vulnerability scanning

The OWASP Zed Attack Proxy (ZAP) automatically finds security vulnerabilities in web applications. For more information, see the following pages:
* [OWASP ZAP Security Vulnerability Scanning](https://developer.gov.bc.ca/Developer-Toy-Box/OWASP-ZAP-Security-Vulnerability-Scanning)
* [openshift-components](https://github.com/BCDevOps/openshift-components/tree/master/cicd/jenkins-slave-zap)

## Pathfinder Single Sign-On Keycloak

The Pathfinder Single Sign-On (SSO) team provides the Common Hosted Single Sign-On (CSS) App. This is a self-service app that allows you to integrate with BC government approved login services (identity providers).

The Pathfinder SSO service is built on the foundations of Keycloak/Redhat SSO.

* [Request an integration](https://bcgov.github.io/sso-requests/)
* [An overview of our CSS App](https://github.com/bcgov/sso-keycloak/wiki)
* [What is Keycloak (our take)](https://github.com/bcgov/sso-keycloak/wiki/What-is-Keycloak-@-BC-Government%3F)
* [Additional references](https://github.com/bcgov/sso-keycloak/wiki/Useful-References)

## SonarQube in the B.C. Government Private Cloud PaaS

[SonarQube®](https://www.sonarqube.org/) is an automatic code review tool you can use to detect bugs, vulnerabilities and code smells in your code. It can integrate with your existing workflow to enable continuous code inspection across your project branches and pull requests.

When a piece of code does not comply with a rule, an issue is logged on the snapshot. An issue can be logged on a source file or a unit test file.

SonarQube is a community-supported service. We also encourage teams to switch to using the SonarQube SaaS service.

For more information, see the [SonarQube repository](https://github.com/BCDevOps/sonarqube).

## SonarQube on OpenShift

The [SonarQube repository](https://github.com/BCDevOps/sonarqube) contains all the resources you might need to deploy a SonarQube server instance in a B.C. government OpenShift environment and integrate SonarQube scanning into your Jenkins pipeline.

This work was inspired by the [OpenShift Demos SonarQube for OpenShift](https://github.com/OpenShiftDemos/sonarqube-openshift-docker).

For more information, see the following pages:
* [SonarQube repository](https://github.com/BCDevOps/sonarqube)

For information on upgrading plugins, see the following pages:
* [Upgrading Plugins Manually](https://github.com/BCDevOps/sonarqube/blob/master/docs/upgrading-plugins-manually.md)
* [Upgrading with Bundled Plugins](https://github.com/BCDevOps/sonarqube/blob/master/docs/upgrading-with-bundled-plugins.md)

You can also integrate a [ZAP plugin for SonarQube](https://github.com/OtherDevOpsGene/zap-sonar-plugin).

## WeasyPrint HTML to PDF/PNG Microservice

The [docker-weasyprint](https://github.com/BCDevOps/docker-weasyprint) project bundles WeasyPrint into a simple, OpenShift-compatible, HTML to PDF/PNG microservice with a simple REST interface.

For more information, see the following pages:
* [WeasyPrint HTML to PDF/PNG Microservice](https://developer.gov.bc.ca/Community-Contributed-Content/WeasyPrint-HTML-to-PDFPNG-Microservice)
* [docker-weasyprint](https://github.com/BCDevOps/docker-weasyprint)
* [WeasyPrint](https://weasyprint.org/)


<!-- 
Are these related pages helpful?  Too many? Enough? Valid still? 
-->

## Related pages
* [nr-messaging-service-showcase repository](https://github.com/bcgov/nr-messaging-service-showcase).
* [About the Messaging Common Service](https://developer.gov.bc.ca/Community-Contributed-Content/About-the-Messaging-Common-Service)
* [Messaging Service Developer Guide](https://developer.gov.bc.ca/Community-Contributed-Content/Messaging-Service-Developer-Guide)
* [Backup Container](https://github.com/BCDevOps/backup-container)
* [HETS Project](https://github.com/bcgov/hets)
* [backup-container repository](https://github.com/BCDevOps/backup-container)
* [jag-cullencommission repository](https://github.com/bcgov/jag-cullencommission/tree/master/openshift)
* [Data Catalogue](https://catalogue.data.gov.bc.ca/dataset/bc-address-geocoder-web-service)
* [Geocoder API console](https://catalogue.data.gov.bc.ca/dataset/bc-address-geocoder-web-service)
* [Data Systems & Services request system](https://dpdd.atlassian.net/servicedesk/customer/portal/1/group/7/create/15)
* [BC Address Geocoder Developer Guide](https://github.com/bcgov/api-specs/blob/master/geocoder/geocoder-developer-guide.md)
* [Natural Resource Ministry's (NRM) API Store](https://apistore.nrs.gov.bc.ca/store/apis/info?name=dgen-api&version=v1&provider=admin)
* [Windward](https://www.windwardstudios.com/)
* [quick-start materials](https://www.windwardstudios.com/resources/quick-start).
* [DGEN Developer's Guide](https://developer.gov.bc.ca/Community-Contributed-Content/DGEN-Developer's-Guide)
* [Document Generation Showcase](https://github.com/bcgov/document-generation-showcase)
* [Common Hosted Email service](https://bcgov.github.io/common-hosted-email-service/app/)
* [common-hosted-email-service repository](https://github.com/bcgov/common-hosted-email-service)
* [nr-get-token repository](https://github.com/bcgov/nr-get-token)
* [Common Services showcase](https://bcgov.github.io/common-service-showcase/)
* [Fathom](https://developer.gov.bc.ca/Community-Contributed-Content/Fathom)
* [fathom-openshift](https://github.com/BCDevOps/fathom-openshift)
* [go-crond repository](https://github.com/webdevops/go-crond)
* [Matomo OpenShift](https://developer.gov.bc.ca/Community-Contributed-Content/Matomo-OpenShift)
* [Matomo](https://matomo.org/)
* [OWASP ZAP Security Vulnerability Scanning](https://developer.gov.bc.ca/Developer-Toy-Box/OWASP-ZAP-Security-Vulnerability-Scanning)
* [openshift-components](https://github.com/BCDevOps/openshift-components/tree/master/cicd/jenkins-slave-zap)
* [SonarQube®](https://www.sonarqube.org/)
* [SonarQube Best Practices](https://developer.gov.bc.ca/Platform-Services-Security/SonarQube-Best-Practices)
* [sonarqube repository](https://github.com/BCDevOps/sonarqube)
* [OpenShift Demos SonarQube for OpenShift](https://github.com/OpenShiftDemos/sonarqube-openshift-docker)
* [SonarQube on OpenShift](https://developer.gov.bc.ca/Community-Contributed-Content/SonarQube-on-OpenShift)
* [Upgrading Plugins Manually](https://github.com/BCDevOps/sonarqube/blob/master/docs/upgrading-plugins-manually.md)
* [Upgrading with Bundled Plugins](https://github.com/BCDevOps/sonarqube/blob/master/docs/upgrading-with-bundled-plugins.md)
* [ZAP Plugin for SonarQube](https://github.com/OtherDevOpsGene/zap-sonar-plugin)
* [WeasyPrint HTML to PDF/PNG Microservice](https://developer.gov.bc.ca/Community-Contributed-Content/WeasyPrint-HTML-to-PDFPNG-Microservice)
* [docker-weasyprint](https://github.com/BCDevOps/docker-weasyprint)
* [WeasyPrint](https://weasyprint.org/)

---
