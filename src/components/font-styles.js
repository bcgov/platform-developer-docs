import { createGlobalStyle } from "styled-components";
import BCSansRegular from "../../node_modules/@bcgov/bc-sans/fonts/BCSans-Regular.woff";
import BCSansBoldItalic from "../../node_modules/@bcgov/bc-sans/fonts/BCSans-BoldItalic.woff";
import BCSansItalic from "../../node_modules/@bcgov/bc-sans/fonts/BCSans-Italic.woff";
import BCSansBold from "../../node_modules/@bcgov/bc-sans/fonts/BCSans-Bold.woff";

const FontStyles = createGlobalStyle`
  // Declare our @font-faces here rather than using included @bc-gov/bc-sans.css
  // file so that we can extended the @font-face declarations with font-display.
  @font-face {
    src: url(${BCSansRegular}) format("woff");
    font-weight: 400;
    font-style: normal;
    font-family: "BCSans";
    font-display: swap;
  }
  @font-face {
    src: url(${BCSansBoldItalic}) format("woff");
    font-weight: 700;
    font-style: italic;
    font-family: "BCSans";
    font-display: swap;
  }
  @font-face {
    src: url(${BCSansItalic}) format("woff");
    font-weight: 400;
    font-style: italic;
    font-family: "BCSans";
    font-display: swap;
  }
  @font-face {
    src: url(${BCSansBold}) format("woff");
    font-weight: 700;
    font-style: normal;
    font-family: "BCSans";
    font-display: swap;
  }
`;

export default FontStyles;
