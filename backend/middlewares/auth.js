const jwt = require("jsonwebtoken");

const auth = (role) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.access_token;

      if (!token) {
        return res.status(401).json({ errorMessage: "Unauthorized_1" });
      }

      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (role !== verifiedToken.role) {
        return res.status(401).json({ errorMessage: "Unauthorized_2" });
      }

      req.userId = verifiedToken.userId;

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ errorMessage: "Unauthorized_3" });
    }
  };
};

module.exports = auth;
