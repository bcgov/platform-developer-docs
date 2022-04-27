import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <main>
      <h1>Hi people</h1>
      <p>Homepage goes here.</p>
      <h2>Some lorem ipsum to make the page longer</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
        porta leo.
      </p>
      <p>
        Ut tincidunt elit at mi facilisis efficitur. Aenean pretium nec libero
        in condimentum.
      </p>
      <p>
        Duis rutrum consectetur semper. Ut tempor tellus feugiat ante sodales
        efficitur sed id eros.
      </p>
      <p>Aenean condimentum varius ante nec cursus.</p>
      <p>
        Mauris luctus, urna sit amet mollis fermentum, nulla leo pharetra justo,
        ac tristique libero nulla at libero.
      </p>
      <p>Donec eu mi accumsan, tempor justo sed, dictum leo.</p>
      <p>
        Fusce sit amet dignissim odio, id auctor nulla. Maecenas tincidunt at
        velit a interdum.
      </p>
      <StaticImage
        src="../images/bc-favicon.png"
        width={50}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt="BC favicon"
      />
    </main>
  </Layout>
);

export default IndexPage;
