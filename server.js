const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "WEBNC2 server is running"
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`WEBNC2 running at http://localhost:${PORT}`);
});
