import express from "express";
const router = express.Router();
import cryptoController from "../Controllers/cryptoController.js";

// Route to fetch and store cryptocurrency data
router.get("/fetch", cryptoController.fetchCryptoData);

// Route to get stats for a specific cryptocurrency
router.get("/stats", cryptoController.getCryptoStats);
router.get("/deviation", cryptoController.getDeviation);
export default router;
