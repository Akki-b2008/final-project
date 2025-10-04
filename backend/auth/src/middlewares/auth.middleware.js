const jwt = require("jsonwebtoken");
const redis = require("../db/redis");

const authMiddlware = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const isBlacklisted = await redis.get(`blacklist : ${token}`);

  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = decoded;

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddlware;
