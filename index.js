const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Railway port setup (IMPORTANT)
const PORT = process.env.PORT || 8080;

// ✅ Root route (Railway error fix)
app.get("/", (req, res) => {
  res.send("Cheetah Swap Backend Running 🚀");
});

// ✅ Quote API (GET)
app.get("/quote", async (req, res) => {
  try {
    const { inputMint, outputMint, amount } = req.query;

    const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "quote failed" });
  }
});

// ✅ Swap API (POST)
app.post("/swap", async (req, res) => {
  try {
    const { quoteResponse, userPublicKey } = req.body;

    const response = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey,
        wrapAndUnwrapSol: true,
      }),
    });

    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "swap failed" });
  }
});

// ✅ Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

