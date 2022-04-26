import Typography from "typography";

// Font-face declarations for BCSans are located in a styled-components global
// style file at ./src/components
const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.25,
  headerFontFamily: ["BCSans", "Noto Sans", "Verdana", "Arial", "sans-serif"],
  bodyFontFamily: ["BCSans", "Noto Sans", "Verdana", "Arial", "sans-serif"],
  scaleRatio: 2.074,
});

export default typography;
