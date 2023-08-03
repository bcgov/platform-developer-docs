---
title: CI/CD pipeline templates for Private Cloud teams

slug: ci-cd-pipeline-templates

description: Describes continuous integration (CI) and continuous delivery (CD) pipeline automation and how teams can use it in their applications.

keywords: CI, CD, application, application tools, pipelines, pipeline templates

page_purpose: Gives an outline of pipeline automation and templates for teams that want to use them or contribute to them.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Ian Watts

sort_order: 1
---

# CI/CD pipeline templates for Private Cloud teams

As you develop your application for deployment to the BC Gov Private Cloud PaaS OpenShift platform, you should create a pipeline that automatically builds and tests your code so that your software delivery is efficient and secure. Use our pipeline templates to help you get started.

## On this page
- [Pipeline templates](#pipeline-templates)
- [Automation technologies](#automation-technologies)
- [Choose a technology](#choose-a-technology)
- [Contribute to a pipeline template](#contribute-to-a-pipeline-template)

To help teams that want to get started with pipeline automation, use the best security practices for pipeline development, or both, the Platform Services team created pipeline templates for automation technologies supported on the Private Cloud platform.

**Note**: Supported technologies are available on the platform, and the Platform Services team has expertise with these technologies to help the product teams that use it. Product teams can use any other automation technology outside of the platform, but the Platform Services team might not have the expertise to support them if they need help

## Pipeline templates

Any product teams working in the Silver or Gold clusters on the BC Gov Private Cloud PaaS can use pipeline templates. For guides on getting started with each of the supported technologies, see the [Security Pipeline Templates](https://github.com/bcgov/security-pipeline-templates) repository.

## Automation technologies

Currently, the following technologies are available to product teams:
- [ArgoCD](https://github.com/BCDevOps/openshift-wiki/blob/b1a4e6db91932fd3f29705a5c8ee44983abf8763/docs/ArgoCD/argocd_info.md)
- [GitHub Actions](https://github.com/bcgov/security-pipeline-templates/tree/main/.github/workflows)
- [OpenShift Pipelines (Tekton)](https://github.com/bcgov/security-pipeline-templates/tree/main/tekton)

While Jenkins is technically supported on the platform, the Platform Services team highly discourages teams from using this technology as it's inefficient with the use of valuable platform resources. Over the next few months we'll be guiding the teams that currently use Jenkins to transition to a more modern and efficient technology.

## Choose a technology

Each team should make the final decision on which technology they want to use and may depend on their experience and comfort with each tool. The Platform Services team recommends the following, depending on your team's level of experience:

- If your team has limited experience with automation pipelines, the combination of GitHub Actions for builds and ArgoCD for deployments.

- For more mature teams with previous automation experience, OpenShift Pipelines is a good choice.

While teams can use GitHub Actions for both builds (CI) and deployments (CD), ArgoCD provides more control over the success of the deployment and brings many other benefits of the infrastructure as code/GitOps approach, such as:

- Observability

- Improved stability and consistency

- An improved security model

## Contribute to a pipeline template

If you want to contribute to a pipeline template, you can fork a repository and add more steps to the templates or make any modifications to improve the template. Submit a pull request and tag any of the platform administrators for review.

## Related training content

The [OpenShift 201 training](/training-from-the-platform-services-team/) features content related to using pipelines. There is a related lab exercise and video demonstration [here](https://github.com/BCDevOps/devops-platform-workshops/blob/master/openshift-201/pipelines.md)

---
Related links:

* [Security Pipeline Templates](https://github.com/bcgov/security-pipeline-templates)
* [ArgoCD](https://github.com/BCDevOps/openshift-wiki/blob/b1a4e6db91932fd3f29705a5c8ee44983abf8763/docs/ArgoCD/argocd_info.md)
* [GitHub Actions](https://github.com/bcgov/security-pipeline-templates/tree/main/.github/workflows)
* [OpenShift Pipelines (Tekton)](https://github.com/bcgov/security-pipeline-templates/tree/main/tekton)
* [pipeline-templates](https://github.com/bcgov/pipeline-templates)
* [Pipeline template workflows](https://github.com/bcgov/pipeline-templates/tree/main/.github/workflows)
* [Tekton templates](https://github.com/bcgov/pipeline-templates/tree/main/tekton)

---
