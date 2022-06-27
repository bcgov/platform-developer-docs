import React from "react";
import renderer from "react-test-renderer";

import Footer from "../footer";

describe("Footer", () => {
  const testRenderer = renderer.create(<Footer />);

  it("renders correctly", () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it("contains 6 links", () => {
    expect(testRenderer.root.findAllByType("a").length).toEqual(6);
  });
});
