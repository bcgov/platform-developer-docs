/**
 * Search Engine Optimization component for providing page metadata
 * See: https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/
 */

import * as React from "react";
import PropTypes from "prop-types";

import { useSiteMetadata } from "../hooks/useSiteMetadata";

function Seo({ description, title, pathname, children }) {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    googleSiteVerification,
  } = useSiteMetadata();

  const seo = {
    title: `${title} | ${defaultTitle}` || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ""}`,
    googleSiteVerification: googleSiteVerification || "",
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta
        name="google-site-verification"
        content={seo.googleSiteVerification}
      />
      {children}
    </>
  );
}

Seo.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default Seo;
