# platform-developer-docs

blat

[![Lifecycle:Stable](https://img.shields.io/badge/Lifecycle-Stable-97ca00)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)
[![Package Status](https://github.com/bcgov/platform-developer-docs/actions/workflows/techdocs.yaml/badge.svg)](https://github.com/bcgov/platform-developer-docs/actions/workflows/techdocs.yaml)

This is a single location for all technical/developer documentation for product teams working on the Private Cloud OpenShift Platform.

Visit the site at [https://developer.gov.bc.ca/docs/default/component/platform-developer-docs](https://developer.gov.bc.ca/docs/default/component/platform-developer-docs).

## Documentation

Markdown documents are located in `./src/docs` with related images in `./src/images`.

In progress (not yet published) documents are located in `./src/drafts`.

Please see [Writing guide for Platform Services technical documentation](./tech-docs-writing-guide.md) for documentation formatting and contribution information.

Start your new document from the [new Markdown document template](./new-markdown-document-template.md).

## Deployment

The content is deployed to the [DevHub Site](https://developer.gov.bc.ca) by the [.github/workflows/techdocs.yaml](.github/workflows/techdocs.yaml) workflow.

## Local Development

Refer to the [How to use the Docker image to preview content locally](https://github.com/bcgov/devhub-techdocs-publish/blob/main/docs/index.md#how-to-use-the-docker-image-to-preview-content-locally) guide in the [devhub-techdocs-publish](https://github.com/bcgov/devhub-techdocs-publish) repo.
