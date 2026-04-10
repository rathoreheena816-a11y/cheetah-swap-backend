const express = require("express");
const app = express();

// health check route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// IMPORTANT: Railway dynamic port
const PORT = process.env.PORT || 8080;

// bind to 0.0.0.0 (must for Railway)
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
