const express = require("express");
const app = express();

// root check
app.get("/", (req, res) => {
  res.send("Backend LIVE 🚀");
});

// test route
app.get("/test", (req, res) => {
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});