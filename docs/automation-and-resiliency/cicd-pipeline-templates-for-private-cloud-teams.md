---
title: CI/CD pipeline templates for Private Cloud teams

slug: ci-cd-pipeline-templates

description: Describes continuous integration (CI) and continuous delivery (CD) pipeline automation and how teams can use it in their applications.

keywords: CI, CD, application, application tools, pipelines, pipeline templates

page_purpose: Gives an outline of pipeline automation and templates for teams that want to use them or contribute to them.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Ian Watts
---

# CI/CD pipeline templates for Private Cloud teams

As you develop your application for deployment to the BC Government's Private Cloud OpenShift platform, you should create a pipeline that automatically builds and tests your code so that your software delivery is efficient and secure. Use our pipeline templates to help you get started.

## On this page
- [Pipeline templates](#pipeline-templates)
- [Automation technologies](#automation-technologies)
- [Choose a technology](#choose-technology)
- [Contribute to a pipeline template](#contribution)

To help teams that want to get started with pipeline automation, use the best security practices for pipeline development, or both, the Platform Services team created pipeline templates for automation technologies supported on the Private Cloud platform.

**Note**: Supported technologies are available on the platform now and the Platform Services team has expertise with these technologies to help the product teams that use it. Teams can use any other automation technology outside of the platform, but the team might not have the expertise to support them if they need help

## Pipeline templates<a name="pipeline-templates"></a>

Any product teams working in the Silver and Gold clusters on the Private Cloud platform can use pipeline templates. For guides on getting started with each of the supported technologies, see the [Security Pipeline Templates](https://github.com/bcgov/security-pipeline-templates) repository.

## Automation technologies<a name="automation-technologies"></a>

Currently, the following technologies are available to product teams:
- [ArgoCD](https://github.com/BCDevOps/openshift-wiki/blob/b1a4e6db91932fd3f29705a5c8ee44983abf8763/docs/ArgoCD/argocd_info.md)
- [GitHub Actions](https://github.com/bcgov/security-pipeline-templates/tree/main/.github/workflows)
- [Openshift Pipelines (Tekton)](https://github.com/bcgov/security-pipeline-templates/tree/main/tekton)

While Jenkins is technically supported on the platform the Platform Services team highly highly discourages teams from using this technology as it's highly inefficient with the use of valuable platform resources. Over the next few months we'll be guiding the teams that currently use Jenkins to transition to a more modern and efficient technology such as those previously listed.

## Choose a technology<a name="choose-technology"></a>

Each team should make the final decision on which technology they want to use and may depend on their previous experience and comfort with each tool. The Platform Services team recommends the following, depending on your team's level of experience:

- If your team has limited experience with automation pipelines, the combination of Github Actions for builds and ArgoCD for deployments.

- For more mature teams with previous automation experience, OpenShift Pipelines is a good choice.

While teams can use GitHub Actions for both builds (CI) and deployments (CD), ArgoCD provides more control over the success of the deployment and brings many other benefits of the infrastructure as code/GitOps approach, such as:

- Observability

- Improved stability and consistency

- An improved security model

## Contribute to a pipeline template<a name="contribution"></a>

If you want to contribute to a pipeline template, you can fork a repository and add more steps to the templates or make any modifications to improve the template. Submit a pull request and tag any of the platform administrators for review.

---
Related links:
* [Security Pipeline Templates](https://github.com/bcgov/security-pipeline-templates)
* [ArgoCD](https://github.com/BCDevOps/openshift-wiki/blob/b1a4e6db91932fd3f29705a5c8ee44983abf8763/docs/ArgoCD/argocd_info.md)
* [GitHub Actions](https://github.com/bcgov/security-pipeline-templates/tree/main/.github/workflows)
* [Openshift Pipelines (Tekton)](https://github.com/bcgov/security-pipeline-templates/tree/main/tekton)
* [pipeline-templates](https://github.com/bcgov/pipeline-templates)
* [Pipeline template workflows](https://github.com/bcgov/pipeline-templates/tree/main/.github/workflows)
* [Tekton templates](https://github.com/bcgov/pipeline-templates/tree/main/tekton)

Rewrite sources:
* https://github.com/BCDevOps/openshift-wiki/blob/master/docs/HowTo/PipelineAutomation.md
---
