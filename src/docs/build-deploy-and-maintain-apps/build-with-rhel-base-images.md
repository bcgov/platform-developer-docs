---
title: Build with RHEL base images

slug: build-with-rhel-base-images

description: Describes how to build images with RHEL as the base and leverage the Platforms subscriptions.

keywords: images, RHEL, base images, managed images

page_purpose: Describes how to build images with RHEL as the base and leverage the Platforms subscriptions.

audience: developer

author: Steven Barre

content_owner: Matt Spencer

sort_order: 10
---

# Build with RHEL base images

If you wish to use a [Red Hat Enterprise Linux (RHEL)](https://catalog.redhat.com/software/containers/search?p=1&architecture=amd64&vendor_name=Red%20Hat%7CRed%20Hat%2C%20Inc.) based image to build upon, you will need to take some extra steps to get access to the RHEL Subscription included in the OpenShift Platform.

Popular choices for RHEL base images are [ubi8](https://catalog.redhat.com/software/containers/ubi8/5c647760bed8bd28d0e38f9f) and [openshift4/ose-cli](https://catalog.redhat.com/software/containers/openshift4/ose-cli/5cd9ba3f5a13467289f4d51d).

Reminder: you can pull these via [Artifactory](https://github.com/bcgov/developer-experience/blob/master/apps/artifactory/DEVHUB-README.md) as well via `artifacts.developer.gov.bc.ca/redhat-docker-remote`.

## RHEL Entitlements

To use subscription content via `yum` or `dnf` you first need to add the RHEL Entitlement certificate into your build config. The platform now has an operator that ensures each tools namespace has a secret named `platform-services-controlled-etc-pki-entitlement` that is kept up to date as this cert changes (it changes often).

```bash
$ oc -n license-tools describe secret platform-services-controlled-etc-pki-entitlement
Name:         platform-services-controlled-etc-pki-entitlement
Namespace:    license-tools
Labels:       <none>
Annotations:  <none>

Type:  Opaque

Data
====
8240953084206391739-key.pem:  3243 bytes
8240953084206391739.pem:      99071 bytes
```

## Build Volumes

As of OCP 4.9 you can now make use of [Build Volumes](https://docs.openshift.com/container-platform/4.9/cicd/builds/build-strategies.html#builds-using-build-volumes_build-strategies-docker) to inject Secrets and ConfigMaps directly into a build without needing to add anything to your Dockerfile, and ensure the files don't get captured in the output image.

Add the entitlement secret to your build as a volume.

```yaml
apiVersion: build.openshift.io/v1
kind: BuildConfig
metadata:
  name: myapp
spec:
  output:
    to:
      kind: ImageStreamTag
      name: myapp:latest
  source:
    git:
      ref: main
      uri: https://github.com/myorg/myapp.git
    type: Git
  strategy:
    type: Docker
    dockerStrategy:
      volumes:
      - name: etc-pki-entitlement
        mounts:
        - destinationPath: /etc/pki/entitlement
        source:
          type: Secret
          secret:
            secretName: platform-services-controlled-etc-pki-entitlement
```

## Dockerfile

When you perform an Entitlement Build using RHEL 7, you must have the following instructions in your Dockerfile before you run any yum commands:

```Dockerfile
RUN rm /etc/rhsm-host
```

The command above is not needed for RHEL 8 or 9 based images.

Then use `yum` or `dnf` to install your packages. Here's a sample of how to do that cleanly.

```Dockerfile
# Install some packages and clean up
RUN INSTALL_PKGS="space separated list of packages" && \
    dnf repolist --disablerepo='*' && \
    dnf install -y --setopt=tsflags=nodocs $INSTALL_PKGS && \
    rpm -V $INSTALL_PKGS && \
    dnf -y clean all --enablerepo='*'
```

---

Related links:

- [OCP 4.9 Docs - Adding subscription entitlements as a build secret](https://docs.openshift.com/container-platform/4.9/cicd/builds/running-entitled-builds.html#builds-source-secrets-entitlements_running-entitled-builds)

- [Red Hat Enterprise Linux (RHEL)](https://catalog.redhat.com/software/containers/search?p=1&architecture=amd64&vendor_name=Red%20Hat%7CRed%20Hat%2C%20Inc.)

- [ubi8](https://catalog.redhat.com/software/containers/ubi8/5c647760bed8bd28d0e38f9f)

- [openshift4/ose-cli](https://catalog.redhat.com/software/containers/openshift4/ose-cli/5cd9ba3f5a13467289f4d51d)

- [Build Volumes](https://docs.openshift.com/container-platform/4.9/cicd/builds/build-strategies.html#builds-using-build-volumes_build-strategies-docker)
