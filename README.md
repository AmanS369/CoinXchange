# KoinX Backend Internship Assignment

This repository contains my submission for the **KoinX Backend Internship Assignment**. The project is built using **Node.js** and demonstrates my ability to create a robust backend system by implementing several tasks, including a feature to fetch the market chart of the last 30 days for a cryptocurrency.

---

## Important Links:

- Frontend Depolyment Link : [CryptoXchange Frontend](https://coin-xchange-frontend.vercel.app/)
- Backend Depolyment Link : [CryptoXchange Backend](https://coinxchange-wn56.onrender.com/)
- The Backend repo : [Backend ](https://github.com/AmanS369/CoinXchange)
- The frontend repo : [Frontend](https://github.com/AmanS369/CoinXchange_Frontend)

## Features

### ✅ **Task Implementation**

1. **Fetch Price of a Cryptocurrency**Retrieve the current price of a specific cryptocurrency from the market.
2. **Track Price of a Cryptocurrency**Set up a mechanism to track the price of a cryptocurrency at regular intervals.
3. **Notify on Price Changes**Send notifications when the price of a cryptocurrency changes significantly.
4. **Market Chart of the Last 30 Days**
   Fetch and display the market chart of a cryptocurrency for the past 30 days.

### 🚀 **Why I Used These Technologies**

- **Node.js**Node.js is a fast and efficient runtime environment for building scalable and high-performance backend systems. Its asynchronous nature is well-suited for handling APIs and real-time operations like tracking cryptocurrency prices.
- **node-cron**
  I used `node-cron` to schedule recurring tasks, such as fetching cryptocurrency data at specified intervals. It simplifies the process of setting up cron jobs and is highly reliable for backend automation.

---

## Tech stack used:

![Node.js](https://img.shields.io/badge/node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Node-Cron](https://img.shields.io/badge/node--cron-%2300ADD8.svg?style=for-the-badge&logo=javascript&logoColor=white)

## Tools used

![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Installation and Setup

Follow these steps to run the project on your local machine:

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)

### Steps

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**Create a `.env` file in the root directory and add the required environment variables:

   ```env
   API_KEY=<Your_API_Key> # Replace with your API key
   ```

4. **Run the Application**
   Start the application using the following command:

   ```bash
   node server.js
   ```

## Usage

### Endpoints

Here are the primary endpoints of the application:

| **Endpoint**               | **HTTP Method** | **Description**                                                    | **Query Parameters**            |
| -------------------------- | --------------- | ------------------------------------------------------------------ | ------------------------------- |
| `/api/crypto/stats`        | `GET`           | Fetch the current price of a cryptocurrency.                       | `coin` (Required): The coin ID. |
| `/api/crypto/deviation`    | `GET`           | Track deviations of the cryptocurrency.                            | `coin` (Required): The coin ID. |
| `/api/crypto/market_chart` | `GET`           | Fetch the market chart for a cryptocurrency over the last 30 days. | `coin` (Required): The coin ID. |

## Would you like to make any further adjustments?
