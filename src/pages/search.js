import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";

const SearchPage = () => {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : null
  );
  const query = params.get("q");

  return (
    <Layout>
      <Seo title="Search" />
      <main>
        <h1>Search</h1>
        <p>
          Displaying results for <strong>{query}</strong>
        </p>
      </main>
    </Layout>
  );
};

export default SearchPage;
