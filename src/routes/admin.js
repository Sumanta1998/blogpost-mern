const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkAdmin = require("../middleware/checkAdmin");

const AdminController = require("../controllers/admin");

router.get("/getAllBlogs", checkAuth, checkAdmin, AdminController.getAllBlogs);

router.get("/getAllUsers", checkAuth, checkAdmin, AdminController.getAllUsers);

router.patch(
  "/deleteBlog/:blogId",
  checkAuth,
  checkAdmin,
  AdminController.deleteOneBlog
);

router.patch(
  "/deleteUser/:userId",
  checkAuth,
  checkAdmin,
  AdminController.deleteOneUser
);

router.patch(
  "/approveBlog/:blogId",
  checkAuth,
  checkAdmin,
  AdminController.approveBlog
);

router.patch(
  "/approveUser/:userId",
  checkAuth,
  checkAdmin,
  AdminController.approveUser
);

module.exports = router;
