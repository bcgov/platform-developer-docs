/**
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "en" });
};
