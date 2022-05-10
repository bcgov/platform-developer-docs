---
title: BC Government organizations in Github

slug: bc-government-organizations-in-github

description: Describes the different BC Government organizations in GitHub.

keywords: github, github org, repo, open source, github enterprise, bcgov, github organization

page_purpose: Describes the different BC Government organizations in GitHub, what they're used for, and who can use them.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Olena Mitovska
---

# B.C. government organizations in Github

The B.C. DevOps team uses <a href="https://github.com" target="_blank">GitHub</a> to host open code and repositories. Using GitHub you can:
* Share and control code versions.
* Use tools for team and project management.
* Track issues.
* Collaborate with the open-source community.
* Integrate automation tools.

The main organization the B.C. government owns in Github is [bcgov](https://github.com/bcgov) where we store all open-source code developed by B.C. government teams. The `bcgov` organization includes close to 1000 repositories maintained by the B.C. government developer community.

## On this page
- [Working in the open](#work-in-open)
- [Organizations in GitHub](#gov-orgs)
- [Ministry-specific private organizations in GitHub Enterprise](#ministry-private-orgs)

## Working in the open<a name="work-in-open"></a>

The [Digital Principles for the Government of B.C.](https://digital.gov.bc.ca/resources/digital-principles) urge product teams to work in the open as outlined in principle five. GitHub is the leading platform for open-source projects. It allows the Province to collaborate with the open-source community to build software, support innovation and save time and money.

## Organizations in GitHub<a name="gov-orgs"></a>

The Province owns several GitHub organizations, which are described below.

### `bcgov`

The `bcgov` organization contains all public code repositories that hold open-source code or public documents for all B.C. government teams working on the platform, including Platform Services. This organization is **public**.
* Most product teams working in the BC Gov Private Cloud PaaS OpenShift platform should use this organization.
* Any member of the `bcgov` organization can create repositories and any existing member can [invite other users](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/) to join the organization.

### `bcgov-c`

The `bcgov-c` organization stores temporary (up to 12 months), private repositories with closed-source code and private documents. Closed-source projects must be moved to the `bcgov` organization at the end of the 12 months. This repository is **private**.

* Use this repository if you need a temporary location for code while you collect approvals to make the code public. You must commit to making the code public in the future in order to use this repository.
* Only the Platform Services team can create repositories in this organization. You can ask them to create a repository [using the Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/).

Your product team can only have a **permanent**, private repository in `bcgov-c` if it is a GitOps repository with ArgoCD manifests. We strongly discourage creating permanent, private repositories in this organization.

### `bcgov-platform-services`

* Only the Platform Services team can create repositories in this organization.
* GitHub application integration (for example, SonarCloud testing) needs to be individually enabled for each repository. The Platform Services team approves all third-party application integration in all B.C. government organizations.

## Ministry-specific private organizations in GitHub Enterprise<a name="ministry-private-orgs"></a>

Ministry-specific **private** organizations must be linked to the B.C. government's Enterprise account (user licenses are required for the members of these organizations).

These organizations permanently store teams' private repositories with closed-sourced code that can't be transitioned to a public repository within 12 months. For more information on creating a private organization linked to the GitHub enterprise account, see [GitHub Enterprise user licences in the B.C. government](./github-enterprise-user-licenses-bc-government.md).
* Product teams that need a permanent location for their closed-source code should use this repository.
* Each ministry team must purchase their own [user licenses](./github-enterprise-user-licenses-bc-government.md) to use the organization.
* Only ministry GitHub administrators can create repositories in this organization. Consult with your ministry's Information Management Branch (IMB) to get in touch with the GitHub administrators.

![Diagram of the BC Goverment GitHub organizations](../../images/github-organization-chart.png)

### Security Insights for GitHub Enterprise-linked organizations

The Security Insight feature is available for all organizations linked to the corporate GitHub Enterprise account, as well as branch protection and code owners for private repositories. Branch protection only allows specific people to push to the protected branch. The code owners feature allows automated reviews. For example, if a specific user is a code owner of certain files they are automatically added as PR reviewers and their approval is required before the code can be merged.

---
Related links:
* [GitHub](https://github.com)
* [bcgov](https://github.com/bcgov)
* [Digital Principles for BC Goverment](https://digital.gov.bc.ca/resources/digital-principles)
* [Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/)
* [GitHub Enterprise user licences in the BC government](./github-enterprise-user-licenses-bc-government.md)
* [Remove a user's BCGov GitHub access](./remove-user-bcgov-github-access.md)
* [Request BCGov GitHub access or repository creation](./request-bcgov-github-access-repository-creation.md)

Rewrite sources:
* https://github.com/bcgov/BC-Policy-Framework-For-GitHub/blob/master/github/README.md
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-request-new-GitHub-user-access-or-repository-creation
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/Granting-a-user-access-to-a-project
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-request-new-GitHub-user-access-or-repository-creation
* https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/
* https://www.youtube.com/watch?v=IvdPyx2-qm0
---
