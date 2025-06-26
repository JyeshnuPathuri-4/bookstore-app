const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// GET /api/user/profile
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
