import Asset from "../models/Asset.js";
import Transaction from "../models/Transaction.js";

export const getSummary = async (req, res) => {
  const assets = await Asset.countDocuments();
  const transactions = await Transaction.countDocuments();
  res.json({ assets, transactions });
};
