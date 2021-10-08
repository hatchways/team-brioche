module.exports.removeWhiteSpace = (stringArray) =>
  stringArray.map((str) => (str ? str.split("-").join(" ") : null));
