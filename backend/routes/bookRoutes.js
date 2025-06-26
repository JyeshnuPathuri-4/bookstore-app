const express = require("express");
const router = express.Router();

const { addBook } = require("../controllers/bookController");
const verifyToken = require("../middlewares/verifyToken");
const authorizeRoles = require("../middlewares/authorizeRoles");

// Route to add a new book (only for authors and admins)
router.post("/add-book", verifyToken, authorizeRoles("author", "admin"), addBook);

module.exports = router;
