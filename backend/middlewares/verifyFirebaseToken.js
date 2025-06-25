const admin = require("../config/firebase");
const User = require("../models/User");

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    // 🔐 Verify token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);

    // 🔍 Find user in our MongoDB using Firebase UID
    const user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      return res.status(401).json({ message: "User not found in DB" });
    }

    // ✅ Attach user to req object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: user.role,
      mongoId: user._id,
    };

    next(); // Pass control to next middleware or route
  } catch (err) {
    console.error("Token verification failed ❌", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyFirebaseToken;
