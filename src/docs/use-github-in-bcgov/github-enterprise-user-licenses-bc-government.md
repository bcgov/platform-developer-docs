---
title: GitHub Enterprise user licences in the BC government

slug: github-enterprise-user-licenses-bc-government

description: Describes the benefits of GitHub Enterprise user licences and how to access them.

keywords: GitHub, Github Enterprise, closed source, private repository, private organization, licence, license, user licence, user license

page_purpose: Discusses why you might want to use a GitHub Enterprise user licence and how to request, access, and pay for the users.

audience: technical lead, product owner

author: Jonathan Bond

content_owner: Olena Mitovska

sort_order: 4
---

# GitHub Enterprise user licences in the B.C. government

All code by B.C. government teams should be open source by default. If you have closed-source code and still want to use GitHub, you can work temporarily in a private repository under the GitHub Enterprise licence.

For more information on our GitHub organizations and their uses, see [B.C. government organizations in GitHub](/bc-government-organizations-in-github/).

## On this page
- [Benefits of a GitHub Enterprise user licence](#benefits)
- [Enterprise account ownership](#ownership)
- [Request GitHub Enterprise user licences](#request)
- [Access the GitHub Enterprise account](#access)
- [Pay for the GitHub Enterprise user licences](#payment)

## Benefits of a GitHub Enterprise user licence<a name="benefits"></a>

The enterprise user licence offers various features over the Free and Teams version. To find out more on the differences in features and pricing, see [Pricing](https://github.com/pricing).

## Enterprise account ownership<a name="ownership"></a>

The GitHub Enterprise account is owned by OCIO and managed by the Platform Services team. Ministries own GitHub organizations linked to the B.C. government’s GitHub Enterprise accounts and the private repositories within their organizations.  

User licenses for accessing the private repositories come from a central pool under the GitHub Enterprise account and must be purchased for each user that needs access to the private repositories in the ministry’s private organizations.  Management of this pool of seats is done in partnership with each sector or ministry purchasing their own allocated seat count.

When your private organization is linked to the GitHub Enterprise account certain settings are automatically enabled or disabled. For example, the ability to create public repositories within this private organization is removed to fall in line with all Provincial open-source code remaining in `bcgov`. Other features include the following:
* Two-factor authentication is mandatory
* GitHub Actions is enabled for all
* Code Dependency Insights is enabled for all organizations linked to the GitHub Enterprise account

## Request GitHub Enterprise user licences<a name="request"></a>

Contact Software Central Management at SoftwareCentral.Management@gov.bc.ca and cc Dean Picton (Dean.Picton@gov.bc.ca). Use the subject line "GitHub Enterprise Request" and send the following information:  

* Private GitHub organization name and whether you need a new organization created or are linking an existing private organization  

* GitHub IDs of the organization administrators

* Number of user licenses needed. If you're transferring a GitHub organization to Enterprise, request as many user licenses as you have organization members.

## Access the GitHub Enterprise account<a name="access"></a>

Each ministry has GitHub administrators that manage user licences purchased by the ministry and assign individual users to the licences. All license management and licence-to-user assignment must go through ministry account administrators.   

1. Your ministry’s GitHub administrator creates a private organization for your ministry, if it doesn’t exist already, and links it to the GitHub Enterprise account.

2. Submit a request to Software Central Management to purchase the desired number of user licences.

3. Once the order is processed and the user licenses have been added to the Province’s GitHub Enterprise account, your ministry’s GitHub administrator adds your users to the GitHub Enterprise account and to the ministry’s private organization.

These users have access to all features available in GitHub Enterprise within their private organization.

## Pay for the GitHub Enterprise user licences<a name="payment"></a>

Software Central Management handles your purchase order, with billing back to your expense authority. The ministry is billed monthly for the GitHub Enterprise user licenses until Software Central gets a request asking to cancel the user licenses.

---
Related links:
* [BC Government Organizations in GitHub](/bc-government-organizations-in-github/)
* [Pricing](https://github.com/pricing)

Rewrite sources:
* https://github.com/BCDevOps/openshift-wiki/blob/master/docs/HowTo/RequestGitHubEnterpriseUserLicense.md?plain=1
---
