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
            {/* CMS Lite permalink to https://www2.gov.bc.ca/gov/content/home/disclaimer */}
            <a href="https://www2.gov.bc.ca/gov/content?id=79F93E018712422FBC8E674A67A70535">
              Disclaimer
            </a>
          </li>
          <li>
            {/* CMS Lite permalink to https://www2.gov.bc.ca/gov/content/home/privacy */}
            <a href="https://www2.gov.bc.ca/gov/content?id=9E890E16955E4FF4BF3B0E07B4722932">
              Privacy
            </a>
          </li>
          <li>
            {/* CMS Lite permalink to https://www2.gov.bc.ca/gov/content/home/accessible-government */}
            <a href="https://www2.gov.bc.ca/gov/content?id=E08E79740F9C41B9B0C484685CC5E412">
              Accessibility
            </a>
          </li>
          <li>
            {/* CMS Lite permalink to https://www2.gov.bc.ca/gov/content/home/copyright */}
            <a href="https://www2.gov.bc.ca/gov/content?id=1AAACC9C65754E4D89A118B875E0FBDA">
              Copyright
            </a>
          </li>
          <li>
            {/* GitHub link to repository Issues page */}
            <a href="https://github.com/bcgov/platform-developer-docs/issues">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </Container>
  </StyledFooter>
);

export default Footer;
