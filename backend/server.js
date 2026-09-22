const app = require("./app");
const { initDatabase } = require("./config/db");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

async function startServer() {
  try {
    await initDatabase();
    console.log("MySQL connected: newsdb/posts ready");

    app.listen(PORT, HOST, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("\nKhong the ket noi MySQL.");
    console.error("Code:", error.code || "UNKNOWN");
    console.error("Message:", error.message);

    if (error.code === "ECONNREFUSED") {
      console.error("=> Kiem tra MySQL Server da duoc bat va port 3306.");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("=> Sai DB_USER hoac DB_PASSWORD.");
    } else if (error.code === "ENOTFOUND") {
      console.error("=> Sai DB_HOST.");
    }

    process.exit(1);
  }
}

startServer();
