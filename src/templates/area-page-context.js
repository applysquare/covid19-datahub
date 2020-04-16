module.exports = function (node) {
  return {
    countryCode: node.countryCode,
    hasApiCode: !!node.bingApiId,
    apiCode: node.bingApiId,
  };
}
