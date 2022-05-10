---
title: Prebuilt images

slug: prebuilt-images

description: Describes prebuilt images maintained by the Platform Services team and available for use in applications.

keywords: images, Artifactory, prebuilt images, managed images

page_purpose: Describes and lists various prebuilt images that developers can use in their projects.

audience: developer

author: Nick Corcoran

content_owner: Ian Watts

sort_order: 10
---
# Prebuilt images

The Platform Services team maintains a number of prebuilt images. Use these images if you don't need to maintain your own custom versions.

Prebuilt images provide the following advantages:

* Teams don't have to maintain their own builds.

* The entire cluster benefits from lower resource consumption.

* Builds tagged with "latest" are regularly rebuilt to pick up the latest security enhancements.

* Images are available to all clusters through Artifactory.

The images are available from Artifactory and you can use the `artifactory-creds` secret in your namespaces to pull the images.

## On this page

- [App Assessment](#app-assessment)
- [Backup container](#backup-container)
- [Caddy s2i](#caddy-s2i)
- [MongoDB 3.6 HA](#mongodb-36-ha)
- [Patroni/Postgres](#patroni-postgres)
- [Legacy builds](#legacy-builds)

All project sets on the platform are given a secret called `artifactory-creds` that can be used to pull images from the local Artifactory service. Include this secret in your configuration if you have a deployment or StatefulSet that uses one of these images.

```
spec:
  template:
    spec:
      imagePullSecrets:
        - name: artifactory-creds
      containers:
```

## AppAssessment<a name="app-assessment"></a>
Use the AppAssessment application to identify configuration issues in your namespaces and to improve resource consumption and health checks. For more information, see [AppAssessment](https://github.com/bcgov/AppAssessment).

Images: https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/app-assessment

## Backup container<a name="backup-container"></a>
The community's database backup container supports four types of databases.
- Use [this image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/backup-container-mariadb) to manage backups of your **MariaDB** instances.
- Use [this image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/backup-container-mongo) to manage backups of your **Mongo** instances.
- Use [this image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/backup-container-mssql) to manage backups of your **MSSQL** instances.
- Use [this image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/backup-container-postgres) to manage backups of your **Postgres** instances.

## Caddy s2i<a name="caddy-s2i"></a>
[Pipeline templates](https://github.com/bcgov/pipeline-templates) that have been developed for the community use the Caddy s2i image. For more information, see [s21-caddy-nodejs](https://github.com/bcgov/s2i-caddy-nodejs).

Images: https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/caddy-s2i-builder

## CodeQL<a name="codeql"></a>
[Pipeline templates](https://github.com/bcgov/pipeline-templates) that have been developed for the community use the CodeQL image. For more information, see [codeql](https://github.com/bcgov/pipeline-templates/tree/main/tekton/base/tasks/codeql).

Images: https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/codeql

## MongoDB 3.6 HA<a name="mongodb-36-ha"></a>
This is version 3.6 of a MongoDB image that's ready for highly available applications. For more information, see [mongodb-replicaset-container](https://github.com/bcgov/mongodb-replicaset-container).

Images: https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/mongodb-36-ha

## Patroni/Postgres<a name="patroni-postgres"></a>
This image comes in two versions:
- Patroni 1.6, with Postgres 12.4
- Patroni 2.0, with Postgres 12.4

For more information, see [patroni-postgres-container](https://github.com/bcgov/patroni-postgres-container.git).

Images: https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/patroni-postgres

## Legacy builds<a name="legacy-builds"></a>
Previously, some of these builds were available on the local image registry of each OpenShift cluster in the `bcgov` namespace.

Those builds are still there, but future enhancements will only be made to the images in Artifactory. Legacy builds are rebuilt monthly to let them incorporate security or bug fixes in the base image.

---
Related links:
- [AppAssessment](https://github.com/bcgov/AppAssessment)
- [AppAssessment image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/app-assessment)
- [MariaDB image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/backup-container-mariadb)
- [Mongo image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/backup-container-mongo)
- [MSSQL image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/backup-container-mssql)
- [Postgres image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/backup-container-postgres)
- [Pipeline templates](https://github.com/bcgov/pipeline-templates)
- [s21-caddy-nodejs](https://github.com/bcgov/s2i-caddy-nodejs)
- [Caddy s2i image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/caddy-s2i-builder)
- [codeql](https://github.com/bcgov/pipeline-templates/tree/main/tekton/base/tasks/codeql)
- [CodeQL image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/codeql)
- [mongodb-replicaset-container](https://github.com/bcgov/mongodb-replicaset-container)
- [MongoDB 3.6 HA image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/mongodb-36-ha)
- [patroni-postgres-container](https://github.com/bcgov/patroni-postgres-container.git)
- [Patroni/Postgres image](https://artifacts.developer.gov.bc.ca/ui/repos/tree/General/bcgov-docker-local/patroni-postgres)

Rewrite sources:
* https://github.com/BCDevOps/openshift-wiki/blob/master/docs/Artifactory/common_images.md
---
