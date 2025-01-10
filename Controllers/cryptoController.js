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

    const latestData = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&x_cg_demo_api_key=${
        process.env.COINGECKO_API_KEY || ""
      }`,
    );

    if (!latestData) {
      return res
        .status(404)
        .send({ error: "No data found for the specified coin" });
    }
    console.log(latestData.data);
    const current_data = latestData.data;
    res.status(200).send({
      price: current_data[coin].usd,
      marketCap: current_data[coin].usd_market_cap,
      change24h: current_data[coin].usd_24h_change,
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

const getMarketChart = async (req, res) => {
  const { coin, days } = req.query;

  if (!coin || !days) {
    return res
      .status(400)
      .json({ error: "Coin and days parameters are required." });
  }

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily&x_cg_demo_api_key=${
        process.env.COINGECKO_API_KEY || ""
      }`,
      {
        params: {
          vs_currency: "usd",
          days,
        },
      },
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error:
        error.response?.data?.error || "Failed to fetch data from CoinGecko",
    });
  }
};

export default {
  fetchCryptoData,
  getCryptoStats,
  getDeviation,
  getMarketChart,
};
