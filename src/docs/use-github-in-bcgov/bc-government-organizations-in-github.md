---
title: BC Government organizations in GitHub

slug: bc-government-organizations-in-github

description: Describes the different BC Government organizations in GitHub.

keywords: github, github org, repo, open source, github enterprise, bcgov, github organization

page_purpose: Describes the different BC Government organizations in GitHub, what they're used for, and who can use them.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Olena Mitovska

sort_order: 1
---

# BC Government organizations in GitHub

Many teams building software for the B.C. government use [GitHub](https://github.com) to host their code. Using GitHub you can:

* Share and control code versions
* Use tools for team and project management
* Track issues
* Collaborate with the open-source community
* Integrate automation tools

The main organization the B.C. government owns in GitHub is [bcgov](https://github.com/bcgov) where we store all open-source code developed by B.C. government teams. The `bcgov` organization includes over 1000 repositories maintained by the B.C. government developer community.

The Developer Experience Team manages the B.C. government's GitHub environments.

## On this page

- [Working in the open](#working-in-the-open)
- [Organizations in GitHub](#organizations-in-github)
- [Ministry-specific private organizations in GitHub Enterprise](#ministry-specific-private-organizations-in-github-enterprise)

## Working in the open

The [Digital Principles for the Government of B.C.](https://www2.gov.bc.ca/gov/content/governments/policies-for-government/core-policy/policies/im-it-management#12.1.1.5) urge product teams to work in the open as outlined in principle five. GitHub is the leading platform for open-source projects. It allows the Province to collaborate with the open-source community to build software, support innovation and save time and money.

## Organizations in GitHub

The Province owns several GitHub organizations, which are described below.

### `bcgov`

The `bcgov` organization contains public repositories that hold open-source code or public documents developed by B.C. government teams. This organization is **public**.

* Product teams working in the BC Gov Private Cloud PaaS OpenShift platform should use this organization unless they are given permission to work in [`bcgov-c`](#bcgov-c).
* Any member of the `bcgov` organization can create repositories.
* Existing members of the `bcgov` organization can invite new users to join the organization using the [Just Ask! tool](https://just-ask.developer.gov.bc.ca/). (***Users cannot request membership to `bcgov` for themselves***)

### `bcgov-c`

The `bcgov-c` organization stores temporary (up to 12 months), private repositories with closed-source code and private documents. Closed-source projects must be moved to the `bcgov` organization at the end of the 12 months. This repository is **private**.

* Use this repository if you need a temporary location for code while you collect approvals to make the code public. You must commit to making the code public in the future in order to use this repository.
* Only the Developer Experience team can create repositories in this organization. You can request a repository by [submitting a request](https://github.com/BCDevOps/devops-requests/issues/new?assignees=MonicaG%2C+oomIRL&labels=github-repo%2C+pending&projects=&template=github_repo_request.md&title=).

Your product team can only have a **permanent**, private repository in `bcgov-c` if it is a GitOps repository with ArgoCD manifests. We strongly discourage creating permanent, private repositories in this organization.

### `bcgov-platform-services`

* Only the Platform Services team can create repositories in this organization.
* GitHub application integration (for example, SonarCloud testing) needs to be individually enabled for each repository. The Platform Services team approves all third-party application integration in all B.C. government organizations.

## Ministry-specific private organizations in GitHub Enterprise

Ministry-specific **private** organizations must be linked to the B.C. government's Enterprise account (user licenses are required for the members of these organizations).

These organizations permanently store teams' private repositories with closed-sourced code that can't be transitioned to a public repository within 12 months. For more information on creating a private organization linked to the GitHub enterprise account, see [GitHub Enterprise user licences in the B.C. government](/github-enterprise-user-licenses-bc-government/).

* Product teams that need a permanent location for their closed-source code should use this repository.
* Each ministry team must purchase their own [user licenses](../github-enterprise-user-licenses-bc-government/) to use the organization.
* Only ministry GitHub administrators can create repositories in this organization. Consult with your ministry's Information Management Branch (IMB) to get in touch with the GitHub administrators.

![Diagram of the BC Government GitHub organizations](../../images/github-organization-chart.png)

### Security Insights for GitHub Enterprise-linked organizations

The Security Insight feature is available for all organizations linked to the corporate GitHub Enterprise account, as well as branch protection and code owners for private repositories. Branch protection only allows specific people to push to the protected branch. The code owners feature allows automated reviews. For example, if a specific user is a code owner of certain files they are automatically added as PR reviewers and their approval is required before the code can be merged.

---
Related links:

* [GitHub](https://github.com)
* [bcgov](https://github.com/bcgov)
* [Digital Principles for BC Government](https://digital.gov.bc.ca/resources/digital-principles)
* [Just Ask! tool](https://just-ask.developer.gov.bc.ca/)
* [GitHub Enterprise user licences in the BC government](/github-enterprise-user-licenses-bc-government/)
* [Remove a user's BCGov GitHub access](/remove-user-bcgov-github-access/)
* [Common platform requests in the BC Gov Private Cloud PaaS](%WORDPRESS_BASE_URL%/private-cloud/support-and-community/devops-requests-in-the-bc-gov-private-cloud-paas/)

---
