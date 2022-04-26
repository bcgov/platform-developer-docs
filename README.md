# platform-developer-docs

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

This is a single location for all technical/developer documentation for product teams working on the Private Cloud Openshift Platform.

## Documentation

Markdown documents are located in `./src/docs` with related images in `./src/images`.

Please see [Writing guide for Platform Services technical documentation](./tech-docs-writing-guide.md) for documentation formatting and contribution information.

## Gatsby application

A Gatsby application for these documents is included in this repository.

### Local Development

Use `Dockerfile.dev` and `docker-compose.dev.yaml` for local development using `gatsby-cli`.

### Production Build

Use `Dockerfile.prod` and `docker-compose.prod.yaml` for a production build served by nginx.
