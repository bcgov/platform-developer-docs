import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import HorizontalLogo from "../images/BCID_H_rgb.svg";
import VerticalLogo from "../images/BCID_V_rgb.svg";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #036;
  border-bottom: 2px solid #fcba19;
  color: white;
  width: 100%;

  a {
    margin: 0 25px;
    min-height: 65px;
  }

  svg {
    &.horizontal {
      width: 175px;
    }
    &.vertical {
      height: 65px;
      width: 58px;
      min-width: 58px;
      margin-right: 20px;
    }
  }

  span {
    font-size: 2em;
    font-weight: 400;
    line-height: 1em;
    padding: 10px 0;
    word-break: break-word;

    @media (max-width: 767.98px) {
      font-size: 1.5em;
    }
  }
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1320px;
  width: 100%;

  @media (max-width: 1319.98px) {
    max-width: 100%;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

function Header({ siteTitle }) {
  const isMobile = useMediaQuery({ query: "(max-width: 767.98px)" });

  return (
    <StyledHeader>
      <Container>
        <StyledLink
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {isMobile ? (
            <VerticalLogo className="logo vertical" />
          ) : (
            <HorizontalLogo className="logo horizontal" />
          )}
          <span>{siteTitle}</span>
        </StyledLink>
      </Container>
    </StyledHeader>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
