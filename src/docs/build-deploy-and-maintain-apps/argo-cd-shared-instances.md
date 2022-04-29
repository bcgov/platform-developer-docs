---
title: Argo CD shared instances

slug: argo-cd-shared-instances

description: Describes shared instances of Argo CD and how teams can use them.

keywords: argo cd, instances, argo cd instances, continuous delivery, OpenShift, OpenShift project, namespace, OpenShift namespace

page_purpose: Discusses Argo CD design, configuration, and access for product teams.

audience: developer

author: Jonathan Bond

content_owner: Ian Watts
---

<!-- NOTE: This page was in the Documize protected space. -->

# Argo CD shared instances

[Argo CD](https://argo-cd.readthedocs.io/en/stable/) is a declarative, GitOps continuous delivery tool currently used in the DevExchange OpenShift clusters. Only Platform Services uses the existing Argo CD instance. It operates on cluster-level resources.

A new Argo CD instance is available to project teams that are interested in using it to control the deployment of their applications.

## On this page

- [Design](#design)
- [Configuration](#config)
- [Access](#access)

## Design<a name="design"></a>

A shared instance of Argo CD exists in each OpenShift cluster. Project teams that request access to Argo CD are given their own project. There is a one-to-one relationship between Argo CD projects and OCP project sets/licence plates (`tools`, `dev`, `test`, and `prod` namespaces). Teams can configure as many applications as they need and deploy them to any of the OCP namespaces in their project set. Each app/environment combination is configured as a separate application in Argo CD.

**Note:** Application names must be unique across all projects in a cluster. For example, two teams can't both have an application named `web-app`. Use a descriptive name for each application, followed by the environment, such as `somewebapp-dev`.

Each team gets a new GitHub repository so they can manage their application manifests. Teams manage multiple applications from this repository, each having its own directory or branch.

## Configuration<a name="config"></a>

### Source repositories
Application code resides in existing repositories. The new repo is for the YAML manifest files that are consumed by Argo CD. The project is limited to using this one repo for Argo CD configurations.

### Namespaces
Each project can deploy applications to any of the OpenShift namespaces in their project set (`tools`, `dev`, `test`, and `prod`). It's not be possible for a project to use Argo CD to deploy an application to any other namespace.

### Allowed resources
Projects don't have access to alter any cluster-level resources, only namespace-level resources.

## Access<a name="access"></a>

Access to an Argo CD project is based on membership in a Keycloak group unique to that project. The team can manage their Keycloak group membership themselves with a `CustomResourceDefinition` defined in a YAML file in their own GitHub repository. An operator consumes these YAML files and maintains Keycloak group membership so that teams don't have to make a request to the Platform Services team.

---
Related links:
* [Argo CD](https://argo-cd.readthedocs.io/en/stable/)

Rewrite sources:
* https://docs.developer.gov.bc.ca/s/bn6v0ac6f9gue7hhirbg/protected-platform-services/d/c4a1sna1tev0e75glrb0/argocd-shared-instance-overview
---
