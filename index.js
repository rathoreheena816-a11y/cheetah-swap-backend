const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// 🔥 IMPORTANT ROOT ROUTE
app.get("/", (req, res) => {
  return res.status(200).send("Backend LIVE 🚀");
});

// TEST ROUTE
app.get("/test", (req, res) => {
  return res.json({ status: "ok" });
});

// Railway PORT
const PORT = process.env.PORT || 8080;

// MUST: 0.0.0.0 binding
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
