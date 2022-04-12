---
title: Start working in the BCGov GitHub organization

slug: start-working-in-bcgov-github-organization

description: Learn more about operating, and possibly maintaining, a GitHub Repository in Gov.

keywords: open source, GitHub, GitHub management, repository, repository management

page_purpose: Describes the different ways a user might want to use or maintain and GitHub project and the requirements

audience: developer

author: Jonathan Bond

content_owner: Shelly Han
---

# Start working in the BCGov GitHub organization

If you plan sharing code developed by or for the BC government, you must complete the [Open Content Assessment Checklist](./checklist.md) and get approval from your Deputy Minister. Deputy Ministers may choose to delegate this authority to Ministry Chief Information Officers (CIOs).

## On this page
- [Post existing code or projects](#post-existing)
- [Initiate new code or projects](#initiate)
- [Contribute to outside code or projects](#contribute)

The BC government follows the Open Development Standard, which outlines the following:
* [Minimum content requirements](./required-pages-for-github-repository.md): README, contributing file, code of conduct, and license
* Roles and responsibilities
* Basic mechanics of working in GitHub

Generally, GitHub projects fall under one of the three following categories, with different key considerations depending on the type.

## Post existing code or projects<a name="post-existing"></a>

Projects like this follow two basic approaches, but can vary.

* **Throw it over the wall**: You have code that you want to make it available because it might be useful to others. However, you don't want to make an open-ended commitment to maintain an active open-source project.

* **Create and run a sustainable project**: You have code that you want to make available and then run as an active project: accepting patches, soliciting code contributions, adding new maintainers, participating in user and developer forums, doing regular releases, and more.

In both cases, the basic steps to release the code are similar, while the implications for project management and resourcing are not. Key requirements in these scenarios include the following:

- Confirm your [authority to license](./license-your-project.md)

	Choose an open-source license and consult with the Intellectual Property Program (IPP) to make sure government has the right to release the code.

	If any of the code is from another open-source project, make sure you adhere to the existing licensing provisions and make sure the licence is compatible when you select a licence to apply to your project.

- Make sure there are no other intellectual property considerations

	These can include patent rights or trademarks in the code or documentation. Confirm that there are no restrictions on releasing the code or documentation imposed by legislation, policy or contracts.

- Assess any dependencies

	Check library dependencies, sample, or config data to make sure it's appropriate for release or is separated out, if needed.

If you are intending to maintain an active project, make sure to establish the appropriate processes and terms to manage contributions.

## Initiate new code or projects<a name="initiate"></a>

These are projects that you want to manage as an open-source, collaborative project.

- Choose an open-source licence and confirm your [authority to license](./license-your-project.md)
- Determine how contributions are made and managed and include this information in the contributor file in the repository.
- [Create the minimum required content](./required-pages-for-github-repository.md).
- Add a [Contributor Code of Conduct](http://contributor-covenant.org/) to your repository. This document lets people know that all are welcome to contribute, and that all who contribute pledge to make participation in the project a harassment-free experience for everyone. Include a code of conduct and provide a contact method (in the placeholder) so that people know how to report violations. Introduce the code of conduct in your `readme.md`.

## Contribute to outside code or projects<a name="contribute"></a>

There may be circumstances where it's useful and appropriate for employees to contribute to non-BC government repositories as a part of their work. In these cases, consider the following:

- Make sure contributions are relevant and the size and scope are consistent with your priorities. This may involve checking with your supervisor.
- Make sure the licensing provisions of the project you are contributing to are appropriate. For example, it's licensed under an OSI approved license and that you aren't required to assign copyright to the project.

	If the project requires you to sign a contributor agreement, get advice from Legal Services as to whether the terms are appropriate.

	If the project uses a reciprocal or "copyleft" license, such as GPL or Mozilla, make sure you understand the requirements for publishing any modifications you make to the code.

- Confirm your [authority to license](./license-your-project.md)

Employees can also contribute to non-BC government owned intellectual property rights outside their professional roles by using their personal email linked to their GitHub account.

---
Related links:
* [Open Content Assessment Checklist](./checklist.md)
* [Required pages for a GitHub repository](./required-pages-for-github-repository.md)
* [License your project](./license-your-project.md)

Rewrite sources:
* https://developer.gov.bc.ca/Code-Management/Approaches-to-CollaboratingContributing
* https://developer.gov.bc.ca/Code-Management/Github-Practices-in-Gov
---
