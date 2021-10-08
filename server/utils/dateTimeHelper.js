module.exports.differenceInHours = (start, end) => {
  const millisecondsDiff = end.getTime() - start.getTime();
  return Math.ceil(millisecondsDiff / (1000 * 60 * 60));
};
