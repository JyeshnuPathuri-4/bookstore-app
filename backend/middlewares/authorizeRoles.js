const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("🔐 Checking user role:", req.user.role); // Add this

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }

    next();
  };
};

module.exports = authorizeRoles;
