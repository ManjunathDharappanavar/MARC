const Asset = require("../models/Asset");

exports.createAsset = async (data, userId) => {
  return await Asset.create({ ...data, available: data.quantity, createdBy: userId });
};

exports.getAssets = async () => Asset.find();
