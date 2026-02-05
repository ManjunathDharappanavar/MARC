import Asset from "../models/Asset.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

/* CREATE */
export const createAsset = catchAsync(async (req, res, next) => {
  const { name, category, value } = req.body;

  const asset = await Asset.create({
    name,
    category,
    value: Number(value), // 👈 force number
    createdBy: req.user._id,
  });

  res.status(201).json(asset);
});

/* READ ALL */
export const getAssets = catchAsync(async (req, res, next) => {
  const assets = await Asset.find({ createdBy: req.user._id });
  res.json(assets);
});

/* READ ONE */
export const getAssetById = catchAsync(async (req, res, next) => {
  const asset = await Asset.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });
  if (!asset) {
    return next(new AppError("Asset not found", 404));
  }
  res.json(asset);
});

/* UPDATE */
export const updateAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!asset) {
    return next(new AppError("Asset not found", 404));
  }

  res.json(asset);
});

/* DELETE */
export const deleteAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!asset) {
    return next(new AppError("Asset not found", 404));
  }

  res.json({ message: "Asset deleted successfully" });
});
