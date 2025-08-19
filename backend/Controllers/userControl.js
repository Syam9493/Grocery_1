//import express from 'express';
import User from "../Models/userModel.js";
import generateToken from "../utils/genarateToken.js";
//import tokenModel from '../Models/tokenModel.js';
//import bcrypt from 'bcryptjs';

// Register a new user
// /api/users/register
// POST Request

const registerUser = async (req, res) => {
  const { FirstName, LastName, email, password, confPassword, cellNumber } =
    req.body;

  const ExistUser = await User.findOne({ email });

  if (ExistUser) {
    res.status(400);
    throw new Error("User already Exist");
  }

  const user = await User.create({
    FirstName,
    LastName,
    email,
    password,
    confPassword,
    cellNumber,
  });


  if (user) {
    await generateToken(res, user._id);
    await res.status(201).json({
      id: user._id,
      name: `${user.FirstName} ${user.LastName}`,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

// Login user
//  /api/users/login
// POST Request

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user && (await user.matchPassword(password))) {
      await generateToken(res, user._id);

      res.status(200).json({
        id: user._id,
        name: `${user.FirstName} ${user.LastName}`,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users
// /api/users
// GET Request

const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  return res.status(200).json(allUsers);
};

// update user details
// /api/users/:id
// PUT Request

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName, email, cellNumber } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.FirstName = FirstName || user.FirstName;
    user.LastName = LastName || user.LastName;
    user.email = email || user.email;
    user.cellNumber = cellNumber || user.cellNumber;

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      name: `${updatedUser.FirstName} ${updatedUser.LastName}`,
      email: updatedUser.email,
      cellNumber: updatedUser.cellNumber,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user
// /api/users/:id
// DELETE Request

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update user password
// /api/users/:id/password
// PUT Request

const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { password, confPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== confPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  registerUser,
  getAllUsers,
  loginUser,
  updateUser,
  deleteUser,
  updateUserPassword,
};
