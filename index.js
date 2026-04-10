const express = require("express");

const app = express();
app.use(express.json());

// ROOT
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// SWAP (REAL JUPITER)
app.post("/swap", async (req, res) => {
  try {
    const { inputMint, outputMint, amount } = req.body;

    const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;

    const response = await fetch(url); // ✅ built-in fetch
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Swap failed" });
  }
});

// PORT FIX
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
