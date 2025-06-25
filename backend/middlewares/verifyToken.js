// backend/middleware/verifyToken.js
const admin = require("../config/firebase");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    // ✅ Check if user exists in DB
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    // ✅ Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("verifyToken error:", error);
    return res.status(401).json({ message: "Token verification failed" });
  }
};

module.exports = verifyToken;
