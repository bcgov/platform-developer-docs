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
Last updated: **January , 2024**

To push artifacts to Artifactory, you'll need a private repository which is provided through Artifactory Projects. Artifactory Projects are designated areas with quota-based storage that teams can independently manage. Within an Artifactory Project, teams have the flexibility to establish their private repositories—any type and quantity that aligns with their requirements, as long as the storage space falls within the allocated quota.

If your team needs additional quota, you can submit a request. However, it's important to emphasize that teams are encouraged to stay within the default quota whenever possible. Therefore, make sure to regularly clean up old artifacts and tags.

## On this page
- **[Create an Artifactory project](#create-an-artifactory-project)**
- **[Request a larger quota for your Artifactory project](#request-a-larger-quota-for-your-artifactory-project)**
- **[Access your Artifactory project](#access-your-artifactory-project)**
- **[Add users and service accounts to a project](#add-users-and-service-accounts-to-a-project)**
- **[Add a repository to your project](#add-a-repository-to-your-project)**
- **[Related pages](#related-pages)**

---

## Create an Artifactory project

**Before you begin**. Please make sure that someone with admin privileges in your OpenShift namespace has signed into the [Artifactory Web Console](https://artifacts.developer.gov.bc.ca) at least once. 
When an Artifactory Project is created, the initial project admin privileges are granted to those with admin privileges in the related OpenShift namespace, but _only_  if the account already exists in Artifactory.

 You'll need to sign in at least once to make sure your account exists. Otherwise you risk creating a project with no admins! And make sure you're signing in with the same account that has admin privileges in OpenShift, whether that be your GitHub account or your IDIR.

* You can create an `ArtifactoryProject` object in your OpenShift namespace with the following command:

`oc process -f https://raw.githubusercontent.com/bcgov/platform-services-archeobot/master/archeobot/config/samples/tmpl-artifactoryproject.yaml -p NAME="[APname]" | oc create -f -`

* The `APname` won't completely reflect the name of the project as it appears in Artifactory. The project name in Artifactory looks something like `[NamespacePlate]-[APname]`. For example, if you create an `ArtifactoryProject` object in the `a1b2c3-tools` namespace and give it an `APname` of `test`, then the project's full name is `a1b2c3-test`.

* The project is also given a shortname, called a project key. This is created automatically using the first letter of your `APname` and three digits of your namespace name. Using the previous example, the project key is `ta1b`. The project key must be unique.

* When Archeobot sees a new `ArtifactoryProject` in your namespace, it sends the Platform Services team a note that you want a new project, which the team must approve. While you wait for your new `ArtifactoryProject` to be approved, you can look at it using the following command:

    `oc describe artproj [APname]`

* In `spec`, there's an entry for your project key and an `approval_status` box that should show **pending**. This means that we haven't approved or rejected your request for an Artifactory project.

* When the project is approved, the `approval_status` box should show **approved**. In this case, Archeobot knows that your `ArtifactoryProject` is approved, but it hasn't yet made the project for you in Artifactory.

* You may also see **nothing-to-approve**. This status is meant to say that there are no outstanding changes to be made. If you see this, it means that your project is created in Artifactory, and you can [sign in](https://artifacts.developer.gov.bc.ca) with your GitHub or IDIR account and head down to the [Access your new project](#access-your-new-project) section to find out what to do next.

**Note**: While you are able to patch the `approval_status` box, it doesn't mean you can approve your own project. The box is there for informational purposes. If you change it, Archeobot will change  it back.

## Request a larger quota for your Artifactory project

The default quota for any Artifactory Project is set at 5 GB. This allocation should typically meet the requirements of most teams on the platform, provided that the artifacts pushed to Artifactory are managed efficiently. To stay within this limit, teams are required to delete old artifacts that are no longer in use.

In some cases, a team may need more than 5 GB to store their artifacts. In this case, the team can request an increased quota for their project by editing their `ArtifactoryProject` quota. Use the following command:

`oc patch artproj [APName] -p '{"spec":{"quota_in_Gi":"10"}}' --type merge`

This patch action is a request to raise the project quota from 5 GB to 10 GB. If a different number is more appropriate for your needs, feel free to replace the 10. Approval for quota increases adheres to the same process as when initiating the creation of an Artifactory project.

### Rejected requests for projects or quota increases

If your request for a new Artifactory project or a quota increase has been declined, contact the Platform Services team to inquire about the reason.  If you believe the rejection was in error or if your request should have been approved, inform the team. They will review the situation, and if necessary, update the status to `approved` and you'll see the changes implemented.

If the team maintains the rejection, it's crucial to acknowledge it. Failure to do so will result in subsequent change requests being disregarded. Acknowledge the rejection by reverting your `ArtifactoryProject` object to the state it was in before you submitted the request.

* If you requested a new project, delete the `ArtifactoryProject` object from your namespace
* If you have requested an increased quota, revert the quota in the specification of your ArtifactoryProject to the current quota of your project. If you are unsure about the current quota, you can find it on the Overview page for your project in the [Artifactory Web Console](https://artifacts.developer.gov.bc.ca)

Once you've implemented the change, Archeobot will reconcile again, and you'll observe that your `approval_status` reverts to `nothing-to-approve`. Alternatively, if you have deleted the ArtifactoryProject object, you won't see any changes. This indicates that your rejection has been acknowledged, and you are now free to submit additional change requests.

## Access your Artifactory project

After setting up your Artifactory project, you can perform various tasks such as adding repositories and users, adjusting roles, and checking the results of Xray scans on artifacts.

**Note**: To utilize an Artifactory service account with your newly created Artifactory project, it is essential to add that service account to the project. Follow the outlined process in [adding users and service accounts to a project](#add-users-and-service-accounts-to-a-project).

To access the [Artifactory Web Console](https://artifacts.developer.gov.bc.ca), log in. At the top of the page, find the dropdown, likely labeled **All**. Click it and choose your new project. If you don't see your project, it could be due to:

- You might not have administrator privileges in the relevant OpenShift namespace. Request one of the administrators to add you to the project.
- If you haven't logged into Artifactory before creating the project, contact the Platform Services team for assistance. Reach out in the `#devops-artifactory` channel in Rocket.Chat.

On the left side of the screen, the menu is divided into two sections: one with four small boxes and another with two gears.

* The "boxes" tab provides navigation for various artifacts and objects in your Artifactory Project. Initially, it might appear empty, and you could see an "error" on the main page. Don't worry; it simply means you haven't created any repositories or artifacts in your project yet.

* The "gears" tab is for project administration. Here, you'll find tools to add or remove users and create new repositories.

## Add users and service accounts to a project

**Caution!** Before following with these instructions, take a moment to check the title of your browser tab. Does it display "Artifactory Gold" or "Artifactory Gold DR"? If it indicates "Artifactory Gold DR," exercise caution and do not move forward. 

Project privileges are specifically synchronized from Gold to Gold DR and not vice versa. Any alterations to user privileges in your Artifactory Project within Gold DR will be undone once access to Artifactory Gold is reinstated. The use of Artifactory's DR instance is infrequent and temporary, so it's advisable to wait until Artifactory returns to the Gold instance before proceeding with this task. Your patience is appreciated.

After obtaining your project, ensure that you include your Artifactory service account in the project. Having an Artifactory service account is essential for efficiently pushing and pulling artifacts to and from your private repositories. If you haven't set up an Artifactory service account yet, refer to the [Setup an Artifactory service account](../build-deploy-and-maintain-apps/setup-artifactory-service-account.md) documentation.

To add a new user or service account: 

1. Navigate to the top of the left menu and click the gear icon, then select **Identity and Access Members**

2. Click the **Add Member** button at the top-right, opening a pop-up window in the center of the page

3. Head to the **Users** tab and initiate a search for the username
    - When adding a real person, search for either their GitHub username or government email address. If neither is found, it's likely because they haven't logged into the Artifactory Web Console before. They must do so at least once before being added to your project
    - For a service account, searching for the OpenShift namespace name (the 6-character code preceding `-dev`, `-test`, `-prod`, or `-tools`) is likely the easiest way to identify the correct service account If none is found, ensure a service account exists in the searched namespace. Refer to our [Artifactory service account](../build-deploy-and-maintain-apps/setup-artifactory-service-account.md) documentation for further guidance

4. Pick the user(s) you want to include, then choose the desired role from the dropdown below:
   - **Contributor**: Limited access, suitable for users needing only view access
   - **Developer**: Assign this role for managing artifacts. Appropriate for service accounts and most team members
   - **Administrator**: Assign this role for managing project access. Not recommended for service accounts

## Add a repository to your project

**Caution!** Before following with these instructions, take a moment to check the title of your browser tab. Does it display "Artifactory Gold" or "Artifactory Gold DR"? If it indicates "Artifactory Gold DR," exercise caution and do not move forward. 

Creating a repository is an action only synchronized from Gold to Gold DR, not the other way around. If you establish a local repo in Gold DR, it won't automatically convert into a federated repo, leading to loss of access once Artifactory Gold is reinstated. The use of Artifactory's DR instance is infrequent and temporary, so it's advisable to wait until Artifactory returns to the Gold instance before proceeding with this task. Your patience is appreciated.

To add a repository to your project:

1. Navigate to the top of the left menu and click the gear icon, then select **Repositories**.

1. Click the **Add Repositories** button in the top right corner and select "Local Repositories"

3. Choose a package type from the pop-up

4. Create a name for your new repository. All repositories in projects have the project key prefixed automatically. Use the naming convention `[desc]-[pkgtype]-[location]`

    - For example, if you want to make a general-use docker repository for your team to push images to Artifactory, you could call your repository `gen-docker-local`, which would produce a repository with the name `[projkey]-gen-docker-local`

5. Choose your environments. These tags affect user access. For example, you can allow a user to pull from all repositories with the `dev` tag but not the `prod` tag. Make sure you grant the appropriate level of access to the users who need the artifacts in the repository

6. Enable Xray indexing. Enable other options, if needed. Most of them can be left as their defaults

7. Save the changes

This creates a local repository in your Artifactory Project. Within the next 10 minutes, the repository will be automatically converted to a federated repository. As a result it will disappear from the "Local" tab on the Repositories page; instead,  you'll find it in the "Federated" tab. Once a repository becomes federated, its contents are synchronized between the Gold and Gold DR instances of Artifactory. It's important to note that while your repository is still labeled as "Local," it is not being synced with the DR instance of Artifactory.

**Important**: If you included the word "local" in your repository name, the term "local" will not alter even after the repository is federated. The presence of the word "local" in a repository name does not convey any information about the federation status of that repository.

---

## Related pages

* [Archeobot](https://github.com/bcgov/platform-services-archeobot)
* [Artifactory](https://artifacts.developer.gov.bc.ca)
* [Just Ask! tool](https://just-ask.developer.gov.bc.ca/)
* [Setup an Artifactory service account](../build-deploy-and-maintain-apps/setup-artifactory-service-account.md)


