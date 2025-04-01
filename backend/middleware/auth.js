const jwt = require("jsonwebtoken");

const auth = (role) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.access_token;

      if (!token) {
        return res.status(401).json({ errorMessage: "Unauthorized_no-token" });
      }

      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (role && role !== verifiedToken.role) {
        return res.status(401).json({ errorMessage: "Unauthorized_role" });
      }

      req.userId = verifiedToken.userId;
      req.role = verifiedToken.role;

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ errorMessage: "Unauthorized_unknown" });
    }
  };
};

module.exports = auth;
