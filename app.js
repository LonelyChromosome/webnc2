const express = require("express");
const path = require("path");

const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "public"), {
    index: false
  })
);

app.use("/", webRoutes);
app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

module.exports = app;
