const express = require("express");
const router = express.Router();
const { addBook,  getAllBooks, getBookById } = require("../controllers/bookController");
const verifyToken = require("../middlewares/verifyToken");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.post("/add-book", verifyToken, authorizeRoles("author", "admin"), addBook);
router.get("/", verifyToken, getAllBooks);
router.get("/:id", verifyToken, getBookById);


module.exports = router;
