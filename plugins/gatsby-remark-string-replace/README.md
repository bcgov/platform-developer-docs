# gatsby-remark-string-replace

This is a [Remark Transformer Plugin](https://www.gatsbyjs.com/tutorial/remark-plugin-tutorial/) for string replacement in Markdown documents. It is adapted from [gatsby-remark-find-replace](https://github.com/angeloashmore/gatsby-remark-find-replace).

Note that `unist-util-visit` and `escape-string-regexp` are required at versions that support CommonJS (`require`) versus ESM (`import`):

Use in the `plugins` section of `gatsby-config.js` like this:

```json
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: "gatsby-remark-string-replace",
        options: {
          // List your find and replace values. Both values must be strings.
          // This is required.
          replacements: {
            TO_BE_REPLACED: `replacement value`,
          },
          // By default, values are delimited to reduce the chances of
          // conflicting with real content. You can change the prefix here.
          // Set to `false` to disable the prefix.
          delimiter: "%",
        },
      },
    ],
  },
},
```

This will turn the string `%TO_BE_REPLACED%` into the string `replacement value` in your Markdown documents.
