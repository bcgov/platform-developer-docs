import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

export default function Template({
  data, // injected by the GraphQL pageQuery below: https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/
  location, // supplied by Gatsby to top-level page components: https://www.gatsbyjs.com/docs/location-data-from-props/
}) {
  const { markdownRemark } = data;
  const { html } = markdownRemark;
  return (
    <Layout location={location}>
      <main dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}

export const Head = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter } = markdownRemark;

  return (
    <Seo title={frontmatter?.title} description={frontmatter?.description}>
      <meta property="keywords" content={frontmatter?.keywords} />
    </Seo>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        title
        description
        keywords
        page_purpose
        audience
        author
        content_owner
        sort_order
      }
    }
  }
`;
