const path = require("path");

const PAGES_DIR = path.join(__dirname, "..", "..", "frontend", "pages");

function home(req, res) {
  res.sendFile(path.join(PAGES_DIR, "intro.html"));
}

function contact(req, res) {
  res.sendFile(path.join(PAGES_DIR, "contact.html"));
}

module.exports = {
  home,
  contact
};
