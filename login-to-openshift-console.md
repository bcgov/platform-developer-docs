---
  title: Login to the OpenShift Console with your IDIR

  description: Describes how to login to the OpenShift console with your IDIR

  keywords: security, privacy, IDIR, STRA, access, login, OpenShift

  page purpose: Gives background and information on logging into the OpenShift console with your IDIR and the background on how it was set up.

  audience: developer, technical lead

  author: Jonathan Bond

  content owner: Cailey Jones
---

# Login to the OpenShift Console with your IDIR

IDIR authentication is enabled in the Silver cluster of the Openshift Platform. This gives teams a choice to log into the Silver Cluster Openshift Console with either a GitHub ID or IDIR.

Multi-factor authentication (MFA) must be enabled on an IDIR account to use this access mechanism as it links to Azure Active Directory (AD). You can find instructions on how to enable MFA for your IDIR account here <!-- where? -->

You have to login with IDIR into the Openshift Console before you can associate any role bindings with the IDIR account.

When you login to the Silver Cluster Openshift Console, you have the option of using GitHub or your Azure AD IDIR.
![Image of authorization options](https://user-images.githubusercontent.com/53879638/146621070-6d473a3d-289c-400e-86a7-947732441fac.png)

## Information for developers <!-- is there a better heading for this? -->
GitHub accounts are still the default authentication mechanism for our developers.

We will update the [Platform Project Registry](https://registry.developer.gov.bc.ca/) to use IDIR user accounts and BC government email identifiers for product owners and technical leads to ensure that namespace administrative level controls are tied to an account that we have more control over. There is not yet a target date for this change. Make sure all contractors listed as tech leads for projects on the platform have active IDIR accounts.

Some teams may choose to have all team members migrated to IDIR account use for OpenShift platform access.  This isn't required.

We want teams to migrate their role bindings from their GitHub accounts to IDIR on their own, and deprovision the GitHub accounts, if necessary.

We're investigating IDIR security groups integration, but it's not in place yet. This requires a synchronization between our datacentre active directory and the Azure Active Directory that is not fully in place yet.

We don't intend to leverage SSO integration for IDIR onto GitHub at this time. You'll still use GitHub accounts to access GitHub content.

**Note**: There won't be automated migration for the namespace access role bingins <!-- is this a typo? --> created for the GitHub ID to the IDIR accounts performed by the Platform Services Team. Any such migrations would have to be done by product teams themselves. <!-- I'm not totally clear on what this sentence means. Can we reword to make it more verb-focused? -->

If you have any questions or concerns about this change, post your question in [#devops-security channel](https://chat.developer.gov.bc.ca/channel/devops-security) in RocketChat and tag Nick Corcoran, our Platform Security Architect.

For more information, see [BC Government OpenShift DevOps Security Considerations](https://developer.gov.bc.ca/BC-Government-OpenShift-DevOps-Security-Considerations).

---
Rewrite sources:
* https://developer.gov.bc.ca/IDIR-Login-(via-Azure-AD)-for-OpenShift-Console
---
