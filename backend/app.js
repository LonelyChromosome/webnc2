const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const webRoutes = require("./routes/web");
const oldApiRoutes = require("./routes/api");
const postApiRoutes = require("./routes/api/postApiRoute");
const authApiRoutes = require("./routes/api/authApiRoute");

const app = express();
const FRONTEND_DIR = path.join(__dirname, "..", "frontend");
app.set("view engine", "ejs");
app.set("views", path.join(FRONTEND_DIR, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(session({
  name: "connect.sid",
  secret: process.env.SESSION_SECRET || "webnc2-lab-session-local-development-change-this",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax", secure: false, maxAge: 86400000 }
}));
app.use(express.static(FRONTEND_DIR, { index: false }));
app.use("/api/posts", postApiRoutes);
app.use("/api/auth", authApiRoutes);
app.use("/api", oldApiRoutes);
app.use("/", webRoutes);
app.get("/demo.js", (req, res) => res.sendFile(path.join(FRONTEND_DIR, "js", "demo.js")));
app.use((req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ success: false, message: "API không tồn tại" });
  res.status(404).type("text/plain").send("404 - Khong tim thay trang");
});
app.use((error, req, res, next) => {
  console.error(error);
  if (req.path.startsWith("/api/")) return res.status(500).json({ success: false, message: "Lỗi xử lý dữ liệu" });
  res.status(500).type("text/html").send("<h1>Lỗi xử lý dữ liệu</h1>");
});
module.exports = app;
