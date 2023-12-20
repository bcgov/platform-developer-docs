/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// Set focus to the skip link
// https://www.gatsbyjs.com/blog/2020-02-10-accessible-client-side-routing-improvements/

const {navigate} = require('gatsby');

exports.onRouteUpdate = ({ location, prevLocation }) => {
   if (location.pathname === '/provision-new-openshift-project/') {    
    const newWindow = window.open('https://digital.gov.bc.ca/cloud/services/private/onboard/', '_blank');    
    if (newWindow) {
      newWindow.focus();
    }
       navigate(prevLocation.pathname);
  }
  
  if (prevLocation !== null) {
    const skipLink = document.querySelector("#reach-skip-nav");
    if (skipLink) {
      skipLink.focus();
    }
  }
 
};
