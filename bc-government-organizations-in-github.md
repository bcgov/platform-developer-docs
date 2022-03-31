---
title: BC Government organizations in Github

description: Describes the different BC Government organizations in GitHub and how to access them.

keywords: github, github org, repo, open source, devops, private cloud, openshift, github enterprise

page purpose: Describes the different BC Government organizations in GitHub, what they're used for, who can use them, and how to access them.

audience: developer, technical lead

author: Jonathan Bond

content owner: Olena Mitovska
---

# BC Government organizations in Github

The BC Devops team uses [GitHub](https://github.com) to host open code and repositories. Using GitHub you can do the following:
* Share and control code versions
* Use tools for team and project management
* Track issues
* Collaborate with the open-source community
* Integrate automation tools

The main organization the BC government owns in Github is [bcgov](https://github.com/bcgov) where we store all open-source code developed by BC Government teams. The `bcgov` org includes close to 1000 repositories maintained by the BC Government Developer Community.

## Working in the open

The [Digital Principles for BC Goverment](https://digital.gov.bc.ca/resources/digital-principles) urge product teams to _work in the open_ as outlined in principle five. GitHub is the leading platform for open-source projects and allows the Province to collaborate with the open-source community to build software, support innovation, and save time and money.

## BC Government organizations in GitHub

The Province owns several GitHub organizations, which are described below.

### `bcgov`

The `bcgov` organization contains all public code repositories that hold open-source code or public documents for all BC Government teams working on the platform, including Platform Services. This organization is **public**.
* All product teams working in the Private Cloud OpenShift Platform should use this organization
* Any member of the `bcgov` organization can create repositories and any existing member can [invite other users](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/) to join the organizations.

### `bcgov-c`

The `bcgov-c` organization stores temporary (up to 12 months), private repositories with closed-source code and private documents. Closed-source projects must be moved to the `bcgov` organization at the end of the 12 months. This repository is **private**.

* Use this repository if you need a temporary location for code while you collect approvals to make the code public. You must commit to making the code public in the future in order to use this repository.
* Only the Platform Services team can create repositories in this organization. You can ask them to create a repository [using the Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/).

Your product team can only have a permanent, private repository in `bcgov-c` if the GitOps repository has ArgoCD manifests. We strongly discourage permanent, private repositories.

Your product team can only have a **permanent**, private repository in `bcgov-c` if it is a GitOps repository with ArgoCD manifests. We strongly discourage creating permanent, private repositories in this organization.

### `bcgov-platform-services`

* Only the Platform Services team can create repositories in this organization.
* GitHub application integration (for example, SonarCloud testing) needs to be individually enabled for each repository. The Platform Services team approves all third-party application integration in all BC Government organizations.

## Ministry-specific private organizations in GitHub Enterprise

Ministry-specific **private** organizations must be linked to the BC Government's Enterprise account (user licenses are required for the members of these organizations)

These organizations permanently store teams' private repositories with closed-sourced code that can't be transitioned to a public repository within 12 months. For more information on creating a private organization linked to the GitHub enterprise account, see [this page](github-enterprise-user-licenses-bc-government.md).
* Product teams that need a permanent location for their closed-source code should use this repository.
* Each Ministry team must purchase their own [user licenses](github-enterprise-user-licenses-bc-government.md) to use the organization.
* Only Ministry GitHub administrators can create repositories in this organization. Consult with your Ministry's Information Management Branch (IMB) to get in touch with the GitHub administrators.

If you're unsure which repository you should use, see the following image:

![Diagram of the BC Goverment GitHub organizations](/images/github-organization-chart.png)

### Security Insights for GitHub Enterprise-linked organizations

The Security Insight feature is available for all organizations linked to the corporate GitHub Enterprise account, as well branch protection and code owners for private repositories. Branch protection only allows specific people to push to the protected branch. The code owners feature allows automated reviews. For example, if a specific user is a code owner of certain files they are automatically added as PR reviewers and their approval is required before the code can be merged.

## Request GitHub access or repository creation

If you want to invite a new user to contribute to the [BC Gov](https://github.com/orgs/bcgov/dashboard) GitHub repositories, they must have a GitHub account (ideally with a complete profile) with two-factor authentication enabled.

### Existing repository

If the project already has a GitHub repository, the administrator or owner of the repository can invite new users as `collaborators`, rather than joining the organization. The administrator or owner of the repository can [add collaborators](https://docs.github.com/en/organizations/managing-access-to-your-organizations-repositories/adding-outside-collaborators-to-repositories-in-your-organization) from the **Settings** area. Click **Add Collaborator**. No further requests are needed.

### New public repository

If a new repository is needed, the technical lead must be a member of the `bcgov` GitHub organization or request access to the organization. The repository owner can invite the rest of the team as collaborators.

### New private repository

**Note**: Private repositories should be considered temporary. We expect that the contents of a private repository become open source.

If a new private repository is needed, the product owner has to determine with the Enterprise DevOps branch leadership whether a private repository is appropriate.

If a private repository is approved, do one of the following:

* For new users, go to [Access request details](#access-request-details).
* For active users, go to [GitHub repository request](#github-repository-request).

The Platform Services team reviews GitHub access and removes users that haven't been active for six months. If a user's access was removed, the product owner has to make a new access request.

## Access request details

If a user meets the prerequisites for access, the product owner can use the [Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/) to make a request. **New users can't request access for themselves**.

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
### GitHub repository request

All members of the public `bcgov` GitHub organization can create their own repositories. To create a repository, a user needs to be added to the `bcgov` GitHub organization first.

For an approved private repository in the `bcgov-c` organization, the product owner or technical lead can make a request by using the [Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/).

Include the following in the request:

* Project name
* Project description
* Approver's GitHub ID (@ the user's GitHub account)
* Repository owner's GitHub ID
* **For private repositories only**: Brief explanation for developing a closed-source project
* **For private repositories only**: Date the project shifts to open-source

Use the following example as a reference when you submit a request:

```markdown
GitHub Repository Request:
- Project: Govvapp-private
- Project description: the temporary repo for the Govvapp project, for bla
- Approver: @Todd.Wilson
- Repo Owner GitHub ID: govviemcgovster
```

## Remove access

When a user no longer needs access to a repository, the product owner or administrator of the repository must remove the user. They also have to request removal of their access from the organization by using the [Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/).

Include the following in the request:

* User's full name
* User's GitHub ID
* The GitHub repository you are removing the user from

Use the following example as a reference when you submit a request: <!-- is this actually a good example? Can we update it? -->

```markdown
GitHub User Access Removal Request:
- Full name: Govvie McGovster
- GitHub ID: govviemcgovster
- GitHub Repo: https://github.com/bcgov/govvie-gov, https://github.com/bcgov/govviest-gov
```
---
Related links:
* [GitHub](https://github.com)
* [bcgov](https://github.com/bcgov)
* [Digital Principles for BC Goverment](https://digital.gov.bc.ca/resources/digital-principles)
* [Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/)
* [DevOps-Request](https://github.com/BCDevOps/devops-requests/issues/new?assignees=caggles%2C+ShellyXueHan%2C+mitovskaol%2C+patricksimonian&labels=github-repo%2C+pending&template=github_repo_request.md&title=)
* [GitHub Enterprise user licences in the BC government](github-enterprise-user-licenses-bc-government.md)

Rewrite sources:
* https://github.com/bcgov/BC-Policy-Framework-For-GitHub/blob/master/github/README.md
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-request-new-GitHub-user-access-or-repository-creation
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/Granting-a-user-access-to-a-project
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-request-new-GitHub-user-access-or-repository-creation
* https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/
* https://www.youtube.com/watch?v=IvdPyx2-qm0
---
