import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/layout";
import Seo from "../components/seo";

const Result = ({ item }) => {
  return (
    <li>
      <p>
        <strong>{item?.htmlTitle}</strong>
      </p>
      <p>Item description goes here</p>
      <p>Item display URL goes here</p>
    </li>
  );
};

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

  console.log("searchUrl: ", searchUrl);

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
      <Seo title="Search" />
      <main>
        <h1>Search</h1>

        {isLoading ? (
          <p>
            Loading results for <strong>{query}</strong>
          </p>
        ) : (
          <>
            <p>
              Displaying {results?.searchInformation?.totalResults} results for{" "}
              <strong>{query}</strong>
            </p>
            {parseInt(results?.searchInformation?.totalResults) > 0 && (
              <ul>
                {results?.items?.map((item, index) => {
                  return <Result item={item} key={`search-result-${index}`} />;
                })}
              </ul>
            )}
          </>
        )}

        {isError && <p>Error</p>}
      </main>
    </Layout>
  );
};

export default SearchPage;
