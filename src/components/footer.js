import * as React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #036;
  border-top: 2px solid #fcba19;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  nav {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin: 0 30px;
    min-height: 46px;

    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0;
      color: white;
      list-style: none;
      align-items: center;
      height: 100%;

      li {
        margin: 0;

        a {
          font-size: 0.813em;
          font-weight: normal; /* 400 */
          color: white;
          border-right: 1px solid #4b5e7e;
          padding: 0 5px;
          text-decoration: none;

          &:focus,
          &:hover {
            text-decoration: underline;
          }
        }
      }

      // Stack and left-align footer links on mobile
      @media (max-width: 767.98px) {
        flex-direction: column;
        align-items: baseline;

        li > a {
          border-right: none;
        }
      }
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

const Footer = () => (
  <StyledFooter>
    <Container>
      <nav>
        <ul>
          <li>
            <a href=".">Home</a>
          </li>
          <li>
            <a href=".">Disclaimer</a>
          </li>
          <li>
            <a href=".">Privacy</a>
          </li>
          <li>
            <a href=".">Accessibility</a>
          </li>
          <li>
            <a href=".">Copyright</a>
          </li>
          <li>
            <a href=".">Contact Us</a>
          </li>
        </ul>
      </nav>
    </Container>
  </StyledFooter>
);

export default Footer;
