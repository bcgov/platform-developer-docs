---
title: Argo CD usage

slug: argo-cd-usage

description: Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes. Argo CD is available to development teams as a shared service on the Private Cloud platform. Learn about its design, configuration, and how to access it.

keywords: argo cd, instances, argo cd instances, continuous delivery, OpenShift, OpenShift project, namespace, OpenShift namespace

page_purpose: Discusses Argo CD design, configuration, and access for product teams.

audience: developer

author: Ian Watts

content_owner: Ian Watts

sort_order: 6
---

# Argo CD usage
Last updated: **March 18, 2025**

Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes (the foundation of OpenShift). It is efficient, well supported, and well documented.

This document describes how to use Argo CD with your OpenShift project.

It is available to any team on the B.C. government's OpenShift platform and can help teams:

- Implement a GitOps-style deployment service
- Reduce the maintenance overhead of their pipelines
- Reduce resource consumption by using a shared service

## On this page

* [Why Argo CD is good for you](#why-argo-cd-is-good-for-you)
* [Enable Argo CD for your project set](#enable-argo-cd-for-your-project-set)
* [Migration and setup](#migration-and-setup)
* [Create applications in Argo CD](#create-applications-in-argo-cd)
* [Configure your project](#configure-your-project)
* [Optional GitHub Webhook](#optional-github-webhook)
* [Nonprod access](#nonprod-access)
* [Related pages](#related-pages)

## Why Argo CD is good for you

Argo CD offers several advantages over other tools like Jenkins. It's tailor-made for Kubernetes, ensuring efficiency, strong support, and comprehensive documentation. With Argo CD, all Kubernetes resource definitions are managed in YAML manifests within a Git repository. The tool monitors this repository, maintaining application state on the cluster to match the desired state defined in the manifests. 

Here's why this approach is beneficial:

* All changes to applications are logged as Git commits, providing a detailed history of modifications
* Rollbacks can be achieved by reverting to a previous commit
* The configuration is portable, facilitating  application migration to different hosts
* Argo CD seamlessly integrates with CI/CD pipelines
* Support for Kustomize and Helm meets the needs of most teams
* Integration with pipeline tools like GitHub Actions or OpenShift Pipelines eliminates the need for teams to manage their own pipeline infrastructure

## Enable Argo CD for your project set

To set up Argo CD for your project, a self-serve system is available. Follow these instructions to begin. If your project requires a ministry-wide grouping of projects within Argo CD, please contact  [PlatformServicesTeam@gov.bc.ca](mailto:PlatformServicesTeam@gov.bc.ca).

1. Prepare a 'GitOpsTeam' CustomResource:
  * Utilize the provided template: [GitOpsTeam template](../../files/argocd/gitopsteam_template.yaml){:download="gitopsteam_template.yaml"}
  * Populate the file using the inline comments
  * If you would like to add GitHub **teams** to the gitops repo access list, note that they go in a separate "Teams" list.  For example, admin users go into the `admins` list while admin teams go into the `adminTeams` list. 
  
2.  Ensure that all users in the 'projectMembers' group have a Keycloak ID in the realm used by Argo CD. They can do this by attempting to access the Argo CD UI for the given cluster:

  * [Silver](https://gitops-shared.apps.silver.devops.gov.bc.ca)
  * [Gold](https://gitops-shared.apps.gold.devops.gov.bc.ca) and [Gold DR](https://gitops-shared.apps.golddr.devops.gov.bc.ca)
  * [Emerald](https://gitops-shared.apps.emerald.devops.gov.bc.ca)

3. Create the GitOpsTeam CustomResource in your **tools** namespace:

  * Run the following command:  `oc -n myproject-tools create -f gitopsteam.yaml`

After creation of the GitOpsTeam resource, an OpenShift operator will:

4. Create a "gitops" repo for your project
  * This is the repository that Argo CD will read for your application manifests
 
    **Note:** This repo is in the `bcgov-c` GitHub Organization, which has a limited number of seats and requires that users reply to an invitation from GitHub to join the organization. Please limit access to this repo to just those team members that require access for manual updates. Most updates will be made by your **pipeline**

  * Your gitops repo will be called `bcgov-c/tenant-gitops-licenseplate`

5. Create Keycloak groups used for controlling access to your Project in the ArgoCD UI
6.  Create the Argo CD Project

### Set access for the GitHub repo (optional)

If you have a pipeline that will require write access to your gitops repo, you can do this by generating an SSH key pair and adding it as a Deploy Key in the repo.

Follow these steps to create an SSH key. You can do this on a Linux or Mac system. Choose a clear name for the key.

`ssh-keygen -f tenant-gitops-mylicenseplate`

In your "tenant-gitops-" repo, add the key as a Deploy Key:

* Click `Settings` --> `Deploy keys` --> `Add deploy key`
* Enter a descriptive name for the key, such as "read-write"
*  Copy the contents of the PUBLIC key (the file with the .pub extension) into the key field but **remove** the 'user@host' bit at the very end of the line.
* Check the checkbox for "allow write access"
* Save the deploy key

Next, add the private key as a Secret for your pipeline. If you're using GitHub Actions, add the Secret in the repository where the Action runs. For OpenShift Pipelines (Tekton), add the Secret in your tools namespace.

Choose a meaningful name for the Secret, such as MANIFEST_REPO_DEPLOY_KEY. Then, paste the entire contents of the PRIVATE key file (excluding file extension) into the value of the secret, including the BEGIN and END lines.

## Migration and setup

Before configuring an application in Argo CD, it's essential to prepare the Git repository where Argo CD will read manifest files from. The setup of this repository depends on the current deployment strategy of the application.

While there's no strict requirement for the structure of the manifest repository, we recommend organizing it by creating a directory for each application. Additionally, when setting up each application in Argo CD, you can define a repository path along with optionally specifying a branch or tag.

### What style of deployment is used?

Argo CD supports several deployment strategies, including:

* Helm
* Kustomize
* Ksonnet (being deprecated)
* Jsonnet

This document focuses on Helm and Kustomize.

#### Helm

If you're using [Helm](https://argo-cd.readthedocs.io/en/release-2.0/user-guide/helm/), you likely already have a collection of files ready, which can be smoothly migrated to the manifest repository. 

Start by creating a top-level directory dedicated to your application. Place all Helm files within this directory. Additionally, place your values files in the same directory, naming them according to their respective environments. When setting up the application in the Argo CD UI, you'll need to specify the path to the values file.

#### Kustomize

[Kustomize](https://argo-cd.readthedocs.io/en/release-2.0/user-guide/kustomize/) is a more generic system, which allows you to declare a default set of resources and then configure just the differences from default for each environment.

If your application is already set up for Kustomize, then you just need to move your Kustomize files into the manifest repo.

If moving an existing application to Kustomize and Argo CD for the first time, some effort will have to be made to generate the manifest files. The live manifests can be fetched from OpenShift using the command line. Certain fields will have to be removed, however, as OpenShift adds a number of fields for internal resource management. 

A [shell script](../../files/argocd/get_ns_resources.sh){:download="get_ns_resources.sh"} has been prepared to help with the manifest creation.

Once the manifest files have been generated, the repo structure is prepared. Within the manifest repo, in the top-level directory for the given application, create the following directories:

- base
- overlays
- overlays/dev
- overlays/test
- overlays/prod

Copy the manifest files to the `base` directory. If you use custom SSL certificates for your routes, they will have to be removed from the manifest file and replaced with a reference to a Secret, from which they will be populated at deployment time. Do not include certificate info in your manifest repository.

Create a file `base/kustomization.yaml` containing a list of all manifest files. For example:

```
resources:
- configmap.my-app.yaml
- deployment.my-app.yaml
- route.my-app.yaml
- service.my-app.yaml
```

In the `overlays/dev` directory, you'll need to:

* Create any "patch" files that define differences from the default
* Create kustomization.yaml

**Patch files**

These files should contain individual modifications to a resource. For a larger resource, such as a Deployment, it is recommended to create multiple patch files, one for each change.

Each patch file starts with the apiVersion, kind, and metadata name of the resource, followed by the change. For example, to set the replica count for a Deployment:

```
apiVersion: apps.openshift.io/v1
kind: Deployment
metadata:
  name: my-app1
spec:
  replicas: 2
```

**kustomization.yaml**

The kustomization.yaml file will likely contain several sections. Firstly, it specifies the apiVersion and kind, similar to a patch file, and includes a list of resources, starting with the base directory.

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- ../../base
```

Patch files are included in a list under the heading patchesStrategicMerge, such as:

```
patchesStrategicMerge:
- deployment.my-app1.replicas.yaml
- route.my-app1.yaml
```

Images are also managed in kustomization.yaml. In an 'images' section, create an entry for each image that is likely to be updated by your pipeline. Each image listing has three parts:

* name: The placeholder name of the image that you use in your base file
* newName: The base URL of the image
* digest: The unique ID of the image
  In this way, your pipeline build will be able to update the image ID for a given environment.

A kustomization.yaml example with all three sections:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- ../../base
patchesStrategicMerge:
- deployment.my-app1.replicas.yaml
- route.my-app1.yaml
images:
- name: my-app1-image
  newName: image-registry.openshift-image-registry.svc:5000/mylicenseplate-tools/myapp1buildconfigname
  digest: sha256:7da096fa377221d82a28f9b7888130b89382f61ea54018f1b8d26218173ec4eb
```

Consult the Kustomize documentation for more information, as this doc is meant to just get you started.

* [Kubectl guides](https://kubectl.docs.kubernetes.io/guides/)
* [Kustomize.io guides](https://kustomize.io/)

### Control the deployment sequence

If you have some resources that should be processed before others, you can use the Argo CD notion of 'sync-waves'. Resources having sync waves with lower numbers are processed before those having sync waves with higher numbers. To utilize this, add a sync-wave setting to metadata.annotations. 

For example:

```
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "2"
```

## Create applications in Argo CD

Once the manifest repo has a deploy key configured and the manifests themselves have been added, you are almost ready to add the application in Argo CD. 

**Before you do** make sure that the target namespace can tolerate a disruption. 

Once you create the application in Argo CD and synchronize it, Argo CD will begin updating resources, so if there is a problem with your manifests, existing resources could be affected.

### Create the application

In the Argo CD UI, click the applications link at the top of the left-side navigation. Click 'New App'.

* Application Name: Application names must be unique across all projects. Give your app a meaningful name that includes the target environment. A good naming convention would be to put the license plate or project name at the beginning, followed by the app name, followed by the environment, such as `abc123-myapp1-dev`

* Project: Select your project from the dropdown menu

* Sync Policy and Sync Options: Can be left alone until you know what you need

* Source repository URL: Use an HTTPS URL for your manifest repo, such as `https://github.com/bcgov-c/tenant-gitops-abc123.git`

* Source revision: Leave this as "HEAD" if you are using the master branch, otherwise enter the branch name. You can also set the dropdown to TAG and enter a tag name

* Source path: Enter the path within the manifest repo, for example `my-app1/overlays/dev`

* Destination cluster URL: Select the local cluster URL from the dropdown. This is the only option

* Destination Namespace: Enter the target namespace, such as `abc123-dev`

* Click 'Create'

If you get an error message when trying to create the application, read the error carefully and try to fix it, then recreate the app

### Synchronize the application

Once the application is created successfully and automatic synchronization is not yet enabled:
  * Click on the application from the application list page.
  * Argo CD will have scanned the manifest repository files already, indicating 'out of sync'.
  * To start synchronization:
    * Click the 'Sync' button, followed by 'Synchronize'.
    * The duration depends on the number of resources defined for the application.
* If synchronization fails:
  * Click on the 'failed' message to review explanations.
  * Potential issues may stem from manifest files or repository configuration.
* If synchronization succeeds but still shows as "progressing" or if individual resources are not synchronized:
  * Click on the unhealthy resource and navigate to the 'Events' tab to identify the problem.
* Once satisfied with the setup, consider enabling automatic synchronization.

### Apps in Any Namespace
Now, you can create your ArgoCD applications directly from a manifest in your OpenShift namespace, instead of solely relying on the UI. This simplifies your GitOps setup by removing a manual step and empowers ArgoCD to manage its own applications.

This feature allows you to  create an application in any of your project's namespaces, meaning any of your dev, test, prod, or tools namespaces.  

For details on how to create your application manifest, see the [ArgoCD documentation for Applications](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#applications).

After verifying the manifest, you can add it to your GitOps repository and manage it alongside other resources.

## Configure your project
Please note that there are certain constraints applied to projects and applications within this shared Argo CD instance.

**Source Repository**

This is the repository that can be used as the source repo for an application and is limited to the new GitHub repo (tenant-gitops-licenseplate) that was created for you. You can use only this repo as the source for applications for this project. This limitation exists partly to prevent applications from being created from third-party sources that may not be safe, and partly to simplify automation associated with this service.

**Destination**

Each Argo CD Project is associated with an OpenShift project set (license plate). The destination of an application is its namespace. A Project can deploy applications only to namespaces within its project set (tools, dev, test, prod).

**Namespace resources**

There are a few namespace-scoped resources that you will not be able to modify. Mostly this is to avoid circumvention of quotas, and to also prevent the possible accidental deletion of an entire namespace.

* ClusterRole
* LimitRange
* Namespace
* Node
* ResourceQuota

### Project access control

Access to the gitops repository and the Argo CD UI is controlled by way of the GitOpsTeam resource in your `-tools` namespace. After editing this resource, the operator will make any updates shortly after (typically less than a minute).

Access to the Git repository includes five sets of permissions.

Access to the Argo CD UI includes two sets of permissions: read/write and read-only

See the [GitOpsTeam template](../../files/argocd/gitopsteam_template.yaml){:download="gitopsteam_template.yaml"} for more details. 

## Optional GitHub Webhook
Argo CD polls each Git repository every three minutes to see if there have been any changes.  In a big cluster like Silver, there are many applications and it could take a little longer for Argo CD to fetch and apply changes.  If you would like to have your apps get updated right away after a change has been made in your GitHub repo, you can add a webhook.  Upon receiving the webhook from your repo, Argo CD will refresh any applications that have that repo as a source.  That is, just your apps will get refreshed at that moment; other apps will get refreshed at the usual polling interval.

**Note**: This is not available for the Emerald cluster, because the API there is not reachable from GitHub.

To add a webhook in your GitHub repo, log in to GitHub, go to your repo, then click Settings --> Webhooks --> Add webhook

Enter the following information:

* Payload URL: `https://gitops-shared.apps.CLUSTERNAME.devops.gov.bc.ca/api/webhook`
* Content type: application/json
* Secret: (This is just to prevent abuse of the API endpoint by outside parties.  You can find the secret in the description of the Rocketchat channel "#devops-argocd".)
* SSL verification: keep the default "Enable SSL verification"
* Which events would you like to trigger this webhook?: This is up to you to determine the conditions under which the webhook is triggered.
* Active: keep this box checked in order to enable the webhook

Click "Add webhook"

After saving the webhook, a repo action of the type that you specified should trigger a call to Argo CD's webhook API, causing your apps to refresh.

## Nonprod access
A second ArgoCD project is created for non-prod access.  It is configured with access to the dev, test, and tools namespaces, but not prod.

If you have users that should have access to ArgoCD, but that should not be able to deploy to your prod environment, add them to the `nonprod` list in the GitOpsTeam's `projectMembers` section.  If you would like them to be able to view the prod ArgoCD apps, then also add them to the `readers` list under `projectMembers`.

'maintainers' and 'readers' will be able to see apps in both the default and nonprod projects.

Note that although the nonprod project has permission to deploy to the `tools` namespace, it cannot overwrite a GitOpsTeam or GitOpsAlliance resource there.

## Related pages

* [Current Argo CD version, as of February 2025: v2.13](https://github.com/argoproj/argo-cd/tree/v2.13.1)
* [Kustomize.io](https://kustomize.io)
* [Helm](https://helm.sh/)

