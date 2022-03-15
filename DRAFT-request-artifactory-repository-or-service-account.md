---
title: Request an Artifactory repository or service account

description:

keywords:

page purpose:

audience:

author: Jonathan Bond

content owner:
---

# Request an Artifactory repository or service account

Artifactory access is controlled through Artifactory service accounts. Service accounts are meant to be shared by teams and used by automation tools like pipelines.

We use [Archeobot](bcgov/platform-services-archeobot), a custom operator, to give teams the freedom to manage their own Artifactory resources. With Archeobot, you don't need to do anything in the Artifactory application.

Use the information below to request an Artifactory repository or service account.

## Service account
If you have a project set somewhere in the OpenShift 4 clusters, you already have a service account.

An `ArtifactoryServiceAccount` object is created in the appropriate `tools` namespace, which the Artifactory Operator then actions. One such `ArtifactoryServiceAccount` object is created automatically as part of namespace provisioning and has the name `default`.

There's a random license plate assigned to the end of each object name, in order to ensure uniqueness. Collect this information by running `oc describe artsvcacct default`. This also provides some information about reconciliation status, as well as other details about the account. If you need support with the Artifactory service account object, include the spec and status information in your ticket.

**Note**: Use the short-name in OpenShift for ArtifactoryServiceAccount objects: `ArtSvcAcct`.

You can get the username and password out of the secret using the following command:

```bash
oc get secret/artifacts-default-[random] -o json | jq '.data.username' | tr -d "\"" | base64 -d
oc get secret/artifacts-default-[random] -o json | jq '.data.password' | tr -d "\"" | base64 -d
```
Users with edit and administrator access on the `tools` namespace can also create additional `ArtifactoryServiceAccount` objects on their own. The creator of the service account can also request the creation of a pull secret in addition to the regular secret.

If either of the secrets is deleted manually, the operator can act to change the password of the service account. Then it recreates one or both secrets with the new password. This is an easy method for teams to change their service account passwords.

<!--
## How Do I Get An Artifactory Service Account?

### Can We Have More Than One Artifactory Service Account?

Absolutely! You can make your own, however you like. The default one in your tools namespace is there to get you started, but you're welcome to make more to suit your needs. You can make as many as you like, in as many namespaces as you like (though we ask that you not go too crazy, as our friend Archeobot needs to be able to keep up with all of them)!

You can make one by running this command:

`oc process -f https://raw.githubusercontent.com/bcgov/platform-services-archeobot/master/archeobot/config/samples/tmpl-artifactoryserviceaccount.yaml -p NAME="[ASAname]" -p DESCRIPTOR="[Description of Service Account]" | oc create -f -`

The 'ASAname' will be the name of the the ArtifactoryServiceAccount object - like 'default' above, for the one that is made for you in your tools namespace. It is _not_ the name of the actual account. We recommend using a name that describes the way the account will be used.

Once Archeobot has reconciled your changes, you'll be able to use this account to access Artifactory as you like. You can use all the same commands outlined in the last section - just change `default` to whatever you've named your new ArtSvcAcct object!

For example, if you're making an account specifically for use in your Jenkins pipeline, you might want to use the name 'jenkins' for the Artifactory Service Account object. This will result in a secret called `artifacts-jenkins-[random]` and an account name called `jenkins-[namespace]-[random]`. You don't need to worry about name collisions with other teams - your account name has your namespace plate in it (the six alphanumeric characters that go before the `-tools`, `-dev`, `-test` or `-prod` in the namespace name), so even if there's another team who called their ArtifactoryServiceAccount 'jenkins', they'll still end up with a different name!

### How Do I Delete an Artifactory Service Account?

If you want to delete your service account for some reason, you can do so by deleting the ArtifactoryServiceAccount object through the Openshift CLI, like this:
`oc delete ArtifactoryServiceAccount [ASAname]` or `oc delete artsvcacct [ASAname]`.

Archeobot will notice that you've done this and will clean up all the relevant bits - including any secrets it generated for you, so be careful!

If you try to delete the default one in your tools namespace, it will delete - but a new one (also called `default`) will be recreated, likely within about 5 minutes.

### I Deleted my Artifactory Service Account Secret(s)! What Do I Do Now?!

If you have deleted the secret for the default service account that is automatically created alongside your project set,
you just delete the ArtifactoryServiceAccount object called `default`, which you will find in your `tools` namespace, like so:

`oc delete ArtifactoryServiceAccount default`

