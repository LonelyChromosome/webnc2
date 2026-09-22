const fs = require("fs/promises");
const path = require("path");

const DB_FILE = path.join(__dirname, "..", "data", "db.json");

async function news(req, res, next) {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  news
};
