import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import PropTypes from "prop-types";
import styled from "styled-components";

import SearchBar from "./search-bar";

const StyledDiv = styled.div`
  background-color: white;
  border-right: 1px solid #b1b4b6;
  padding: 20px 25px;
  width: 350px;
  min-width: 350px;

  // On very small phone screens, nav menu should take up the entire width
  @media (max-width: 350px) {
    min-width: 100%;
  }

  nav {
    ul {
      list-style: none;
      margin: 0;

      li {
        a {
          font-size: 16px;
          text-decoration: none;

          &:focus,
          &:hover {
            text-decoration: underline;
          }
        }

        span.category-title {
          display: inline-block;
          font-size: 18px;
          font-weight: 700;
          padding: calc(1.45rem / 2) 0;
        }
      }
    }
  }
`;

export default function Navigation() {
  return (
    <StyledDiv>
      <SearchBar />

      <StaticQuery
        query={graphql`
          query DocsQuery {
            allMarkdownRemark {
              nodes {
                frontmatter {
                  slug
                  title
                }
                parent {
                  ... on File {
                    relativeDirectory
                  }
                }
              }
            }
          }
        `}
        render={data => {
          let appMonitoring = [];
          let automationAndResiliency = [];
          let buildDeployAndMaintainApps = [];
          let designSystem = [];
          let openshiftProjectsAndAccess = [];
          let platformArchitectureReference = [];
          let reusableCodeAndServices = [];
          let trainingAndLearning = [];
          let useGithubInBcgov = [];
          let noCategory = [];

          data.allMarkdownRemark.nodes.forEach(node => {
            const dir = node.parent.relativeDirectory;

            switch (dir) {
              case "app-monitoring":
                appMonitoring.push(node);
                break;
              case "automation-and-resiliency":
                automationAndResiliency.push(node);
                break;
              case "build-deploy-and-maintain-apps":
                buildDeployAndMaintainApps.push(node);
                break;
              case "design-system":
                designSystem.push(node);
                break;
              case "openshift-projects-and-access":
                openshiftProjectsAndAccess.push(node);
                break;
              case "platform-architecture-reference":
                platformArchitectureReference.push(node);
                break;
              case "reusable-code-and-services":
                reusableCodeAndServices.push(node);
                break;
              case "training-and-learning":
                trainingAndLearning.push(node);
                break;
              case "use-github-in-bcgov":
                useGithubInBcgov.push(node);
                break;
              default:
                noCategory.push(node);
            }
          });

          return (
            <nav>
              <ul>
                <li>
                  <span className="category-title">
                    Build, deploy, and maintain apps
                  </span>
                  <ul>
                    {buildDeployAndMaintainApps.map((page, index) => {
                      return (
                        <li key={`link-${index}`}>
                          <Link to={`/${page?.frontmatter?.slug}`}>
                            {page?.frontmatter?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <span className="category-title">
                    OpenShift projects and access
                  </span>
                  <ul>
                    {openshiftProjectsAndAccess.map((page, index) => {
                      return (
                        <li key={`link-${index}`}>
                          <Link to={`/${page?.frontmatter?.slug}`}>
                            {page?.frontmatter?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <span className="category-title">Use GitHub in BC Gov</span>
                  <ul>
                    {useGithubInBcgov.map((page, index) => {
                      return (
                        <li key={`link-${index}`}>
                          <Link to={`/${page?.frontmatter?.slug}`}>
                            {page?.frontmatter?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <span className="category-title">
                    Automation and resiliency
                  </span>
                  <ul>
                    {automationAndResiliency.map((page, index) => {
                      return (
                        <li key={`link-${index}`}>
                          <Link to={`/${page?.frontmatter?.slug}`}>
                            {page?.frontmatter?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <span className="category-title">App monitoring</span>
                  <ul>
                    {appMonitoring.map((page, index) => {
                      return (
                        <li key={`link-${index}`}>
                          <Link to={`/${page?.frontmatter?.slug}`}>
                            {page?.frontmatter?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <span className="category-title">Design system</span>
                  <ul>
                    {designSystem.map((page, index) => {
                      return (
                        <li key={`link-${index}`}>
                          <Link to={`/${page?.frontmatter?.slug}`}>
                            {page?.frontmatter?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <span className="category-title">
                    Reusable code and services
                  </span>
                  <ul>
                    {reusableCodeAndServices.map((page, index) => {
                      return (
                        <li key={`link-${index}`}>
                          <Link to={`/${page?.frontmatter?.slug}`}>
                            {page?.frontmatter?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <span className="category-title">
                    Platform architecture reference
                  </span>
                  <ul>
                    {platformArchitectureReference.map((page, index) => {
                      return (
                        <li key={`link-${index}`}>
                          <Link to={`/${page?.frontmatter?.slug}`}>
                            {page?.frontmatter?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <span className="category-title">Training and learning</span>
                  <ul>
                    {trainingAndLearning.map((page, index) => {
                      return (
                        <li key={`link-${index}`}>
                          <Link to={`/${page?.frontmatter?.slug}`}>
                            {page?.frontmatter?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </nav>
          );
        }}
      />
    </StyledDiv>
  );
}

Navigation.propTypes = {
  links: PropTypes.array,
};

Navigation.defaultProps = {
  links: [],
};
