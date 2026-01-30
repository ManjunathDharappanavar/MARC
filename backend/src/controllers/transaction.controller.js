import Transaction from "../models/Transaction.js";
import Asset from "../models/Asset.js";

/**
 * CREATE TRANSACTION
 */
export const createTransaction = async (req, res) => {
  try {
    const { assetId, type, amount } = req.body;

    if (!assetId || !type || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    // Update asset value
    if (type === "expense") {
      asset.value -= amount;
    } else {
      asset.value += amount;
    }

    await asset.save();

    const transaction = await Transaction.create({
      assetId,
      type,
      amount,
      createdBy: req.user.id
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL TRANSACTIONS
 */
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ createdBy: req.user.id })
      .populate("assetId", "name")
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET SINGLE TRANSACTION
 */
export const getTransactionById = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  res.json(transaction);
};

/**
 * DELETE TRANSACTION (ROLLBACK ASSET VALUE)
 */
export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  const asset = await Asset.findById(transaction.assetId);

  if (transaction.type === "expense") {
    asset.value += transaction.amount;
  } else {
    asset.value -= transaction.amount;
  }

  await asset.save();
  await transaction.deleteOne();

  res.json({ message: "Transaction deleted successfully" });
};
