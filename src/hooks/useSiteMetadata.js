/**
 * Hook for querying data in components via GraphQL
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          googleSiteVerification
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
