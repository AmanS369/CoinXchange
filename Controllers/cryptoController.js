import axios from "axios";
import CryptoData from "../Database/Model/CryptoData.js";

const fetchCryptoData = async (req, res) => {
  try {
    const coinIds = ["bitcoin", "ethereum", "matic-network"];
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(
        ",",
      )}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&x_cg_demo_api_key=${
        process.env.COINGECKO_API_KEY || ""
      }`,
    );

    const data = response.data;

    // Saving data for each coin
    for (const coinId of coinIds) {
      const cryptoEntry = new CryptoData({
        coinId,
        price: data[coinId].usd,
        marketCap: data[coinId].usd_market_cap,
        change24h: data[coinId].usd_24h_change,
      });
      await cryptoEntry.save();
    }

    res.status(200).send({
      message: "Cryptocurrency data fetched and stored successfully.",
    });
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    res.status(500).send({ error: "Failed to fetch cryptocurrency data." });
  }
};

const getCryptoStats = async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) {
      return res.status(400).send({ error: "Coin parameter is required" });
    }

    const latestData = await CryptoData.findOne({ coinId: coin }).sort({
      timestamp: -1,
    });

    if (!latestData) {
      return res
        .status(404)
        .send({ error: "No data found for the specified coin" });
    }

    res.status(200).send({
      coin: latestData.coinId,
      priceUSD: latestData.priceUSD,
      marketCapUSD: latestData.marketCapUSD,
      change24h: latestData.change24h,
      timestamp: latestData.timestamp,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).send({ error: "Failed to retrieve cryptocurrency stats." });
  }
};

const getDeviation = async (req, res) => {
  try {
    const { coin } = req.query;
    if (!coin) {
      return res.status(400).json({ error: "Coin parameter is required" });
    }

    const records = await CryptoData.find({ coinId: coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (records.length === 0) {
      return res
        .status(404)
        .json({ error: "No data found for the specified coin" });
    }

    const prices = records.map((record) => record.price);

    // Calculate mean
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    // Calculate variance
    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;

    // Calculate standard deviation
    const standardDeviation = Math.sqrt(variance);

    res.status(200).json({
      deviation: parseFloat(standardDeviation.toFixed(2)),
      variance: variance,
      mean: mean,
    });
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    res.status(500).send({ error: "Failed to fetch cryptocurrency data." });
  }
};

export default { fetchCryptoData, getCryptoStats, getDeviation };
