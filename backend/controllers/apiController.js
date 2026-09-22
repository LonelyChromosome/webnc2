const fs = require("fs/promises");
const path = require("path");

const DB_FILE = path.join(__dirname, "..", "data", "db.json");

async function news(req, res) {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    const posts = JSON.parse(data);

    res
      .status(200)
      .type("application/json")
      .send(JSON.stringify(posts, null, 2));
  } catch (error) {
    res.status(500).json({
      error: "Khong the doc database"
    });
  }
}

module.exports = {
  news
};
