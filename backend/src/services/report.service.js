const Asset = require("../models/Asset");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.getDashboardStats = async () => {
  const totalAssets = await Asset.countDocuments();
  const totalUsers = await User.countDocuments();
  const borrowedAssets = await Transaction.countDocuments({
    status: "BORROWED",
  });
  const returnedAssets = await Transaction.countDocuments({
    status: "RETURNED",
  });

  return {
    totalAssets,
    totalUsers,
    borrowedAssets,
    returnedAssets,
  };
};

exports.getAssetReport = async () => {
  return Asset.find().select("name quantity available category");
};

exports.getTransactionReport = async () => {
  return Transaction.find()
    .populate("asset", "name category")
    .populate("user", "name email role");
};
