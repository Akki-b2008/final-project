const jwt = require("jsonwebtoken");
const redis = require("../db/redis");

const createAuthMiddleware = (role = ["user"]) => {
  return async function createAuthMiddleware(req, res, next) {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

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

      if (!role.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions" });
      }

      const user = decoded;

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  };
};

module.exports = createAuthMiddleware;
