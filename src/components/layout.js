/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import styled from "styled-components";

import Header from "./header";
import Navigation from "./navigation";
import Footer from "./footer";
import FontStyles from "./font-styles";

import "./layout.css";
import "@reach/skip-nav/styles.css";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

const FlexContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin: 0 auto;
  max-width: 1320px;
  width: 100%;

  @media (max-width: 1319.98px) {
    max-width: 100%;
  }
`;

const StyledSkipNavLink = styled(SkipNavLink)`
  &:focus {
    z-index: 2; // Needs to sit on top of sticky header
  }
`;

const StyledSkipNavContent = styled(SkipNavContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-x: hidden;
  scroll-margin-top: 20em;

  main {
    flex-grow: 1;
    margin: 30px;
  }
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Page>
      <FontStyles />
      <StyledSkipNavLink>Skip to main content</StyledSkipNavLink>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <FlexContainer>
        <Navigation />
        <StyledSkipNavContent>{children}</StyledSkipNavContent>
      </FlexContainer>
      <Footer />
    </Page>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
