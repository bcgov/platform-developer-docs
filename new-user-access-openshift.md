---
title: Request New User Access to OpenShift

description: Describes how to get users access to OpenShift.

keywords: OpenShift, access, access request, new user

page purpose: Describes how users get access or revoke access to OpenShift and the prerequisites.

audience: developer, technical lead

author: Jonathan Bond

content owner: Cailey Jones
---

# Request New User Access to OpenShift

The OCIO Enterprise DevOps branch manages access to the the OpenShift platform. The platform provides platform and project-level access control. Access to the platform requires certain prerequisites and mechanisms to grant access. Information on project-level access is described [here](./access-to-github-repositories-projects.md).

Every team member may not need access to OpenShift. Consider the security principle of least privilege before requesting platform access and when granting project-level access.

## Prerequisites

If you want to grant a new user access to OpenShift they must have the following:

- a GitHub account (ideally with a complete profile)
- two-factor authentication enabled on their GitHub account

Additionally, the project where you are adding the new user must have already have been provisioned through [this process](StartingANewProject.md) and must have one or more administrative users.

## Add users

You can add users in one of the following primary roles:

* ``admin`` A project manager who can view any resource in the project and modify any resource in the project except for quota.  An ``admin`` user can delete the project.
* ``edit`` A user that can modify most objects in a project, but can't view or modify roles or bindings. An ``edit`` user can create and delete applications in the project.
* ``view`` A user who can't make any modifications, but can see most objects in a project.

To add another user with edit role to the project who can create and delete applications, use the ``oc adm policy`` command. You must be in the project when you run this command.

```
oc adm policy add-role-to-user edit <collaborator>
```

Replace ``<collaborator>`` with the name of the user as displayed by the ``oc whoami`` command when run by that user.

To remove a user from a project, run:

```
oc adm policy remove-role-from-user edit <collaborator>
```
To get a list of the users who have access to a project, and in what role, a project manager can run:
```
oc get rolebindings
```
For more information on adding users, you can [watch this](https://www.youtube.com/watch?v=IvdPyx2-qm0) or [use this](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/). <!-- is this somewhat the correct place to include these links? -->

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
---
Rewrite sources:
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-Request-New-User-Access-to-OpenShift
---
