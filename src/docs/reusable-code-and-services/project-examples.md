---
title: Project examples

slug: project-examples

description: 

keywords: reusable services, plugins, tools, services, project examples

page_purpose: Provide examples built with OpenShift and tools with Platform Services 

audience: developer, technical lead

author: Shelly Han

content_owner: Olena Mitovska

sort_order: 1
---
# Project examples
Last updated: **February 14, 2024**

This is a dedicated space where we showcase the innovative projects crafted with OpenShift and various tools within the Platform Services ecosystem. Here, we invite you to explore the projects  and learn about the key technologies employed and the invaluable lessons learned during their development.

We believe in the community of shared knowledge, where developers can not only celebrate successes but also learn from setbacks and obstacles.

By sharing these examples, we aim to contribute to the growth and learning of fellow developers. We believe that collaboration and knowledge-sharing are essential pillars for the advancement of technology!

Your experiences and contributions matter, and by sharing them, you not only showcase your team's achievements but also inspire and empower others in the ever-evolving landscape of technology. 

If you would like to showcase your project as well, contact us a [PlatformServicesTeam@gov.bc.ca](mailto:platformservicesteam@gov.bc.ca)

## On this page
* **[Platform Services Product Registry](#platform-services-product-registry)**
* **[Single Sign On (SSO) Service](#single-sign-on-sso-service)**
* **[Related pages](#related-pages)**

---
---
## Platform Services Product Registry
---
### Project overview
 This application helps allocate OpenShift namespace environments in BC Gov. It responds to project team requests, it simplifies the handling of new and update requests, and it also ensures scalability and flexibility. Key features include a user-friendly request management system, automated provisioning, and comprehensive notification and monitoring capabilities.

### Key technologies used

#### Applications
 
- [Next.js](https://nextjs.org/): Utilized for crafting full-stack web applications, Next.js extends React capabilities and integrates powerful Rust-based JavaScript tools, heightening performance by delivering fully-rendered HTML to the client.
 
- [Tailwind UI](https://tailwindui.com/): Harnessed for swift UI development, Tailwind UI's pre-built HTML snippets streamline design workflows by enabling direct style additions to HTML elements.
 
- [React Hook Form](https://react-hook-form.com/): Simplifies complex form building by reducing code volume and unnecessary re-renders.
 
- [Zod](https://zod.dev/): A TypeScript-first schema declaration and validation library leveraged for its developer-friendly features and elimination of duplicative type declarations.
 
These technologies foster rapid iterative development, polished user interfaces, and a user-centric experience for application development.
 
#### Database and ORM
 
- [MongoDB](https://www.mongodb.com/): Selected for its flexible schema, scalability, high performance, rich querying, automatic failover, and robust community support, making it an ideal choice for diverse applications.
 
- [Prisma](https://www.prisma.io/): Utilized for its streamlined development processes, error reduction, and enhanced maintainability, enabling developers to focus more on feature development rather than managing database interactions.
 
#### Run-time package version manager
 
- [asdf](https://asdf-vm.com/): Employed for managing multiple runtime versions, simplifying dependency management, and ensuring consistency across development environments.
 
#### Linters and formatters
 
- [pre-commit](https://pre-commit.com/): Employed for managing and maintaining multi-language pre-commit hooks to enforce project standards and best practices, reducing the likelihood of bugs or inconsistencies.
 
- [ESLint](https://eslint.org/): A static code analysis tool ensuring adherence to coding conventions and identifying problematic patterns in JavaScript/Typescript code.
 
- [ShellCheck](https://www.shellcheck.net/): Utilized for static analysis of shell scripts, suggesting improvements and ensuring safer, more efficient, and portable script code.
 
#### Testing framework
 
- [Jest](https://jestjs.io/): Employed for JavaScript code testing, providing built-in mocking, assertion utilities, and code coverage analysis for efficient and intuitive testing.
 
- [Cypress](https://www.cypress.io/): Utilized for end-to-end testing of web applications, offering automatic waiting, real-time reloading, and an interactive test runner for seamless test creation and debugging.
 
#### Deployment tools
 
- [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions): A robust CI/CD platform automating various tasks and processes within GitHub repositories, including building, testing, and deploying applications.
 
- [GitHub Packages](https://docs.github.com/en/packages/quickstart): A package hosting service integrated with GitHub repositories, facilitating version control, access control, and dependency management for software packages.
 
- [Helm](https://helm.sh/docs/): A Kubernetes package manager simplifying deployment, management, and scaling of applications in Kubernetes clusters.
 
- [release-it](https://github.com/release-it/release-it): An open-source command-line interface (CLI) tool designed to automate the release process of software projects. It streamlines tasks such as versioning, changelog generation, tagging, and publishing releases to version control systems.
 
#### Configuration of code
 
- [Terraform](https://www.terraform.io/): An open-source IaC tool automating provisioning and management of infrastructure resources across various cloud providers, ensuring standardized and efficient deployment with seamless peer review processes and change history tracking within the source control platform.

### Lessons Learned: Challenges and solutions

#### Peer review optimization
 
The team faced a big challenge in improving the process of reviewing and adding new changes to the main branch. 

We identified opportunities for improvement by implementing checks to ensure code quality and seamless integration with the deployment process. We made it easier by using the `pre-commit` tool to check the quality of the code in a local environment before committing the changes as well as extending these checks to our CI pipelines. This saved our colleagues time and effort when reviewing the code along with linting and formatting issues. 

After we started using these automated checks, the peer review process became faster and we felt more confident in making changes to the main branch and deploying them to the development environment. This experience highlighted the importance of continuous integration checks, emphasizing their necessity for ongoing improvement as the project evolves.

#### Container image management and deployment
 
Navigating container image management and deployment within our continuous deployment process presented challenges, particularly in ensuring efficient building and publishing while maintaining control over image usage. 

This experience showed  the importance of working with available tools effectively to overcome such hurdles. By harnessing `GitHub Packages` and `GitHub Actions`, we streamlined our deployment pipelines, enabling seamless building, tagging, and storage of container images. 

Additionally, adding `Helm charts` helped intuitive deployment of updated Kubernetes templates, enhancing overall deployment efficiency. This journey emphasized the value of exploring and leveraging existing tools and features to optimize workflows and address challenges in software development projects.
 
#### Ensuring container consistency in production deployments from testing environment
 
 It was difficult to keep the testing and production environments consistent. 

Discrepancies in container images built for production, despite originating from the same codebase as those tested, posed a risk of introducing unexpected issues and compromising production stability.  Even if the codebases were the same, variations during container image generation could lead to subtle differences, which could disrupt deployments. 
 
To solve this, we implemented a solution where we referenced the container images built for the testing environment in production. This reduced the potential for discrepancies during deployment, making the production environment more reliable and consistent. 
 
#### Automated change log generation
 
To maintain an accurate record of application changes, we implemented tag-based deployment extensively across upper environments. 

This approach offers us the flexibility to roll back to previous application versions by updating container image tags and facilitates the generation of change logs based on these tags. We automated this process using tools like `conventional-changelog-cli` and `release-it`.  

Whenever a new tag is generated for testing and production environments after changes are verified, the CHANGELOG.md file is automatically updated by the tool. This way, our change log remains up-to-date reflecting all modifications made to the application.
 
#### Infrastructure configuration as code
 
 We faced a challenge when incorporating changes into the infrastructure and other managed services, particularly integrating the change process into the peer review workflow and maintaining a clear history in the repository. 

To solve this, we used `Terraform` as a to manage resources in our infrastructures, including services like `Keycloak` and `Sysdig`. We could define and track changes to infrastructure configurations in code, this made it easy to integrate changes into the peer review process and keep a transparent history of modifications in the repository. 

#### Team convention meetings and codebase consistency
 
Without team conventions, the codebase can become inconsistent and cause delays when individuals work on it and when it is reviewed by peers. To fix this problem, we have regular team meetings to create and write down agreed-upon conventions. This lets us talk about common problems with deploying and make the process smoother. After these meetings, we improve our CI checks and write down the conventions to make sure we always follow them. By doing this, we create a better development environment and speed up the deployment process. 

### Our useful references
- [Git Pre-commit Hooks](https://github.com/bcgov/platform-services-registry/blob/main/.pre-commit-config.yaml)
- [CI/CD Pipelines](https://github.com/bcgov/platform-services-registry/tree/main/.github/workflows)
- [Helm Charts](https://github.com/bcgov/platform-services-registry/tree/main/helm)
- [Terraform Scripts](https://github.com/bcgov/platform-services-registry/tree/main/terraform)
- [Documentation](https://github.com/bcgov/platform-services-registry/tree/main/docs)
 
---
--- 
## Single Sign On (SSO) Service
--- 
### Project overview
The Pathfinder Single Sign On (SSO) team builds products and services that enable government digital delivery teams to get single sign-on login options for their applications. These are applications for businesses and residents of British Columbia.

The Pathfinder SSO team uses a DevOps continuous improvement approach towards its [Common Hosted Single Sign On Application](https://bcgov.github.io/sso-requests) and support its custom realm clients. The agile team uses the agile methodology, human-centred design, open source languages and frameworks, and RedHat Keycloak Single Sign On (standard protocols like OAuth 2.0, OpenID Connect, SAML 2.0.)

### Architecture overview

#### RedHat Single Sign On Product with keycloak technology

We have three environments (dev, test, and prod) and each one has its own keycloak instance. All three keycloak instances are in environment specific namespaces in the Private Cloud hosted in Kamloops Gold Data center. 

We do also have a Disaster Recovery (DR) site hosted in Calgary GoldDR Data center, which ensures service continuity in case of any disaster or calamity. We have setup a data replication process to maintain the data consistency between Keycloak instances hosted in Gold and GoldDR datacenters, which ensures no data loss for the failover to DR site, find more details about [switchover logic and the gslb](https://github.com/bcgov/sso-switchover-agent/blob/main/docs/switchover-logic-and-the-gslb.md) on how we have achieved the automation to failover to DR site in case of any disaster or calamity.

#### Common Hosted Single Sign-on (CSS)

Our front-end is hosted on GitHub pages and the backend is deployed in AWS as a set of Lambda functions that connect to AWS RDS for the data persistence. All the lambdas are protected by AWS API Gateway, which provides an API Endpoint that is used by the UI to send requests. We have implemented IAC using terraform to update these resources and maintain the state in our AWS S3 buckets.


### Key technologies used
<!-- Highlight the main technologies, frameworks, or programming languages that powered your project. -->

The Pathfinder Single Sign On Services uses:

- RedHat SSO, aka Keycloak, which is an open-source Identity and Access Management solution aimed at modern applications and services. It makes it easy to secure applications and services with little to no code. 

  This includes:

  - Private Cloud Openshift Platform - Gold and GoldDR clusters
  - Java (as the primary language of KeyCloak)
  - Helm for DevOps manifest management
  - Patroni Postgres Database (including backup container)
  - Python
  - GitHub registry
  
- Common Hosted Single Sign-on (CSS):
  - Next.js, Typescript
  - GitHub (pages, actions)
  - Terraform
  - CHES Email Service
  - deployed in Public Cloud (AWS)
  - IDIM/BCeID Web Service for authentication

- Realm registry:
  - Next.js, Typescript
  - hosted on Azure Web Service

- Monitoring:
  - Grafana, Loki, Promtail
  - cronjobs
  - Uptime.com and Sysdig

- Alerting and communication:
  - MSTeams and RocketChat
  - Uptime.com and  OpsGenie

### Lessons Learned: Challenges and solutions
We strive to deliver value for our customers. We've focused the last few years on system stability and reliability. We offer business continuity aka disaster recovery for our service. Learn more about our [service levels](https://github.com/bcgov/sso-keycloak/wiki/Alerts-and-Us#service-levels).

### Our useful references

Below are some of our main repositories:

- [bcgov/sso-requests](https://github.com/bcgov/sso-requests): The request process workflow tool for the RedHat SSO Dev Exchange service (github.com) – CSS (Common Hosted Single Sign On)
- [bcgov/sso-keycloak](https://github.com/bcgov/sso-keycloak) – RedHat SSO Keycloak
- [bcgov/sso-realm-registry](https://github.com/bcgov/sso-realm-registry) – SSO Realm Registry

---
---
<!-- 
Use templates below to continue adding projects: 

## Project C
### Project overview
### Architecture overview (if available)
### Key technologies used
### Lessons Learned: Challenges and solutions
### Our useful references
)
---
---
## Project D
### Project overview
### Architecture overview (if available) 
### Key technologies used
### Lessons Learned: Challenges and solutions
### Our useful references
---
---
-->
 
## Related pages 
* [Reusable services list](/reusable-services-list/)

