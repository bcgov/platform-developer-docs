---
title: Request GitHub access or allow repository creation for a new user.

description: Request or revoke access for a new user of the BC Government GitHub repositories.

keywords:

page purpose:

audience:
---
# Request GitHub access or allow repository creation for a new user

BC Government project teams keep open-source projects in the GitHub organization `bcgov`.

If you want to invite a new user to contribute to the [BC Gov](https://github.com/orgs/bcgov/dashboard) GitHub repositories, they must have a GitHub account (ideally with a complete profile) with two-factor authentication enabled.

## Existing repository

If the project already has a GitHub repository, the administrator or owner of the repository can invite new users as `collaborators`, rather than joining the organization. The administrator or owner of the repository can [add collaborators](https://docs.github.com/en/organizations/managing-access-to-your-organizations-repositories/adding-outside-collaborators-to-repositories-in-your-organization) from the **Settings** area. Click **Add Collaborator**. No further requests are needed.

## New repository
<!-- who needs a new repository? "If [who?] needs a new repo" -->
If a new repository is needed, the technical lead must be a member of the `bcgov` GitHub organization or request access to the organization. The repository owner can invite the rest of the team as collaborators.

### New private repository

**Note**: Private repositories should be considered temporary. We expect that the contents of a private repository become open source.

If a new private repository is needed, the product owner has to determine with the Enterprise DevOps branch leadership whether a private repository is appropriate.

If a private repository is approved, do one of the following:

* For new users, go to `Request access`.
* For active users, go to `Request a GitHub repository`.

The Platform Services team reviews GitHub access and removes users that haven't been active for six months. If a user's access was removed, the product owner has to make a new access request.

## Request access

If a new user meets the prerequisites for access, the product owner can create an issue in the [DevOps Request Repo](https://github.com/BCDevOps/devops-requests) to make a request. **New users can't request access for themselves**.

Include the following in the request:

* Project name
* GitHub organization
* New user's full name
* New user's GitHub ID
* New user's email address associated with the GitHub account
* New user's organization (the government ministry and the division, branch, etc.) or company
* New user's role on the project (for example, developer, QA, devops specialist, scrum master)
* GitHub repositories <!-- that they require access to? If they exist? -->
* **Optional*: Expiry date. The team must remove users from the repository when they no longer need it.

Use the following example as a reference when you submit a request:

```markdown
GitHub User Access Request:
- Project: Govvapp
- GitHub Org: bcgov
- Full name: Govvie McGovster
- GitHub ID: govviemcgovster
- Email address: Govvie.Mcgovster@gov.bc.ca
- Organization: OCIO, Service BC
- Project role: Full-stack Developer
- Existing GitHub Repo: https://github.com/bcgov/govvie-gov, https://github.com/bcgov/govviest-gov
```
## Request a GitHub repository

All members of the public `bcgov` GitHub organization can create their own repositories. To create a repository, a user needs to be added to the `bcgov` GitHub organization first.

For an approved private repository in the `bcgov-c` organization, the product owner or technical lead can make a request by creating an issue in the [DevOps Request Repo](https://github.com/BCDevOps/devops-requests).
<!-- are these a MUST include? If they are, we should say it-->
Include the following in the request:

* Project name
* Project description
* Approver's GitHub ID (@ the user's GitHub account)
* Repository owner's GitHub ID
* **For private repositories only**: Brief explanation for developing a closed-source project
* **For private repositories only**: Date the project shifts to open-source

Use the following example as a reference when you submit a request:

<!-- is this actually a good example? Can we update it? -->
```markdown
GitHub Repository Request:
- Project: Govvapp-private
- Project description: the temporary repo for the Govvapp project, for bla
- Approver: @Todd.Wilson
- Repo Owner GitHub ID: govviemcgovster
```

## Remove access

When a user no longer needs access to a repository, the product owner or administrator of the repository must remove the user. They also have to request removal of their access from the organization by creating an issue in the [DevOps Request Repo](https://github.com/BCDevOps/devops-requests).

Include the following in the request:

* User's full name
* User's GitHub ID
* The GitHub repository you are removing the user from

Use the following example as a reference when you submit a request:

```markdown
GitHub User Access Removal Request:
- Full name: Govvie McGovster
- GitHub ID: govviemcgovster
- GitHub Repo: https://github.com/bcgov/govvie-gov, https://github.com/bcgov/govviest-gov
```
