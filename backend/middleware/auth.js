const jwt = require("jsonwebtoken");

const auth = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];

      // Public route — no token needed
      if (token === "null") {
        if (allowedRoles.length === 0) {
          req.userId = null;
          req.role = "guest";
          return next();
        }
        return res.status(401).json({
          message: "You're not authorized. Please log in to continue.",
        });
      }

      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = verifiedToken.userId;
      req.role = verifiedToken.role;

      // If route is restricted to specific roles
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(verifiedToken.role)
      ) {
        return res.status(403).json({
          message: "You don't have permission to perform this action.",
        });
      }

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Unknown Authentication Error" });
    }
  };
};

module.exports = auth;
