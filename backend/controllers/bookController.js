const Book = require("../models/Book");

// POST /api/books/add-book
const addBook = async (req, res) => {
  try {
    const { title, description, category, isbn, publishedDate, imageUrl } = req.body;

    const book = new Book({
      title,
      description,
      category,
      isbn,
      publishedDate,
      imageUrl,
      authorName: req.user.name,
      authorId: req.user._id,
    });

    await book.save();

    res.status(201).json({
      message: "✅ Book added successfully",
      book,
    });
  } catch (err) {
    console.error("❌ Failed to add book:", err.message);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

// GET /api/books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("authorId", "name email");
    res.status(200).json({ books });
  } catch (err) {
    console.error("❌ Failed to fetch books:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error("❌ Error fetching book:", err.message);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

// PUT /api/books/:id
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the logged-in user is the book's author or an admin
    if (book.authorId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: you can only update your own books" });
    }

    const updatedData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "✅ Book updated successfully",
      updatedBook,
    });
  } catch (err) {
    console.error("❌ Error updating book:", err.message);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};



module.exports = { addBook, getAllBooks, getBookById, updateBook };
