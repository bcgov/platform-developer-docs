---
title: Request New User Access to OpenShift

description: Describes how to get users access to OpenShift.

keywords: OpenShift, access, access request, new user

page purpose: Describes how users get access or revoke access to OpenShift and the prerequisites.

audience: developer, project administrator
---

# Request New User Access to OpenShift

The OCIO Enterprise DevOps branch manages access to the the OpenShift platform. The platform provides platform and project-level access control. Access to the platform requires certain prerequisites and mechanisms to grant access. Information on project-level access is described [here](./access-to-github-repositories-projects.md).

Every team member may not need access to OpenShift. Consider the security principle of least privilege before requesting platform access and when granting project-level access.

## Prerequisites

If you want to grant a new user access to OpenShift they must have the following:

- a GitHub account (ideally with a complete profile)
- two-factor authentication enabled on their GitHub account

Additionally, the project where you are adding the new user must have already have been provisioned through [this process](StartingANewProject.md) and must have one or more administrative users.

## Request access

The product owner or a project administrator associated with the project provisioning makes a request through the [Platform Services Github Access Managment Tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/). You can learn more about the process [here](https://www.youtube.com/watch?v=IvdPyx2-qm0).

## Remove access

When a user no longer needs access to a project on the OpenShift platform, the associated product owner or a project administrator must remove the user from the project and notify the DevOps platform team at [DevOps Request Repo](https://github.com/BCDevOps/devops-requests).

Include the following user details in the request:

* Full name
* GitHub ID
* Email address
* Organization (government ministry and division, branch, or department) or company
* Role on the project (For example, developer, QA, devops specialist, scrum master)
* OpenShift project name(s) that the user had access to. Project-level access should still be removed by the project admin.

Use the following example as a reference when you submit a request:

```markdown
OpenShift User Access Removal Request:
- Full name: Govvie McGovster
- GitHub ID: govviemcgovster
- Email address: Govvie.Mcgovster@gov.bc.ca
- Organization: OCIO, Service BC
- Project role: Full-stack Developer
- OpenShift projects: xyz123-tools, xyz123-test, xyz123-test, xyz123-prod  
```
