---
title: License your GitHub repository

slug: license-your-github-repository

description: Describes licence guidelines and the different types of licences used for GitHub repositories

keywords: licence, license, apache 2.0, BC OGL, Creative Commons, Affero, repository management, repository best practices

page_purpose: Outlines how to choose and use a licence for your project and describes the requirements around licensing

audience: developer, technical lead

author: Jonathan Bond

content_owner: Olena Mitovska, Nick Corcoran

sort_order: 9
---
# License your GitHub repository

Licences help you manage and share intellectual property for code and materials on GitHub. If you want to consume, share or contribute to anything in GitHub, you have to understand requirements associated with the relevant licence.

## On this page

- [Licence guidelines](#licence-guidelines)
- [Authority to license](#authority-to-license)
- [Choose a licence](#choose-a-licence)
- [Apply the licence to your project](#apply-the-licence-to-your-project)

## Licence guidelines

Note if the licence attached to material restricts modification or redistribution of the content. If a licence isn't attached to content, assume that it's "all rights reserved" and can't be used without the express permission of the copyright owner.

### Contribute to a project

If you want to contribute to an existing, outside project, make sure you understand the applicable licence and contributor requirements. If the project needs copyright assignment or a contributor agreement, contact the Legal Services Branch before taking any action.

### Initiate a project

If want to initiate a project or release previously created materials, be aware that the Province can only license rights that it is in a legal position to grant to others.

The Province’s intellectual property rights must be, at a minimum, equal to the rights under which the content will be licensed to third parties. Four open licences are approved for use that likely cover the majority of projects coming forward:

## Authority to license

The Intellectual Property Program (IPP) must approve licences of B.C. government owned intellectual property unless a ministry has either specific legislative authority or Treasury Board approval that lets them license the intellectual property rights of the Province to third parties. When IPP is the authority for the licensing, you work with IPP to find the best fit to meet the licensing needs of the project.

IPP examines the development history of the content, which can take the form of a conversation. Initial questions include the following:

- Is the content created solely by B.C. government employees?
- Does the content contain only content owned by the B.C. government? Have you made sure that it doesn't contain any third-party content?
- Can you confirm that there are no terms of use or exclusive licensing arrangements that prohibit the Province from posting and licensing the content on GitHub?

### Preferred licenses

- [Apache 2](https://www.apache.org/licenses/LICENSE-2.0) for publishing code.
- [Creative Commons International 4.0 (CC BY)](https://creativecommons.org/licenses/by/4.0/) for other documentation, artistic resources and educational material.
- [Open Government Licence - BC (OGL-BC)](https://www2.gov.bc.ca/gov/content/data/open-data/open-government-licence-bc) for making government generated and owned data available to the public.
- [Affero General Public Licence (AGPL)](https://www.gnu.org/licenses/agpl-3.0.en.html) for works already containing that licence or for which maintaining open access to any modifications is critical.

Use these licences, as they are widely accepted, and follow a consistent approach to licensing. This increases efficiency for both developers and consumers.

If your project is better suited to a different licence, discuss your requirements with the IPP. They can help answer your questions and advise on your need for any other legal or risk management advice.

## Choose a licence

The following overview provided is intended to inform, not replace, the licensing review for each project. If you think you need to engage with the Intellectual Property Program, send a request to the IPP Manager

![A flowchart that helps you choose a licence](../../images/licence-chart.png)

If your project is related to a community that typically uses a different licence than one of the preferred licences described above, or if you have any questions about which licence best applies to your project, contact IPP.

![A flowchart to outline code preparation for GitHub](../../images/github-code-preparation-chart.png)

## Apply the licence to your project

Place the licence file for your project in the repository before you do anything else. The default license for code repositories is Apache 2.0.

Use the following boiler-plate text in the comments header of every source code file, as well as the bottom of your README.md:

    Copyright 2019 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

For repositories that are made up of docs, wikis or other non-code files, the default licence is Creative Commons Attribution 4.0 International. It should look like this at the bottom of your README.md:

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">YOUR REPO NAME HERE</span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">the Province of British Columbia</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.

The code for the Creative Commons 4.0 footer looks like this:

    <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons Licence"
    style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br /><span
    xmlns:dct="http://purl.org/dc/terms/" property="dct:title">YOUR REPO NAME HERE</span> by <span
    xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">the Province of British Columbia
    </span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
    Creative Commons Attribution 4.0 International License</a>.
---
Related links:

- [Apache 2](https://www.apache.org/licenses/LICENSE-2.0)
- [Creative Commons International 4.0 (CC BY)](https://creativecommons.org/licenses/by/4.0/)
- [Open Government Licence - BC (OGL-BC)](https://www2.gov.bc.ca/gov/content/data/open-data/open-government-licence-bc)
- [Affero General Public Licence (AGPL)](https://www.gnu.org/licenses/agpl-3.0.en.html)

---
