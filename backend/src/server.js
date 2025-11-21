//server.js
import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import cors from "cors"; 

import transactionRoute from "./routes/transactionRoute.js";

dotenv.config();

const app = express();

// ✅ Add CORS middleware BEFORE other middleware
app.use(cors({
  origin: '*',  // Allow all origins (for development only!)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log("hey we the methos is", req.method);
  next();
});

const PORT = process.env.PORT || 5001;



app.use("/api/transactions", transactionRoute);
      
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
