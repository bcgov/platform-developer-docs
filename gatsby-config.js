require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Private Cloud as a Service Platform Technical Documentation`,
    description: `Documentation for the BC Government's Private Cloud as a Service Platform.`,
    siteUrl: `https://docs.developer.gov.bc.ca/`,
    googleSiteVerification: `${process.env.GATSBY_GOOGLE_SITE_VERIFICATION}`,
  },
  trailingSlash: `always`,
  plugins: [
    `gatsby-plugin-react-svg`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://docs.developer.gov.bc.ca/`,
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Private Cloud as a Service Platform Technical Documentation`,
        short_name: `Private Cloud Tech Docs`,
        start_url: `/`,
        background_color: `white`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        theme_color: `#003366`,
        display: `minimal-ui`,
        icon: `src/images/bc-favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/docs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-string-replace",
            options: {
              // List your find and replace values. Both values must be strings.
              // This is required.
              replacements: {
                WORDPRESS_BASE_URL: `${process.env.GATSBY_WORDPRESS_SITE_BASE_URL}`,
              },
              // By default, values are delimited to reduce the chances of
              // conflicting with real content. You can change the prefix here.
              // Set to `false` to disable the prefix.
              delimiter: "%",
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1600,
            },
          },
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },
  ],
};
