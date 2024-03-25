const cleanData = (data) => {
  delete data.updatedAt;
  delete data.__v;
  return data;
};

module.exports = cleanData;
