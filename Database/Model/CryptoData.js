import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
  coinId: { type: String, required: true, index: true },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
  price: { type: Number, required: true },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
});

const CryptoData = mongoose.model("CryptoData", cryptoSchema);
export default CryptoData;
