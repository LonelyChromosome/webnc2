function status(req, res) {
  res.json({
    success: true,
    framework: "Express.js",
    message: "WEBNC2 server is running"
  });
}

module.exports = {
  status
};
