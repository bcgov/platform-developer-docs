import React, { useEffect, useState } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = ({ location }) => {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  /**
   * Generate a useful search page path based on the path that caused the 404.
   * /, -, _, and any whitespace characters are replaced with spaces before
   * trimming and URI-encoding.
   * @returns {string} Search page path
   */
  function getSearchPath() {
    return (
      "/search/?q=" + encodeURI(pathname.replace(/([/_-\s])/g, " ").trim())
    );
  }

  return (
    <Layout location={location}>
      <Seo
        title="404: Not found"
        meta={[{ name: "robots", content: "noindex" }]} // 404 pages should be excluded from public search engines
      />
      <main>
        <h1>404: Not Found</h1>
        <p>Hmmm, it seems like we don't have a page like:</p>
        <pre>{pathname}</pre>
        <p>Why not try:</p>
        <ul>
          <li>
            A <Link to={getSearchPath()}>search for something similar</Link>
          </li>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
        </ul>
      </main>
    </Layout>
  );
};

export default NotFoundPage;
