---
title: Log in to OpenShift Web Console

slug: login-to-openshift

description: Describes how to login to the OpenShift console with your IDIR

keywords: security, privacy, IDIR, STRA, access, login, OpenShift, web console

page_purpose: Gives background and information on logging into the OpenShift console with your IDIR and the background on how it was set up.

audience: developer, technical lead

author: Jonathan Bond

content_owner: Cailey Jones

sort_order: 3
---

# Log in to OpenShift Web Console

Teams can log in to OpenShift with either a GitHub ID or IDIR. IDIR authentication is enabled in the Silver cluster of the OpenShift platform. You must have multi-factor authentication (MFA) enabled to log in with either GitHub or your IDIR. This access mechanism links to Azure Active Directory (AD). You get instructions on how to enable MFA for your IDIR account during onboarding.

You have to log in with IDIR into the OpenShift console before you can associate any role bindings with the IDIR account.

When you log in to the Silver cluster OpenShift console, you have the option of using GitHub or your Azure AD IDIR.

![Image of authorization options](https://user-images.githubusercontent.com/53879638/146621070-6d473a3d-289c-400e-86a7-947732441fac.png)

## Information for developers
GitHub accounts are still the default authentication mechanism for our developers.

We will update the [Platform Product Registry](https://registry.developer.gov.bc.ca/) to use IDIR user accounts and B.C. government email identifiers for product owners and technical leads to ensure that namespace administrative-level controls are tied to an account that we have more control over. There is not yet a target date for this change. Make sure all contractors listed as technical leads for projects on the platform have active IDIR accounts.

Some teams may choose to have all team members migrated to IDIR account use for OpenShift platform access. This isn't required.

We want teams to migrate their role bindings from their GitHub accounts to IDIR on their own, and de-provision the GitHub accounts, if necessary.

We're investigating IDIR security groups integration, but it's not in place yet. This requires a synchronization between our data centre active directory and the Azure Active Directory that is not fully in place yet.

We don't intend to leverage SSO integration for IDIR onto GitHub at this time. You'll still use GitHub accounts to access GitHub content.

**Note**: There won't be automated migration for the namespace access role bindings created for the GitHub ID to the IDIR accounts performed by the Platform Services team. Any such migrations would have to be done by product teams themselves.

If you have any questions or concerns about this change, post your question in [#devops-security channel](https://chat.developer.gov.bc.ca/channel/devops-security) in Rocket.Chat.

---
Related links:

* [Platform Product Registry](https://registry.developer.gov.bc.ca/)
* [#devops-security channel](https://chat.developer.gov.bc.ca/channel/devops-security)

---
