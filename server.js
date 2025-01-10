import express from "express";
import dotenv from "dotenv";
import cryptoRoutes from "./Router/cryptoRoutes.js";
import startCryptoCron from "./Utils/cryptoCron.js";
import connDB from "./Database/connDB.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
// Connect to MongoDB
connDB();
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  }),
);
// Routes
app.use("/api/crypto", cryptoRoutes);

startCryptoCron();
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
