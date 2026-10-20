const router = require("express").Router();
const auth = require("../../controllers/api/authApiController");
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/me", auth.me);
module.exports = router;
