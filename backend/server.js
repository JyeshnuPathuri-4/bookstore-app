const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

const connectDB = require("./config/db");
connectDB(); // ✅ Connect to DB FIRST

// ✅ Apply middleware BEFORE routes
app.use(cors());
app.use(express.json());

// ✅ Now define your routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/books", bookRoutes);

// ✅ Optional: test route
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
