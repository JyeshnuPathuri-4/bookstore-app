const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    // Firebase UID comes from token middleware
    const user = await User.findOne({ firebaseUid: req.user.uid });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile };
