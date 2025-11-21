import express from "express";

// import { sql } from "../config/db.js";

import { getTransactionByUsetId, postTransaction ,
    deleteTransactionByUserId, getTransactionSummary} from "../controller/transactionController.js";

const router = express.Router();

// Get transactions by user_id

//middleware
router.get("/:user_id", getTransactionByUsetId);

router.post("/", postTransaction);

router.delete("/:user_id", deleteTransactionByUserId);

router.get("/summary/:user_id", getTransactionSummary);

export default router;
