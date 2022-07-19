const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const UserController = require("../controllers/user");

router.post("/signup", UserController.signUp);

router.post("/login", UserController.logIn);
module.exports = router;
