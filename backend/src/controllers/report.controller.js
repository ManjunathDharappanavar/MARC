import Asset from "../models/Asset.js";
import Transaction from "../models/Transaction.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getSummary = catchAsync(async (req, res, next) => {
  const assets = await Asset.countDocuments({ createdBy: req.user._id });
  const transactions = await Transaction.countDocuments({
    createdBy: req.user._id,
  });
  res.json({ assets, transactions });
});
