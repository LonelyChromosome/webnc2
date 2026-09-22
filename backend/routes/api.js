const express = require("express");
const apiController = require("../controllers/apiController");

const router = express.Router();

router.get("/news", apiController.news);

module.exports = router;
