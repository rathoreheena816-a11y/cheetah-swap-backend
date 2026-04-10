const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// REAL SWAP ROUTE (Jupiter)
app.post("/swap", async (req, res) => {
  try {
    const { inputMint, outputMint, amount } = req.body;

    const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Swap failed" });
  }
});

// IMPORTANT (Railway port fix)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
