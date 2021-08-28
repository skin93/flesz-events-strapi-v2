const flattenObject = (ob) => {
  return Object.keys(ob).reduce(function (toReturn, k) {
    if (Object.prototype.toString.call(ob[k]) === "[object Date]") {
      toReturn[k] = ob[k].toString();
    } else if (typeof ob[k] === "object" && !Array.isArray(ob[k]) && ob[k]) {
      var flatObject = flattenObject(ob[k]);
      Object.keys(flatObject).forEach(function (k2) {
        toReturn[k + "." + k2] = flatObject[k2];
      });
    } else {
      toReturn[k] = ob[k];
    }

    return toReturn;
  }, {});
};

module.exports = flattenObject;
