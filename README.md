# platform-developer-docs

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

This is a single location for all technical/developer documentation for product teams working on the Private Cloud OpenShift Platform.

Visit the deployed Gatsby site at [beta-docs.developer.gov.bc.ca](https://beta-docs.developer.gov.bc.ca).

## Documentation

Markdown documents are located in `./src/docs` with related images in `./src/images`.

Please see [Writing guide for Platform Services technical documentation](./tech-docs-writing-guide.md) for documentation formatting and contribution information.

## Gatsby application

A Gatsby application for these documents is included in this repository.

### Local Development

Use `Dockerfile.dev` and `docker-compose.dev.yaml` for local development using `gatsby-cli`.

Copy the example `.env` files and fill them with your environment variables:

```sh
cp .env.development.example .env.development
cp .env.production.example .env.production
```

- `GATSBY_GOOGLE_CUSTOM_SEARCH_API_KEY` is a [Google Cloud Platform API key](https://console.cloud.google.com/apis/credentials) that needs access to the [Custom Search API](https://developers.google.com/custom-search/v1/introduction)
- `GATSBY_GOOGLE_SEARCH_ENGINE_ID` refers to a specific Google custom search engine instance
- `GATSBY_GOOGLE_SITE_VERIFICATION` is a meta tag value that ties the Google custom search engine instance to a specific instance of our deployed Gatsby site, allowing us to access information about the pages indexed by Google in [Google Search Console](https://search.google.com/search-console/about)
- `GATSBY_WORDPRESS_SITE_BASE_URL` is used by `./gatsby-config.js` to allow us to link to our WordPress site in a tokenized fashion from our Markdown documents

### Production Build

Use `Dockerfile.prod` and `docker-compose.prod.yaml` for a production build served by nginx.
