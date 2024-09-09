const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.header["Authorization"]?.split("")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, No token provided" });
  }
};
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    return res.status(403).json({ message: "Access denied, Invalid token" });
  }
  req.user = decoded;
  next();
});

module.exports = authMiddleware;
