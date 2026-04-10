const express = require("express");
const app = express();

// test route
app.get("/", (req, res) => {
  res.send("Backend Live 🚀");
});

// IMPORTANT — Railway ke liye
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
