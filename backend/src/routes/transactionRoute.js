import express from "express";

// import { sql } from "../config/db.js";

import {
  getTransactionSummary,
  postTransaction,
  getTransactionByUsetId,
  deleteTransactionById,        
} from "../controller/transactionController.js";

const router = express.Router();

// Get transactions by user_id

//middleware

router.get("/summary/:user_id", getTransactionSummary);

router.post("/", postTransaction);

router.delete("/:id", deleteTransactionById);

router.get("/:user_id", getTransactionByUsetId);

export default router;
