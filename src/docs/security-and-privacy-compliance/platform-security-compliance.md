---
title: B.C. Government OpenShift DevOps security compliance

slug: devops-security-compliance

description: Learn about compliance assessment and controls on the B.C. Government OpenShift Private Cloud Platform as a Service.

keywords: security, privacy, secrets, STRA, network policies, vault

page_purpose: This page describes the various security compliance assessment and controls available on the platform

audience: developer, technical lead, MISO, MPO

author: Nick Corcoran 

content_owner: Nick Corcoran

sort_order: 2
---

# B.C. Government OpenShift DevOps security compliance
Last updated: **February 20, 2024**

Through this document you'll find some details on our OpenShift service, completed compliance activities and security controls we have in place on our OpenShift implementations.

## On this page
* [**OpenShift platform services**](#openshift-platform-services)
* [**Penetration tests**](#penetration-tests)
* [**Critical Systems Standard**](#critical-systems-standard)
* [**IMIT Standards**](#imit-standards)
* [**Platform tools security assessments**](#platform-tools-security-assessments)
* [**Security assessment requirements for Product Teams**](#security-assessment-requirements-for-product-teams)
* [**Platform Product Registry**](#platform-product-registry)
* [**Access management**](#access-management)
* [**GitOps/Cluster configuration management**](#gitopscluster-configuration-management)
* [**Application Programmable Interface (API) management**](#application-programmable-interface-api-management)
* [**Backups**](#backups)
* [**Change management**](#change-management)
* [**GitHub**](#github)
* [**Other important considerations**](#other-important-considerations)
* [**Related pages**](#related-pages)

<!-- ### End of "On this page" --> 
---

## OpenShift platform services
The OpenShift platform security actively protects your applications and data, keeping them safe from unauthorized access and potential threats. OpenShift consistently updates and patches to address vulnerabilities, ensuring a robust defense against evolving security risks. 

If you'd like to find more details about its capabilities, check the our useful [guide for the private cloud hosting 101](https://digital.gov.bc.ca/delivery/cloud/private/intro/).

We offer three tiers of service: 

* **Silver Service** is our standard DevOps platform offering, with on-cluster resiliency based on application design.

* **Gold Service** is an enhanced DevOps platform offering, with replication to a secondary cluster for disaster fail-over purposes.  

* **Emerald Service** is an enhanced DevOps platform offering, with strict software defined networking (SDN) based on workload security labeling.  This services allows for easier integration with legacy systems and virtual machines (VMs).

While the Platform Services Team manages infrastructure, OpenShift Container Platform and the Platform critical services as part of the Private Cloud PaaS, the Product Team bears the responsibility for the functionality and operations of their application(s) hosted on the Platform.  

Take note of the [**Shared Responsibility Model**](https://digital.gov.bc.ca/delivery/cloud/private/onboard/) breakdown within the Memorandum of Understanding (MoU).  

You can also find specific details on OpenShift's security controls under [Red Hat's OpenShift security guide](https://www.redhat.com/rhdc/managed-files/cl-openshift-security-guide-ebook-us287757-202103.pdf) which  are also highlighted as part of the OpenShift STRA.

## Penetration tests

The platform services team outsources for a penetration test annually to ensure the services we provide are configured to protect confidentiality, integrity and availability.  Penetration tests are procured through the [pre-qualified list of vendors](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security).

Penetration tests help to identify platform misconfigurations and security vulnerabilities.  Run annually, we try to change vendors regularly to get a different perspective/assessment toolkit to ensure our service matures to meet client needs and address potential weaknesses.

What we cover:

- Black box testing
- Authenticated testing
- Developer (namespace admin) testing

Testers run a suite of automated tools and use manual techniques to validate potential exploits and provide recommendations on controls to mitigate.

## Critical Systems Standard

<!-- ###  FYI In the future this area may need to be updated and find out if CITZ Security team has reviewed the documentation  -->

Any IM/IT service, system, or infrastructure component that is deemed necessary by the **system owner** to deliver a **mission critical function**, is a critical system for the purposes of this standard. 

We have completed all required documentation for the Critical Systems Standard, and currently under review by the  CITZ Security team.

## IMIT Standards

The following services were designed with the associated [IMIT standards](https://www2.gov.bc.ca/gov/content/governments/services-for-government/policies-procedures/im-it-standards/find-a-standard#id_mgt) in mind.  The platform team works regularly with the standards owners to review and update to meet current day needs.

| Service                                  | Standard |
| ------------------------------------     | ------------------------------------------------------------------------------------------------------------------------------------ |
| Critical System (Gold Tier Service)      | [5.10 Critical Systems Standard](https://www2.gov.bc.ca/assets/download/D6CF2EBB6E094EB5A43B4B427F43ADBC) |     
|                                          | [6.23 Information Security Aspects of Business Continuity Management Security Standard](https://www2.gov.bc.ca/assets/download/B15B08B6DB5347DABA99945EBC888668) |
| Single Sign-On (KeyCloak)                | [4.06 Electronic Credential & Authentication Standard](https://www2.gov.bc.ca/assets/download/5F3B13D5550E4F97B241456F12F9BD31) |
|                                          | [6.24 Access Control Security Standard](https://www2.gov.bc.ca/assets/download/CCD14B680FEC4054BE88ECCB8B176D22) |
| Secrets Management (Vault)               | [4.06 Electronic Credential & Authentication Standard](https://www2.gov.bc.ca/assets/download/5F3B13D5550E4F97B241456F12F9BD31) |
|                                          | [6.10 Cryptographic Standard](https://www2.gov.bc.ca/assets/download/A834831A594245CD81D9BF99DDF39FCD) |
| Asset Management (Artifactory, Registry)        | [6.23 Asset Management Security Standard](https://www2.gov.bc.ca/assets/download/F9BA3AFD52B34727BA261F052ADEAA0B) |
| Networking (SDN, KNPs)                   | 6.13 Network Security Zone Standard - available by request to CITZAS@gov.bc.ca |
| Logging/Monitoring (Kibana, SIEM)        | [6.27 Operations Security Standard](https://www2.gov.bc.ca/assets/download/0F4DF4FAC5214C6387B6B51DD538FF6E) |
| App Security (SAST,DAST,SCA)             | [6.14 Application & Web Development & Deployment Standard](https://www2.gov.bc.ca/assets/download/29237A3033824CCBAC0465939BFB2CEF) |
|                                          | [6.34 Vulnerability Management Scanning Standrard](https://www2.gov.bc.ca/assets/download/3DFC2361BC334BFDBDF907B6B16C5358) |

## Platform tools security assessments

Many of the platform tools have **completed** security assessments.  These include:

* OpenShift v4.10 and VMWare NSX-T
* OpenShift v4.x and GitHub (Public)
* KeyCloak
* KeyCloak Realm Registry
* KeyCloak Common Host Single Sign-on
* Artifactory
* Sysdig Monitor
* Just Ask!
* Certbot
* Rocket.Chat
* Vault
* OCP Application Resource Tuning Advisor
* Uptime.com
* Stack Overflow
* Platform Product Registry (v2)
* GitHub Enterprise
* 1Password (SoAR complete, Cloud security schedule review complete) - was previously discouraged corporately due to no background checks for staff/contractors, but this has since changed.  Further review required to support use.

If you cannot find a tool from the above list and/or require specific information please contact the [PlatformServicesTeam@gov.bc.ca](mailto:PlatformServicesTeam@gov.bc.ca).

## Security assessment requirements for Product Teams

Each product team is responsible for developing a security assessment for their service.  It is recommended that teams connect with their Ministry Information Security Officer (MISO), or ministry security team, to complete this assessment.  Some [common questions](../security-and-privacy-compliance/security-best-practices-for-apps.md) to ask them.

## Platform Product Registry

The [Platform Product Registry](https://registry.developer.gov.bc.ca/) is a self-serve online tool that allows you to request new products in the B.C. Government Private Cloud PaaS.

Here, we maintain a listing of all products with deployments on each OpenShift cluster. 

![Platform Product Registry example view](../../images/platform-product-registry-example-view.jpg)

Find out more about the benefits and its use in our [Platform Product Registry information page](https://digital.gov.bc.ca/delivery/cloud/private/products-tools/registry/)

## Access management
Our OpenShift access is managed through the OpenShift SSO Service, currently using KeyCloak.

* More information on [SSO-Onboarding with KeyCloak - GitHub](https://github.com/bcgov/sso-keycloak/wiki/SSO-Onboarding)
* More information on using the self-service app to integrate with B.C. government approved login services. [Request SSO Integration](https://bcgov.github.io/sso-requests)

Government users and contractors may login to OpenShift clusters with a GitHub or IDIR account (depending on which cluster they choose).  Both of these options require an account with 2FA/MFA enabled.  

* GitHub - KLAB, CLAB, Silver, Gold, GoldDR  
* IDIR - All clusters (above + KLAB2, Emerald)
* [GitHub 2 factor autenthication (2FA)](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication) 
* [IDIR MFA](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security-mfa)

Cluster roles are managed either in private GitHub repositories in the [bcgov-c org](https://github.com/bcgov) or through direct role bindings within a namespace.

Read about the [Platform services roles and responsibilities](https://digital.gov.bc.ca/delivery/cloud/private/onboard/)

The Platform Services team maintains an Access Control Policy for all platform tools and they can be found in the [internal resources section](https://digital.gov.bc.ca/delivery/cloud/private/internal-resources/). To access it select Login with Keycloak.

### Kubernetes Network Policies (KNPs)

Network policies help the platform and project teams to better control communications between components.  While KNPs only apply as **ingress rules** (not egress), they help to improve our overall security posture.  KNPs only apply to on-cluster communications (i.e. between pods in a namespace, or between namespaces).  

Find our more about using KNPs to control network security for an application hosted on the Private Cloud Openshift Platform in the [OpenShift network policies](../platform-architecture-reference/openshift-network-policies.md) document. More details on [KPN's official site](https://kubernetes.io/docs/concepts/services-networking/network-policies/).

For products requiring policies that reach off-cluster, the Emerald cluster is the best choice.  This provides a way to communicate with VMs in the SDN zone, and more isolated communications to legacy network zones (B/C).  This capability is provided through the use of VMWare NSX.

### TLS certificates

OpenShift uses a wildcard certificate for the majority of cluster communications security.  This should be sufficient for dev and test workloads, but for production workloads, each team is required to obtain a dedicated TLS certificate from the Access & Directory Management Services (ADMS) team.  

By default, the wildcard will be used to protect project workloads.  The Platform Services team worked through the wildcard issuance requirements for use on the OpenShift clusters.  Obtaining a dedicated TLS cert is currently a manual process.  Find out more about the details on [these processes](https://ssbc-client.gov.bc.ca/services/SSLCert/documents.htm). 

**Pre-requisites:**
Generate a **.csr** for [each site](https://github.com/bcgov/openshift-wiki/blob/master/docs/SSLCerts/GenerateCertificateSigningRequest.md)

**Ordering process:**

1. Business area creates/submits order via [MyServiceCentre](https://ociomysc.service-now.com/sp/)
2. Ministry Service Desk reviews order, sends to EA for Approval
3. EA Approves
4. Order is sent to DXC for fulfillment
5.  Once order is fulfilled/shipped by DXC, Ministry Service Desk sends 'Completed Order' notification to business area

![TLS certificate order lifecycle diagram](../../images/tls-certificate-order-lifecycle.png)

## GitOps/Cluster configuration management

Argo CD (integrated into OpenShift as the GitOps Operator) provides a GitOps capability for sync'ing a Git repository with an OpenShift configuration (platform or application)

## Application Programmable Interface (API) management

The Data BC team hosts an API Gateway for use by other government clients. 

Details can be found here:

* [B.C. government API Program Services](https://www2.gov.bc.ca/gov/content/data/about-data-management/databc/databc-products-services/api-management)
* [B.C. government API guidelines](https://developer.gov.bc.ca/BC-Government-API-Guidelines)

### Uptime.com

This tools help us to observe platform service availability.

Review the [status of the platform](https://status.developer.gov.bc.ca/)


## Backups
Backups help you to recover in the event of a failure or data corruption.  As part of your backup process, you should consider the retention period, and the schedule for testing backups. All backups should be tested regularly.

**OpenShift**

- [Backup Container](../reusable-code-and-services/reusable-services-list.md#backup-container)
- [Database backup best practices](../database-and-api-management/database-backup-best-practices.md)

**GitHub**

- [GitHub backups](https://github.com/bcgov-c/platform-services-docs/blob/main/github/github-backups.md)

## Change management

Planning for platform and service changes is documented on the [Platform Services ZenHub board](https://app.zenhub.com/workspaces/platform-experience-5bb7c5ab4b5806bc2beb9d15/board?repos=220104031)   

Any service change will be communicated via the #devops-alerts Rocket.Chat channel.

Strategic level changes are communicated to the DevOps community at regular Community Meetups, as well as to executive groups across government.

## GitHub

GitHub is the primary git repository for platform application code.  There are some exceptions that use privately hosted GitLab or other source code repositories.  

Here is a summary of the GitHub organizations we own and their purposes:

* bcgov - main developer GitHub org for platform application code and/or public sharing. If you wish to login to OpenShift via github, membership of the bcgov github org is required, along with linking to an IDIR account
* bcgov-c - main private GitHub org used for cluster configuration management and non-public projects

These resources are available:

* [BC Government organizations in GitHub](https://mvp.developer.gov.bc.ca/docs/default/component/bc-developer-guide/use-github-in-bcgov/bc-government-organizations-in-github/)

**GitHub Apps**

Teams may request GitHub apps to be associated with their own or all projects in a GitHub organization.  These requests are reviewed by a the Developer Experience team for validity and scope.  These are also shared with Ministry security staff to ensure they are acceptable for connection.

**GitHub Enterprise**

We currently use of GitHub Enterprise.  Contact the Developer Experience team for license information.

* [Province of British Columbia Enterprise’s single sign-on provider](https://github.com/enterprises/bcgov-ent/sso)

## Other important considerations 

**Payment Card Industry Compliance (PCI-DSS)**

Our OpenShift implementation is **not** PCI-DSS compliant.  If you wish to host an application on OpenShift that needs to perform financial transactions, please find out more about [payment card processing for OpenShift applications](../security-and-privacy-compliance/payment-card-processing.md).

Some teams have decided to host PCI-scoped applications on-prem (non-OpenShift) or on a cloud based service (AWS, Azure, etc) to avoid linkages with government systems not under their control.

**Training and support**

The platform services team provides [training to onboarding teams](https://digital.gov.bc.ca/delivery/cloud/private/support/#platform), as well as [support](https://digital.gov.bc.ca/delivery/cloud/private/support/#how) for issues experienced.  Ministry staff that work with devops teams are also encouraged to attend training.

**Contact**

For all other matters concerning security on the OpenShift Container Platform, please contact the [PlatformServicesTeam@gov.bc.ca](mailto:PlatformServicesTeam@gov.bc.ca).

---
---

## Related pages

* [OpenShift 101 training](https://digital.gov.bc.ca/delivery/cloud/private/support/openshift-101/)
* [OpenShift 201 training](https://digital.gov.bc.ca/delivery/cloud/private/support/openshift-201/)
* [DevOps platform workshops](https://github.com/bcgov/devops-platform-workshops)
* [Security best practices for apps](../security-and-privacy-compliance/security-best-practices-for-apps.md)
* [OpenShift platform security tools](../security-and-privacy-compliance/platform-security-tools.md)

