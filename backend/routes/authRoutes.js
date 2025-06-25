const express = require("express");
const router = express.Router();
const { handleLogin } = require("../controllers/authController");

router.post("/login", handleLogin); // verify + create if new

module.exports = router;
