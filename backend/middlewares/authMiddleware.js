function requireApiLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: "Bạn cần đăng nhập để thực hiện chức năng này" });
  }
  next();
}
module.exports = { requireApiLogin };
