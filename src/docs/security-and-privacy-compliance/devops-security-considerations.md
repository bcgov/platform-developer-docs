---
title: DevOps security considerations

slug: devops-security-considerations

description: Learn about DevOps security considerations and tools on the BC Government OpenShift Private Cloud Platform as a Service.

keywords: security, privacy, secrets, tls, ssl, pipeline, templates, container scanning, STRA, network policies, vault

page_purpose: This page describes the various security tools available on the platform.

audience: developer, technical lead

author: Nick Corcoran 

content_owner: Nick Corcoran

sort_order: 4
---

# BC Government OpenShift DevOps Security Considerations

## DevOps Security Tools and Capabilities

There are a number of tools available to developers working on the OpenShift platform to help ensure the confidentiality, integrity and availability of data within those systems.  This is an overview of those tools, with links to specifics on each of the resources.

## On this page

- [OpenShift Platforrm Security](#openshift-platform-security)
- [Privacy](#privacy)
- [Critical Systems Standard](#critical-systems-standard)
- [Platform Tools Security Assessments](#platform-tools-security-assessments)
- [Platform Product Registry](#platform-product-registry)
- [Communications](#communications)
- [Access Management](#access-management)
- [Kubernetes Network Policies](#kubernetes-network-policies)
- [Pipeline Templates (includes static and dynamic analysis)](#pipeline-templates)
- [Container image scanning (ACS, Xray)](#container-image-scanning)
- [Container runtime security](#container-runtime-security)
- [TLS Certificates](#tls-certificates)
- [Secrets Management](#secrets-management)
- [GitOps/Cluster Configuration Management](#gitops-cluster-configuration-management)
- [API Management](#api-management)
- [Application Resource Tuning Advisor and App Assessment Tool](#application-resource-tuning)
- [Logging/Monitoring (EKS, Kibana, Graphana, Sysdig Monitor, SIEM)](#logging-monitoring)
- [Backups](#backups)
- [Change Management](#change-management)
- [GitHub](#github)
- [Protected C data use - Emerald Cluster Only](#protected-c-use)
- [Other considerations](#other-considerations)

## Tools & Capabilities
### <a name="openshift-platform-security"></a>OpenShift Platform Security

Service definition - Silver/Gold - https://cloud.gov.bc.ca/private-cloud/our-services-in-private-cloud-paas/get-started-with-the-private-cloud-paas/

Our **_Silver Service_** is our standard DevOps platform offering, with on-cluster resiliency based on application design.

Our **_Gold Service_** is our enhanced DevOps platform offering, with replication to a secondary cluster for disaster fail-over purposes.  

Please take note of the [**_Shared Responsibility Model_**](https://cloud.gov.bc.ca/private-cloud/your-product-team-in-the-private-cloud-paas/our-shared-responsibilities/).  While the Platform Services Team manages infrastructure, OpenShift Container Platform and the Platform critical services as part of the Private Cloud PaaS, the Product Team bears the responsibility for the functionality and operations of their application(s) hosted on the Platform.  

Specific details on OpenShift specific security controls can be found here:

https://www.redhat.com/rhdc/managed-files/cl-openshift-security-guide-ebook-us287757-202103.pdf

- these are highlighted as part of the OpenShift STRA.

**_Penetration Tests_**

The platform services team outsources for a penetration test annually to ensure the services we provide are configured to protect confidentiality, integrity and availability.  Penetration tests are procured through the pre-qualified list of vendors (https://www2.gov.bc.ca/gov/content/governments/services-for-government/bc-bid-resources/goods-and-services-catalogue/im-it-security-services).

------
### <a name="privacy"></a>Privacy
A Privacy Impact Assessment has been completed for the OpenShift Container Platform service.

Personal Information upto and including Protected B Information Security Classification may be stored on OpenShift.   
- https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security/information-security-classification

------
### <a name="critical-systems-standard"></a>Critical Systems Standard

We are very close to obtaining critical systems standard compliance.  
Documentation is in final stages of review for submission.

------
### <a name="platform-tools-security-assessments"></a>Platform Tools Security Assessments

Many of the platform tools have ***completed*** security assessments.  These include:
- OpenShift v4.10 and VMWare NSX-T
- OpenShift v4.x and GitHub (Public)
- KeyCloak
- KeyCloak Realm Registry
- KeyCloak Common Host Single Sign-on
- Artifactory
- Sysdig Monitor
- Just Ask!
- Certbot
- Mautic
- Rocket Chat
- Vault
- OCP Application Resource Tuning Advisor
- Uptime.com
- Stack Overflow
- Platform Product Registry (v2)
- GitHub Enterprise

- 1Password (SoAR complete, Cloud security schedule review complete) - not to be used corporately due to no background checks for staff/contractors

The following security assessments are ***planned***:
- Cert Manager for OpenShift
- Kyverno
- GitGuardian
- Platform Security Dashboard

For specifics, please contact the platform services team at PlatformServicesTeam@gov.bc.ca.

------
### <a name="platform-product-registry"></a>Platform Product Registry

Here, we maintain a listing of all products with deployments on each OpenShift cluster. 
![Platform Product Registry example view](../../images/platform-product-registry-example-view.jpg)

https://registry.developer.gov.bc.ca/public-landing?redirect=/dashboard

While access to the registry is currently limited to the OpenShift Platform Services team (full view) and Product Owners/Technical Leads (limited view), we are working on creating roles for Ministry security staff to consume as well.  Until then, you can contact PlatformServicesTeam@gov.bc.ca for details.

------
### <a name="communications"></a>Communications

Community sharing, alerts and discussions take place on Rocket Chat, which we host as an app on OpenShift.  Authentication via IDIR or GitHub (in BCGov org or invited by an existing member).
- https://cloud.gov.bc.ca/private-cloud/support-and-community/stay-connected/
- https://just-ask.developer.gov.bc.ca/

#### Mautic

Mautic has been implemented to allow for subscription based communications for the DevOps community. 
- https://github.com/bcgov/Mautic-Openshift
- https://github.com/bcgov/Mautic-Subscription-App
- https://subscribe.developer.gov.bc.ca/

------
### <a name="access-management"></a>Access Management

Access to OpenShift is brokered through our OpenShift SSO Service (currently leveraging KeyCloak).

- https://github.com/bcgov/sso-keycloak/wiki/SSO-Onboarding
- https://bcgov.github.io/sso-requests


GitHub has been the primary authentication to date on OpenShift, however we are in the process of introducing IDIR (via Azure AD).  Both of these options require an account with 2FA/MFA enabled.  
GitHub - KLAB, CLAB, Silver, Gold, GoldDR  
IDIR - All clusters (above + KLAB2, Emerald)

- GitHub 2FA - https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication
- IDIR MFA - https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security-mfa

Cluster roles are managed either in private GitHub repositories (in the bcgov-c org) or through direct role bindings within a namespace.
We are investigating third party tools to help improve the user management experience.

Platform Services Roles and Responsibilities can be found here:
- https://cloud.gov.bc.ca/private-cloud/your-product-team-in-the-private-cloud-paas/our-shared-responsibilities/

The Platform Services team maintains an Access Control Policy for all platform tools.  
- https://cloud.gov.bc.ca/private-cloud/access-control-policy-openshift-and-platform-tools/

------
### <a name="kubernetes-network-policies"></a>Kubernetes Network Policies (KNPs)

Network policies help the platform and project teams to better control communications between components.  While KNPs only apply as INGRESS rules (not egress), they help to improve our overall security posture.  KNPs only apply to on-cluster communications (i.e. between pods in a namespace, or between namespaces).  

Find our more about using KNPs to control network security for an application hosted on the Private Cloud Openshift Platform in the [OpenShift network policies](/openshift-network-policies/) document. 

More details on KNPs can be found here: https://kubernetes.io/docs/concepts/services-networking/network-policies/

For products requiring policies that reach off-cluster, the Emerald cluster is the best choice.  This provides a way to communicate with VMs in the SDN zone, and more isolated communications to legacy network zones (B/C).  This capability is provided through the use of VMWare NSX.

------
### <a name="pipeline-templates"></a>Pipeline Templates (includes static and dynamic analysis)

In order to reduce effort in implementing secure tools into a build pipeline, we have developed pipeline templates that include components for build, aas well as static and dynamic vulnerability scanning.  
- https://github.com/bcgov/Security-pipeline-templates/

Here is a representation of what an application build pipeline should look like:
![Application build pipeline example diagram](../../images/PipelineSecurity.png)

The pipeline templates above make it easier to include the tools described below:
  - [SonarQube in the BC Gov Private Cloud PaaS](/reusable-services-list/#sonarqube-in-the-bc-gov-private-cloud-paas)
  - [OWASP ZAP Security Vulnerability Scanning](/reusable-services-list/#owasp-zap-security-vulnerability-scanning)

**What do each of these types of scanning tools do for me?**

Static Analysis (i.e. SonarX, CodeQL) 
- identifies coding issues that could lead to compromise, back doors, secrets, etc

Dynamic Analysis (i.e. OWASP ZAP) 
- testing against a live version of app for injection, Cross-site scripting (XSS), and other common web attacks (https://owasp.org/www-project-top-ten/)

Image Analysis 
- ensures image components are up-to-date and not vulnerable to known exploits (https://cve.mitre.org/, https://nvd.nist.gov/).

------
### <a name="container-image-scanning"></a>Container image scanning (ACS, Xray)

Image scanning/analysis comes in 2 forms - 1 active (RedHat Advanced Cluster Security - ACS), 1 passive (XRay).

**ACS:**

This tool allows us to scan image registries and running containers for image vulnerabilities.  
It allows us to create policies at build, deploy, and runtime.  
It can also help in defining network security policies for your application and visualizing component communications.

Scoped access is granted based on identification as a Product Owner or Technical Lead in the OpenShift Product Registry.  
Developer access can be granted by request.  Requests must include the following:
- Namespaces
- Product Owner approval

Links:
- https://acs.developer.gov.bc.ca
- https://www.redhat.com/en/technologies/cloud-computing/openshift/advanced-cluster-security-kubernetes

**XRay:**

An add-on capability to Artifactory, XRay scans images and other artifacts for component vulnerabilities.  Anyone with access to an image or artifact within Artifactory can see the XRay tab as part of the image/artifact details, and see what vulnerable components lie within, and what version will correct that deficiency. 
- https://artifacts.developer.gov.bc.ca/ui/login/

------
### <a name="container-runtime-security"></a>Container runtime security

We currently have runtime policies in place for the following using ACS.  These look for things like:
- Cryto-mining
- Integrity monitoring
- https://docs.openshift.com/acs/3.66/operating/manage-security-policies.html

Additionally, OpenShift uses CoreOS and the CRI-O container engine.
- https://docs.openshift.com/container-platform/4.10/architecture/architecture-rhcos.html

------
### <a name="tls-certificates"></a>TLS Certificates

OpenShift uses a wildcard certificate for the majority of cluster communications security.  This should be sufficient for dev and test workloads, but for production workloads, each team is required to obtain a dedicated TLS certificate from the Access & Directory Management Services (ADMS) team.  

***Note:*** by default, the wildcard will be used to protect project workloads.  The Platform Services team worked through the wildcard issuance requirements for use on the OpenShift clusters.  Obtaining a dedicated TLS cert is currently a manual process.  
Details on these processes can be found here: https://ssbc-client.gov.bc.ca/services/SSLCert/documents.htm

**Pre-requisites:**
Generate a .csr for each site:
- https://github.com/BCDevOps/openshift-wiki/blob/master/docs/SSLCerts/GenerateCertificateSigningRequest.md

**Ordering Process:**
-  Business area creates/submits order via MyServiceCentre
-  Ministry Service Desk reviews order, sends to EA for Approval
-  EA Approves
-  Order is sent to DXC for fulfillment
-  Once order is fulfilled/shipped by DXC, Ministry Service Desk sends 'Completed Order' notification to business area

![TLS certificate order lifecycle diagram](../../images/tls-certificate-order-lifecycle.png)

------
### <a name="secrets-management"></a>Secrets Management
**OpenShift Secrets:**

This 'secrets' store should actually only be used for configurations.  Values are encoded as base64 and NOT encrypted.  However, these 'secrets' can only be accessed with a role to a given namespace with permission to access them.  Additionally, the physical etcd volume, where OpenShift secrets are stored, is encrypted.

**Vault:**

The preferred secrets management tool for team use on OpenShift.
- https://cloud.gov.bc.ca/private-cloud/our-products-in-the-private-cloud-paas/vault-secrets-management/
- [Vault secrets management service](/vault-secrets-management-service/)
- [Vault getting started guide](/vault-getting-started-guide/)

------
### <a name="gitops-cluster-configuration-management"></a>GitOps/Cluster Configuration Management

Argo CD provides a GitOps capability for sync'ing a Git repository with an OpenShift configuration (platform or application).
- [Argo CD usage](/argo-cd-usage/)

We are in the process of testing out the GitOps Operator, based on ArgoCD, that is integrated into OpenShift.  This may replace (partially or completely) our custom ArgoCD implementation.

------
### <a name="api-management"></a>Application Programmable Interface (API) Management

The Data BC team hosts an API Gateway for use by other government clients.  Details can be found here:
- https://developer.gov.bc.ca/API-Gateway-(powered-by-Kong-CE)
- https://developer.gov.bc.ca/BC-Government-API-Guidelines
- https://developer.gov.bc.ca/BC-Government-OpenAPI-Specifications

------
### <a name="application-resource-tuning"></a>Application Resource Tuning Advisor and App Assessment Tool
**Resource Tuning Advisor**
- https://github.com/BCDevOps/resource-tuning-advisor-app 

**App Assessment Tool**
- https://github.com/bcgov/AppAssessment

------
### <a name="logging-monitoring"></a>Logging/Monitoring (EKS, Kibana, Graphana, Sysdig Monitor, SIEM, Uptime, Status)

The Platform Services team provides a number of tools to help ensure our platform and applications are behaving as expected, while allowing us to investigate anomalies.

**OpenShift UI:**

Within the OpenShift interface, project teams can view logs associated with a given pod through the Logs tab.  
![OpenShift Pod details screen Logs tab example](../../images/openshift-pod-details-logs-tab-example.jpg)

**Kibana:**

This tool provides a more wholistic view of logs for an application or at the platform level, as well as providing visualization and alerting capability.
- https://kibana-openshift-logging.apps.silver.devops.gov.bc.ca/

**Sysdig Monitor:**

This tool allows our platform admins and platform teams to build monitoring dashboards.
- https://cloud.gov.bc.ca/private-cloud/our-products-in-the-private-cloud-paas/monitoring-with-sysdig/
- [Onboarding to application monitoring with Sysdig](/sysdig-monitor-onboarding/)
- https://app.sysdigcloud.com/#/login

**Security Information and Event Monitoring (SIEM):**

All cluster logs (system, audit, container) are regularly sent to the Security Operations SIEM environment.  
Retention is set as follows:
- System, Container logs - 2 months
- Audit logs - 13 months

We are currently working on Azure AD integration (via KeyCloak) and user role mapping based on OpenShift namespace access.
This activity has paused for the time being but will be re-started in the new year.

**Uptime.com**

This tools help us to observe platform service availability:
- https://cloud.gov.bc.ca/private-cloud/our-services-in-private-cloud-paas/
- https://status.developer.gov.bc.ca/

------
### <a name="backups"></a>Backups
**OpenShift:**
- [Backup Container](/reusable-services-list/#backup-container)
- [Database backup best practices](/database-backup-best-practices/)

**GitHub:**
- https://github.com/bcgov-c/platform-services-docs/blob/main/github-backups.md

------
### <a name="change-management"></a>Change Management

Planning for platform and service changes is documented on the Platform Services ZenHub board.  
- https://app.zenhub.com/workspaces/platform-experience-5bb7c5ab4b5806bc2beb9d15/board?repos=220104031  
Any service change will be communicated via the #devops-alerts RocketChat channel.

Strategic level changes are communicated to the DevOps community at regular Community Meetups, as well as to executive groups across government.

------
### <a name="github"></a>GitHub

GitHub is the primary git repository for platform application code.  There are some exceptions that use privately hosted GitLab or other source code repositories.  

Here is a summary of the GitHub organizations we own and their purposes:
- bcgov - main developer git repository for platform application code and/or public sharing.
- bcgov-c - main private git repository used for cluster configuration management and non-public projects.
- bcdevops - alternate git repository for platform application code.  Membership required for access to OpenShift.
- bcgov-platform-services - git repository for platform services team

These resources are available:
- [BC Government organizations in GitHub](/bc-government-organizations-in-github/)

**GitHub Apps**

Teams may request GitHub apps to be associated with their own or all projects in a GitHub organization.  These requests are reviewed by a platform administrator for validity and scope.  These are also shared with Ministry security staff to ensure they are acceptable for connection.

**GitHub Enterprise**

We currently use of GitHub Enterprise.  Contact the Developer Experience team for license information.
- [GitHub Enterprise user licenses in the BC government](/github-enterprise-user-licenses-bc-government/)
- https://github.com/enterprises/bcgov-ent/sso

------
### <a name="protected-c-use"></a>DevOps Team recommendations for Protected C data creation/storage/use

This is a list of specific considerations for teams creating/storing/using Protected C data.  **This only applies to data on the Emerald Cluster.**

Product teams should be aware that any creation/storage/use of Protected C data in any system should only be considered after discussion with Ministry Security Officer (MISO) and Ministry Privacy Officer (MPO).  They may require additional controls to those listed below.
 
Protected C data should be encrypted at rest. 
- The NetApp storage appliance used is NOT encrypted at its core, so this means that associate provisioned volume claims (PVCs) are not encrypted by default.  However, it is possible to request an encrypted volume claim. 
  - This is done at pvc creation time using the following https://netapp-trident.readthedocs.io/en/stable-v21.07/kubernetes/operations/tasks/backends/ontap/ontap-san/configuration.html?highlight=encryption#configuration-options-for-provisioning-volumes.  
  - If data is to be stored in a database, that database should have encryption enabled and keys managed.  
  - NetApp storage for Emerald is on its own VIP segment – this means it is NOT accessible from other clusters (this is a good thing).
- Object Storage used CAN be encrypted as part of initial setup.  
 
Access Management
- Depending on risk - data creation, changes, and potentially even (read) access should be audited. 
  - This may be done via an audit table as part of an application, but direct access to data (if permitted) should also be considered for this requirement.
  
- Ensure team members with privileged access only have what they need to do their jobs, and that access is regularly reviewed, and permissions removed when no longer required.

- A recognized design pattern for some ministries with Protected C data in Zone A is the utilization of a Secure Access Gateway (SAG).  This, combined with the use of a physical token, gives the ministry a greater assurance level over users connecting through the SAG to access Protected C data sources.  It also provides an extra layer in reducing opportunity, but not eliminating, for data exhilaration.  It does not, however, protect against some Ministry or DXC system administrators from directly accessing those same data sources.
  - A design pattern maintaining the use of a SAG has been used to restrict developer access to VMs in the Cloud Zone.  This is not done for access to the Emerald cluster.

- A design pattern using a [Secure Access Service Edge (SASE)](https://en.wikipedia.org/wiki/Secure_access_service_edge) is also being tested by a client Ministry.

Network Security Policies and Workload labelling
  - These should be reviewed and vetted before any actual Protected C data is used in the system (i.e., designed, implemented, and tested in Dev/Test environments).

Vulnerability Scanning (Static and Dynamic)
- These functions are built into pipeline templates that we provide (using SonarCloud and OWASP ZAP).  These should be mandatory for any system that uses Protected C data.

Image scanning (Advanced Cluster Security- https://acs.developer.gov.bc.ca)
  - All active deployments are scanned by Advanced Cluster Security and all DevOps Product Owners and Technical Leads listed in the Platform Registry have access by default.   
  - Any High/Critical vulnerabilities should be reviewed and validated prior to Production release.  This doesn’t mean there can’t be any vulnerabilities, only that we are sure the risky ones are not applicable to the functioning of our system.

Secrets Management
- Use Vault.  OpenShift secrets does NOT protect secrets enough to be compliant with an audit as they are only base64 encoded.

TLS certificate
- Any production workload requires a dedicated TLS certificate (obtained from ADMS).

Backups
- For sensitive data backup, ensure they are encrypted.

Logging/Monitoring
- Ensure that you have adequate log retention to meet requirements based on your business/data needs.  On-cluster retention is 14 days.  All logs are shipped to the OCIO SIEM and retained as follows (OpenShift System – 2 months, OpenShift Audit – 13 months, App/container – 2 months).  Product teams can work with SecOps if their retention needs exceed this.

*Note: Further investigation is required to provided further enhanced cluster access protections for namespaces that hold Protected C data.  Some initial ideas include the use of BC Verifiable Credential, or policy-based access control (vs authentication re-direct from the console).

------
### <a name="other-considerations"></a><u>Other considerations</u>
**Payment Card Industry Compliance (PCI-DSS)**

Our OpenShift implementation is **NOT** PCI-DSS compliant.  If you wish to host an application on OpenShift that needs to perform financial transactions, please refer to the following:  https://docs.developer.gov.bc.ca/payment-card-processing/. 
Some teams have decided to host PCI-scoped applications on-prem (non-OpenShift) or on a cloud based service (AWS, Azure, etc) to avoid linkages with government systems not under their control.

**Training/Support**

The platform services team provides training to onboarding teams, as well as support for issues experienced.  Ministry staff that work with devops teams are also encouraged to attend training.

***Training:***
- https://cloud.gov.bc.ca/private-cloud/support-and-community/platform-training-and-resources/openshift-101/
- https://cloud.gov.bc.ca/private-cloud/support-and-community/platform-training-and-resources/openshift-201/
- https://github.com/bcdevops/devops-platform-workshops

***Support:***
- https://cloud.gov.bc.ca/private-cloud/support-and-community/how-to-get-support-or-help/
- https://cloud.gov.bc.ca/private-cloud/support-and-community/devops-requests-in-the-bc-gov-private-cloud-paas/
- https://cloud.gov.bc.ca/private-cloud/support-and-community/platform-training-and-resources/how-to-videos-and-demos/
- Various Rocket Chat channels

**App security self assessment:**
- [Security best practices for apps](/security-best-practices-for-apps/)

**Best practices for building apps on OpenShift:**
- [Private Cloud as a Service Platform Technical Documentation](/)

**Contact**
For all other matters concerning security on the OpenShift Container Platform, please contact PlatformServicesTeam@gov.bc.ca.
