import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/", protect, getTransactions);
router.get("/:id", protect, getTransactionById);
router.delete("/:id", protect, deleteTransaction);

export default router;
