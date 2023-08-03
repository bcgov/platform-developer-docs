---
title: Grant user access in OpenShift

slug: grant-user-access-openshift

description: Describes how to get users access to OpenShift.

keywords: OpenShift, access, access request, new user, grant access

page_purpose: Describes how users get access or revoke access to OpenShift and the prerequisites.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Cailey Jones

sort_order: 2
---

# Grant user access in OpenShift

Access to the OpenShift platform is self-serve and is available to IDIR users and members of the bcgov organization in GitHub. The platform provides platform and namespace-level access control. Access to the platform requires certain prerequisites and mechanisms to grant access.

Existing bcgov organization members can invite other users to the organization. Every team member may not need access to OpenShift. Consider the security principle of least privilege before requesting platform access and when granting namespace-level access.

## On this page
- [Prerequisites](#prerequisites)
- [Add users](#add-users)
- [Request platform access](#request-platform-access)
- [Grant namespace access](#grant-namespace-access)

## Prerequisites

If you want to grant a new user access to OpenShift they must have the following:

- A GitHub account (ideally with a complete profile)
- Two-factor authentication enabled on their GitHub account

Additionally, the namespace where you are adding the new user must have already have been provisioned through [the new project provisioning process](/provision-new-openshift-project/) and must have one or more administrative users.

## Add users

You can add users in one of the following primary roles:

* ``admin`` A project manager who can view any resource in the namespace and modify any resource in the namespace except for quota.  An ``admin`` user can delete the namespace
* ``edit`` A user that can modify most objects in a namespace, but can't view or modify roles or bindings. An ``edit`` user can create and delete applications in the namespace
* ``view`` A user who can't make any modifications, but can see most objects in a namespace

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
For more information on adding users, you can watch [Using Just Ask! to gain access into the BCGov or BCDevops GitHub Organizations](https://www.youtube.com/watch?v=IvdPyx2-qm0) or use [the Just Ask! tool](https://just-ask.developer.gov.bc.ca/).

## Request platform access

**Note**: This process only gives you platform access, not namespace access.

The product owner or a project administrator associated with namespace provisioning makes a request through the [Just Ask! tool](https://just-ask.developer.gov.bc.ca/).

## Grant namespace access

Technical leads grant namespace access. For more information, see [Using RBAC to define and apply permissions](https://docs.openshift.com/container-platform/4.9/authentication/using-rbac.html).

Follow these best practices when you grant namespace access to a user:
- For GitHub IDs, enter the username as `mygithubid@github`
- For IDIR IDs, enter just the government email address that is associated with the IDIR account, such as `john.doe@gov.bc.ca`
- All usernames on our platform are lowercase. For example, the username `TheBestDev@github` won't work, but `thebestdev@github` does work
- Grant the least privileges needed to do the work. Keep the number of users with administrator access low. Edit is sufficient for most developers

---
Related links:

* [BC Government organizations in GitHub](/bc-government-organizations-in-github/)
* [Provision a new project set](/provision-new-openshift-project/)
* [Using Just Ask! to gain access into the BCGov or BCDevops GitHub Organizations](https://www.youtube.com/watch?v=IvdPyx2-qm0)
* [Add someone to the BC Government GitHub Org](https://just-ask.developer.gov.bc.ca/)
* [Using RBAC to define and apply permissions](https://docs.openshift.com/container-platform/4.9/authentication/using-rbac.html)

---
