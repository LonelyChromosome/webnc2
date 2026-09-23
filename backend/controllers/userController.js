const crypto = require("crypto");
const userDatabase = require("../services/userDatabase");

function showCreate(req, res) {
  res.render("user-create", {
    error: "",
    success: ""
  });
}

async function create(req, res, next) {
  try {
    const username = String(req.body.username || "").trim();
    const password = String(req.body.password || "");

    if (!username || !password) {
      res.status(400).render("user-create", {
        error: "Vui lòng nhập đầy đủ tài khoản và mật khẩu.",
        success: ""
      });
      return;
    }

    const existingUser = await userDatabase.findByUsername(username);

    if (existingUser) {
      res.status(409).render("user-create", {
        error: "Tài khoản đã tồn tại.",
        success: ""
      });
      return;
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = crypto
      .scryptSync(password, salt, 64)
      .toString("hex");

    await userDatabase.createUser({
      username,
      salt,
      passwordHash
    });

    res.render("user-create", {
      error: "",
      success: "Tạo tài khoản thành công."
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  showCreate,
  create
};