Archeobot will detect that this object has been deleted and will remove the service account from Artifactory itself.

Then, the project provisioner will detect the missing ArtifactoryServiceAccount object and will create a new one in your tools namespace, also called `default`. This will likely happen within about 5 minutes. Once that happens, Archeobot will detect this 'new' object and create a new service account for you in Artifactory. The username will be different from before - the random string at the end will change to reflect that this is, technically, a new account with a new password and new privileges.

If you've accidentally deleted the secret(s) for a different Artifactory Service Account (one you created yourself, not the default on in your tools namespace), you follow the same process. The only difference is that the project provisioner will not recreate the object for you. You'll need to do that yourself. Delete the object, wait a few minutes for Archeobot to clean everything up, and then create a new ArtifactoryServiceAccount object. You can use the same ASA name if you'd like - but remember the actual username for the account will be different, because it will have a different random string at the end.


## How Do I Use An Artifactory Service Account?

You can use your Artifactory Service Account to pull public images through Artifactory instead of over the internet. This is faster for you, helps to ease bandwidth pressure on the cluster, and allows us to implement additional security scanning! Win-win-win, with just a little extra setup!

*Note*: These instructions assume that the Artifactory instance is hosted at `https://artifacts.developer.gov.bc.ca/` and a service account with appropriate permissions is already created. All accounts are automatically granted the necessary permissions to access the public caching repos in Artifactory.
-->

<!--
### What Do I Do Once I Have An Artifactory Project?

You'll be able to add repositories, add users to your project (who will then have access to your repositories), adjust the roles that your project uses to determine who has the authorization to perform which tasks in your project, and check the results of any Xray scans on your artifacts!

But first, you'll need to enter the Project in the Artifactory UI so you can see all this neat stuff! Once you've logged in, you'll see a drop-down box at the top of the screen that probably currently says "All". Click on this and select the name of your new Project to enter that project space! If you don't see it, that's because you're either not an admin in the relevant Openshift namespace (in which case you should go ask one of the admins to add you to the Artifactory Project), or you didn't login to Artifactory before creating the project (in which case you need to hit up the Platform Services team to fix it for you).

A couple of little tabs should now have appeared over the menu on the left - one with some boxes, and one with some gears. Click on the gears to enter the administrative tab of your Artifactory Project!



### How Do I Add Users or Service Accounts to My Project?

To add a new account to your project, click on the little gear at the top of the menu on the left, then click on "Identity and Access" Members, and then click on "Add Member" in the top right corner.

Switch to the "Users" tab at the top of the popup, and then search for a username. You can add the IDIR or GitHub user account of anyone who has already logged into Artifactory's GUI at least once - so if you have a team member who hasn't done that, make sure they do! You can also add any Artifactory Service Account. You can select multiple users to add them all at once. Then, you can specify the role you want to grant them. Typically, an Artifactory Service Account should be given the Contributor role, while a user should be given either the Developer role (to manage artifacts) or the Admin role (to manage access to the Project). You can also add additional roles to the Project, if you would prefer more finely-tuned control over who gets access to what.
-->

## Repository request

