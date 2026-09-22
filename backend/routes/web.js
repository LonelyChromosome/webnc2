const express = require("express");
const pageController = require("../controllers/pageController");
const newsController = require("../controllers/newsController");

const router = express.Router();

router.get("/", pageController.home);
router.get("/intro", pageController.home);

router.get("/contact", pageController.contact);
router.get("/about", pageController.contact);

router.get("/news", newsController.list);
router.get("/news/:id", newsController.detail);

router.get("/search", newsController.search);

router.get("/create", newsController.showCreate);
router.post("/create", newsController.create);

router.get("/edit", newsController.showEdit);
router.post("/edit", newsController.edit);

router.get("/delete", newsController.remove);

module.exports = router;
