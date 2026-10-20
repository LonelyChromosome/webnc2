const userModel = require("../../models/userModel");
async function login(req, res) {
  try {
    const user = await userModel.findUserByUsernameAndPassword(req.body?.username, req.body?.password);
    if (!user) return res.status(401).json({ success: false, message: "Sai username hoặc password" });
    const safe = { id: user.id, username: user.username, fullname: user.fullname || user.username };
    req.session.regenerate((error) => {
      if (error) return res.status(500).json({ success: false, message: "Lỗi khi đăng nhập" });
      req.session.user = safe;
      res.json({ success: true, message: "Đăng nhập thành công", user: safe });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi khi đăng nhập" });
  }
}
function logout(req, res) {
  if (!req.session) return res.json({ success: true, message: "Đăng xuất thành công" });
  req.session.destroy((error) => {
    if (error) return res.status(500).json({ success: false, message: "Lỗi khi đăng xuất" });
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Đăng xuất thành công" });
  });
}
function me(req, res) {
  if (!req.session?.user) return res.status(401).json({ success: false, message: "Chưa đăng nhập" });
  res.json({ success: true, user: req.session.user });
}
module.exports = { login, logout, me };
