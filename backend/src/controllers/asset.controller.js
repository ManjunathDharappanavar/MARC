import Asset from "../models/Asset.js";

/* CREATE */
export const createAsset = async (req, res) => {
  const { name, category, value } = req.body;

  const asset = await Asset.create({
    name,
    category,
    value: Number(value), // 👈 force number
    createdBy: req.user._id
  });

  res.status(201).json(asset);
};


/* READ ALL */
export const getAssets = async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
};

/* READ ONE */
export const getAssetById = async (req, res) => {
  const asset = await Asset.findById(req.params.id);
  if (!asset) {
    return res.status(404).json({ message: "Asset not found" });
  }
  res.json(asset);
};

/* UPDATE */
export const updateAsset = async (req, res) => {
  const asset = await Asset.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!asset) {
    return res.status(404).json({ message: "Asset not found" });
  }

  res.json(asset);
};

/* DELETE */
export const deleteAsset = async (req, res) => {
  const asset = await Asset.findByIdAndDelete(req.params.id);

  if (!asset) {
    return res.status(404).json({ message: "Asset not found" });
  }

  res.json({ message: "Asset deleted successfully" });
};
