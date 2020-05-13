function camelToUnderscore(key) {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
}

exports.objectToSnakeCase = object => {
  const result = {};
  for (const camel in object) {
    if (Object.prototype.hasOwnProperty.call(object, camel)) {
      result[camelToUnderscore(camel)] = object[camel];
    }
  }
  return result;
};
