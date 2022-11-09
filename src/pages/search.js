import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "gatsby";
import styled from "styled-components";

import Alert from "../components/alert";
import Layout from "../components/layout";
import LoadSpinnerGroup from "../components/load-spinner";
import Pagination from "../components/pagination";
import Seo from "../components/seo";

import { useSearchParams } from "../hooks/useSearchParams";

const StyledListItem = styled.li`
  a {
    color: #313132;
    text-decoration: none;

    div {
      box-shadow: none;
      padding: 0.8em 1em;

      cite {
        color: green;
        font-size: 12px;
      }

      p.title {
        color: #1a5a96;
        font-size: 18px;
        margin: 8px 0;
      }

      &:hover {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);

        p.title {
          text-decoration: underline;
        }
      }
    }

    @media (max-width: 767.98px) {
      div {
        padding: 0.8em 0.4em;
      }
    }
  }
`;

const Result = ({ item }) => {
  // The reason for using crafting our URIs this way is so we can use the Gatsby
  // <Link> component to link between internal pages for maximum speed.
  // If we used the the full URLs coming back from Google, we would have to use
  // <a> tags which causes the browser to navigate, breaking our Single Page App
  // feel and speed.
  // See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/
  //
  // This split assumes that item.link is a full URL (not a partial path)
  // and that we are serving the site from a sub-domain (not a sub-directory)
  // Ex: https://docs.developer.gov.bc.ca/ -> /
  //     https://docs.developer.gov.bc.ca/login-to-openshift/ -> /login-to-openshift/
  function getItemPath(item) {
    return `/${item.link.split("/").slice(3).join("/")}`;
  }

  return (
    <StyledListItem>
      <Link to={getItemPath(item)}>
        <div>
          <cite dangerouslySetInnerHTML={{ __html: item.htmlFormattedUrl }} />
          <p
            className="title"
            dangerouslySetInnerHTML={{ __html: item.htmlTitle }}
          />
          <p
            className="snippet"
            dangerouslySetInnerHTML={{ __html: item.htmlSnippet }}
          />
        </div>
      </Link>
    </StyledListItem>
  );
};

const StyledList = styled.ol`
  list-style: none;
  margin-left: 0;
`;

const SearchPage = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [results, setResults] = useState({});

  // Query parameters
  const params = useSearchParams();
  const query = params.get("q");
  const currentPage = Number(params.get("p")) || 1;

  // Max number of results displayed per page.
  // Note: Google CSE JSON API is limited to a max of 10 results per page.
  // https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list#body.QUERY_PARAMETERS.num
  const pageSize = 10;

  // The `start` query parameter is the index of the first result returned.
  // If `pageSize` is 10, a `start` of 11 would return results that begin at the
  // top of page 2.
  // https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list#body.QUERY_PARAMETERS.start
  const start = (currentPage - 1) * pageSize + 1;

  // Exclude duplicate content
  // https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list#body.QUERY_PARAMETERS.filter
  const filter = 1;

  const API_KEY = process.env.GATSBY_GOOGLE_CUSTOM_SEARCH_API_KEY;
  const SEARCH_ENGINE_ID = process.env.GATSBY_GOOGLE_SEARCH_ENGINE_ID;

  const searchUrl =
    "https://customsearch.googleapis.com/customsearch/v1?" +
    "key=" +
    API_KEY +
    "&cx=" +
    SEARCH_ENGINE_ID +
    "&q=" +
    query +
    "&start=" +
    start +
    "&num=" +
    pageSize +
    "&filter=" +
    filter;

  useEffect(() => {
    axios
      .get(searchUrl)
      .then(response => {
        setResults(response?.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [searchUrl]);

  function onPageChange(targetPage) {
    navigate(`/search/?q=${encodeURIComponent(query)}&p=${targetPage}`);
  }

  return (
    <Layout location={location}>
      <main>
        <h1>Search</h1>

        {isLoading ? (
          <>
            <p>
              Loading results for <strong>{query}</strong>
            </p>
            <LoadSpinnerGroup count={3} />
          </>
        ) : (
          <>
            {parseInt(results?.searchInformation?.totalResults) > pageSize ? (
              <p>
                Page {currentPage} of about{" "}
                {results?.searchInformation?.totalResults} results for{" "}
                <strong>{query}</strong>
              </p>
            ) : (
              <p>
                {results?.searchInformation?.totalResults}{" "}
                {results?.searchInformation?.totalResults === "1"
                  ? "result"
                  : "results"}{" "}
                for <strong>{query}</strong>
              </p>
            )}
            {parseInt(results?.searchInformation?.totalResults) > 0 && (
              <StyledList>
                {results?.items?.map((item, index) => {
                  return <Result item={item} key={`search-result-${index}`} />;
                })}
              </StyledList>
            )}
          </>
        )}

        {results &&
          Number(results?.searchInformation?.totalResults) > pageSize && (
            <Pagination
              current={currentPage}
              max={Math.ceil(
                Number(results?.searchInformation?.totalResults) / pageSize
              )}
              onPageChange={onPageChange}
              pageSize={pageSize}
            />
          )}

        {/* We need to handle the case where someone is on a page of results
        that was originally reported by Google to exist, but contains no results
        when the user actually visits it.

        This happens because the total number of results is an estimate, and the
        estimate gets refined the further into the results you get.

        This is a weird UX experience, but the idea is that Google results are
        good enough that nobody visits anything past the first page.

        Let's give the user a way out by letting them page back. */}

        {currentPage > 1 &&
          Number(results?.searchInformation?.totalResults) === 0 && (
            <Pagination
              current={currentPage}
              max={currentPage}
              onPageChange={onPageChange}
              pageSize={pageSize}
            />
          )}

        {isError && <Alert type="error">Error fetching search results</Alert>}
      </main>
    </Layout>
  );
};

export default SearchPage;

export const Head = () => {
  const query = useSearchParams().get("q");

  return (
    <Seo title={`Search: ${query}`}>
      {/* Search pages should be excluded from public search engines */}
      <meta name="robots" content="noindex" />
    </Seo>
  );
};
