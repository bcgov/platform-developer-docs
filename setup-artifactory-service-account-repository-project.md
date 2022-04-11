---
title: Setup an Artifactory service account, repository, and project

description: Describes how a user can prepare their Artifactory project, service accounts, and repositories

keywords: Archeobot, Artifactory, images, artifact, best practices, Artifactory management, repositories, projects, service account

page purpose: Details how to setup Artifactory service accounts, repositories, and project. Includes various guidence on access and commands.

audience: technical lead, developer

author: Jonathan Bond

content owner: Cailey Jones
---

# Setup an Artifactory service account, repository, and project

Artifactory access is controlled through Artifactory service accounts. Service accounts are meant to be shared by teams and used by automation tools like pipelines.

## On this page
- [Section name](#)
- [Section name](#)
- [Section name](#)
<a name=""></a>

[Archeobot](bcgov/platform-services-archeobot) is a custom operator that gives teams the freedom to manage their own Artifactory resources. Archeobot can be used for the following:
* Create new Artifactory service accounts
* Request new Artifactory projects
* Request quota changes to existing Artifactory projects

Use the information below to request an Artifactory repository or service account.

When referring to service accounts, keep in mind the following differences:
* `ArtifactoryServiceAccount` refers to an Openshift object with type `ArtifactoryServiceAccount`. This is a custom resource that the Platform Team created in OpenShift.
* Artifactory "service account" refers to the actual account that exists inside the Artifactory software, which you can then use to interact with Artifactory's features.
While closely related to each other, they're not the same.

## Setup a service account<a name=""></a>

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

### Create multiple service accounts
You're able to make as many Artifactory service accounts as you need, in as many namespaces as required. Be aware that Archeobot needs to be able to keep up with the amount you're making.

Run the following command to create a new service account:

`oc process -f https://raw.githubusercontent.com/bcgov/platform-services-archeobot/master/archeobot/config/samples/tmpl-artifactoryserviceaccount.yaml -p NAME="[ASAname]" -p DESCRIPTOR="[Description of Service Account]" | oc create -f -`

The `ASAname` is the name of the ArtifactoryServiceAccount object. It's not the name of the actual account. Use a name that describes how you plan on using the account. After Archeobot reconciles your changes, you can use this account to access Artifactory.

For example, if you make an account specifically for use in your Jenkins pipeline, you might want to use the name `jenkins` for the Artifactory Service Account object. This results in a secret called `artifacts-jenkins-[random]` and an account name called `jenkins-[namespace]-[random]`. Don't worry about name collisions with other teams, your account name has your namespace plate in it (the six alphanumeric characters that go before the `-tools`, `-dev`, `-test,` or `-prod` in the namespace name), so even if there's another team who called their ArtifactoryServiceAccount `jenkins`, they have a different name.

### Delete a service account
You can delete a service account by deleting the ArtifactoryServiceAccount object through the OpenShift CLI. Use the following command:
`oc delete ArtifactoryServiceAccount [ASAname]` or `oc delete artsvcacct [ASAname]`.

After you've done this, Archeobot cleans up anything relevant, including secrets generated for you. If you try to delete the default service account, a new one is recreated.
#### Service account deleted in error
If you accidentally deleted the secret for the default service account, in your `tools` namespace, delete the ArtifactoryServiceAccount object called `default`. Use the following command:

`oc delete ArtifactoryServiceAccount default`

Archeobot detects that the object has been deleted and removes the service account from Artifactory.

Then, the project provisioner detects the missing ArtifactoryServiceAccount object and creates a new one in your `tools` namespace, also called `default`. This happens within about 5 minutes. Archeobot detects the `new` object and creates a new service account for you in Artifactory. The username will be different. The random string at the end changes to reflect that the account is new with a new password and new privileges.

If you've accidentally deleted secrets for a different Artifactory service account (one you created yourself, but not the `default` on in your `tools` namespace), follow the same process. The project provisioner doesn't recreate the object for you, you need to do that yourself. Delete the object, wait for Archeobot to clean everything up, and then create a new ArtifactoryServiceAccount object. You can use the same ASA name but remember the username for the account is different, because it has a different random string at the end.

## Artifactory Projects and private repositories<a name=""></a>

If your team wishes to push artifacts to Artifactory, you will require a private repository to do so. This feature is provided via Artifactory Projects. Artifactory Projects are logical spaces of quota-based storage which teams can administer themselves. Within an Artifactory Project, a team can create their own private repositories - any number and any type that suits their needs, so long as the storage space required for these repositories remains within the provided quota.

A team can request more quota if required, but note that teams are expected to try to remain within the default quota as much as possible - so be sure to clean up your old artifacts and tags!

### Create an Artifactory project
Artifactory Projects give teams access to private repositories. If you want a private repository where you can push your own images or other artifacts, you'll need a project. If you don't want to be able to push your own images or other artifacts - if you only wish to use Artifactory remote repositories - you don't need a project.

You can create an `ArtifactoryProject` object on your OpenShift namespace with the following command:

`oc process -f https://raw.githubusercontent.com/bcgov/platform-services-archeobot/master/archeobot/config/samples/tmpl-artifactoryproject.yaml -p NAME="[APname]" | oc create -f -`

The `APname` won't completely reflect the name of the Project as it appears in Artifactory. The project name in Artifactory looks something like `[NamespacePlate]-[APname]`. For example, if you create an `ArtifactoryProject` object in the `a1b2c3-tools` namespace and give it an `APname` of `test`, then the Project's full name is `a1b2c3-test`.

The project is also given a shortname, called a project key. This is created automatically using the first letter of your `APname` and three digits of your namespace name. Using the previous example, the project key is `ta1b`. The project key must be unique.

When Archeobot sees a new `ArtifactoryProject` in your namespace, it sends the Platform Team a note that you want a new Project, which the team must approve. While you wait for your new `ArtifactoryProject` to be approved, you can look at it using the following command:

`oc describe artproj [APname]`.

In `spec`, there's an entry for your project key and an `approval_status` box that should show **pending**. This means that we haven't approved or rejected your request for an Artifactory project.

When the project is approved, the `approval_status` box should show **approved**. In this case, Archeobot knows that your `ArtifactoryProject` is approved, but it hasn't yet made the Project for you in Artifactory.

You may also see **nothing-to-approve**. This status is meant to say that there are no outstanding changes to be made. If you see this, it means that your project is created in Artifactory, and you can [sign in](https://artifacts.developer.gov.bc.ca).

**Note**: While you are able to patch the `approval_status` box, it doesn't mean you can approve your own project. The box is there for informational purposes. If you change it, Archeobot changes it back.

### Request a larger quota for your Artifactory project

The default quota for any Artifactory Project is 5GB. This should be sufficient for the needs of most teams on the platform, as long as the artifacts pushed to Artifactory are well-controlled. Teams must delete old artifacts that are no longer in use in order to remain below this threshold.

In some cases, a team may need more than 5 GB to store their artifacts. In this case, the team can request an increased quota for their project by editing their `ArtifactoryProject` quota. Use the following command:

`oc patch artproj [APName] -p '{"spec":{"quota":"10"}}' --type merge`

This patch action requests an increase in the project quota from 5GB to 10GB. You may replace the 10 with another number, as needed. Requests for quota increases follow the same approval process  as when you create an Artifactory project.

### Rejected requests for projects or quota increases
If you've made a request for a new Artifactory project or quota increase and it was rejected, reach out to the Platform Services team to ask why. If you think your request was rejected in error, let the team know. If the request should have been approved, they'll switch the status to `approved` and you'll see the changes applied.

If the team maintains the rejection, make sure you acknowledge the rejection. If you don't, further change requests are ignored. Acknowledge the rejection by changing your `ArtifactoryProject` object back to the state it was in before you made the request.
* If you requested a new project, delete the `ArtifactoryProject` object from your namespace.
* If you requested an increased quota, change the quota in the spec of your ArtifactoryProject back to the currentquota of your project. If you're not sure what the quota is, check the Overview page for your project in the Artifactory web GUI.

After you've made the change, Archeobot reconciles once more and you'll see that your `approval_status` changes back to `nothing-to-approve` (or you will have deleted the ArtifactoryProject object, in which case you won't see anything at all). This means your rejection has been acknowledged and you can make further change requests.

### Access your new project

Once you have your Artifactory project you can add repositories and users, adjust roles, and check the results of Xray scans on artifacts.

**Note**: To use an existing Artifactory service account with your new Artifactory project, you must add that service account to the project. If you created the `ArtifactoryProject` object in the same OpenShift namespace as an existing `ArtifactoryServiceAccount` object, the related service account isn't automatically given access to the project.

To use these features, enter the project in the Artifactory UI. Log in and expand **All**. Choose your new project to go to that project space. If you don't see your new project, it may be because of one of the following:
* You may not be an administrator in the applicable OpenShift namespace. Ask one of the administrators to add you to the project.
* You may not have logged in to Artifactory before creating the project. Contact the Platform Services team to fix the issue. You can reach out in the `devops-artifactory` or `devops-how-to` channels in RocketChat.

After you've entered the project in the Artifactory UI, some tabs with boxes and gears are visible. Click the gears to enter the administrator space in your project.

### Add users and service accounts to a project

Once you've gotten your project, make sure to add your own service account to the project, as it's not added automatically when the project is created.

To add a new user account to your project, do the following:
1. Click the gear at the top of the menu on the left, then choose **Identity and Access Members**. Click **Add Member**.
2. On the **Users** tab, search for a username.
3. Add a user with their IDIR or GitHub ID. The user has to have already signed into Artifactory's GUI at least once. If the user hasn't done so yet, tell them to.

You can also add any Artifactory service account and select multiple users to add them all at once. Then, specify the role you want to grant them.
* **Contributor**: Service accounts are commonly given this role.
* **Developer**: Assign this role if you want a service account to manage artifacts.
* **Administrator**: Assign this role if you want a service account to manage access to the project.

You can also add additional roles to the project, if you want more finely-tuned control over who gets access to what.

### Add a repository to your project

To add a repository to your project, do the following:
1. Click the gear icon and then choose **Repositories**. Click **Add Repositories**.
2. Choose a local repository. If you only need to push images to Artifactory, use a local repository.
3. Choose a package type.
4. Create a name for your new repository. All repositories in projects have the project key prefixed automatically. Use the following naming convention:

  `[desc]-[pkgtype]-[location]`

  For example, if you want to make a general-use docker repository for your team to push images to Artifactory, you could call your repository `gen-docker-local`.

5. Choose your environments. These tags affect user access. For example, you can grant allow a user to pull from all repos with the `dev` tag but not the `prod` tag. Make sure you grant the appropriate level of access to the users who need the artifacts in the repository.
6. Enable Xray indexing. Enable other options, if needed. Most of them can be left as their defaults.
8. Save the changes.
Your new repository is set up. If you would like your Artifactory Service Accounts to push to or pull from your new repository, please ensure you follow the instructions in the previous section to add your service account to the project.

---
Related links:
* [Archeobot](bcgov/platform-services-archeobot)
* [Artifactory](https://artifacts.developer.gov.bc.ca)
* [Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/)

Rewrite sources:
* https://github.com/BCDevOps/openshift-wiki/blob/master/docs/Artifactory/ServiceDefinition.md
* https://github.com/BCDevOps/developer-experience/blob/master/apps/artifactory/DEVHUB-README.md
---
