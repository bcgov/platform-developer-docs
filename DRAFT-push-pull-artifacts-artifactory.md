---
title: Push and pull artifacts in Artifactory

description:

keywords:

page purpose:

audience:

author: Jonathan Bond

content owner:
---
# Push and pull artifacts in Artifactory
After you've [set up your Artifactory service account](request-artifactory-repository-or-service-account.md) and possibly have a project and private repository you can start to push and pull artifacts in Artifactory.

## Docker images

These steps apply to all Docker-type repositories, not just DockerHub. These steps work for any private docker registry, not just Artifactory. Just change out the Artifactory URL for the URL of your preferred registry!

## Test your account and pull locally
To test your account and start to pull locally, do the following:
1. On the command line, login to the registry. Type the following:

```bash
docker login -u <USER_NAME> -p <USER_PASSWORD> artifacts.developer.gov.bc.ca/<REPO_NAME>
```

For example, our DockerHub caching repository looks like this:

```bash
docker login -u <USER_NAME> -p <USER_PASSWORD> artifacts.developer.gov.bc.ca/docker-remote
```

2. Pull from the registry on your local machine. Do this for local development and to test your account credentials. Type the following:

```bash
docker pull artifacts.developer.gov.bc.ca/<REPO_NAME>/<IMAGE>:<TAG>
```
**Note**: The `REPO_NAME` is unique to each docker repository and must be a part of the URL to pull or push from docker registries hosted in Artifactory.

## Pull from Artifactory in OpenShift

To pull from Artifactory in OpenShift, you need the following:
1. A pull secret in the correct namespace.
2. A reference to that pull secret in your build/deployment configuration.
3. A reference to the Artifactory URL wherever you reference your image.

Make your pull secret.

1. Use the following command:

```bash
oc create secret docker-registry <pull-secret-name> \
    --docker-server=artifacts.developer.gov.bc.ca \
    --docker-username=<username> \
    --docker-password=<password> \
    --docker-email=<username>@<namespace>.local
```

Make sure you have the correct username and password from the `artifacts-[ASAname]-[random]` secret.

2. Add the secret to the `default` and `builder` OpenShift service account to allow these account to use this pull secret:

```
oc secrets link default <pull_secret_name>
oc secrets link builder <pull_secret_name>
```

**Note**: Some OpenShift documentation implies that linking the secrets in this way is the only necessary step,
without having to add the pull secret to your deployment/build configs as below. You can try this method, but we've found that users often run into problems. We recommend you specify the pullSecret in your configurations to avoid problems.

3. Add your pull secret to your deployment config. Do the following:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: <pod-name>
spec:
  containers:
  - name: <container-name>
    image: artifacts.developer.gov.bc.ca/<repo-name>/<image>:<tag>
  imagePullSecrets:
  - name: <pull-secret-name>
```

You can also use the following:

```yaml
apiVersion: v1
kind: BuildConfig
metadata:
  name: <build-name>
spec:
  strategy:
      dockerStrategy:
        pullSecret:
          name: artifactory-creds
        from:
          kind: DockerImage
          name: artifacts.developer.gov.bc.ca/<repo-name>/<image>:<tag>
```
You don't need to use dockerStrategy here. It works the same way under other types of strategy as well.

Don't forget that you need to update the image URL to point explicitly at Artifactory. If there's no URL, it will default to DockerHub.

You can now use this image in your build or deployment.

## NPM
Use `npm-remote` repository in Artifactory, which points to the [remote NPM repository](https://registry.npmjs.org).

1. Set the NPM registry:

```bash
$ npm config set registry https://artifacts.developer.gov.bc.ca/artifactory/api/npm/npm-remote/
```

2. Authenticate to the registry:

```bash
$ npm login
Username: <username>
Password:
Email: <username>@<namespace>.local
```

3. Once the authentication is complete, you can pull artifacts from this registry:

```bash
$ npm install inspectpack --registry https://artifacts.developer.gov.bc.ca/artifactory/api/npm/npm-remote/
+ inspectpack@4.5.2
updated 1 package in 3.131s
4 packages are looking for funding
  run `npm fund` for details
```
**Note**: The user that has authenticated to Artifactory must have appropriate permissions to pull from the repository. Otherwise, this command returns with permissions errors. For example:

```bash
npm ERR! code E403
npm ERR! 403 403 Forbidden - GET https://artifacts.developer.gov.bc.ca/artifactory/api/npm/npm-remote/inspectpack
npm ERR! 403 In most cases, you or one of your dependencies are requesting
npm ERR! 403 a package version that is forbidden by your security policy.
```
When you're ready to build and deploy on OpenShift, add the following to your assemble file:
```
npm config set registry https://artifacts.developer.gov.bc.ca/artifactory/api/npm/npm-remote/
curl -u $AF_USERID:$AF_PASSWD https://artifacts.developer.gov.bc.ca/artifactory/api/npm/auth >> ~/.npmrc
```
For example, you can check out the [repo-mountie assemble file](https://github.com/bcgov/repomountie/blob/master/.s2i/bin/assemble).

## Maven

To deploy build artifacts through Artifactory you need to add a deployment element with the URL of a target local repository where you want to deploy your artifacts. For example:

```xml

<distributionManagement>
    <repository>
        <id>central</id>
        <name>artifactory-ha-primary-0-releases</name>
        <url>https://artifacts.developer.gov.bc.ca/artifactory/test-maven-repo</url>
    </repository>
    <snapshotRepository>
        <id>snapshots</id>
        <name>artifactory-ha-primary-0-snapshots</name>
        <url>https://artifacts.developer.gov.bc.ca/artifactory/test-maven-repo</url>
    </snapshotRepository>
</distributionManagement>
```
---
Rewrite sources:
* https://github.com/BCDevOps/developer-experience/blob/master/apps/artifactory/DEVHUB-README.md
---
