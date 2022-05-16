import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import Seo from "../components/seo";

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
        padding: 0.8em 0;
      }
    }
  }
`;

const Result = ({ item }) => {
  return (
    <StyledListItem>
      <Link to={`/${item.link.split("/")[3]}/`}>
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

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [results, setResults] = useState([]);

  const API_KEY = process.env.GATSBY_GOOGLE_CUSTOM_SEARCH_API_KEY;
  const SEARCH_ENGINE_ID = process.env.GATSBY_GOOGLE_SEARCH_ENGINE_ID;
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : null
  );
  const query = params.get("q");
  const searchUrl =
    "https://customsearch.googleapis.com/customsearch/v1?" +
    "key=" +
    API_KEY +
    "&cx=" +
    SEARCH_ENGINE_ID +
    "&q=" +
    query;

  useEffect(() => {
    axios
      .get(searchUrl)
      .then(response => {
        console.log("response: ", response);
        setResults(response?.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log("error: ", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [searchUrl]);

  return (
    <Layout>
      <Seo title={`Search: ${query}`} />
      <main>
        <h1>Search</h1>

        {isLoading ? (
          <p>
            Loading results for <strong>{query}</strong>
          </p>
        ) : (
          <>
            <p>
              {results?.searchInformation?.totalResults} results for{" "}
              <strong>{query}</strong>
            </p>
            {parseInt(results?.searchInformation?.totalResults) > 0 && (
              <StyledList>
                {results?.items?.map((item, index) => {
                  return <Result item={item} key={`search-result-${index}`} />;
                })}
              </StyledList>
            )}
          </>
        )}

        {isError && <p>Error</p>}
      </main>
    </Layout>
  );
};

export default SearchPage;
