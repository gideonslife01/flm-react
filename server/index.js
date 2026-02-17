const express = require("express");
const app = express();
const PORT = 3000;

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from Express Server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
