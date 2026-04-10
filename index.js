const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());

// 🔥 ROOT FIX (important)
app.get("/", (req, res) => {
  return res.status(200).send("Backend Running 🚀");
});

// SWAP ROUTE
app.post("/swap", async (req, res) => {
  try {
    const { inputMint, outputMint, amount } = req.body;

    const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;

    const response = await fetch(url);
    const data = await response.json();

    return res.json(data);
  } catch (err) {
    console.error("Swap error:", err);
    return res.status(500).json({ error: "Swap failed" });
  }
});

// 🔥 MOST IMPORTANT (Railway)
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

