const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const checkWriter = require("../middleware/checkWriter");
const BlogsController = require("../controllers/blog");

router.get("/myblogs", checkAuth, BlogsController.getAllBlogs);

router.post("/", checkAuth, checkWriter, BlogsController.createBlog);

router.get("/", BlogsController.getAllfeeds);
module.exports = router;
