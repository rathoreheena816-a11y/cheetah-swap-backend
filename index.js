const express = require("express");

const app = express();

// VERY IMPORTANT ROOT RESPONSE
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// extra test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend working 🚀" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
