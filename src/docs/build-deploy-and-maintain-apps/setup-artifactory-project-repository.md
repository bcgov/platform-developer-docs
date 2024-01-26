---
title: Set up an Artifactory project and repository

slug: setup-artifactory-project-repository

description: Describes how a user can set up their Artifactory project and repositories

keywords: Archeobot, Artifactory, images, artifact, Artifactory management, service account

page_purpose: Details how to set up an Artifactory project and repository. Includes guidance on access and commands.

audience: technical lead, developer

author: Jonathan Bond

content_owner: Cailey Jones

sort_order: 9
---

# Set up an Artifactory project and repository

If you want to push artifacts to Artifactory, you'll need a private repository. This feature is provided via Artifactory Projects. Artifactory Projects are logical spaces of quota-based storage which teams can administer themselves. Within an Artifactory Project, a team can create their own private repositories - any number and any type that suits their needs, so long as the storage space required for these repositories remains within the provided quota.

## On this page
- [Create an Artifactory project](#create-an-artifactory-project)
- [Request a larger quota for your Artifactory project](#request-a-larger-quota-for-your-artifactory-project)
- [Accessing your Artifactory project](#accessing-your-artifactory-project)
- [Add users and service accounts to a project](#add-users-and-service-accounts-to-a-project)
- [Add a repository to your project](#add-a-repository-to-your-project)

A team can request more quota if required, but note that teams are expected to try to remain within the default quota as much as possible - so be sure to clean up your old artifacts and tags.

## Create an Artifactory project

**HEY WAIT! BEFORE YOU START!!** Please make sure that someone with admin privileges in your OpenShift namespace has signed into the [Artifactory Web Console](https://artifacts.developer.gov.bc.ca) at least once. When an Artifactory Project is created, the initial project admin privileges are granted to those with admin privileges in the related OpenShift namespace, but _only if the account already exists in Artifactory_. You'll need to sign in at least once to make sure your account exists, otherwise you risk creating a project with no admins! And make sure you're signing in with the same account that has admin privileges in OpenShift, whether that be your GitHub account or your IDIR.

You can create an `ArtifactoryProject` object in your OpenShift namespace with the following command:

`oc process -f https://raw.githubusercontent.com/bcgov/platform-services-archeobot/master/archeobot/config/samples/tmpl-artifactoryproject.yaml -p NAME="[APname]" | oc create -f -`

The `APname` won't completely reflect the name of the project as it appears in Artifactory. The project name in Artifactory looks something like `[NamespacePlate]-[APname]`. For example, if you create an `ArtifactoryProject` object in the `a1b2c3-tools` namespace and give it an `APname` of `test`, then the project's full name is `a1b2c3-test`.

The project is also given a shortname, called a project key. This is created automatically using the first letter of your `APname` and three digits of your namespace name. Using the previous example, the project key is `ta1b`. The project key must be unique.

When Archeobot sees a new `ArtifactoryProject` in your namespace, it sends the Platform Services team a note that you want a new project, which the team must approve. While you wait for your new `ArtifactoryProject` to be approved, you can look at it using the following command:

`oc describe artproj [APname]`.

In `spec`, there's an entry for your project key and an `approval_status` box that should show **pending**. This means that we haven't approved or rejected your request for an Artifactory project.

When the project is approved, the `approval_status` box should show **approved**. In this case, Archeobot knows that your `ArtifactoryProject` is approved, but it hasn't yet made the project for you in Artifactory.

You may also see **nothing-to-approve**. This status is meant to say that there are no outstanding changes to be made. If you see this, it means that your project is created in Artifactory, and you can [sign in](https://artifacts.developer.gov.bc.ca) with your GitHub or IDIR account and head down to the [Access your new project](#access-your-new-project) section to find out what to do next.

**Note**: While you are able to patch the `approval_status` box, it doesn't mean you can approve your own project. The box is there for informational purposes. If you change it, Archeobot changes it back.

## Request a larger quota for your Artifactory project

The default quota for any Artifactory Project is 5 GB. This should be sufficient for the needs of most teams on the platform, as long as the artifacts pushed to Artifactory are well-controlled. Teams must delete old artifacts that are no longer in use in order to remain below this threshold.

In some cases, a team may need more than 5 GB to store their artifacts. In this case, the team can request an increased quota for their project by editing their `ArtifactoryProject` quota. Use the following command:

`oc patch artproj [APName] -p '{"spec":{"quota_in_Gi":"10"}}' --type merge`

This patch action requests an increase in the project quota from 5 GB to 10 GB. You may replace the 10 with another number, as needed. Requests for quota increases follow the same approval process as when you create an Artifactory project.

### Rejected requests for projects or quota increases

If you've made a request for a new Artifactory project or quota increase and it was rejected, reach out to the Platform Services team to ask why. If you think your request was rejected in error, let the team know. If the request should have been approved, they'll switch the status to `approved` and you'll see the changes applied.

If the team maintains the rejection, make sure you acknowledge the rejection. If you don't, further change requests are ignored. Acknowledge the rejection by changing your `ArtifactoryProject` object back to the state it was in before you made the request.
* If you requested a new project, delete the `ArtifactoryProject` object from your namespace.
* If you requested an increased quota, change the quota in the spec of your ArtifactoryProject back to the current quota of your project. If you're not sure what the quota is, check the Overview page for your project in the [Artifactory Web Console](https://artifacts.developer.gov.bc.ca).

After you've made the change, Archeobot reconciles once more and you'll see that your `approval_status` changes back to `nothing-to-approve` (or you will have deleted the ArtifactoryProject object, in which case you won't see anything at all). This means your rejection has been acknowledged and you can make further change requests.

## Accessing your Artifactory project

Once you have your Artifactory project you can add repositories and users, adjust roles and check the results of Xray scans on artifacts.

**Note**: To use an Artifactory service account with your new Artifactory project, you must add that service account to the project. You can follow the process outlined in [Add users and service accounts to a project](#add-users-and-service-accounts-to-a-project).

To use these features, log into the [Artifactory Web Console](https://artifacts.developer.gov.bc.ca). Near the top of the page, you'll see a drop-down that will probably say **All**. Click on this dropdown and select your new project. If you don't see your new project, it may be because of one of the following:
* You may not be an administrator in the applicable OpenShift namespace. Ask one of the administrators to add you to the project.
* You may not have logged in to Artifactory before creating the project. Contact the Platform Services team to fix the issue. You can reach out in the `#devops-artifactory` channel in Rocket.Chat.

The menu on the left of the screen is divided into two sections: one marked with four little boxes, and one marked with two gears. 
* The "boxes" tab contains the navigation of the various artifacts and objects in your Artifactory Project. Initially, you won't see anything here and you may see an "error" on the main page; that's normal, and just indicates that you haven't created any repositories or artifacts in your project yet.
* The "gears" tab is for the administration of the project. This is where you will find the tools to add or remove users, or create new repositories. 

## Add users and service accounts to a project

**STOP!** Before you follow these steps, check the title of your browser tab - does it say "Artifactory Gold" or "Artifactory Gold DR"? If it says "Artifactory Gold DR", do not proceed. Project privileges are among the Artifactory settings that are only synced from Gold to Gold DR, and not the other way around. If you add or remove any user privileges in your Artifactory Project in Gold DR, these changes will be reverted once access to Artifactory Gold is restored. The use of Artifactory's DR instance is rare and temporary - please wait until Artifactory has returned to the Gold instance before you proceed with this task.

Once you've gotten your project, make sure to add your Artifactory service account to the project. You _need_ an Artifactory service account to effectively push and pull artifacts to and from your private repositories. If you don't have an Artifactory service account yet, check out the [Setup an Artifactory service account](/setup-artifactory-service-account/) documentation.

To add a new user or service account: 
1. Click the gear at the top of the menu on the left, then choose **Identity and Access Members**. 
1. Click **Add Member** button on the top-right. This will open a little pop-up window in the middle of the page.
1. Move to the the **Users** tab and then search for a username.
    - if you're adding a real person, search for either their GitHub username or their government email address. If you can't find either, it's probably because they haven't logged into the Artifactory Web Console before. They'll need to do that at least once before you can add them to your project.
    - if you're adding a service account, searching for the OpenShift namespace name (the 6-character code that comes before `-dev`, `-test`, `-prod` or `-tools`) is probably the easiest way to find the correct service account! If you can't find one, make sure a service account actually exists in the namespace you're searching for. Check out our [Artifactory service account](/setup-artifactory-service-account/) documentation for details.
1. Select the user(s) you wish to add, then select the role you'd like to give them from the dropdown below:
    - **Contributor**: Limited access. Recommended for users who only require view access.
    - **Developer**: Assign this role if you want the account to manage artifacts. This role is appropriate for service accounts and most team members.
    - **Administrator**: Assign this role if you want the account to manage access to the project. Not recommended for service accounts.

## Add a repository to your project

**STOP!** Before you follow these steps, check the title of your browser tab - does it say "Artifactory Gold" or "Artifactory Gold DR"? If it says "Artifactory Gold DR", do not proceed. Repository creation is a task that is only synced from Gold to Gold DR, and not the other way around. If you create a local repo in Gold DR, it will not automatically turn into a federated repo, and you will lose access to this repository once access to Artifactory Gold is restored. The use of Artifactory's DR instance is rare and temporary - please wait until Artifactory has returned to the Gold instance before you proceed with this task.

To add a repository to your project:
1. Click the gear icon and then choose **Repositories**. 
1. Click the **Add Repositories** button in the top right corner and select "Local Repositories"
3. Choose a package type.
4. Create a name for your new repository. All repositories in projects have the project key prefixed automatically. Use the following naming convention:

  `[desc]-[pkgtype]-[location]`

  For example, if you want to make a general-use docker repository for your team to push images to Artifactory, you could call your repository `gen-docker-local`, which would produce a repository with the name `[projectkey]-gen-docker-local`.

5. Choose your environments. These tags affect user access. For example, you can allow a user to pull from all repositories with the `dev` tag but not the `prod` tag. Make sure you grant the appropriate level of access to the users who need the artifacts in the repository.
6. Enable Xray indexing. Enable other options, if needed. Most of them can be left as their defaults.
8. Save the changes.

This creates a local repository in your Artifactory Project. Within the next ten minutes, the repository will be automatically converted to a federated repository. This means it will disappear from the "Local" tab on the Repositories page - you'll find it instead in the "Federated" tab. Once a repository is federated, its contents are being synced between the Gold and Gold DR instances of Artifactory. Be aware that, while your repository remains "Local", it is _not_ being synced with the DR instance of Artifactory.

Note: If you included the word "local" in your repository name, the word "local" will not change once the repository is federated. If you see the word "local" in a repo name, that doesn't indicate anything about the federation status of that repository.

---
Related links:
* [Archeobot](https://github.com/bcgov/platform-services-archeobot)
* [Artifactory](https://artifacts.developer.gov.bc.ca)
* [Just Ask! tool](https://just-ask.developer.gov.bc.ca/)
* [Setup an Artifactory service account](/setup-artifactory-service-account/)

---
