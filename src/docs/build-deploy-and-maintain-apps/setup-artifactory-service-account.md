---
title: Set up an Artifactory service account

slug: setup-artifactory-service-account

description: Describes how a user can set up their Artifactory service accounts.

keywords: Archeobot, Artifactory, images, artifact, Artifactory management, service account

page_purpose: Details how to set up Artifactory service accounts.

audience: technical lead, developer

author: Jonathan Bond

content_owner: Cailey Jones

sort_order: 9
---

# Set up an Artifactory service account

Artifactory access is controlled through Artifactory service accounts. Service accounts are meant to be shared by teams and used by automation tools like pipelines.

## On this page
- [Archeobot](#archeobot)
- [Setup a service account](#setup-a-service-account)
- [Create multiple service accounts](#create-multiple-service-accounts)
- [Delete a service account](#delete-a-service-account)

## Archeobot

[Archeobot](https://github.com/bcgov/platform-services-archeobot) is a custom operator that gives teams the freedom to manage their own Artifactory resources. Archeobot can be used to:
* Create new Artifactory service accounts.
* Request new Artifactory projects.
* Request quota changes to existing Artifactory projects.

## Setup a service account

Use the information below to request an Artifactory repository or service account.

When referring to service accounts, keep in mind the following differences:
* `ArtifactoryServiceAccount` refers to an OpenShift object with type `ArtifactoryServiceAccount`. This is a custom resource that the Platform Services team created in OpenShift.
* Artifactory "service account" refers to the actual account that exists inside the Artifactory software, which you can then use to interact with Artifactory's features. While closely related to each other, they're not the same.

If you have a project set somewhere in the OpenShift 4 clusters, you already have a service account.

An `ArtifactoryServiceAccount` object is created in the appropriate `tools` namespace, which the Artifactory Operator then actions. One such `ArtifactoryServiceAccount` object is created automatically as part of namespace provisioning and has the name `default`.

There's a random license plate assigned to the end of each object name, in order to ensure uniqueness. Collect this information by running `oc describe artsvcacct default`. This also provides some information about reconciliation status, as well as other details about the account. If you need support with the Artifactory service account object, include the spec and status information in your ticket.

**Note**: `ArtifactoryServiceAccount` objects have two available short-names to make them easier to use in the CLI: `ArtSvcAcct` and `ArtSA`.

You can get the username and password out of the secret using the following command:

```bash
oc get secret/artifacts-default-[random] -o json | jq '.data.username' | tr -d "\"" | base64 -d
oc get secret/artifacts-default-[random] -o json | jq '.data.password' | tr -d "\"" | base64 -d
```
Users with edit and administrator access on the `tools` namespace can also create additional `ArtifactoryServiceAccount` objects on their own. The creator of the service account can also request the creation of a pull secret in addition to the regular secret.

If either of the secrets is deleted manually, the operator can act to change the password of the service account. Then it recreates one or both secrets with the new password. This is an easy method for teams to change their service account passwords.

## Create multiple service accounts
You're able to make as many Artifactory service accounts as you need, in as many namespaces as required. Be aware that Archeobot needs to be able to keep up with the amount you're making.

Run the following command to create a new service account:

`oc process -f https://raw.githubusercontent.com/bcgov/platform-services-archeobot/master/archeobot/config/samples/tmpl-artifactoryserviceaccount.yaml -p NAME="[ASAname]" -p DESCRIPTOR="[Description of Service Account]" | oc create -f -`

The `ASAname` is the name of the ArtifactoryServiceAccount object. It's not the name of the actual account. Use a name that describes how you plan on using the account. After Archeobot reconciles your changes, you can use this account to access Artifactory.

For example, if you make an account specifically for use in your Jenkins pipeline, you might want to use the name `jenkins` for the Artifactory Service Account object. This results in a secret called `artifacts-jenkins-[random]` and an account name called `jenkins-[namespace]-[random]`. Don't worry about name collisions with other teams, your account name has your namespace plate in it (the six alphanumeric characters that go before the `-tools`, `-dev`, `-test` or `-prod` in the namespace name), so even if there's another team who called their ArtifactoryServiceAccount `jenkins`, they have a different name.

## Delete a service account
You can delete a service account by deleting the ArtifactoryServiceAccount object through the OpenShift CLI. Use the following command:
`oc delete ArtifactoryServiceAccount [ASAname]` or `oc delete artsvcacct [ASAname]`.

After you've done this, Archeobot cleans up anything relevant, including secrets generated for you. If you try to delete the default service account, a new one is recreated.

### Service account deleted in error
If you accidentally deleted the secret for the default service account, in your `tools` namespace, delete the ArtifactoryServiceAccount object called `default`. Use the following command:

`oc delete ArtifactoryServiceAccount default`

Archeobot detects that the object has been deleted and removes the service account from Artifactory.

Then, the project provisioner detects the missing ArtifactoryServiceAccount object and creates a new one in your `tools` namespace, also called `default`. This happens within about 5 minutes. Archeobot detects the `new` object and creates a new service account for you in Artifactory. The username will be different. The random string at the end changes to reflect that the account is new with a new password and new privileges.

If you've accidentally deleted secrets for a different Artifactory service account (one you created yourself, but not the `default` one in your `tools` namespace), follow the same process. The project provisioner doesn't recreate the object for you, you need to do that yourself. Delete the object, wait for Archeobot to clean everything up, and then create a new ArtifactoryServiceAccount object. You can use the same ASA name but remember the username for the account is different, because it has a different random string at the end.

---
Related links:
* [Archeobot](https://github.com/bcgov/platform-services-archeobot)
* [Artifactory](https://artifacts.developer.gov.bc.ca)
* [Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/)
* [Setup an Artifactory project and repository](/setup-artifactory-project-repository/)

---
