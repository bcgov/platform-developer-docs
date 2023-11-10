---
title: Vault secrets management

slug: vault-secrets-management-service

description: HashiCorp Vault is available for secrets management in the BC Government's OpenShift private cloud platform.

keywords: 

page_purpose: Provides information relevant to the Vault secrets management service to product teams, including description of functions and how to work with this service.

audience: developer, technical lead

author: Matt Spencer 

content_owner: Cailey Jones

sort_order: 4
---

# Vault secrets management

The B.C. government Vault Secrets Management tool, based on the HashiCorp Vault product, provides a tool for securely accessing secrets. A secret is anything that you want to tightly control access to, such as API keys, passwords, or certificates. Vault provides a unified interface to any secret, while providing tight access control and recording a detailed audit log.

You can also still use Kubernetes Secrets backed by ETCD. It is recommended that Kubernetes Secrets be reserved for non-secrets (e.g. environment variables).

Non-secrets may be stored in Vault if desired.

## On this page
- [Features and functions](#features-and-functions)
- [Eligibility and prerequisites](#eligibility-and-prerequisites)
- [How to request access](#how-to-request-access)
- [Availability](#availability)
- [How do I get help?](#how-do-i-get-help)
- [What does it cost?](#what-does-it-cost)
- [Support roles, processes, communications (platform operations)](#support-roles-processes-communications-platform-operations)
- [Service delivery](#service-delivery)

## Features and functions

Users of this service gain access to the following:

### Secure secret storage
Arbitrary key/value secrets can be stored in Vault. Vault encrypts these secrets prior to writing them to persistent storage, so gaining access to the raw storage isn't enough to access your secrets.

### Dynamic secrets
Vault can generate secrets on-demand for some systems, such as Azure or SQL databases. For example, when an application needs to access a PostgreSQL database, it asks Vault for credentials, and Vault will generate a keypair with valid permissions on demand. After creating these dynamic secrets, Vault will also automatically revoke them after the lease is up. 
[Learn more about the PostgreSQL database secrets engine](https://www.vaultproject.io/docs/secrets/databases/postgresql).


### Data encryption:
Vault can encrypt and decrypt data without storing it. This allows security teams to define encryption parameters and developers to store encrypted data in a location such as SQL without having to design their own encryption methods.

### Leasing and renewal:
All secrets in Vault have a lease associated with them. At the end of the lease, Vault will automatically revoke that secret. Clients are able to renew leases via built-in renew APIs.

### Revocation:
Vault has built-in support for secret revocation. Vault can revoke not only single secrets, but a tree of secrets, for example all secrets read by a specific user, or all secrets of a particular type. Revocation assists in key rolling as well as locking down systems in the case of an intrusion.

## Eligibility and prerequisites

Your team is provisioned a Vault service account for each environment (dev, test, prod, and tools) through the automation backing the [Platform Services Registry](https://registry.developer.gov.bc.ca/public-landing). Each ProjectSet created in the registry can have up to two technical contacts associated with it. These technical contacts are given write access to Vault and can manage secrets within a ProjectSet's two mount points (nonprod, prod).

## How to request access
You don’t need to request access to Vault. If you have a project set, you have at least one technical contact who can access Vault through the CLI or UI, and you have a Kubernetes Service Account associated with your project set's Vault Mount Points in each namespace environment. (dev, test, prod, and tools).

Service Accounts take the form of `licensePlate-vault`

Here is the [step-by-step guide on integrating Vault](../security-and-privacy-compliance/vault-getting-started-guide.md) into your application on OpenShift.

## Availability

The Vault Secrets Management tool is deployed in a high-availability configuration within the highly available Gold clusters in OpenShift. This service is available 24/7 with best effort to restart failed systems.

## How do I get help?

The best source of help is the vibrant community of product teams using Vault for their projects.

You can find this highly talented and knowledgeable group in the [#devops-vault channel on Rocket.Chat](https://chat.developer.gov.bc.ca/channel/devops-vault).

For help beyond this contact one of the Vault administrators via the [#devops-sos channel on Rocket.Chat](https://chat.developer.gov.bc.ca/channel/devops-sos).

## What does it cost?

There is no charge for this service.

## Support roles, processes, communications (platform operations)

The team supporting this service administers the Vault application and its supporting services.

Vault interfaces with Kubernetes services to provide authentication via service accounts.

Rocket.Chat is the primary mode of communication. Specifically, the [#devops-vault](https://chat.developer.gov.bc.ca/channel/devops-vault) channel should be used to engage the community for best practices, configuration and troubleshooting questions.

For cluster wide service notifications that may impact Vault monitor, use the [#devops-alerts channels in Rocket.Chat.](https://chat.developer.gov.bc.ca/channel/devops-alerts)

For teams without Rocket.Chat access or to escalate a question or concern, contact us by email at [PlatformServicesTeam@gov.bc.ca](mailto:PlatformServicesTeam@gov.bc.ca). 

## Service delivery

### Request workflows

There is no onboarding to use Vault.

As part of project onboarding, Kubernetes service accounts are generated for your project namespaces and these service accounts are used for integrating team applications with Vault.

Product teams can choose to use Vault or ETCD backed Kubernetes Secrets, but it is recommended that Vault be used for secrets.

### Change management
Any changes to the Vault Secrets Management tool will be communicated via #devops-vault and #internal-devops-vault Rocket.Chat channels. For major service update, the Vault Operations team will reach out to product owners for notice.

### Service improvements

Vault Secrets Management improvements including system upgrades, feature integration and issue fixing. The Vault Operations team will be conducting the operation on a scheduled time, with advanced notice in the #devops-vault Rocket.Chat channel. If disruption or downtime is expected during service improvement, the team will discuss on maintenance time in the channel to minimize effects.

### Service level
To be determined.

### Security reviews

An STRA for Vault has been completed by the Platform Services team.

---
Related links:

- [Vault getting started guide](../security-and-privacy-compliance/vault-getting-started-guide.md)
- [Security best practices for apps](../security-and-privacy-compliance/security-best-practices-for-apps.md)
---
