const app = require("./app");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`WEBNC2 running at http://localhost:${PORT}`);
});
