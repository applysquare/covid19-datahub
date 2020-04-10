module.exports = function (node) {
  return {
    apiCodes: node.highlightAreas.map(area => {
      return area.apiCode;
    }),
    areaList: node.areaList,
  };
}