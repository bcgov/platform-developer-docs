---
title: Set up an Artifactory service account

slug: setup-artifactory-service-account

description: Describes how a user can set up their Artifactory service accounts.

keywords: Archeobot, Artifactory, images, artifact, Artifactory management, service account

page_purpose: Details how to set up Artifactory service accounts.

audience: technical lead, developer

author: Jonathan Bond

content_owner: Cailey Jones

sort_order: 8
---

# Set up an Artifactory service account

Artifactory access is controlled through Artifactory service accounts. Service accounts are meant to be shared by teams and used by automation tools like pipelines.

## On this page
- [Create a service account](#create-a-service-account)
- [Access a service account](#access-a-service-account)
- [Delete a service account](#delete-a-service-account)

When referring to service accounts, keep in mind the following differences:
* `ArtifactoryServiceAccount` refers to an OpenShift object with type `ArtifactoryServiceAccount`. This is a custom resource that the Platform Services team created in OpenShift.
* Artifactory "service account" refers to the actual account that exists inside the Artifactory software, which you can then use to interact with Artifactory's features. While closely related to each other, they're not the same.

An Artifactory service account is not required to make use of the remote (caching) Docker repositories or the Platform Team's images in `bcgov-docker-local`. There are cluster-wide pull secrets that allow you to make use of these Docker repos without any additional effort. You can learn how to do this in our [Pull artifacts from Artifactory](/push-pull-artifacts-artifactory/) documentation. A separate Artifactory service account is only required for pulling Docker images from private repositories, or artifacts other than Docker images. 

## Create a service account

If you have a project set in either the Silver or Emerald clusters, you already have an Artifactory service account: an `ArtifactoryServiceAccount` object is created in the appropriate `tools` namespace, which the Artifactory Operator then actions. One such `ArtifactoryServiceAccount` object is created automatically as part of namespace provisioning and has the name `default`. You are welcome to create a more Artifactory service accounts if you wish.

If you have a project set in the Gold clusters, you will need to create your own Artifactory service account - no default one has been created. This is because you must manage the synchronization of any necessary secrets between the Gold and Gold DR clusters. Archeobot, the operator which controls the creation and maintenance of `ArtifactoryServiceAccount` objects, only runs in Gold, not Gold DR. You must create the `ArtifactoryServiceAccount` object in the Gold cluster, and Archeobot will only create the related objects (like your pull secrets) in your Gold namespace. It's up to your team to sync these secrets with Gold DR. 

Run the following command to create a new service account:

`oc process -f https://raw.githubusercontent.com/bcgov/platform-services-archeobot/master/archeobot/config/samples/tmpl-artifactoryserviceaccount.yaml -p NAME="[ASAname]" -p DESCRIPTOR="[Description of Service Account]" | oc create -f -`

The `ASAname` is the name of the ArtifactoryServiceAccount object. It's not the name of the actual account. The Platform Team recommends using a name that describes how you intend to use the account. For example, if you make an account specifically for use in your Tekton pipeline, you might want to use the name `tekton` for the Artifactory Service Account object. This results in a secret called `artifacts-tekton-[random]` and an account name called `jenkins-[namespace]-[random]`. Don't worry about name collisions with other teams, your account name has your namespace plate in it (the six alphanumeric characters that go before the `-tools`, `-dev`, `-test` or `-prod` in the namespace name), so even if there's another team who called their ArtifactoryServiceAccount `jenkins`, they have a different name.

After Archeobot reconciles your changes, you can use this account to access Artifactory.

## Access a service account

There's a random license plate assigned to the end of each `ArtifactoryServiceAccount` name, in order to ensure uniqueness. Collect this information by running `oc describe artsvcacct default`. This also provides some information about reconciliation status, as well as other details about the account. If you need support with the Artifactory service account object, include the spec and status information in your ticket.

**Note**: `ArtifactoryServiceAccount` objects have two available short-names to make them easier to use in the CLI: `ArtSvcAcct` and `ArtSA`.

You can get the username and password out of the secret using the following command:

```bash
oc get secret/artifacts-default-[random] -o json | jq '.data.username' | tr -d "\"" | base64 -d
oc get secret/artifacts-default-[random] -o json | jq '.data.password' | tr -d "\"" | base64 -d
```

## Delete a service account

You can delete a service account by deleting the ArtifactoryServiceAccount object through the OpenShift CLI. Use the following command:
`oc delete ArtifactoryServiceAccount [ASAname]` or `oc delete artsvcacct [ASAname]`.

After you've done this, Archeobot cleans up anything relevant, including secrets generated for you. If you try to delete the default service account, a new one is recreated. Please note that Archeobot only cleans up secrets that it has generated _for_ you; if you have created any secrets of your own using this account's information (such as a secret in Gold DR), you will need to delete this secret on your own.

### My ArtifactoryServiceAccount secret is missing! Help!

If you accidentally deleted the secret for your Artifactory service account, delete the ArtifactoryServiceAccount object using the commands above. Archeobot detects that the object has been deleted and removes the service account from Artifactory.

If you delete the default service account this way, a new one will automatically be created for you. Otherwise, you're free to create a new service account using the steps outlined in [Create a service account](#create-a-service-account). This will create for you a new service account with new secrets that you can use.

Keep in mind that this is a _new_ account, and that you will need to re-add this account to your Artifactory Project(s), if necessary. Instructions for this can be found in our [Setup an Artifactory project and repository](/setup-artifactory-project-repository/) documentation.

---
Related links:
* [Archeobot](https://github.com/bcgov/platform-services-archeobot)
* [Artifactory](https://artifacts.developer.gov.bc.ca)
* [Just Ask! tool](https://just-ask.developer.gov.bc.ca/)
* [Setup an Artifactory project and repository](/setup-artifactory-project-repository/)

---
