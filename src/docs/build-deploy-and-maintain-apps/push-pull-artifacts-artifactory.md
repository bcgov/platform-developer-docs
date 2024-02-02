---
title: Pull artifacts from Artifactory
title: Pull artifacts from Artifactory

slug: push-pull-artifacts-artifactory

description: Describes how to pull artifacts from Artifactory

keywords: pull, Artifactory, docker, artifact, repositories, projects

page_purpose: Describes how to pull artifacts to your local machine, or to a container running on OpenShift.

audience: technical lead, developer

author: Jonathan Bond

content_owner: Cailey Jones

sort_order: 7
---
# Pull artifacts from Artifactory
Last updated: **January 29, 2024**

This page contains information on how to pull different artifact types from Artifactory.

## On this page
- **[Pulling container images using a cluster-wide pull secret](#pulling-container-images-using-a-cluster-wide-pull-secret)**
- **[Pulling container images using an Artifactory service account](#pulling-container-images-using-an-artifactory-service-account)**
- **[Node Package Manager (NPM)](#node-package-manager-npm)**
- **[Maven](#maven)**

## Pulling container images using a cluster-wide pull secret

In order to pull a container image into your OpenShift container using Artifactory's remote (caching) repositories, all you have to do is update the `image` field in your deployment yaml like so:

```yaml
spec:
  containers:
  - name: <container-name>
    image: artifacts.developer.gov.bc.ca/<repo-name>/<image>:<tag>
```

That's it! The next time you restart your pod, it will pull the image through Artifactory. Head over to [the Artifactory Web Console](https://artifacts.developer.gov.bc.ca) to find a complete list of repositories/registries available. 

## Pulling container images using an Artifactory service account

This is the process you would use to pull images from a private repository in your Artifactory project. If you are trying to pull images from one of Artifactory's remote (caching) repositories, use the instructions for [Pulling container images using a cluster-wide pull secret](#pulling-container-images-using-a-cluster-wide-pull-secret) instead.

Make sure you've added your Artifactory service account to your Artifactory project already. You can find instructions for this in our [Setup an Artifactory project and repository](../build-deploy-and-maintain-apps/setup-artifactory-project-repository.md) documentation.

You'll need your Artifactory service account's username and password. Instructions on how to find this information are in our [Set up an Artifactory service account](../build-deploy-and-maintain-apps/setup-artifactory-service-account.md) documentation.

### Test your account and pull locally

On the command line, log in Artifactory with your Artifactory service account's username and password:

```bash
docker login -u <USERNAME> -p <PASSWORD> artifacts.developer.gov.bc.ca
```

Test your service account's access to your private repository by trying to pull an image to your local machine:

```bash
docker pull artifacts.developer.gov.bc.ca/<REPO_NAME>/<IMAGE>:<TAG>
```

### Pull from Artifactory in OpenShift

To pull from Artifactory in OpenShift, you need the following:
1. A pull secret in the correct namespace.
2. A reference to that pull secret in your build/deployment configuration.
3. A reference to the Artifactory URL wherever you reference your image.

Archeobot (the operator that runs the management of `ArtifactoryServiceAccount` and `ArtifactoryProject` objects in OpenShift) automatically creates a pull secret for you in whatever namespace contains the relevant `ArtifactoryServiceAccount` object. Simply find the name of this pull secret (you'll find instructions in our [Set up an Artifactory service account](../build-deploy-and-maintain-apps/setup-artifactory-service-account.md) documentation) if you only need to use this pull secret in the same namespace. 

If you need to re-create that pull secret in a different namespace, you can either copy-paste the yaml from the existing secret, or you can create a new one like this:

```bash
oc create secret docker-registry <pull-secret-name> \
    --docker-server=artifacts.developer.gov.bc.ca \
    --docker-username=<username> \
    --docker-password=<password> \
    --docker-email=<username>@<namespace>.local
```

Add the secret to the `default` and `builder` OpenShift service account to allow the account to use this pull secret:

```
oc secrets link default <pull_secret_name>
oc secrets link builder <pull_secret_name>
```

**Note**: Some OpenShift documentation implies that linking the secrets in this way is the only necessary step,
without having to add the pull secret to your deployment/build configurations as below. You can try this method, but we've found that users often run into problems. We recommend you do both in order to avoid potential issues.

Finally, add your pull secret to your deployment configuration:

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

Or to your build configuration:

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
**Note**: you don't need to use dockerStrategy in your BuildConfig. It works the same way under other types of strategy as well. This is simply the example we have used.

You can also point an ImageSteam object at Artifactory using this same process. However, be aware that your `ReferencePolicy` must be `source` - if you use `local`, OpenShift will try to log into its internal registry with the Artifactory pull secret, which will fail. 


## Node Package Manager (NPM)
The `npm-remote` repository in Artifactory points to the [public default NPM repository](https://registry.npmjs.org). If you wish to pull from a different repository, such as a private one, replace all references to `npm-remote` below with your repository's name.

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
For example, you can check out the [Repo-Mountie assemble file](https://github.com/bcgov/repomountie/blob/master/.s2i/bin/assemble).

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

### Pull other package types from Artifactory

There are many different repository types in Artifactory. This documentation covers only those package types which are used commonly or for which teams have written documentation. If you are looking for instructions on how to pull other types of artifacts from Artifactory, see [JFrog's documentation on various repository types](https://www.jfrog.com/confluence/display/JFROG/Package+Management) for instructions.

If your team uses a specific package type not shown here, consider creating a pull request for this document to share your knowledge.

---

## Related pages


* [Set up an Artifactory service account](../build-deploy-and-maintain-apps/setup-artifactory-service-account.md)
* [Set up an Artifactory project and repository](../build-deploy-and-maintain-apps/setup-artifactory-project-repository.md)
* [NPM repository](https://registry.npmjs.org)
* [repo-mountie assemble file](https://github.com/bcgov/repomountie/blob/master/.s2i/bin/assemble)


