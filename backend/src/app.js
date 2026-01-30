const express = require("express");
const cors = require("cors");

// Global error handler
const errorMiddleware = require("./middlewares/error.middleware");

// Route imports
const authRoutes = require("./routes/auth.routes");
const assetRoutes = require("./routes/asset.routes");
const transactionRoutes = require("./routes/transaction.routes");
const reportRoutes = require("./routes/report.routes");

const app = express();

/* =======================
   MIDDLEWARES
======================= */

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

/* =======================
   API ROUTES
======================= */

// Authentication (Register, Login)
app.use("/api/auth", authRoutes);

// Assets (CRUD)
app.use("/api/assets", assetRoutes);

// Transactions (Issue / Return)
app.use("/api/transactions", transactionRoutes);

// Reports & Analytics
app.use("/api/reports", reportRoutes);

/* =======================
   ERROR HANDLING
======================= */

// Global error middleware (must be last)
app.use(errorMiddleware);

module.exports = app;
