import cron from "node-cron";
import cryptoController from "../Controllers/cryptoController.js";
// Schedule the cron job to run every 5 minutes
const startCryptoCron = () => {
  cron.schedule("0 */2 * * *", async () => {
    console.log("Cron Job Started: Fetching cryptocurrency data...");
    try {
      // Call the fetchCryptoData function without req and res
      await cryptoController.fetchCryptoData(null, {
        status: () => ({ send: console.log }),
      });
      console.log("Cryptocurrency data fetched successfully.");
    } catch (error) {
      console.error("Error running cron job:", error.message);
    }
  });
};

export default startCryptoCron;
