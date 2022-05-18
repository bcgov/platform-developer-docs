---
title: Setup an Artifactory project and repository

slug: setup-artifactory-project-repository

description: Describes how a user can set up their Artifactory project and repositories

keywords: Archeobot, Artifactory, images, artifact, Artifactory management, service account

page_purpose: Details how to set up an Artifactory project and repository. Includes guidance on access and commands.

audience: technical lead, developer

author: Jonathan Bond

content_owner: Cailey Jones

sort_order: 8
---

# Set up an Artifactory project and repository

If your team wishes to push artifacts to Artifactory, you will require a private repository to do so. This feature is provided via Artifactory Projects. Artifactory Projects are logical spaces of quota-based storage which teams can administer themselves. Within an Artifactory Project, a team can create their own private repositories - any number and any type that suits their needs, so long as the storage space required for these repositories remains within the provided quota.

## On this page
- [Create an Artifactory project](#create-project)
- [Request a larger quota for your Artifactory project](#request-quota)
- [Access your new project](#access-project)
- [Add users and service accounts to a project](#add-users)
- [Add a repository to your project](#add-repo)

A team can request more quota if required, but note that teams are expected to try to remain within the default quota as much as possible - so be sure to clean up your old artifacts and tags.

## Create an Artifactory project<a name="create-project"></a>
Artifactory Projects give teams access to private repositories. If you want a private repository where you can push your own images or other artifacts, you'll need a project. If you don't want to be able to push your own images or other artifacts - if you only wish to use Artifactory remote repositories - you don't need a project.

You can create an `ArtifactoryProject` object on your OpenShift namespace with the following command:

`oc process -f https://raw.githubusercontent.com/bcgov/platform-services-archeobot/master/archeobot/config/samples/tmpl-artifactoryproject.yaml -p NAME="[APname]" | oc create -f -`

The `APname` won't completely reflect the name of the project as it appears in Artifactory. The project name in Artifactory looks something like `[NamespacePlate]-[APname]`. For example, if you create an `ArtifactoryProject` object in the `a1b2c3-tools` namespace and give it an `APname` of `test`, then the project's full name is `a1b2c3-test`.

The project is also given a shortname, called a project key. This is created automatically using the first letter of your `APname` and three digits of your namespace name. Using the previous example, the project key is `ta1b`. The project key must be unique.

When Archeobot sees a new `ArtifactoryProject` in your namespace, it sends the Platform Services team a note that you want a new project, which the team must approve. While you wait for your new `ArtifactoryProject` to be approved, you can look at it using the following command:

`oc describe artproj [APname]`.

In `spec`, there's an entry for your project key and an `approval_status` box that should show **pending**. This means that we haven't approved or rejected your request for an Artifactory project.

When the project is approved, the `approval_status` box should show **approved**. In this case, Archeobot knows that your `ArtifactoryProject` is approved, but it hasn't yet made the project for you in Artifactory.

You may also see **nothing-to-approve**. This status is meant to say that there are no outstanding changes to be made. If you see this, it means that your project is created in Artifactory, and you can [sign in](https://artifacts.developer.gov.bc.ca).

**Note**: While you are able to patch the `approval_status` box, it doesn't mean you can approve your own project. The box is there for informational purposes. If you change it, Archeobot changes it back.

## Request a larger quota for your Artifactory project<a name="request-quota"></a>

The default quota for any Artifactory Project is 5 GB. This should be sufficient for the needs of most teams on the platform, as long as the artifacts pushed to Artifactory are well-controlled. Teams must delete old artifacts that are no longer in use in order to remain below this threshold.

In some cases, a team may need more than 5 GB to store their artifacts. In this case, the team can request an increased quota for their project by editing their `ArtifactoryProject` quota. Use the following command:

`oc patch artproj [APName] -p '{"spec":{"quota":"10"}}' --type merge`

This patch action requests an increase in the project quota from 5 GB to 10 GB. You may replace the 10 with another number, as needed. Requests for quota increases follow the same approval process  as when you create an Artifactory project.

### Rejected requests for projects or quota increases
If you've made a request for a new Artifactory project or quota increase and it was rejected, reach out to the Platform Services team to ask why. If you think your request was rejected in error, let the team know. If the request should have been approved, they'll switch the status to `approved` and you'll see the changes applied.

If the team maintains the rejection, make sure you acknowledge the rejection. If you don't, further change requests are ignored. Acknowledge the rejection by changing your `ArtifactoryProject` object back to the state it was in before you made the request.
* If you requested a new project, delete the `ArtifactoryProject` object from your namespace.
* If you requested an increased quota, change the quota in the spec of your ArtifactoryProject back to the current quota of your project. If you're not sure what the quota is, check the Overview page for your project in the Artifactory web GUI.

After you've made the change, Archeobot reconciles once more and you'll see that your `approval_status` changes back to `nothing-to-approve` (or you will have deleted the ArtifactoryProject object, in which case you won't see anything at all). This means your rejection has been acknowledged and you can make further change requests.

## Access your new project<a name="access-project"></a>

Once you have your Artifactory project you can add repositories and users, adjust roles and check the results of Xray scans on artifacts.

**Note**: To use an existing Artifactory service account with your new Artifactory project, you must add that service account to the project. If you created the `ArtifactoryProject` object in the same OpenShift namespace as an existing `ArtifactoryServiceAccount` object, the related service account isn't automatically given access to the project.

To use these features, enter the project in the Artifactory UI. Log in and expand **All**. Choose your new project to go to that project space. If you don't see your new project, it may be because of one of the following:
* You may not be an administrator in the applicable OpenShift namespace. Ask one of the administrators to add you to the project.
* You may not have logged in to Artifactory before creating the project. Contact the Platform Services team to fix the issue. You can reach out in the `#devops-artifactory` or `#devops-how-to` channels in Rocket.Chat.

After you've entered the project in the Artifactory UI, some tabs with boxes and gears are visible. Click the gears to enter the administrator space in your project.

## Add users and service accounts to a project<a name="add-users"></a>

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

## Add a repository to your project<a name="add-repo"></a>

To add a repository to your project, do the following:
1. Click the gear icon and then choose **Repositories**. Click **Add Repositories**.
2. Choose a local repository. If you only need to push images to Artifactory, use a local repository.
3. Choose a package type.
4. Create a name for your new repository. All repositories in projects have the project key prefixed automatically. Use the following naming convention:

  `[desc]-[pkgtype]-[location]`

  For example, if you want to make a general-use docker repository for your team to push images to Artifactory, you could call your repository `gen-docker-local`.

5. Choose your environments. These tags affect user access. For example, you can allow a user to pull from all repositories with the `dev` tag but not the `prod` tag. Make sure you grant the appropriate level of access to the users who need the artifacts in the repository.
6. Enable Xray indexing. Enable other options, if needed. Most of them can be left as their defaults.
8. Save the changes.
Your new repository is set up. If you would like your Artifactory Service Accounts to push to or pull from your new repository, please ensure you follow the instructions in the previous section to add your service account to the project.

---
Related links:
* [Archeobot](bcgov/platform-services-archeobot)
* [Artifactory](https://artifacts.developer.gov.bc.ca)
* [Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/)
* [Setup an Artifactory service account](/setup-artifactory-service-account/)

Rewrite sources:
* https://github.com/BCDevOps/openshift-wiki/blob/master/docs/Artifactory/ServiceDefinition.md
* https://github.com/BCDevOps/developer-experience/blob/master/apps/artifactory/DEVHUB-README.md
---
