# platform-developer-docs

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)
[![Package Status](https://github.com/bcgov/private-cloud-techdocs/actions/workflows/techdocs.yaml/badge.svg)](https://github.com/bcgov/private-cloud-techdocs/actions/workflows/techdocs.yaml)
[![Transform Status](https://github.com/bcgov/private-cloud-techdocs/actions/workflows/transform.yaml/badge.svg)](https://github.com/bcgov/private-cloud-techdocs/actions/workflows/transform.yaml)


This is a single location for all technical/developer documentation for product teams working on the Private Cloud OpenShift Platform.

Visit the deployed Gatsby site at [docs.developer.gov.bc.ca](https://docs.developer.gov.bc.ca).

## Documentation

Markdown documents are located in `./src/docs` with related images in `./src/images`.

In progress (not yet published) documents are located in `./src/drafts`.

Please see [Writing guide for Platform Services technical documentation](./tech-docs-writing-guide.md) for documentation formatting and contribution information.

Start your new document from the [new Markdown document template](./new-markdown-document-template.md).

## Gatsby application

A Gatsby application for these documents is included in this repository.

### Local development

#### Set up environment variables

Copy the example `.env` files and fill them with your environment variables:

```sh
cp .env.development.example .env.development
cp .env.production.example .env.production
```

- `GATSBY_GOOGLE_CUSTOM_SEARCH_API_KEY` is a [Google Cloud Platform API key](https://console.cloud.google.com/apis/credentials) that needs access to the [Custom Search API](https://developers.google.com/custom-search/v1/introduction)
- `GATSBY_GOOGLE_SEARCH_ENGINE_ID` refers to a specific Google custom search engine instance
- `GATSBY_GOOGLE_SITE_VERIFICATION` is a meta tag value that ties the Google custom search engine instance to a specific instance of our deployed Gatsby site, allowing us to access information about the pages indexed by Google in [Google Search Console](https://search.google.com/search-console/about)
- `GATSBY_WORDPRESS_SITE_BASE_URL` is used by `./gatsby-config.js` to allow us to link to our WordPress site in a tokenized fashion from our Markdown documents

#### Local development using Node/npm

If you prefer to run locally without Docker, use the Node.js major version specified in `.nvmrc` and `Dockerfile.dev` for best results.

1. Install the project dependencies with `npm i`
2. Install the [Gatsby command line interface](https://www.gatsbyjs.com/docs/reference/gatsby-cli/) with `npm install -g gatsby-cli`
3. Run the project with Gatsby's [`develop` command](https://www.gatsbyjs.com/docs/reference/gatsby-cli/#develop) using `npm run develop`.

When running in development mode, changes to most files will be automatically reflected in your browser with hot reloading.

#### Local development using Docker

Use `Dockerfile.dev` and `docker-compose.dev.yaml` for local development using `gatsby-cli`.

### Production build

Use `Dockerfile.prod` and `docker-compose.prod.yaml` for a production build served by nginx.

#### Nginx configuration

See `./nginx.conf` for production routing rules.

Caching rules are added here based on Gatsby's [Caching Static Sites documentation](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/caching/).

Redirects can be added here to support changes to content. For example, if a page's slug changes, we can manually add a redirect rule that forwards requests for the old URL to the new content. If a page is removed, a redirect can be added to point to the next most relevant page.
