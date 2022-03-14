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

The `bcgov-c` organization stores **temporary** (up to 12 months), private repositories with closed-source code and private documents. Closed-source projects must be moved to the `bcgov` organization at the end of the 12 months. All repositories in this organization are **private**.

* Use this repository if you need a temporary location for code while you collect approvals to make the code public. You must commit to making the code public in the future in order to use this repository.
* Only the Platform Services team can create repositories in this organization. You can ask them to create a repository by submitting a [DevOps-Request](https://github.com/BCDevOps/devops-requests/issues/new?assignees=caggles%2C+ShellyXueHan%2C+mitovskaol%2C+patricksimonian&labels=github-repo%2C+pending&template=github_repo_request.md&title=). The users listed on the private repository creation form are provisioned administrator access to the repository and can invite other team members.
* There is a cost per user for this organization, the cost is covered by the OCIO.
* The Platform Services Team periodically reviews GitHub access and removes users that haven't been active for six months.

Your product team can only have a **permanent**, private repository in `bcgov-c` if it is a GitOps repository with ArgoCD manifests. We strongly discourage creating permanent, private repositories in this organization.

### `bcgov-platform-services`

The `bcgov-platform-services` organization is for the **Platform Services team only** and holds platform configuration scripts, such as CCM GitOps manifests, and configuration to manage administrator access to the OpenShift Platform clusters. This repository is **private**.

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

---
Rewrite sources:
* https://github.com/bcgov/BC-Policy-Framework-For-GitHub/blob/master/github/README.md
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-request-new-GitHub-user-access-or-repository-creation
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/Granting-a-user-access-to-a-project
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-request-new-GitHub-user-access-or-repository-creation
* https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/
* https://www.youtube.com/watch?v=IvdPyx2-qm0
---
