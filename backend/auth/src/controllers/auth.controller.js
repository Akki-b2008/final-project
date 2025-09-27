const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const redis = require("../db/redis");

const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      fullName: { firstName, lastName },
      role,
    } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
      fullName: { firstName, lastName },
      role: role || "user", // default role is 'user'
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        addresses: user.addresses,
      },
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const hashPassword = await bcrypt.compare(password, user.password || "");

    if (!hashPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "User loggedIn successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        addresses: user.addresses,
      },
    });
  } catch (err) {
    console.error("Error in loginUser:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    message: "Current user fetched successfully",
    user: req.user,
  });
};

const logout = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    await redis.set(`blacklist : ${token}`, "true", "EX", 7 * 24 * 60 * 60);
  }

  res.clearCookies("token", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
};

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
};
