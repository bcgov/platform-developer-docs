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

When working in open environments like GitHub, you must meet all security and privacy requirements. The Office of the Chief Information Officer (OCIO) sets IM/IT Standards you are required to follow. Ensure any content you manage on GitHub meets the OCIO’s criteria for “Public” classification under the Information Security Classification Framework. 

## On this page

* **[Open development basics](#open-development-basics)**
* **[What does 'doing it right' mean?](#what-does-doing-it-right-mean)**
* **[Secure coding guidelines](#secure-coding-guidelines)**
* **[Application security self-assessment](#application-security-self-assessment)**

## Open development basics

There is an ongoing [debate](http://www.dwheeler.com/secure-programs/Secure-Programs-HOWTO/open-source-security.html) in the security community about the use and development of open-source applications and the implications of exposing the code publicly or keeping it private. 

The debate showcases that neither approach is inherently more secure. The key factor is whether developers build security into the code. Open development can encourage better practices by exposing code to public review, which motivates developers to follow security best practices from the beginning.

## What does 'doing it right' mean?

### Separate code from deployment

Always store keys, passwords, and other secrets in a secure location, separate from your source code. Keeping code and deployment artifacts separate is a good practice—whether your code is public or private.

### Create a circle of trust

If you're working on a large or sensitive project, set up a private space to discuss security issues and develop patches. This helps prevent alerting others to vulnerabilities before you can fix them. This approach is especially useful when working with a small development team.

### Review the code

Always review code—even if it seems obvious. A second set of eyes can catch issues early and prevent security problems later.

### Stay up to date on security best practices

Every language and platform has its own security recommendations. Find them, follow them, and stay up to date—because security threats constantly evolve.

## Secure coding guidelines

The [Open Web Application Security Project (OWASP)]((https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist)) provides these key guidelines for developers:

1. Use [Input validation](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#input-validation) in every scenario—including redirects and forwards

2. Apply [output encoding](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#output-encoding) for all outputs

3. Enable all relevant [security headers](https://medium.com/bugbountywriteup/security-headers-1c770105940b)

4. Use built-in [identity and session management](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#session-management) tools in your framework or cloud provider

5. Scan all [file uploads](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#file-management) for vulnerabilities with tools like [AssemblyLine](https://cyber.gc.ca/en/assemblyline)

6. Make sure you [protect sensitive data](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#data-protection)

7. Catch, handle and log all errors—never log sensitive data. [Learn more](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#error-handling-and-logging)

8. Use your framework's [authentication and authorization features](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#authentication-and-password-management) —do not write your own

9. Enforce [HTTPS—only](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#communication-security) connections with current unbroken and industry standard protocols (currents standard is 1.2 TLS or higher)

10. Use your framework's built-in security features—never write your own and keep them updated

11. Regularly update and verify the security of all third-party libraries

12. Follow [general coding practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist#general-coding-practices)

  `In order to ensure that your developers are following these guidelines, code review is recommended.`

## Application security self-assessment

Use this section to prepare for a Security Threat and Risk Assessment (STRA) in a B.C. government DevOps environment. This self-assessment helps you evaluate your system and your team’s practices, without focusing on enterprise policy.

For support, contact your ministry’s security team.

### Preparation

Start by understanding what the assessment involves and how critical your system is to operations.

* The scope and timeline of the assessment
* How critical the system is:
  * This about confidentiality, integrity and availability requirements
  * Identify if it's a [critical system](https://www2.gov.bc.ca/assets/gov/government/services-for-government-and-broader-public-sector/information-technology-services/standards-files/510_critical_systems_standard_v30.pdf)

### Asset management

Know what assets you have, where they are, and whether your data is properly classified and inventoried.

Does your team:

*  Maintain an up-to-date inventory of:
  * Hosts, platform, and/or system stack?
  * Critical software components and their versions?
  * Software licenses?
* Have a process to keep the inventory up to date?
* Have [classified data](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security/information-security-classification)?

### System design

Make sure your system architecture is clearly documented and reflects current data flows and connections.

Does your team:

* Maintain a Data Flow Diagram (or equivalent) that shows:
  * All components—servers, services, APIs, end-users and admin, etc.?
  * All communications between them including protocols, ports and direction?
* Keep the design current and updated regularly?

### System implementation

Check that your system's technical setup supports security best practices and follows the intended design.

Does your team:

* Have firewall rules support and match the system design?
* Create network security policies, for example: KNPs limit communications between components?
  * Encrypt all communications between components, for example: Between app server component and database component
* Have all exposures necessary for example: No unused services running?
* Run a port scan for example: Nmap to confirm?
* Have TLS set up earn a Grade A from [SSL Labs](https://www.ssllabs.com/ssltest/)?
  * Use Entrust certificates in Prod environments
* Encrypt database elements that contain [Protected B/C data](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security/information-security-classification)

### Access management

Control who can access your system, what they can do, and how credentials are managed and protected.

Does your team:

* Integrate with IDIR/BCeID for application access or have documented exemption?
  * Follow OAuth2 best practices
* Remove all default user accounts?
* Document how to grant or revoke access for clients, ministry staff, developers and administrators?
* Centralize access control for example:Active Directory or KeyCloak?
* Document all system accounts and their purpose?
* Verify that system accounts have only the permissions they need?
* Verify that system passwords and keys protected?
  * Do not store secrets in GitHub repos or OpenShift environment variables
  * Use Vault

### Vulnerability management

Use tools and testing to detect, respond to, and prevent known security risks in your system and code.

Does your team:

* Subscribe to alerts for vulnerability notifications in critical software components?
  * Use tools like Dependabot alerts (SCA)
* Run these types of tests for each build:
  * Static code analysis for example SonarQube or SonarCloud?
  * Dynamic app testing for example OWASP ZAP?
  * Container vulnerability analysis scans (CVA) for example  ACS/Artifactory Xray?
  * User testing with invalid inputs for example: fuzzing?
  * APIs validation to prevent and protect data leaks?
* Consider using Interactive Application Security Testing (IAST)?

### Change management

Ensure all changes—especially those affecting security—are planned, reviewed, and clearly communicated.

Does your team:

* Prioritize critical security patches?
* Schedule and test changes?
* Communicate outages and changes:
  * From service providers for example: hosting?
  * To stakeholders?

Very important to consider:

* Do not allow local authentication in production environments
* Do not use production data in non-production environments for testing

### Logging and monitoring

Monitor system activity with secure, detailed logs, and set up alerts to detect suspicious behavior or issues.

Does your team:

* Retain logs that capture the appropriate level of detail for each of these event categories:
  * Web Access?
  * Error?
  * System?
  * Administrator access?
* Store logs outside of the system?
* Keep security logs for at least 13 months?
* Protect logs from tampering or deletion?
* Have alerts that notify the system admins/owners of:
  * System outages?
  * Performance degradation?
  * Unauthorized access attempts or misuse for example: brute-force attempts?

### Backup and retention

Protect your data by maintaining secure backups, testing recovery procedures, and planning for disruptions.

Does your team:

* Backup critical data?
* Regularly test their ability to restore backups?
* Encrypt data at-rest for example: Encrypted disks?

For business continuity, consider your team to:

* Define the Recovery Time Objectives for example: Maximum downtime
* Have a communications plan for outages
* Maintain an up-to-date contact list of key staff and backups
* Operate manuals and documentation clear enough for others to follow
* Test your recovery plans
 

## Related pages

- [Vault Secrets Management Service](../secrets-management/vault-secrets-management-service.md)
- [Linux Foundation OSS Security Badges](https://github.com/linuxfoundation/cii-best-practices-badge)
- [Unix, PHP, Python and general programming](http://www.dwheeler.com/secure-programs/Secure-Programs-HOWTO/index.html)
- [Java](https://www.java.com/en/security/developer-info.jsp)
- [MSDN: Windows & .NET](https://msdn.microsoft.com/en-us/library/zdh19h94(v=vs.140).aspx)
- [WordPress](http://stevegrunwell.github.io/wordpress-security-basics/#/)
- [Node.js](http://blog.risingstack.com/node-js-security-tips/)
- [Drupal](https://www.drupal.org/writing-secure-code)
