import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { getSummary } from "../controllers/report.controller.js";

const router = express.Router();
router.get("/summary", protect, getSummary);

export default router;
