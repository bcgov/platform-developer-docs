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
Last updated: **January 30, 2024**

Artifactory access is controlled through Artifactory service accounts. Service accounts are meant to be shared by teams and used by automation tools like pipelines.

When referring to service accounts, keep in mind the following differences:

* `ArtifactoryServiceAccount` refers to an OpenShift object with type `ArtifactoryServiceAccount`. This is a custom resource that the Platform Services team created in OpenShift.
* Artifactory "service account" refers to the actual account that exists inside the Artifactory software, which you can then use to interact with Artifactory's features. While closely related to each other, they're not the same.

An Artifactory service account is not required to make use of the remote (caching) Docker repositories or the Platform Team's images in `bcgov-docker-local`. There are cluster-wide pull secrets that allow you to make use of these Docker repos without any additional effort. You can learn how to do this in our [Pull artifacts from Artifactory](../build-deploy-and-maintain-apps/push-pull-artifacts-artifactory.md) documentation. A separate Artifactory service account is only required for pulling Docker images from private repositories, or artifacts other than Docker images. 


## On this page
- **[Create a service account](#create-a-service-account)**
- **[Access a service account](#access-a-service-account)**
- **[Delete a service account](#delete-a-service-account)**
- **[Related pages](#related-pages)**

---

## Create a service account

If you have a project established in either the Silver or Emerald clusters, an Artifactory service account is already available. An `ArtifactoryServiceAccount` object is generated in the corresponding `tools` namespace, and the Artifactory Operator handles its configuration. A default `ArtifactoryServiceAccount` object is automatically created during namespace provisioning, identified by the name `default`. You are also free to create additional Artifactory service accounts if needed.

If your project is established in the Gold clusters, you will need to create your own Artifactory service account as no default one is provided. This is because you are responsible for managing the synchronization of any necessary secrets between the Gold and Gold DR clusters. Archeobot, the operator overseeing the creation and maintenance of `ArtifactoryServiceAccount` objects, operates solely in Gold and not in Gold DR. You must initiate the creation of the `ArtifactoryServiceAccount` object in the Gold cluster, and Archeobot will generate the associated objects (such as your pull secrets) in your Gold namespace. The responsibility lies with your team to synchronize these secrets with Gold DR.

Run the following command to create a new service account:

```bash
oc process -f https://raw.githubusercontent.com/bcgov/platform-services-archeobot/master/archeobot/config/samples/tmpl-artifactoryserviceaccount.yaml -p NAME="[ASAname]" -p DESCRIPTOR="[Description of Service Account]" | oc create -f -
```

The `ASAname` refers to the name of the ArtifactoryServiceAccount object, not the actual account. The Platform Team recommends choosing a name that reflects how you plan to use the account. For instance, if you're creating an account specifically for your Tekton pipeline, a suitable name could be `tekton` for the Artifactory Service Account object. This results in a secret named `artifacts-tekton-[random]` and an account named `tekton-[namespace]-[random]`. There's no need to worry about name collisions with other teams; your account name incorporates your namespace plate (the six alphanumeric characters preceding `-tools`, `-dev`, `-test`, or `-prod` in the namespace name). Even if another team named their ArtifactoryServiceAccount `tekton`, they have a distinct name.

Once Archeobot reconciles your changes, you can utilize this account to access Artifactory.

## Access a service account

To gather the random license plate assigned to the end of each `ArtifactoryServiceAccount` name and obtain additional details, execute `oc describe artsvcacct default`. This command provides information about the reconciliation status and other account details. If you require assistance with the Artifactory service account object, make sure to include both the spec and status information in your support ticket.

**Note**: `ArtifactoryServiceAccount` objects have two available short-names to make them easier to use in the CLI: `ArtSvcAcct` and `ArtSA`.

You can get the username and password out of the secret using the following command:

```bash
oc get secret/artifacts-default-[random] -o json | jq '.data.username' | tr -d "\"" | base64 -d
oc get secret/artifacts-default-[random] -o json | jq '.data.password' | tr -d "\"" | base64 -d
```

## Delete a service account

You can delete a service account by deleting the ArtifactoryServiceAccount object through the OpenShift CLI. 

You can use the following command to accomplish it:
`oc delete ArtifactoryServiceAccount [ASAname]` or `oc delete artsvcacct [ASAname]`.

After completing this process, Archeobot takes care of relevant cleanup tasks, including secrets generated for you. If you attempt to delete the default service account, a new one will be recreated. It's important to note that Archeobot only manages the cleanup of secrets it has generated specifically for you. If you have created any secrets independently using this account's information, such as a secret in Gold DR, you will need to delete that secret manually.

### Missing ArtifactoryServiceAccount Secret: How to resolve the issue

If you have unintentionally deleted the secret for your Artifactory service account, follow the commands above to delete the ArtifactoryServiceAccount object. Archeobot will detect the deletion of the object and subsequently remove the service account from Artifactory.

If you delete the default service account this way, a new one will automatically be created for you. Otherwise, you're free to create a new service account using the steps outlined in [Create a service account](#create-a-service-account). This will create for you a new service account with new secrets that you can use.

Keep in mind that this is a _new_ account, and that you will need to re-add this account to your Artifactory Project(s), if necessary. Instructions for this can be found in our [Setup an Artifactory project and repository](../build-deploy-and-maintain-apps/setup-artifactory-project-repository.md) documentation.

---
## Related pages

* [Archeobot](https://github.com/bcgov/platform-services-archeobot)
* [Artifactory](https://artifacts.developer.gov.bc.ca)
* [Just Ask! tool](https://just-ask.developer.gov.bc.ca/)
* [Setup an Artifactory project and repository](../build-deploy-and-maintain-apps/setup-artifactory-project-repository.md)