You can request a repository using the [Just Ask! tool](https://just-ask-web-bdec76-prod.apps.silver.devops.gov.bc.ca/).

Meet with the Artifact Operations team to go through the intended use of the Artifactory service and common practices. The team creates an `ArtifactoryRepository` object in the appropriate `tools` namespace, which the Artifactory Operator then actions.

Once the operator has completed its action, there is a new secret in the same `tools` namespace that contains the repository name, the username, and the password of a new service account which has administrative access over the repository. Use the administrative service account to give work-related access to other service accounts. While it's possible to use the administrative user to push and pull from the new repository, it's not recommended.

<!--
## How Do I Get An Artifactory Private Repository (aka How Do I Get An Artifactory Project)?

We use Artifactory Projects to provide teams with access to private repositories - if you want a private repository where you can push your own images or other artifacts, you'll need a project. If you don't want to be able to push your own images or other artifacts, you don't need a project.

If you want a project, the first thing you'll need to do is login to [Artifactory](https://artifacts.developer.gov.bc.ca) using SSO at least once. When a new project is created, Archeobot uses the list of admins in your namespace to grant those people access to the new Project - they can then turn around and grant other people access as required. But Artifactory doesn't know about those accounts if those people have never logged in before! So be sure to do that - and be sure to login with GitHub (and not IDIR) because your Openshift access is bound to your github account. If you'd like to swap to IDIR later, that's fine, but you should use Github to start!


Once you've done that, create an ArtifactoryProject object on your Openshift namespace, like this:

`oc process -f https://raw.githubusercontent.com/bcgov/platform-services-archeobot/master/archeobot/config/samples/tmpl-artifactoryproject.yaml -p NAME="[APname]" | oc create -f -`

Like with the `ASAname` in the previous section, the `APname` isn't going to completely reflect the name of the Project as it will appear in Artifactory. The Project's name in Artifactory will look something like `[NamespacePlate]-[APname]`. So, if you create an ArtifactoryProject object in the `a1b2c3-tools` namespace and give it an `APname` of `test`, then the Project's full name is going to be `a1b2c3-test`.

The project will *also* be given a shortname, called a Project Key. This will be created automatically using the first letter of your `APname` and 3 digits of your namespace name. So in our example Project, named `a1b2c3-test`, the Project Key will be `ta1b`. The Project Key must be unique.

When Archeobot sees a new ArtifactoryProject in your namespace, the first thing it'll do is send the Platform Team a note that you want a new Project, which we must approve. While you wait for your new ArtifactoryProject to be approved, you can look at it using the command `oc describe artproj [APname]`. You'll see that, under `spec`, there's an entry for your project key, and an `approval_status` field. It should read "pending" (though it might take a few minutes for Archeobot to notice and update the status, so don't fret if it doesn't say 'pending' immediately). This means that we haven't approved or rejected your request for an Artifactory project quite yet!

Once it's approved, you may see the `approval_status` field say "approved". In this situation, Archeobot knows that your ArtifactoryProject has been approved, but it hasn't had a chance to act on it yet and actually make the Project for you in Artifactory. More likely, though, you'll see a status of `nothing-to-approve`. This is the sort of "neutral" status that just tells you that there are no outstanding changes to be made. If you see this, it means that your Project has been created in Artifactory, and you can go [login](https://artifacts.developer.gov.bc.ca)! Yay!

You may notice that... why yes, you *can* patch the `approval_status` field. Does this mean that you can approve your own Project?! No, no it does not. That field is there for informational purposes only, and to let Archeobot know to take a second look at your ArtifactoryProject if it changes. You can change it to `approved` if you want, but that won't do anything and will, rather quickly, result in Archeobot setting it right back to `pending` again.

-->
<!--
### How Do I Make A Repository?

You can add a new repository to your project by clicking on the gear at the top of the menu on the left, then clicking the "Repositories" button and then clicking "Add Repositories" in the top corner. Most of the time, you'll be using a Local repository - though you may have occasion to use a virtual one. We'll get into the differences between those later. If you just want to push images to Artifactory, local is the one you want.

You'll need to pick a package type first. Once you've done that, you'll need to name your new repository. Notice that there's a little greyed-out box with your project key in front of the box where you can enter a name? All repos contained in projects will have the project key as a prefix. You don't need to add that yourself. As for the rest of the name, you should follow this naming convention: `[desc]-[pkgtype]-[location]`. So let's say you want to make just a general use docker repository for your team to push images to Artifactory. You might call your repo `gen-docker-local`. If we continue with the example from the Project creation section with a key of `ta1b`, then the whole name is going to be `ta1b-gen-docker-local`. In order to access this repo later, you'll use the URL `https://artifacts.developer.gov.bc.ca/ta1b-gen-docker-local`.

You might notice that our caching repos follow the same naming scheme - our repo for caching images from RedHat's docker repository, for example, is `redhat-docker-remote`.

You'll also need to pick your environments. These tags only affect access. You can grant a user in your project the ability to pull from all repos with the 'dev' tag, but not the 'prod' tag. Or you can do it vice versa. Make sure that you grant the appropriate access to the users who will need the artifacts in this repo!

You'll also definitely want to enable Xray Indexing at the bottom. Everything else can be left as default (though if you are familiar with these options and wish to change them, feel free to do so).

Click "Save and Finish." Congrats, you have a new repository that you can use! If you haven't done so already, be sure to grant the necessary access to your Artifactory Service Accounts!
-->


---
Rewrite sources:
* https://github.com/BCDevOps/openshift-wiki/blob/master/docs/Artifactory/ServiceDefinition.md
* https://github.com/BCDevOps/developer-experience/blob/master/apps/artifactory/DEVHUB-README.md
---
