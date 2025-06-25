const User = require("../models/User");
const admin = require("../config/firebase");

// POST /api/auth/login
const handleLogin = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    // Check if user already exists
    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      // Create new user
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name || "",
        email: decoded.email,
        role: "buyer", // default role
      });
    }

    res.status(200).json({
      message: "✅ User authenticated",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id,
      },
    });
  } catch (err) {
    console.error("❌ Firebase login failed", err.message);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
};

module.exports = { handleLogin };
