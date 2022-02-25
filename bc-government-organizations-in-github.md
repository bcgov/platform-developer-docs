---
title: BC Government Organizations in Github

description:

keywords:

tags: github, github org, repo, open source, devops, private cloud, openshift, github enterprise

page purpose:

audience:
---

# BC Government Organizations in Github

The BC Devops team uses [GitHub](https://github.com) to host open code and repositories. GitHub's platform hosts many well-known projects. Using GitHub we're able to do the following:
* Share and control code versions
* Use tools for team and project management
* Track issues
* Collaborate with the open-source community
* Integrate automation tools

The two main organizations the BC government hosts on Github are [bcgov](https://github.com/bcgov) and [bcdevOps](https://github.com/bcdevOps). Between the two, there are over 1000 active projects within the BC Government Developer Community.

If you're unsure which repository you should use, see the following image:

![Diagram of the BC Goverment GitHub organizations](../images/GitHub_Org-Guide.png) <!-- need to import image -->

## Working in the open

The [Digital Principles for BC Goverment](https://digital.gov.bc.ca/resources/digital-principles) urge product teams to _work in the open_ as outlined in principle five. GitHub is the leading platform for open-source projects and allows the Province to collaborate with the open-source community to build software, support innovation, and save time and money.

## BC Government organizations

### `bcgov`

The `bcgov` organization contains all public code repositories that hold open-source code or public documents for all BC Government teams working on the platform, including Platform Services. This organization is **public**.
* All product teams working in the Private Cloud OpenShift Platform should use this organization
* Any member of the `bcgov` organization can create repositories and any existing member can [invite other users](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/).

### `bcgov-c`

The `bcgov-c` organization stores temporary (up to 12 months), private repositories with closed-source code and private documents. Closed-source projects must be moved to the `bcgov` organization at the end of the 12 months. This repository is **private**.

The only permanent, private repositories allowed in this organization are product teams' <!-- correct? multiple teams possessive? Or is the product team one team? --> GitOps repositories with ArgoCD manifests.

* Use this repository if you need a temporary location for code while you collect approvals to make the code public. You must commit to making the code public in the future in order to use this repository.
* Only the Platform Services team can create repositories in this organization. You can ask them to create a repository [here](https://github.com/BCDevOps/devops-requests/issues/new?assignees=caggles%2C+ShellyXueHan%2C+mitovskaol%2C+patricksimonian&labels=github-repo%2C+pending&template=github_repo_request.md&title=).

### `bcgov-platform-services`

The `bcgov-platform-services` organization is for the Platform Services team only and holds platform configuration scripts, such as CCM GitOps manifests, and configuration to manage administrator access to the OpenShift Platform clusters. This repository is **private**.

<!-- PLEASE CHECK THE ABOVE! It's a rewrite of the following but I'm unsure if it's correct:

*What is it for*: This org is used by  **Platform Services Team only**  and contains Platform configuration scripts such CCM GitOps manifests (this org allows for the guaranteed amount of GitHub Actions) as well as for managing the `Maintainer` (aka admin) access to the Openshift Platform clusters. All our public repos are contained in `bcgov` org.
-->
* Only the Platform Services team can create repositories in this organization.
* GitHub application integration (for example, SonarCloud testing) needs to be individually enabled for each repository. The Platform Services team approves all third-party application integration in all BC Government organizations. <!-- is this specific to this section? Or can it be moved? Or better yet, ommitted? -->

## Ministry-specific private organizations

Ministry-specific **private** organizations must be linked to the BC Government's Enterprise account (user licenses are required for the members of these organizations)

These organizations permanently store teams' private repositories with closed-sourced code that can't be transitioned to a public repository within 12 months. For more information on creating a private organization linked to the GitHub enterprise account, see [this page](https://developer.gov.bc.ca/Use-of-GitHub-Enterprise-User-Licenses-in-BC-Gov).

Security Insight feature is available for all orgs linked to the corporate GitHub Enterprise account as well branch protection and code owners for private repos.  Branch protection only allows specific people to push to the protected branch. Code owners feature allows enabling automated reviews, e.g. if a specific user is a code owner of the certain files they are automatically added as PR reviewers and their approval is required before the code can be merged.

*Who should use this org*: product teams that need a permanent location for their closed sourced code. Each Ministry team must purchase their own [user licenses]((https://developer.gov.bc.ca/Use-of-GitHub-Enterprise-User-Licenses-in-BC-Gov)) in order to use the org.

*Who can create repos in this org*: Ministry GitHub admins. Consult with your Ministry's IMB to get in touch with the GitHub admins.

---
Rewrite sources:
* https://github.com/bcgov/BC-Policy-Framework-For-GitHub/blob/master/github/README.md
* https://github.com/BCDevOps/openshift-wiki/blob/master/docs/HowTo/RequestGitHubEnterpriseUserLicense.md
* https://developer.gov.bc.ca/repositories
---
