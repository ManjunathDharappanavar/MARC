import express from "express";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/role.middleware.js";
import {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset
} from "../controllers/asset.controller.js";

const router = express.Router();

router.get("/", protect, getAssets);
router.get("/:id", protect, getAssetById);

router.post("/", protect, adminOnly, createAsset);
router.put("/:id", protect, adminOnly, updateAsset);
router.delete("/:id", protect, adminOnly, deleteAsset);

export default router;
