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
Find details on the following services or tools you can use as part of your project in `bcgov`.

## On this page
- [Messaging Common service](#messaging-common-service)
- [Backup Container](#backup-container)
- [BC Address Geocoder](#bc-address-geocoder)
- [Common Document Generation service](#dgen)
- [Common Hosted Email service](#common-hosted-email-service)
- [Common Services Get Token](#common-services-get-token)
- [Fathom](#fathom)
- [go-crond](#go-crond)
- [Matomo OpenShift](#matomo-openshift)
- [OWASP ZAP Security Vulnerability Scanning](#owasp-zap)
- [Pathfinder Single Sign On (SSO) Keycloak](#pathfinder-sso)  
- [SonarQube in Private Cloud PaaS](#sq-private-cloud)
- [SonarQube on OpenShift](#sq-openshift)
- [WeasyPrint HTML to PDF/PNG](#weasyprint)

## Messaging Common service<a name="messaging-common-service"></a>
The Common Messaging service (CMSG) is an API for sending messages to internal and external users through SMTP and SMS. You can access the CMSG programmatically through the CMSG-MESSAGING-API. For more information, see the following resources:
* [GitHub repository](https://github.com/bcgov/nr-messaging-service-showcase)
* [About the Messaging Common Service](https://developer.gov.bc.ca/Community-Contributed-Content/About-the-Messaging-Common-Service)
* [Messaging Service Developer Guide](https://developer.gov.bc.ca/Community-Contributed-Content/Messaging-Service-Developer-Guide)

### Features
The CMSG implements a REST API to Oracle’s User Messaging Service, part of the Oracle Fusion Middleware stack. Oracle software gives you the ability to delay sending messages and check message statuses. Guaranteed delivery is also an option.

However, you can't currently send SMS content through the CMSG-MESSAGING-API, use timed email release or guaranteed email delivery. You can also add attachments to messages, but only PDF documents currently.

The API supports HTML content. The value of mediaType in the request should be text or HTML to render HTML content in the email.

## Backup Container<a name="backup-container"></a>

[Backup Container](https://github.com/BCDevOps/backup-container) is a simple, containerized backup solution used to backup one or more supported databases to a secondary location. The code and documentation was originally pulled from [HETS Project](https://github.com/bcgov/hets).

### Features
You can use the following databases:
* MongoDB
* PostgresSQL
* MSSQL (MSSQL requires the NFS DB volume is shared with the database for backups to function correctly)
* MariaDB

You can run Backup Container for supported databases separately or in a mixed environment.

For more information on Backup Container, see the following pages:
* [Backup Container](https://developer.gov.bc.ca/Community-Contributed-Content/Backup-Container)
* [backup-container repository](https://github.com/BCDevOps/backup-container)
* [jag-cullencommission repository](https://github.com/bcgov/jag-cullencommission/tree/master/openshift)

## BC Address Geocoder<a name="bc-address-geocoder"></a>

The BC Address Geocoder REST API lets you integrate real-time standardization, validation and geocoding of physical addresses into your applications. See [the Data Catalogue](https://catalogue.data.gov.bc.ca/dataset/bc-address-geocoder-web-service) for information on aspects of the REST API that aren't covered in the OpenAPI definition.

The Geocoder helps you validate and geocode addresses (including public and related business occupants); find physical sites, intersections and occupants; and find sites, intersections and occupants near a point or within an area. The current baseUrl for the online geocoder is `https://geocoder.api.gov.bc.ca/`.

The URL allows both public and gated access. Gated access requires an APIkey. To get a sandbox APIkey with a maximum rate of 1000 requests per minute, visit the [Geocoder API console](https://catalogue.data.gov.bc.ca/dataset/bc-address-geocoder-web-service/resource/40d6411e-ab98-4df9-a24e-67f81c45f6fa/view/1d3c42fc-53dc-4aab-ae3b-f4d056cb00e0). You can get an unrestricted APIkey for use in government applications by opening a ticket with the [Data Systems & Services request system](https://dpdd.atlassian.net/servicedesk/customer/portal/1/group/7/create/15).

For more information on the BC Address Geocoder, see the following pages:
* [BC Address Geocoder Developer Guide](https://developer.gov.bc.ca/Community-Contributed-Content/BC-Address-Geocoder-Developer-Guide)
* [BC Address Geocoder repository](https://github.com/bcgov/api-specs/blob/master/geocoder/glossary.md#outputSRS)

## Common Document Generation service<a name="dgen"></a>
Use the Document Generation service (DGEN) to generate documents using template files that contain field values from a database. Once generated, the completed document is stored in the Document Management Service (DMS) repository where you can view and sign it with an electronic signature. You must access DGEN programmatically through the DGEN-API (`https://api.nrs.gov.bc.ca/dgen-api/`). You can find a description of the API in the [Natural Resource Ministry's (NRM) API Store](https://apistore.nrs.gov.bc.ca/store/apis/info?name=dgen-api&version=v1&provider=admin).

### Features

DGEN is based upon a commercial product from [Windward](https://www.windwardstudios.com/). The DGEN-API exposes some of the services provided by Windward's document generation engine and provides a layer of abstraction between the Windward commercial product and users of the DGEN service. If needed, Windward can be changed out at a later date and replaced by an open-source product without changes to the DGEN-API.

Some business areas within NRM built customized document generation engines (for example, Crown Lands, e-Licensing). However, they tend to be maintenance intensive, are limited to specific business areas and technologies, and require updates each time Microsoft Office is updated.

The Windward document generation engine is a server-based process that can be used by any business area within the NRM. It's compatible with Microsoft Office tools, but unlike Microsoft Office macros, the Windward document templates are XML-based and have minimal dependencies on specific versions of Microsoft Office. DGEN uses XML template files that are developed using Windward's Template Designer plug-in.

Windward offers a number of [quick-start materials](https://www.windwardstudios.com/resources/quick-start).

For more information on DGEN, see the following pages:
* [DGEN Developer's Guide](https://developer.gov.bc.ca/Community-Contributed-Content/DGEN-Developer's-Guide)
* [Document Generation Showcase](https://github.com/bcgov/document-generation-showcase)

## Common Hosted Email service<a name="common-hosted-email-service"></a>
The Common Hosted Email service is hosted by the `bcgov` organization. For more information on the application, see the following pages:
* [Common Hosted Email service](https://bcgov.github.io/common-hosted-email-service/app/)
* [common-hosted-email-service repository](https://github.com/bcgov/common-hosted-email-service)

## Common Services Get Token<a name="common-services-get-token"></a>
The Common Services Get Token (also known as GETOK) is a web-based tool for development teams to manage their application's secure access to Common Services. Users can create and deploy service clients instantly to gain access to common service APIs like email notifications, document management or document generation.

For more information, see the following pages:
* [nr-get-token repository](https://github.com/bcgov/nr-get-token)
* [Common Services showcase](https://bcgov.github.io/common-service-showcase/)

## Fathom<a name="fathom"></a>
Fathom analytics provide simple website statistics without tracking or storing personal data. [fathom-openshift](https://github.com/BCDevOps/fathom-openshift) is a set of OpenShift configurations to set up an instance of the Fathom web analytics server.

For more information, see the following pages:
* [Fathom](https://developer.gov.bc.ca/Community-Contributed-Content/Fathom)
* [fathom-openshift](https://github.com/BCDevOps/fathom-openshift)

## go-crond<a name="go-crond"></a>
[go-crond](https://github.com/BCDevOps/go-crond) is a cron daemon written in Go for use in Docker images. For more information, see the following pages:
* [go-crond](https://developer.gov.bc.ca/Community-Contributed-Content/go-crond)
* [go-crond repository](https://github.com/BCDevOps/go-crond)

## Matomo OpenShift<a name="matomo-openshift"></a>
Matomo is a comprehensive web analytics server and an alternative to Google Analytics when data ownership and privacy compliance are a concern.

Matomo OpenShift provides a set of OpenShift configurations to set up an instance of the Matomo web analytics server. For more information, see the following pages:
* [Matomo OpenShift](https://developer.gov.bc.ca/Community-Contributed-Content/Matomo-OpenShift)
* [Matomo](https://matomo.org/)

## OWASP ZAP Security Vulnerability Scanning<a name="owasp-zap"></a>
The OWASP Zed Attack Proxy (ZAP) automatically finds security vulnerabilities in web applications. For more information, see the following pages:
* [OWASP ZAP Security Vulnerability Scanning](https://developer.gov.bc.ca/Developer-Toy-Box/OWASP-ZAP-Security-Vulnerability-Scanning)
* [openshift-components](https://github.com/BCDevOps/openshift-components/tree/master/cicd/jenkins-slave-zap)

## Pathfinder Single Sign On Keycloak<a name="pathfinder-sso"></a>
The Pathfinder Single Sign-On (SSO) team provides the Common Hosted Single Sign-On (CSS) App. This is a self-service app that allows you to integrate with BC government approved login services (identity providers).

The Pathfinder SSO service is built on the foundations of Keycloak/Redhat SSO.

* [Request an integration](https://bcgov.github.io/sso-requests/)
* [An overview of our CSS App](https://github.com/bcgov/sso-keycloak/wiki)
* [What is Keycloak (our take)](https://github.com/bcgov/sso-keycloak/wiki/What-is-Keycloak-@-BC-Government%3F)
* [Additional references](https://github.com/bcgov/sso-keycloak/wiki/Useful-References)

## SonarQube in the BC Gov Private Cloud PaaS<a name="sq-private-cloud"></a>

[SonarQube®](https://www.sonarqube.org/) is an automatic code review tool you can use to detect bugs, vulnerabilities and code smells in your code. It can integrate with your existing workflow to enable continuous code inspection across your project branches and pull requests.

When a piece of code does not comply with a rule, an issue is logged on the snapshot. An issue can be logged on a source file or a unit test file.

SonarQube is a community-supported service. We also encourage teams to switch to using the SonarQube SaaS service.

For more information, see [SonarQube Best Practices](https://developer.gov.bc.ca/Platform-Services-Security/SonarQube-Best-Practices). You can also review the [SonarQube repository](https://github.com/BCDevOps/sonarqube)

## SonarQube on OpenShift<a name="sq-openshift"></a>
The [sonarqube repository](https://github.com/BCDevOps/sonarqube) contains all the resources you might need to deploy a SonarQube server instance in a B.C. government OpenShift environment and integrate SonarQube scanning into your Jenkins pipeline.

This work was inspired by the [OpenShift Demos SonarQube for OpenShift](https://github.com/OpenShiftDemos/sonarqube-openshift-docker).

For more information, see the following pages:
* [SonarQube on OpenShift](https://developer.gov.bc.ca/Community-Contributed-Content/SonarQube-on-OpenShift)
* [SonarQube repository](https://github.com/BCDevOps/sonarqube)

For information on upgrading plugins, see the following pages:
* [Upgrading Plugins Manually](https://github.com/BCDevOps/sonarqube/blob/master/docs/upgrading-plugins-manually.md)
* [Upgrading with Bundled Plugins](https://github.com/BCDevOps/sonarqube/blob/master/docs/upgrading-with-bundled-plugins.md)

You can also integrate a [ZAP plugin for SonarQube](https://github.com/OtherDevOpsGene/zap-sonar-plugin).

## WeasyPrint HTML to PDF/PNG Microservice<a name="weasyprint"></a>
The [docker-weasyprint](https://github.com/BCDevOps/docker-weasyprint) project bundles WeasyPrint into a simple, OpenShift-compatible, HTML to PDF/PNG microservice with a simple REST interface.

For more information, see the following pages:
* [WeasyPrint HTML to PDF/PNG Microservice](https://developer.gov.bc.ca/Community-Contributed-Content/WeasyPrint-HTML-to-PDFPNG-Microservice)
* [docker-weasyprint](https://github.com/BCDevOps/docker-weasyprint)
* [WeasyPrint](https://weasyprint.org/)

---
Related links:
* [nr-messaging-service-showcase repository](https://github.com/bcgov/nr-messaging-service-showcase).
* [About the Messaging Common Service](https://developer.gov.bc.ca/Community-Contributed-Content/About-the-Messaging-Common-Service)
* [Messaging Service Developer Guide](https://developer.gov.bc.ca/Community-Contributed-Content/Messaging-Service-Developer-Guide)
* [Backup Container](https://github.com/BCDevOps/backup-container)
* [HETS Project](https://github.com/bcgov/hets)
* [backup-container repository](https://github.com/BCDevOps/backup-container)
* [jag-cullencommission repository](https://github.com/bcgov/jag-cullencommission/tree/master/openshift)
* [Data Catalogue](https://catalogue.data.gov.bc.ca/dataset/bc-address-geocoder-web-service)
* [Geocoder API console](https://catalogue.data.gov.bc.ca/dataset/bc-address-geocoder-web-service)
* [Data Systems & Services request system](https://dpdd.atlassian.net/servicedesk/customer/portal/1/group/7/create/15).
* [BC Address Geocoder Developer Guide](https://developer.gov.bc.ca/Community-Contributed-Content/BC-Address-Geocoder-Developer-Guide)
* [BC Address Geocoder repository](https://github.com/bcgov/api-specs/blob/master/geocoder/glossary.md#outputSRS)
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
* [go-crond](https://developer.gov.bc.ca/Community-Contributed-Content/go-crond)
* [go-crond repository](https://github.com/BCDevOps/go-crond)
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


Rewrite sources:
* (this list in incredibly long)
---
