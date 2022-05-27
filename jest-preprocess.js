// From: https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/

const babelOptions = {
  presets: ["babel-preset-gatsby"],
};

module.exports = require("babel-jest").default.createTransformer(babelOptions);
