---
title: Request BCGov GitHub access or repository creation

slug: request-bcgov-github-access-repository-creation

description: Describes how to give a user access to BC Government organizations in GitHub.

keywords: github, github org, repo, open source, devops, private cloud, github enterprise, request access, access request, user access

page_purpose: Describes how to give a user access to the different BC Government organizations in GitHub using the Just Ask! tool.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Olena Mitovska
---

# Request BCGov GitHub access or repository creation

If you want to invite a new user to contribute to the [BC Gov](https://github.com/orgs/bcgov/dashboard) GitHub repositories, they must have a GitHub account (ideally with a complete profile) with two-factor authentication enabled.

## On this page
- [Existing repository](#existing)
- [New public repository](#public-repo)
- [New private repository](#private-repo)
- [Access request details](#request-details)
- [GitHub repository request](#github-repo)

## Existing repository<a name="existing"></a>

If the project already has a GitHub repository, the administrator or owner of the repository can invite new users as `collaborators`, rather than joining the organization. The administrator or owner of the repository can [add collaborators](https://docs.github.com/en/organizations/managing-access-to-your-organizations-repositories/adding-outside-collaborators-to-repositories-in-your-organization) from the **Settings** area. Click **Add Collaborator**. No further requests are needed.

## New public repository<a name="public-repo"></a>

If a new repository is needed, the technical lead must be a member of the `bcgov` GitHub organization or request access to the organization. The repository owner can invite the rest of the team as collaborators.

## New private repository<a name="private-repo"></a>

**Note**: Private repositories should be considered temporary. We expect that the contents of a private repository become open source.

If a new private repository is needed, the product owner has to determine with the Enterprise DevOps branch leadership whether a private repository is appropriate.

If a private repository is approved, do one of the following:

* For new users, go to [Access request details](#access-request-details).
* For active users, go to [GitHub repository request](#github-repository-request).

The Platform Services team reviews GitHub access and removes users that haven't been active for six months. If a user's access was removed, the product owner has to make a new access request.

## Access request details<a name="request-details"></a>

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
## GitHub repository request<a name="github-repo"></a>

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

---
Related links:
* [GitHub](https://github.com)
* [bcgov](https://github.com/bcgov)
* [Digital Principles for BC Goverment](https://digital.gov.bc.ca/resources/digital-principles)
* [Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/)
* [DevOps-Request](https://github.com/BCDevOps/devops-requests/issues/new?assignees=caggles%2C+ShellyXueHan%2C+mitovskaol%2C+patricksimonian&labels=github-repo%2C+pending&template=github_repo_request.md&title=)
* [GitHub Enterprise user licences in the BC government](./github-enterprise-user-licenses-bc-government.md)
* [BC Government organizations in Github](./bc-government-organizations-in-github.md)
* [Remove a user's BCGov GitHub access](./remove-user-bcgov-github-access.md)

Rewrite sources:
* https://github.com/bcgov/BC-Policy-Framework-For-GitHub/blob/master/github/README.md
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-request-new-GitHub-user-access-or-repository-creation
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/Granting-a-user-access-to-a-project
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-request-new-GitHub-user-access-or-repository-creation
* https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/
* https://www.youtube.com/watch?v=IvdPyx2-qm0
---
