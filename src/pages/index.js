import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import Seo from "../components/seo";

import { useSiteMetadata } from "../hooks/useSiteMetadata";

const WORDPRESS_BASE_URL = process.env.GATSBY_WORDPRESS_SITE_BASE_URL;

const Grid = styled.div`
  display: grid;
  justify-items: stretch;
  gap: 10px;
  margin-bottom: 2.5em;

  &.col-2 {
    grid-template-columns: 1fr 1fr;
    @media (max-width: 991.98px) {
      grid-template-columns: 1fr;
    }
  }
  &.col-3 {
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 991.98px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 767.98px) {
      grid-template-columns: 1fr;
    }
  }
`;

const Card = styled.div`
  padding: 0.5em 1em;
  border: 1px solid rgb(225, 225, 225);
`;

const IndexPage = ({ location }) => {
  const { title } = useSiteMetadata();

  return (
    <Layout location={location}>
      <main>
        <h1>Welcome to the {title || `Title`}</h1>
        <Grid className="col-2">
          <Card>
            <h2>Get started</h2>
            <p>
              Start here for the first steps on working in our OpenShift
              environment.
            </p>
            <ul>
              <li>
                <Link to={"/provision-new-openshift-project/"}>
                  Provision a new project in OpenShift
                </Link>
              </li>
              <li>
                <Link to={"/grant-user-access-openshift/"}>
                  User access in OpenShift
                </Link>
              </li>
              <li>
                <Link to={"/openshift-project-resource-quotas/"}>
                  Project resource quotas
                </Link>
              </li>
            </ul>
          </Card>
          <Card>
            <h2>Build, deploy and maintain apps</h2>
            <p>Best practices on the platform.</p>
            <ul>
              <li>
                <Link to={"/build-an-application/"}>
                  Build an application 
                </Link>
              </li>
              <li>  
                <Link to={"/deploy-an-application/"}>
                  Deploy an application 
                </Link>
                </li>
                <li>  
                <Link to={"/maintain-an-application/"}>
                  Maintain an application 
                </Link>
              </li>
              <li>Retire an application (coming soon)</li>
            </ul>
          </Card>
        </Grid>
        <h2>Training and learning</h2>
        <Grid className="col-3">
          <Card>
            <h3>Free OpenShift training</h3>
            <p>
              Read about{" "}
              <a
                href="https://digital.gov.bc.ca/cloud/services/private/support/#platform"
              >
                the free training
              </a>{" "}
              that is offered on the Platform and get access to other learning
              resources.
            </p>
          </Card>
          <Card>
            <h3>Rocket.Chat</h3>
            <p>
              Rocket.Chat will be your main communication channel for platform
              updates and support while you work in the B.C. Government Private Cloud
              PaaS. Read about 
               <Link to={"/join-bc-rocket-chat/"}> the steps to join Rocket.Chat
              </Link>
            </p>
            <p>
              <a href="https://chat.developer.gov.bc.ca">
                Log in to Rocket.Chat
              </a>
              
            </p>
          </Card>
          <Card>
            <h3>Platform community MeetUps</h3>
            <p>
              Every 3 weeks, we host a platform community MeetUp where product
              teams from across the B.C. government give technical demos of
              their application.
            </p>
            <p>
              <a
                href="https://digital.gov.bc.ca/cloud/services/private/about-us/#stay"
              >
                Learn how to register for this and other events
              </a>
              .
            </p>
          </Card>
        </Grid>
        <h2>Dive deeper</h2>
        <Grid className="col-3">
          <Card>
            <h3>Security and privacy compliance</h3>
            <ul>
              <li>STRA and PIA for Private Cloud Platform (coming soon)</li>
              <li>
                <Link to={"/vault-secrets-management-service/"}>
                  Vault secrets management service
                </Link>
              </li>
              <li>
                <Link to={"/image-artifact-management-with-artifactory/"}>
                  Artifactory trusted repository service
                </Link>
              </li>
              <li>
                <Link to={"/security-best-practices-for-apps/"}>
                  Security best practices for apps
                </Link>
              </li>
            </ul>
          </Card>
          <Card>
            <h3>Use GitHub in BC Gov</h3>
            <ul>
              <li>
                <Link to={"/bc-government-organizations-in-github/"}>
                  B.C. government organizations in GitHub
                </Link>
              </li>
              <li>
                <a
                  href="https://digital.gov.bc.ca/cloud/services/private/support/#common"
                >
                  Common platform requests in the B.C. Government Private Cloud PaaS
                </a>
              </li>
              <li>
                <Link to={"/start-working-in-bcgov-github-organization/"}>
                  Start working in BCGov GitHub organization
                </Link>
              </li>
            </ul>
          </Card>
          <Card>
            <h3>Automation and resiliency</h3>
            <ul>
              <li>
                <Link to={"/app-resiliency-guidelines/"}>
                  App resiliency guidelines
                </Link>
              </li>
              <li>
                <Link to={"/ci-cd-pipeline-templates/"}>
                  CI/CD pipeline automation
                </Link>
              </li>
            </ul>
          </Card>
          <Card>
            <h3>App monitoring</h3>
            <ul>
              <li>
                <Link to={"/sysdig-monitor-setup-team/"}>
                  Set up a team in Sysdig Monitor
                </Link>
              </li>
              <li>
                <Link to={"/sysdig-monitor-set-up-advanced-functions/"}>
                  Set up advance functions in Sysdig Monitor
                </Link>
              </li>
              <li>Four gold signals for app monitoring (coming soon)</li>
              <li>App logging (coming soon)</li>
            </ul>
          </Card>
          <Card>
            <h3>Database and API management</h3>
            <ul>
              <li>
                <Link to={"/opensource-database-technologies/"}>
                  Open source database technologies
                </Link>
              </li>
              <li>
                <Link to={"/high-availability-database-clusters/"}>
                  High availability database clusters
                </Link>
              </li>
              <li>API guidelines (coming soon)</li>
            </ul>
          </Card>
          <Card>
            <h3>Reusable code and services</h3>
            <ul>
              <li>
                <Link
                  to={
                    "/reusable-services-list/#pathfinder-single-sign-on-keycloak"
                  }
                >
                  Pathfinder SSO Keycloak
                </Link>
              </li>
              <li>
                <Link to={"/reusable-services-list/"}>
                  Reusable services list
                </Link>
              </li>
              <li>Project examples (coming soon)</li>
            </ul>
          </Card>
          <Card>
            <h3>Platform architecture reference</h3>
            <ul>
              <li>
                <Link to={"/platform-storage/"}>Platform storage</Link>
              </li>
              <li>
                <Link to={"/platform-architecture-diagram/"}>Platform architecture diagram</Link>
              </li>
              <li>
                <Link to={"/openshift-network-policies/"}>OpenShift network policies</Link>
              </li>
              <li>
                <Link to={"/platform-network-topology/"}>Platform network topology</Link>
              </li>
              <li>
                <Link to={"/set-up-tcp-connectivity-on-private-cloud-openshift-platform/"}>Set up TCP connectivity on the Private cloud Openshift platform</Link>
              </li>
            </ul>
          </Card>
        </Grid>
        <h2>Get support on the platform</h2>
        <Grid className="col-3">
          <Card>
            <h3>Report a platform incident</h3>
            <p>
              If you think an incident has occurred with our services, you can
              report it by
               <a
                  href="https://digital.gov.bc.ca/cloud/services/private/support/#report"
               > following these steps
                </a>
              .
            </p>
          </Card>
          <Card>
            <h3>Get help or support</h3>
            <p>
              We follow a community-based support model. You can use our
              self-serve resources or ask for help from the platform community.{" "}
              <a
                href="https://digital.gov.bc.ca/cloud/services/private/support/"
              >
                Learn how to get help on the Platform
              </a>
              .
            </p>
          </Card>
          <Card>
            <h3>DevOps requests</h3>
            <p>
              Not sure where to go to get things done on the platform? We've
              outlined common platform tasks and links to additional
              instructions.{" "}
              <a
                href="https://digital.gov.bc.ca/cloud/services/private/support/#common"
              >
                Learn how to get help with some of the most commonly
                searched-for tasks
              </a>
              .
            </p>
          </Card>
        </Grid>
      </main>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => {
  return <Seo title="Home" />;
};
