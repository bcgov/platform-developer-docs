# Argo CD Image Updater
The image updater automatically detects new versions of images used in your Argo CD-managed deployments and applies them according to your configuration.

## Overview
Create an `ImageUpdater` custom resource in the same namespace as your Argo CD application and define the scope of acceptable image tags.  Argo CD will monitor the container registry and when it finds a newer image that meets your criteria, it will automatically apply the new image to your deployment, saving you extra steps or manual intervention.

If the app has auto-sync enabled, the change in image will be applied immediately; if not, the app will show as out of sync and may be updated by manually syncing it.

## Requirements
* The deployment must be managed with either **Helm** or **Kustomize**.
* The Argo CD Application must be in your own namespace.
* The ImageUpdater CR must be in the same namespace.
* If the container repo is private, a pull secret must be configured in the ImageUpdater, as well as RBAC for the controller to read the pull secret.

## Documentation
* [Argo CD Image Updater](https://argocd-image-updater.readthedocs.io/en/stable/)
* [Red Hat GitOps Operator: Using Argo CD Image Updater](https://docs.redhat.com/en/documentation/red_hat_openshift_gitops/1.21/html/argo_cd_instance/using-argo-cd-image-updater)

## Setup
Firstly, the Argo CD Application must be in your namespace.  The tools namespace would be a good choice.  If you originally created the application via the Argo CD UI, you would need to recreate it in your own namespace before proceeding.

Secondly, the application **must use Helm or Kustomize**, otherwise Argo CD won't be able to apply the image change automatically.

You probably won't have to make any changes to the application configuration unless it's a Helm chart that does not parameterize the image tag.

## Update methods
Argo CD keeps track of image updates using one of two methods:
* `argocd` - (default) Image status is written to the Argo CD application.
* `git` - Image status is written to a new file in the app's Git repository.

For now, because the image updater controller has not been granted write access to your GitOps repo, **only the 'argocd' option is available**.

## Update strategies
Update strategies determine how Argo CD will look for new versions of an image.
* `semver` - Use semantic versioning constraints
* `newest-build` - Use the most recent image
* `digest` - Use the most recent version of a given tag by using the SHA digest
* `alphabetical` - Sort tags alphabetically and use the "highest" one

See the [Argo CD documentation](https://argocd-image-updater.readthedocs.io/en/stable/basics/update-strategies/) for more information.

## Examples
The following examples do not represent all of the available options.  They are meant to help you understand how the image updater can be used and to reduce the time it takes to set up your own app.  Refer to the documentation links for complete details.

### Example 1 - Helm
The Helm chart must have a parameter for the image tag.

Suppose the Helm chart has a Deployment template that specifies the image as:
```
image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
```

and has a values file that defines the image name and tag:
```
image:
  repository: caddy
  tag: "2.10.1"
```

The following ImageUpdater uses a 'newest-build' strategy, but also adds an 'allowTags' field to limit updates to the `2.10.x` pattern, so as new patch versions of 2.10 are released, they will be automatically applied by Argo CD, but it will not be updated to 2.11 or higher.
```
apiVersion: argocd-image-updater.argoproj.io/v1alpha1
kind: ImageUpdater
metadata:
  name: image-updater-helm
  namespace: NAMESPACE_NAME
spec:
  applicationRefs:
    - namePattern: image-updater-helm         # the name of the argocd app
      images:
        - alias: caddy                        # a short alias for the image name
          imageName: caddy                    # the full name of the image
          commonUpdateSettings:
            updateStrategy: newest-build      # Use the most recent matching build
            allowTags: regexp:^2\.10\.[0-9]+$ # Only match tags like 2.10.x
```

### Example 2 - Kustomize
In this example, a Kustomize app uses the 'latest' tag.  Because the tag does not change, the image updater uses the SHA checksum to look for changes and will apply the checksum value as the image tag in your live deployment.

Our Kustomize base deployment uses a standard image reference:
```
spec:
  template:
    spec:
      containers:
        - image: 'docker.io/nicolaka/netshoot:latest'
```

Our ImageUpdater uses the 'digest' update strategy and we add an extra block for Kustomize:
```
apiVersion: argocd-image-updater.argoproj.io/v1alpha1
kind: ImageUpdater
metadata:
  name: image-updater-kustomize
  namespace: NAMESPACE_NAME
spec:
  applicationRefs:
    - namePattern: image-updater-kustomize                # the argocd app name
      images:
        - alias: netshoot
          imageName: docker.io/nicolaka/netshoot:latest   # full image name
          commonUpdateSettings:
            # Use 'digest' update strategy when tracking a tag like 'latest'
            updateStrategy: digest
          # For Kustomize apps, we need the following block
          manifestTargets:
            kustomize:
              name: docker.io/nicolaka/netshoot
```

### Example 3 - Non-public container repo
If the container repo is not publicly available, a pull secret must be provided.

Additionally, **you must grant permission to the image updater controller to read secrets in your namespace**.

The image updater controller has not been granted permission to read secrets in all user namespaces.  If you would like to use it with a private repo, grant access by creating a Role and RoleBinding in the same namespace as the ImageUpdater and Argo CD app.
```
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: image-updater-secrets
  namespace: NAMESPACE_NAME
rules:
  - apiGroups:
      - ""
    resources:
      - secrets
    verbs:
      - get
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: image-updater-secrets
  namespace: NAMESPACE_NAME
subjects:
  - kind: ServiceAccount
    name: gitops-shared-argocd-image-updater-controller
    namespace: openshift-bcgov-gitops-shared
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: image-updater-secrets
```

Create an image pull secret for the given container repository.

This is like the previous example with the addition of the `pullSecret` field:
```
apiVersion: argocd-image-updater.argoproj.io/v1alpha1
kind: ImageUpdater
metadata:
  name: image-updater-pull-secret
  namespace: NAMESPACE_NAME
spec:
  applicationRefs:
    - namePattern: image-updater-pull-secret
      images:
        - alias: utility-server
          imageName: artifacts.developer.gov.bc.ca/plat-util-images/utility-server:latest
          commonUpdateSettings:
            pullSecret: pullsecret:NAMESPACE_NAME/PULL_SECRET_NAME
            # Use 'digest' update strategy when tracking a tag like 'latest'
            updateStrategy: digest
          # For Kustomize apps, we need the following block
          manifestTargets:
            kustomize:
              name: artifacts.developer.gov.bc.ca/plat-util-images/utility-server
```



