module.exports = function (node) {
  return {
    apiSlugs: node.highlightAreas.map(area => {
      return area.apiSlug;
    }),
  };
}