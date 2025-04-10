const jwt = require("jsonwebtoken");

const auth = (role) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.access_token;

      if (!token) {
        return res.status(401).json({
          message: "You're not authorized. Please log in to continue.",
        });
      }

      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (role && role !== verifiedToken.role) {
        return res.status(401).json({
          message: "You don't have permission to view this content.",
        });
      }

      req.userId = verifiedToken.userId;
      req.role = verifiedToken.role;

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Unknown Authentication Error" });
    }
  };
};

module.exports = auth;
