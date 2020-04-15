module.exports = function (node) {
  return {
    slug: node.slug,
    countryCode: node.countryCode,
    hasApiCode: !!node.bingApiId,
    apiCode: node.bingApiId,
  };
}