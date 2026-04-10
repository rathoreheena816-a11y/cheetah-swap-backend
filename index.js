 const express = require("express");
const cors = require("cors");

// ✅ FIX fetch (Railway compatible)
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Cheetah Backend Running 🚀");
});

// ✅ SAFE Quote API
app.get("/quote", async (req, res) => {
  try {
    const { inputMint, outputMint, amount } = req.query;

    if (!inputMint || !outputMint || !amount) {
      return res.status(400).json({ error: "Missing params" });
    }

    const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("QUOTE ERROR:", error);
    res.status(500).json({ error: "quote failed" });
  }
});

// ✅ SAFE Swap API
app.post("/swap", async (req, res) => {
  try {
    const { quoteResponse, userPublicKey } = req.body;

    if (!quoteResponse || !userPublicKey) {
      return res.status(400).json({ error: "Missing body" });
    }

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
  } catch (error) {
    console.error("SWAP ERROR:", error);
    res.status(500).json({ error: "swap failed" });
  }
});

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
