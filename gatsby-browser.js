/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// Set focus to the skip link
// https://www.gatsbyjs.com/blog/2020-02-10-accessible-client-side-routing-improvements/
exports.onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation !== null) {
    const skipLink = document.querySelector("#reach-skip-nav");
    if (skipLink) {
      skipLink.focus();
    }
  }
};
