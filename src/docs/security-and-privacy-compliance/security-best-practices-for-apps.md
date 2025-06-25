---
title: Security best practices for apps

slug: security-best-practices-for-apps

description: 

keywords: 

page_purpose: 

audience: developer, technical lead

author: Matt Spencer 

content_owner: Nick Corcoran

sort_order: 4
---

# Security best practices for apps

You should take particular care to adhere to security and privacy requirements when working on content in an open environment such as GitHub. The Office of the Chief Information Officer (OCIO) provides the IM/IT Standards you are required to follow, and the content you work with on GitHub must conform with the requirements of being labeled as "Public" using the OCIO Information Security Classification Framework.

## On this page
* **[Open development basics](#open-development-basics)**
* **[What does 'doing it right' mean?](#what-does-"doing-it-right"-mean)**
* **[Secure coding guidelines](#secure-coding-guideline)**
* **[Application security self-assessment](#application-security-self-assessment)**
* **

## Open development basics

There is a [healthy debate](http://www.dwheeler.com/secure-programs/Secure-Programs-HOWTO/open-source-security.html) in the security community around the use and development of operation support system (OSS) applications and the implications of exposing the code publicly versus keeping it behind closed doors. 

The debate boils down to the fact that there is no conclusive evidence that deems either open or closed source as inherently more secure. It all comes down to the people (the coders) and their willingness to build security into their code. The one thing that coding in the open does for security is that the public scrutiny of a coders work is proven as a motivating factor for "doing it right" from the start.

## What does 'doing it right' mean?

### Separate code from deployment

Keys, passwords and other secrets must always be stored safely and securely away from source code. This separation of project code from deployed instances of a project is good development practice regardless of whether or not the software itself is shared in public.

### Circle of trust

It’s advisable for large, significant projects to have a private space to discuss security issues and develop a patch. This removes the risk of flagging a vulnerability before a fix has been deployed. This is especially advisable if there’s a small number of participating developers.

### Review the code

Sounds obvious but this step has been skipped by every developer in the world at least once. The simple action of having a second set of eyes on the code can avoid many pitfalls before it's too late.

### Stay up to date on security best practices

Most languages, platforms and products have best practices for securing applications. Find them, follow them and keep current because security is a moving target.

## Secure coding guidelines

This list of helpful [secure coding guidelines](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist) for developers was published by OWASP:

1. [Input validation](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#input-validation) should be used in every possible scenario. This includes redirects and forwards.
2. [Output encoding](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#output-encoding) is required for all output.
3. Every applicable [security header](https://medium.com/bugbountywriteup/security-headers-1c770105940b) should be used.
4. Use the identity and [session management](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#session-management) features available to you in your framework or from your cloud provider and follow this guidance.
5. Take every possible precaution when performing [file uploads](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#file-management), including scanning it for vulnerabilities with tools like [AssemblyLine](https://cyber.gc.ca/en/assemblyline).
6. Ensure [sensitive data is appropriately protected](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#data-protection).
7. All errors should be caught, handled and logged, as per [this article](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#error-handling-and-logging). Never log sensitive information.
8. Use the [**authentication and authorization** features in your framework](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#authentication-and-password-management), do not write your own.
9. [HTTPS only](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#communication-security). Use only unbroken and industry standard protocols (currents standard is 1.2 TLS).
10. Always use the security features in your framework and never write your own. Always keep your framework up to date.
11. Ensure 3rd party libraries are secure and updated regularly.
12. [General coding practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#general-coding-practices).

  `In order to ensure that your developers are following these guidelines, code review is recommended.`

## Application security self-assessment

This document contains a set of items to think about, questions to ask, tools, and references for conducting a STRA in a BCGov DevOps environment. Based on various Information Security frameworks, the focus is on the system and the practices of the team supporting it and avoids the enterprise policy questions.

For further detail or questions/answers please contact your ministry security team.

### Preparation

Understand:

* Scope and timeline of the assessment
* Criticality of the system:
  * Consider confidentiality, integrity and availability requirements
  * Consider whether the system is a [critical system](https://www2.gov.bc.ca/assets/gov/government/services-for-government-and-broader-public-sector/information-technology-services/standards-files/510_critical_systems_standard_v30.pdf)
### Asset management

* Is there an inventory of:
  * Hosts, platform, and/or system stack?
  * Critical software components and versions?
  * Licenses?
* Is there a process to keep the inventory up to date?
* Have you [classified your data](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security/information-security-classification)?

### System design

* Is there a Data Flow Diagram or other document describing:
  * All entities, (servers, services, APIs, end-users and admin)?
  * All communications between entities (protocols, ports, direction)?
* Is the design kept up to date?

### System implementation

* Do firewall rules support the system design?
* Do network security policies (i.e. KNPs) limit communications between components?
  * Use encrypted communications wherever possible (e.g. between app server component and database component)
* Are all exposures necessary (i.e. no unused services running)?
* Does a port scan confirm the above (i.e. nmap)?
* Is TLS configuration sufficient? (e.g. Grade A at [https://www.ssllabs.com/ssltest/](https://www.ssllabs.com/ssltest/))?
  * Ensure Entrust certificate used for Prod environments
* Consider encrypting database elements that contain [Protected B/C data](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security/information-security-classification)

### Access management

* Is there IDIR/BCeID integration (for application access) or an exemption otherwise?
  * Follow OAuth2 best practices
* Have any default user accounts been removed?
* Is the process for granting/revoking access documented?
  * To include details for clients, ministry staff, developers, administrators
* Is access control centralized (i.e. Active Directory, KeyCloak)?
* Is the purpose/location of system accounts documented?
* Do system accounts have the least amount of privilege?
* Are system passwords/keys well protected?
  * Ensure secrets are not exposed in GitHub repos or OpenShift environment variables
  * Use Vault

### Vulnerability management

* Are there vulnerability notifications for all critical software components?
  * Dependabot alerts (SCA)
* Is there testing for each build:
  * Static code analysis (e.g. SonarQube, SonarCloud)?
  * Dynamic app testing (e.g. OWASP ZAP)?
  * Review container vulnerability analysis (CVA) (e.g. ACS/Artifactory Xray)
  * User testing (e.g. fuzzing, invalid inputs)?
  * APIs protected/not leaking data?
* Consider Interactive Application Security Testing (IAST)

### Change management

* Are critical security patches prioritized?
* Are changes scheduled?
* Are changes tested?
* Are changes/outages communicated:
  * From service providers (e.g. Hosting)?
  * To stakeholders?
* Do no permit local auth in Prod instances
* Do not use production data in non-production environments for testing

### Logging and monitoring

* Do logs record an appropriate level of detail for each of these event categories:
  * Web Access?
  * Error?
  * System?
  * Administrator access?
* Are logs stored external to the system?
* Retention of security logs (e.g. access logs) is minimum 13 months.
* Are logs protected from tampering/deletion?
* Are there alerts to notify system admins/owners of:
  * System outages?
  * Performance degradation?
  * Unauthorized access attempts/misuse (e.g. brute force)?

### Backup and retention

* Are there backups for critical data?
* Are there periodic/recent restore tests?
* Is data at-rest protected (e.g. encrypted disks)?
* Business continuity:
  * Are Recovery Time Objectives defined (e.g. maximum downtime)?
  * Is there a communication plan for unexpected outages?
  * Is there a contact list for key staff and alternates?
  * Are operating manuals/docs sufficient for others to understand?
  * Have recovery plans been tested?

---
--- 

## Related pages

- [Vault Secrets Management Service](../secrets-management/vault-secrets-management-service.md)
- [Linux Foundation OSS Security Badges](https://github.com/linuxfoundation/cii-best-practices-badge)
- [Unix, PHP, Python and general programming](http://www.dwheeler.com/secure-programs/Secure-Programs-HOWTO/index.html)
- [Java](https://www.java.com/en/security/developer-info.jsp)
- [MSDN: Windows & .NET](https://msdn.microsoft.com/en-us/library/zdh19h94(v=vs.140).aspx)
- [WordPress](http://stevegrunwell.github.io/wordpress-security-basics/#/)
- [Node.js](http://blog.risingstack.com/node-js-security-tips/)
- [Drupal](https://www.drupal.org/writing-secure-code)


