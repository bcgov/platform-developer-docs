---
title: Request new user access to OpenShift

description: Describes how to get users access to OpenShift.

keywords: OpenShift, access, access request, new user

page purpose: Describes how users get access or revoke access to OpenShift and the prerequisites.

audience: developer, technical lead

author: Jonathan Bond

content owner: Cailey Jones
---

# Request new user access to OpenShift

The OCIO Enterprise DevOps branch manages access to the the OpenShift platform. The platform provides platform and namespace-level access control. Access to the platform requires certain prerequisites and mechanisms to grant access. Information on namespace-level access is described [here](./bc-government-organizations-in-github.md).

Every team member may not need access to OpenShift. Consider the security principle of least privilege before requesting platform access and when granting namespace-level access.

## Prerequisites

If you want to grant a new user access to OpenShift they must have the following:

- a GitHub account (ideally with a complete profile)
- two-factor authentication enabled on their GitHub account

Additionally, the namespace where you are adding the new user must have already have been provisioned through [this process](StartingANewProject.md) and must have one or more administrative users.

## Add users

You can add users in one of the following primary roles:

* ``admin`` A project manager who can view any resource in the namespace and modify any resource in the namespace except for quota.  An ``admin`` user can delete the namespace.
* ``edit`` A user that can modify most objects in a namespace, but can't view or modify roles or bindings. An ``edit`` user can create and delete applications in the namespace.
* ``view`` A user who can't make any modifications, but can see most objects in a namespace.

To add another user with edit role to the namespace who can create and delete applications, use the ``oc adm policy`` command. You must be in the namespace when you run this command.

```
oc adm policy add-role-to-user edit <collaborator>
```

Replace ``<collaborator>`` with the name of the user as displayed by the ``oc whoami`` command when run by that user.

To remove a user from a namespace, run:

```
oc adm policy remove-role-from-user edit <collaborator>
```
To get a list of the users who have access to a namespace, and in what role, a project manager can run:
```
oc get rolebindings
```
For more information on adding users, you can [watch this](https://www.youtube.com/watch?v=IvdPyx2-qm0) or [use this](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/).

## Request platform access

**Note**: This process only gives you platform access, not namespace access.

The product owner or a project administrator associated with namespace provisioning makes a request through the [Platform Services Github Access Managment Tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/). You can learn more about the process [here](https://www.youtube.com/watch?v=IvdPyx2-qm0).

## Grant namespace access

Technical leads grant namespace access. For more information, see <!-- this: https://access.redhat.com/documentation/en-us/openshift_container_platform/3.7/html/administrator_solutions/user-and-role-management
or this: https://docs.openshift.com/container-platform/3.11/architecture/core_concepts/projects_and_users.html-->

Follow these best practices when you grant namespace access to a user:
- Include the `@github` or `@idir` suffixes on the usernames when you grant access.
- All usernames on our platform are lowercase. For example, the username `TheBestDev@github` won't work, but `thebestdev@github` does work.
- Grant the least privileges needed to do the work. Keep the number of users with administrator access low. Edit is sufficient for most developers.
---
Rewrite sources:
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-Request-New-User-Access-to-OpenShift
---
