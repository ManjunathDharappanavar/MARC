import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} from "../controllers/asset.controller.js";

const router = express.Router();

router.get("/", protect, getAssets);
router.get("/:id", protect, getAssetById);

router.post("/", protect, createAsset);
router.put("/:id", protect, updateAsset);
router.delete("/:id", protect, deleteAsset);

export default router;
