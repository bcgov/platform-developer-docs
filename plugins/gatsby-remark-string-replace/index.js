// Adapted from https://github.com/angeloashmore/gatsby-remark-find-replace

// Use of `require()` syntax is with necessary here along with older versions of
// these dependencies which support CommonJS until Gatsby supports ESM:
// https://github.com/gatsbyjs/gatsby/discussions/31599
const visit = require("unist-util-visit");
const escapeStringRegexp = require("escape-string-regexp");

module.exports = ({ markdownAST }, { replacements = {}, delimiter = "%" }) => {
  // Surround the string with the delimiter
  // Ex: `STRING_TO_REPLACE` becomes `%STRING_TO_REPLACE%`
  const attachDelimiter = str => (delimiter || "") + str + (delimiter || "");

  // Remove delimiter from the string
  // Ex: `%STRING_TO_REPLACE%` becomes `STRING_TO_REPLACE`
  const stripDelimiter = str =>
    delimiter ? str.replaceAll(RegExp(delimiter, "g"), "") : str;

  // RegExp to find any replacement keys.
  // Ex: /(%FIRST%|%SECOND%|%THIRD%)/g
  const regexp = RegExp(
    "(" +
      Object.keys(replacements)
        .map(key => escapeStringRegexp(attachDelimiter(key)))
        .join("|") +
      ")",
    "g"
  );

  const replacer = (_match, name) => {
    return replacements[stripDelimiter(name)];
  };

  // Go through all text, html, code, inline code, and links.
  visit(markdownAST, ["text", "html", "code", "inlineCode", "link"], node => {
    if (node.type === "link") {
      // For links, the text value is replaced by text node, so we change the
      // URL value.
      const processedText = node.url.replace(regexp, replacer);
      node.url = processedText;
    } else {
      // For all other nodes, replace the node value.
      const processedText = node.value.replace(regexp, replacer);
      node.value = processedText;
    }
  });

  return markdownAST;
};
