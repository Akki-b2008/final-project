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

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
};

const getUserAddresses = async (req, res) => {
  const { id } = req.user;

  const user = await userModel.findById(id).select("addresses");

  if (!user) {
    return res.status(401).json({
      message: "user not found",
    });
  }

  return res.status(200).json({
    message: "User's addresses fetched successfully",
    addresses: user.addresses,
  });
};

const addUserAddresses = async (req, res) => {
  const { id } = req.user;

  const { street, city, state, pincode, country, isDefault } = req.body;

  const user = await userModel.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        addresses: {
          street,
          city,
          state,
          pincode,
          country,
          isDefault,
        },
      },
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(201).json({
    message: "Adderess added successfully",
    addresses: user.addresses,
  });
};

const deleteUserAddresses = async (req, res) => {
  const { id } = req.user;

  const { addressId } = req.params;

  const isAddressExist = await userModel.findOne({
    _id: id,
    "addresses._id": addressId,
  });

  if (!isAddressExist) {
    return res.status(404).json({
      message: "Address not found",
    });
  }

  const user = await userModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        addresses: {
          _id: addressId,
        },
      },
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const addressExists = user.addresses.some(
    (add) => add._id.toString() === addressId
  );

  if (addressExists) {
    return res.status(500).json({
      message: "Failed to delete address",
    });
  }

  return res.status(200).json({
    message: "Address deleted successfully",
    addresses: user.addresses,
  });
};

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  getUserAddresses,
  addUserAddresses,
  deleteUserAddresses,
};
