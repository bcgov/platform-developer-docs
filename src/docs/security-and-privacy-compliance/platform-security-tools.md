---
title: B.C. government OpenShift platform security tools

slug: platform-security-tools

description: Learn about compliance assessment and controls on the B.C. Government OpenShift Private Cloud Platform as a Service.

keywords: security, secrets, logging, scan, scanning, policy, vault, sysdig, hashicorp

page_purpose: This page describes the various security tools available on the platform

audience: developer, technical lead, MISO, MPO

author: Nick Corcoran 

content_owner: Nick Corcoran

sort_order: 3
---
# OpenShift platform security tools
Last updated: **February 20, 2024**

Here you will find details on security tooling used by platform administrators and available to product teams.

* [**Pipeline templates (includes static and dynamic analysis)**](#pipeline-templates-includes-static-and-dynamic-analysis)
* [**Container image scanning (ACS, Xray)**](#container-image-scanning-acs-xray)
* [**Container runtime security**](#container-runtime-security)
* [**Secrets management**](#secrets-management)
* [**Logging and monitoring (Loki, Sysdig Monitor, SIEM, Uptime, Status)**](#logging-and-monitoring-loki-sysdig-monitor-siem-uptime-status)
* [**Related pages**](#other-important-considerations)

<!-- ### End of "On this page" --> 
---

## Pipeline templates (includes static and dynamic analysis)

To streamline the integration of secure tools into your build pipeline, we've created pipeline templates. These templates encompass build components, along with static and dynamic vulnerability scanning, making it easier for you to implement security measures.

* [Access Pipeline templates](https://github.com/bcgov/Security-pipeline-templates/)

Here is a representation of what an application build pipeline should look like:
![Application build pipeline example diagram](../../images/PipelineSecurity.png)

The pipeline templates above make it easier to include the tools described below:

* [SonarQube in the BC Gov Private Cloud PaaS](../reusable-code-and-services/reusable-services-list.md#sonarqube-in-the-bc-gov-private-cloud-paas)
* [OWASP ZAP Security Vulnerability Scanning](../reusable-code-and-services/reusable-services-list.md#owasp-zap-security-vulnerability-scanning)

### Scanning tools roles 

* **Static analysis (i.e. SonarX, CodeQL)** identifies coding issues that could lead to compromise, back doors, secrets, etc.
* **Dynamic analysis (i.e. OWASP ZAP)** tests against a live version of app for injection, Cross-site scripting (XSS), and other [common web attacks](https://owasp.org/www-project-top-ten/)
* **Image analysis** ensures image components are up-to-date and not vulnerable to [known exploits](https://cve.mitre.org/) and through the  [national vulnerability database](https://nvd.nist.gov/)

## Container image scanning (ACS, Xray)
Image scanning/analysis comes in 2 forms - 1 active (RedHat Advanced Cluster Security - ACS), 1 passive (XRay).

### ACS

This tool scans image registries and running containers for image vulnerabilities.

* It enables the creation of policies at build, deploy, and runtime
* Additionally, it aids in defining network security policies for your application and visualizing component communications

Scoped access is granted based on identification as a Product Owner or Technical Lead in the OpenShift Product Registry.  

Developer access can be granted by request and these must include the following:

- Namespaces
- Product owner approval

For further information:

* [Access ACS](https://acs.developer.gov.bc.ca)
* Learn about our platform's [cluster security](https://digital.gov.bc.ca/cloud/services/private/products-tools/cluster-security/)
* Learn about [advanced cluster security kubernetes](https://www.redhat.com/en/technologies/cloud-computing/openshift/advanced-cluster-security-kubernetes)
* Sign up for an [ACS workshop with RedHat](https://redhat-scholars.github.io/acs-workshop/acs-workshop/index.html)

### XRay

As an add-on feature to Artifactory, XRay performs scans on images and other artifacts to identify component vulnerabilities. Any user with access to an image or artifact within Artifactory can view the XRay tab within the image/artifact details. This tab provides information on the identified vulnerable components and suggests the appropriate version to address those deficiencies.

 * Get access to [Artifactory](https://artifacts.developer.gov.bc.ca/ui/login/)

## Container runtime security

We currently have runtime policies in place for the following using ACS.  These look for things like:

* Cryto-mining
* [Integrity monitoring](https://docs.openshift.com/acs/3.66/operating/manage-security-policies.html)

Additionally, OpenShift uses [CoreOS and the CRI-O container engine](https://docs.openshift.com/container-platform/4.10/architecture/architecture-rhcos.html)

## Secrets management
**OpenShift Secrets:**

The 'secrets' store is exclusively intended for configurations, utilizing base64 encoding for values instead of encryption. Access to these 'secrets' requires a specific role within a designated namespace, granting permission to retrieve them. It's important to note that while the values are base64 encoded, they are not encrypted. Moreover, the physical etcd volume housing OpenShift secrets is encrypted to enhance overall security.

**Vault:**
Vault is the preferred secrets management tool to use on OpenShift.

* Find out more about the [benefits of using Vault](https://digital.gov.bc.ca/cloud/services/private/products-tools/vault/)
* [Vault secrets management service](../secrets-management/vault-secrets-management-service.md)
* [Vault getting started guide](../secrets-management/vault-getting-started-guide.md)

## GitOps/Cluster configuration management

Integrated as the GitOps Operator within OpenShift, Argo CD empowers a GitOps capability to synchronize a Git repository with OpenShift configurations, whether they pertain to the platform or specific applications. 

## Logging and monitoring (Loki, Sysdig Monitor, SIEM, Uptime, Status)

The Platform Services team offers a range of tools designed to ensure the expected behavior of our platform and applications. These tools not only help in monitoring normal operations but also enable thorough investigations into any anomalies that may arise.

**OpenShift UI:**

Within the OpenShift interface, project teams can view logs associated with a given pod through the Logs tab.  
![OpenShift Pod details screen Logs tab example](../../images/openshift-pod-details-logs-tab-example.jpg)

**Loki:**

This tool provides a more wholistic view of logs for an application or at the platform level, as well as providing visualization and alerting capability.

**Sysdig Monitor:**

This tool allows our platform admins and platform teams to build monitoring dashboards.

- Find out more about [Sysdig Monitor](https://digital.gov.bc.ca/cloud/services/private/products-tools/sysdig/)
- [Onboarding to application monitoring with Sysdig](../app-monitoring/sysdig-monitor-onboarding.md)
- [Login to Sysdig](https://app.sysdigcloud.com/#/login)

**Security Information and Event Monitoring (SIEM):**

All cluster logs (system, audit, container) are regularly sent to the Security Operations SIEM environment.  
Retention is set as follows:

- System, Container logs - 2 months
- Audit logs - 13 months

Please contact with Security Operations through your MISO if you wish to have access to your product's logs through the SIEM.  

**Uptime.com**
This tools help us to observe platform service availability.

Review the [status of the platform](https://status.developer.gov.bc.ca/)

**Contact**

For all other matters concerning security on the OpenShift Container Platform, please contact the [PlatformServicesTeam@gov.bc.ca](mailto:PlatformServicesTeam@gov.bc.ca).

---
---
## Related pages

* [OpenShift 101 training](https://digital.gov.bc.ca/cloud/services/private/support/openshift-101/)
* [OpenShift 201 training](https://digital.gov.bc.ca/cloud/services/private/support/openshift-201/)
* [DevOps platform workshops](https://github.com/bcdevops/devops-platform-workshops)
* [Security best practices for apps](../security-and-privacy-compliance/security-best-practices-for-apps.md)


