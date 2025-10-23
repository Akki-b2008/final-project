const { Redis } = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
});

redis.on("connection", () => {
  console.log("Redis connected successfully.");
});

module.exports = redis;
