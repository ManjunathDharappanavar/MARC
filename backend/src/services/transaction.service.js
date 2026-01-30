const Transaction = require("../models/Transaction");
const Asset = require("../models/Asset");

exports.borrowAsset = async (assetId, userId) => {
  const asset = await Asset.findById(assetId);
  if (!asset) throw "Asset not found";

  if (asset.available <= 0) {
    throw "Asset not available";
  }

  asset.available -= 1;
  await asset.save();

  const transaction = await Transaction.create({
    asset: assetId,
    user: userId,
  });

  return transaction;
};

exports.returnAsset = async (transactionId) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) throw "Transaction not found";

  if (transaction.status === "RETURNED") {
    throw "Asset already returned";
  }

  transaction.status = "RETURNED";
  transaction.returnDate = new Date();
  await transaction.save();

  const asset = await Asset.findById(transaction.asset);
  asset.available += 1;
  await asset.save();

  return transaction;
};

exports.getAllTransactions = async () => {
  return Transaction.find()
    .populate("asset")
    .populate("user", "name email role");
};
