---
title: Image and artifact management with Artifactory

slug: image-artifact-management-with-artifactory

description: Discusses available Artifactory features and management

keywords: Artifactory, images, artifact, best practices, Artifactory management, repositories, projects, service account

page_purpose: Describes features at a high level and links to other useful pages with information on Artifactory

audience: technical lead, developer

author: Jonathan Bond

content_owner: Cailey Jones

sort_order: 5
---

# Image and artifact management with Artifactory
Last updated: **January 29, 2024**

JFrog's Artifactory, a system for storing artifacts, is now accessible to B.C. government development teams constructing cloud-native applications on the OpenShift platform.

For more information on Artifactory from JFrog, see the [Artifactory documentation](https://www.jfrog.com/confluence/site/documentation).

Use Artifactory to retrieve artifacts for your application. It supports all major package types, including Docker images, Helm charts, NPM packages, and more. Explore [Package Management](https://www.jfrog.com/confluence/display/JFROG/Package+Management) for further insights.

We've deployed Artifactory in a highly available configuration within the B.C. government OpenShift cluster. The service operates 24/7, with a commitment to restarting failed systems. Requests for Artifactory project requests are addressed during standard business hours.

There is no cost associated with using Artifactory.

## On this page
- **[Remote (caching/proxy) repository access](#remote-cachingproxy-repository-access)**
- **[Private repositories](#local-private-repositories)**
- **[Xray artifact scanning](#xray-artifact-scanning)**
- **[Security reviews](#security-reviews)**
- **[Artifactory support, processes, and communications](#artifactory-support-processes-and-communications)**
- **[Service improvements and disruptions](#service-improvements-and-disruptions)**
- **[Related pages](#related-pages)**
---

## Remote (caching/proxy) repository access

Remote repositories serve as caches/proxies for all major public artifact repositories/registries and several private repositories/registries where B.C. government owns licensed access. These repositories cache artifacts that are pulled through them, reducing build time and network traffic. The Platform Team encourages any team on the OpenShift platform to make use of these remote repositories for pulling artifacts from public registries such as DockerHub, NPM and PyPi. Artifactory also provides easy access to RedHat's private image registries.

Access to remote (caching) repositories is available by default to anyone in the Silver, Gold or Emerald clusters. You can learn more about how to make use of these remote repositories in our [Pull artifacts from Artifactory](../build-deploy-and-maintain-apps/push-pull-artifacts-artifactory.md) documentation.

### Which remote registries are available through Artifactory?

Head over to [the Artifactory Web Console](https://artifacts.developer.gov.bc.ca) and log in with your GitHub or IDIR account. Once you're logged in, navigate to the "Artifactory" section on the left menu, and select "Artifacts" to see a complete list of all repositories available to you. This list will include all remote repositories, as well as a federated repository called `bcgov-docker-local`, which contains images provided by the Platform Team for your use. 

Feel free to explore the contents of each repository by opening them to browse the stored artifacts. Keep in mind that the remote repositories will show only the artifacts/tags currently cached in Artifactory. It's important to note that you can pull any artifact directly from the source registry, even if it doesn't currently show up in Artifactory. The displayed artifacts are limited to those that have been previously pulled through Artifactory at least once.

If there's a particular public repository you'd like to be cached through Artifactory but don't currently see it, reach out to the Platform Services team. They can provide information on adding the specific repository to Artifactory.

## Artifactory Projects and private repositories

Artifactory Projects are spaces of quota-limited storage where teams have full control. This lets teams create their own private repositories in Artifactory where they can push and pull their own artifacts of any type. It also allows teams to control access to these repositories, similar to the way teams control access to their own OpenShift namespaces.

Once your team has an Artifactory Project, you can create your own local repositories as you require. For more information, see [Setup an Artifactory project and repository](../build-deploy-and-maintain-apps/setup-artifactory-project-repository.md).

## Xray artifact scanning

Xray is an add-on service to Artifactory that provides security scanning for all objects in Artifactory. This includes any objects that have been cached in Artifactory through the remote repositories and all artifacts pushed to any private repositories created by individual teams. Teams are able to create and review security reports on artifacts in their private repositories.

* Scanning artifacts is easy – just set up a private repository in Artifactory
* Our amazing resident security expert can easily have access to the scan reports for your artifacts if you need help with them
* Secure all your images, especially those intended for production, without imposing extra burden on your developers

## Security reviews

The Privacy Impact Assessment (PIA) and Security Threat Risk Assessment (STRA) for Sysdig Monitor have been finalized. To obtain these assessments, please send a request to PlatformServicesTeam@gov.bc.ca.

## Artifactory support, processes, and communications

The team responsible for this service manages the Artifactory application, its associated database, and the S3 storage system housing the packages uploaded to Artifactory.

Your best source for support, configuration and best practices is the developer community that uses Artifactory for their projects. Check out the [`#devops-artifactory` channel on Rocket.Chat](https://chat.developer.gov.bc.ca/channel/devops-artifactory). Service changes are also posted here.

In case of an emergency or outage, reach out to one of the Artifactory administrators through the [`#devops-sos` channel on Rocket.Chat](https://chat.developer.gov.bc.ca/channel/devops-sos).

For cluster-wide service notifications that could impact Artifactory, monitor the [`#devops-alerts` channel in Rocket.Chat](https://chat.developer.gov.bc.ca/channel/devops-alerts).

## Service improvements and disruptions

Artifactory service improvements include software upgrades for both Artifactory and its operator, feature integrations for the operator, bug fixes and more.

These operations don't result in expected disruptions for users. If the Platform Services team expects disruptions, they'll notify everyone about of upcoming changes in `#devops-artifactory`, but it may be with limited notice.

Other operations require turning Artifactory to read-only mode. In read-only mode you'll still be able to pull from Artifactory, but not push. If the team expects a disruption, they'll notify everyone about the planned read-only window at least a day before in the `#devops-artifactory` and `#devops-alerts`channels.

---
## Related pages


* [JFROG documentation](https://www.jfrog.com/confluence/site/documentation)
* [Privacy Impact Assessment (PIA)](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/privacy-impact-assessments)
* [Security Threat Risk Assessment (STRA)](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security/security-threat-and-risk-assessment)
* [#devops-artifactory](https://chat.developer.gov.bc.ca/channel/devops-artifactory)
* [#devops-sos](https://chat.developer.gov.bc.ca/channel/devops-sos)
* [#devops-alerts](https://chat.developer.gov.bc.ca/channel/devops-alerts)
* [Setup an Artifactory service account](../build-deploy-and-maintain-apps/setup-artifactory-service-account.md)
* [Setup an Artifactory project and repository](../build-deploy-and-maintain-apps/setup-artifactory-project-repository.md)

---
