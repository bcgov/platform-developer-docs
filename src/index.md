# Welcome to the Private Cloud as a Service Platform Technical Documentation

## Get started

Start here for the first steps on working in our OpenShift environment:

* [Provision a new project in OpenShift](docs/openshift-projects-and-access/provision-new-openshift-project.md)
* [User access in OpenShift](docs/openshift-projects-and-access/grant-user-access-openshift.md)
* [Project resource quotas](docs/automation-and-resiliency/openshift-project-resource-quotas.md)
* [Request a quota adjustment for an OpenShift project set](docs/automation-and-resiliency/request-quota-adjustment-for-openshift-project-set.md)
* [Common platform requests](docs/openshift-projects-and-access/common-platform-requests.md)

## Build, deploy and maintain apps

Best practices on the platform:

* [Build an application](docs/build-deploy-and-maintain-apps/build-an-application.md)
* [Deploy an application](docs/build-deploy-and-maintain-apps/deploy-an-application.md)
* [Maintain an application](docs/build-deploy-and-maintain-apps/maintain-an-application.md)
* [Retire an application](docs/build-deploy-and-maintain-apps/retire-an-application.md)

## Training and learning

### Free OpenShift training

Read about [the free training](https://digital.gov.bc.ca/technology/cloud/private/support/#platform-training)
that is offered on the Platform and get access to other learning resources.

### Rocket.Chat

Rocket.Chat will be your main communication channel for platform updates and support while you work in the BC Gov
Private Cloud PaaS. Read
about [how to stay connected in Rocket.Chat](../bc-developer-guide/rocketchat/steps-to-join-rocketchat/).

[Log in to Rocket.Chat](https://chat.developer.gov.bc.ca).

### Platform Services GenAI chatbot: Rocky

Rocky, the newest member of the Platform Services team is a GenAI chatbot designed to assist with the OpenShift platform and its related shared services. Rocky has been trained on resources from the Private cloud technical documentation, the Private cloud website, and BCGov Internal StackOverflow.  

[Learn how to use Rocky](docs/training-and-learning/rocky-guide.md).

### Platform community MeetUps

Every 3 weeks, we host a platform community MeetUp where product teams from across the B.C. government give technical
demos of their application.

[Learn how to register for this and other events](https://digital.gov.bc.ca/technology/cloud/private/team/#stay).

## Dive deeper

### App monitoring

* [Set up a team in Sysdig Monitor](docs/app-monitoring/sysdig-monitor-setup-team.md)
* [Create monitoring dashboards in Sysdig Monitor](docs/app-monitoring/sysdig-monitor-create-monitoring-dashboards.md)
* [Create alerts and notifications in Sysdig Monitor](docs/app-monitoring/sysdig-monitor-create-alert-channels.md)
* [Set up advanced metrics in Sysdig Monitor](docs/app-monitoring/sysdig-monitor-set-up-advanced-functions.md)
* [Resource monitoring dashboards](docs/app-monitoring/resource-monitoring-dashboards.md)
* [Best practices for application logging in OpenShift](docs/app-monitoring/best-practices-for-application-logging-in-openshift.md)
* [Check application health after an outage](docs/app-monitoring/check-application-health-after-outage.md)
* [Managing resource quotas in Kubernetes: A complete guide](docs/app-monitoring/managing-resource-quotas-in-kubernetes.md)

### Automation and resiliency

* [App resiliency guidelines](docs/automation-and-resiliency/app-resiliency-guidelines.md)
* [CI/CD pipeline automation](docs/automation-and-resiliency/cicd-pipeline-templates-for-private-cloud-teams.md)

### Database and API management

* [Open source database technologies](docs/database-and-api-management/opensource-database-technologies.md)
* [High availability database clusters](docs/database-and-api-management/high-availability-database-clusters.md)
* [Database backup best practices](docs/database-and-api-management/database-backup-best-practices.md)
* [Using Postgres on OpenShift with Patroni and CrunchyDB](docs/database-and-api-management/postgres-how-to.md)
* [Self-guided lab: Learn to use Postgres on OpenShift with CrunchyDB](docs/database-and-api-management/crunchydb-self-guided-lab.md)

### Platform architecture reference

* [Platform storage](docs/platform-architecture-reference/platform-storage.md)
* [Platform architecture diagram](docs/platform-architecture-reference/platform-architecture-diagram.md)
* [OpenShift network policies](docs/platform-architecture-reference/openshift-network-policies.md)
* [Platform network topology](docs/platform-architecture-reference/platform-network-topology.md)
* [Set up TCP connectivity on the Private cloud Openshift platform](docs/platform-architecture-reference/set-up-tcp-connectivity-on-private-cloud-openshift-platform.md)
* [Hosting tiers table](docs/platform-architecture-reference/hosting-tiers-table.md)

### Platform automation

* [Platform automation](docs/platform-automation/platform-automation.md)
* [Automated Scale-Down](docs/platform-automation/automated-scaling.md)
* [AlertManager](docs/platform-automation/alertmanager.md)
* [Pruning](docs/platform-automation/pruning.md)
* [Kyverno Cluster Policies](docs/platform-automation/kyverno.md)
* [Defunct PIDs](docs/platform-automation/defunct-pids.md)

### Reusable code and services

* [Pathfinder SSO Keycloak](docs/reusable-code-and-services/reusable-services-list.md#pathfinder-single-sign-on-keycloak)
* [Reusable services list](docs/reusable-code-and-services/reusable-services-list.md)
* [Project examples](docs/reusable-code-and-services/project-examples.md)

### Secrets management

* [Vault getting started guide](docs/secrets-management/vault-getting-started-guide.md)
* [Vault secrets management](docs/secrets-management/vault-secrets-management-service.md)
* [External secrets](docs/secrets-management/external-secrets.md)

### Security tools and compliance

* [B.C. Government OpenShift DevOps security compliance](docs/security-and-privacy-compliance/platform-security-compliance.md)
* [B.C. government OpenShift platform security tools](docs/security-and-privacy-compliance/platform-security-tools.md)
* [Payment card processing for OpenShift applications](docs/security-and-privacy-compliance/payment-card-processing.md)

### Use GitHub in BC Gov

* [BC Government organizations in GitHub](../bc-developer-guide/use-github-in-bcgov/bc-government-organizations-in-github/)
* [Common platform requests in the BC Gov Private Cloud PaaS](https://digital.gov.bc.ca/technology/cloud/private/support/#common)
* [Start working in BCGov GitHub organization](../bc-developer-guide/use-github-in-bcgov/start-working-in-bcgov-github-organization/)

## Get support on the platform

### Report a platform incident

If you think an incident has occurred with our services, you can report it
by [following these steps](https://digital.gov.bc.ca/technology/cloud/private/support/#report).

### Get help or support

We follow a community-based support model. You can use our self-serve resources or ask for help from the platform
community. [Learn how to get help on the Platform](https://digital.gov.bc.ca/technology/cloud/private/support/).

### DevOps requests

Not sure where to go to get things done on the platform? We've outlined common platform tasks and links to additional
instructions. [Learn how to get help with some of the most commonly searched-for tasks](https://digital.gov.bc.ca/technology/cloud/private/support/#common).
