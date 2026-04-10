const express = require("express");

const app = express();

// ROOT (IMPORTANT FOR RAILWAY)
app.get("/", (req, res) => {
  res.send("OK");
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.send("healthy");
});

// 🚨 CRITICAL FIX
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
