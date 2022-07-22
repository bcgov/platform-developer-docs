/**
 * Hook for accessing search parameters after checking for `window`
 * See: https://www.gatsbyjs.com/docs/debugging-html-builds/#how-to-check-if-window-is-defined
 */

export const useSearchParams = () => {
  const isBrowser = typeof window !== "undefined";
  const params = new URLSearchParams(isBrowser ? window.location.search : null);

  return params;
};
