---
title: Image and artifact management with Artifactory

description: Discusses available Artifactory features and management

keywords: Artifactory, images, artifact, best practices, Artifactory management, repositories, projects, service account

page purpose: Describes features at a high level and links to other useful pages with information on Artifactory

audience: technical lead, developer

author: Jonathan Bond

content owner: Cailey Jones
---

# Image and artifact management with Artifactory

Artifactory is an artifact repository system by JFrog. You can find their documentation [here](https://www.jfrog.com/confluence/site/documentation). We offer this service to BC Government development teams who build cloud-native applications on the OpenShift Platform.

Artifactory can be used to access artifacts to use in your application. It's compatible with all major package types, including Docker images, Helm charts, NPM packages, and [more](https://www.jfrog.com/confluence/display/JFROG/Package+Management).

The Platform Team uses Artifactory to provide the following services:
* Remote repositories serve as caches/proxies for all major public artifact repositories/registries and several private repositories/registries where BC Government owns licensed access. These repositories cache artifacts that are pulled through them, reducing build time and network traffic. The list of remote repositories include DockerHub, NPM, PyPi, RedHat's private image registry, and more.
* Artifactory Projects are spaces of quota-limited storage where teams have full control. This lets teams create their own private repositories on Artifactory where they can push and pull their own artifacts of any type. It also allows teams to control access to these repositories, similar to the way teams control access to their own Openshift namespaces. For more information on requesting an Artifactory Project, see [Setup an Artifactory service account, repository, and project](./setup-artifactory-service-account-repository-project.md).
* Xray is an add-on service to Artifactory that provides security scanning for all objects in Artifactory. This includes any objects that have been cached in Artifactory through the remote repositories and all artifacts pushed to any private repositories created by individual teams. Teams are able to create and review security reports on artifacts in their private repositories.

We deployed Artifactory in a high-availability configuration within the BC Government OpenShift cluster. The service is available 24/7 with best effort to restart failed systems. Private repository requests are reviewed and handled during normal business hours.

There is no charge to use Artifactory.

### Remote (caching/proxy) repository access

Access to remote (caching) repositories is available by default to anyone on the Silver or Gold Clusters. When a project set is provisioned, an Artifactory service account is created at the same time, with a secret in the tools namespace available to use.

#### Find available repositories
Use your service account and username to run the following curl command to get an updated list of caching repositories available from Artifactory:

`curl -u username:password -X GET "https://artifacts.developer.gov.bc.ca/artifactory/api/repositories?type=remote" | \
jq -r '(["ARTIFACTORYKEY","SOURCEURL"] | (., map(length*"-"))), (.[] | [.key, .url]) | @tsv' | column -t`

If there is a specific public repository you want to see cached through Artifactory, reach out to the Platform Services team to ask about adding it.

### Local private repositories
You can use a local private repository to push your own artifacts and images, with control over access. The benefits include the following:
* You'll have a common space to store sensitive artifacts and images.
* You can share artifacts with other teams working on OpenShift.
* You have flexible control over who and how your team accesses the artifacts.
* You can use the same pull secrets you use to access the remote repositories.

You need to set up an Artifactory project before you can get a local private repository. For more information, see [Setup an Artifactory service account, repository, and project](./setup-artifactory-service-account-repository-project.md).

### Xray artifact scanning
The Xray tool scans all artifacts for security issues and lets you know about potential issues. This gives you an opportunity to deal with issues before they become a problem. The benefits include the following:
* Getting images scanned is easy. You only need a private repo in Artifactory.
* Our amazing resident security expert can easily have access to the scan reports for your artifacts if you need help with them!
* You can ensure all of your images - especially your production images - are secure without placing additional load on your devs!

### Security reviews

Artifactory is covered by the existing Openshift [Privacy Impact Assessment (PIA)](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/privacy-impact-assessments). A [Security Threat Risk Assessment (STRA)](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security/security-threat-and-risk-assessment) is currently underway.

## Artifactory support, processes, and communications
The team supporting this service administers the Artifactory application, its supporting database, and the S3 storage system that contains the packages uploaded to Artifactory.

Your best source for support, configuration, and best practices is the developer community that uses Artifactory for their projects. Check out the [`#devops-artifactory` channel on RocketChat](https://chat.pathfinder.gov.bc.ca/channel/devops-artifactory). Service changes are also posted here.

For further support in the event of an emergency/outage, contact one of the Artifactory administrators on the [`#devops-sos` channel on RocketChat](https://chat.pathfinder.gov.bc.ca/channel/devops-sos).

For cluster-wide service notifications that could impact Artifactory, monitor the [`#devops-alerts` channel in RocketChat](https://chat.pathfinder.gov.bc.ca/channel/devops-alerts).

If you don't have RocketChat access and want to escalate an issue contact [Olena Mitovska](mailto:olena.mitovska@gov.bc.ca), Product Owner for the Platform Services team.

### Service improvements and disruptions

Artifactory service improvements include software upgrades for both Artifactory and its operator, feature integrations for the operator, bug fixes, and more.

These operations don't result in expected disruptions for users. If the team expects disruptions, they'll notify everyone about of upcoming changes in `#devops-artifactory`, but it may be with limited notice.

Other operations require turning Artifactory to read-only mode. In read-only mode you'll still be able to pull from Artifactory, but not push. If the team expects a disruption, they'll notify everyone about the planned read-only window at least a day before in the `#devops-artifactory` and `#devops-alerts`channels.

## Get started

To get started using Artifactory, see [Setup an Artifactory service account, repository, and project](./setup-artifactory-service-account-repository-project.md).

---
Related links:
* [JFROG documentation](https://www.jfrog.com/confluence/site/documentation)
* [Privacy Impact Assessment (PIA)](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/privacy-impact-assessments)
* [Security Threat Risk Assessment (STRA)](https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/information-security/security-threat-and-risk-assessment)
* [#devops-artifactory](https://chat.pathfinder.gov.bc.ca/channel/devops-artifactory)
* [#devops-sos](https://chat.pathfinder.gov.bc.ca/channel/devops-sos)
* [#devops-alerts](https://chat.pathfinder.gov.bc.ca/channel/devops-alerts)
* [Setup an Artifactory service account, repository, and project](setup-artifactory-service-account-repository-project.md)

Rewrite sources:
* https://github.com/BCDevOps/openshift-wiki/blob/master/docs/Artifactory/ServiceDefinition.md
* https://github.com/BCDevOps/developer-experience/blob/master/apps/artifactory/DEVHUB-README.md
---
