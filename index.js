const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🔹 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Cheetah Swap Backend Running 🚀");
});

// 🔹 QUOTE API
app.get("/quote", async (req, res) => {
  try {
    const { inputMint, outputMint, amount, slippageBps } = req.query;

    const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "quote failed" });
  }
});

// 🔹 SWAP API
app.post("/swap", async (req, res) => {
  try {
    const { quoteResponse, walletAddress } = req.body;

    const response = await axios.post(
      "https://quote-api.jup.ag/v6/swap",
      {
        quoteResponse,
        userPublicKey: walletAddress,
        wrapAndUnwrapSol: true,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "swap failed" });
  }
});

// 🔹 START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
