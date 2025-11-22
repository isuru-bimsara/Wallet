import { sql } from "../config/db.js";

export async function getTransactionByUsetId(req, res) {
  try {
    const { user_id } = req.params;
    const transaction = await sql`
          SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC
        `;
    res.status(200).json({ data: transaction });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function postTransaction(req, res) {
  try {
    const { user_id, title, category, amount } = req.body;

    if (!user_id || !title || !category || amount === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTransaction = await sql`
          INSERT INTO transactions (user_id, title, category, amount)
          VALUES (${user_id}, ${title}, ${category}, ${amount})
          RETURNING *
        `;

    res.status(201).json({
      message: "Transaction created successfully",
      data: newTransaction[0],
    });

    console.log("New transaction added:", newTransaction[0]);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteTransactionById(req, res) {
  try {
    const { id } = req.params;

    console.log("═══════════════════════════════");
    console.log("DELETE Request received");
    console.log("Transaction ID:", id);
    console.log("═══════════════════════════════");

    const deletedTransaction = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;

    if (deletedTransaction.length === 0) {
      console.log("❌ Transaction not found with ID:", id);
      return res.status(404).json({ message: "Transaction not found" });
    }

    console.log("✅ Transaction deleted:", deletedTransaction[0]);

    res.status(200).json({
      message: "Transaction deleted successfully",
      data: deletedTransaction[0],
    });
  } catch (error) {
    console.error("❌ Error deleting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTransactionSummary(req, res) {
  try {
    const { user_id } = req.params;

    const balanceResult = await sql`
      SELECT 
        COALESCE(SUM(amount),0) as balance 
      FROM transactions 
      WHERE user_id = ${user_id};`;

    const incomeResult = await sql`
      SELECT 
       COALESCE(SUM(amount),0) as income 
      FROM transactions 
      WHERE user_id = ${user_id} AND amount > 0 ;
    `;

    const expenseResult = await sql`
      SELECT 
       COALESCE(SUM(amount),0) as expense 
      FROM transactions 
      WHERE user_id = ${user_id} AND amount < 0 ;
    `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
