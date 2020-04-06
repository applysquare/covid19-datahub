module.exports = function (node) {
  console.log(node);
  return {
    slug: node.slug,
    countryCode: node.countryCode,
  };
}