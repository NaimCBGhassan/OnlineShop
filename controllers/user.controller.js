import JWT from "jsonwebtoken";

import User from "../models/User.js";
import { SECRET_KEY } from "../config.js";

export const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    const user = {
      username,
      email,
      password: await User.hashPassword(password),
      isAdmin: true,
    };

    let newUser = new User(user);
    try {
      await newUser.save();
    } catch (error) {
      console.log(error);
    }

    delete user.password;

    const token = JWT.sign({ ...user, _id: newUser._id }, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });

    return res.json(token);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      return res.status(400).json(Object.keys(error.errors).map((key) => error.errors[key].properties));
    }
    if (error.message) {
      return res.status(400).json([{ message: error.message }]);
    }

    return res.status(500).json([{ message: "Internal server error" }]);
  }
};

export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    let logedUser = await User.findOne({ username });
    if (!logedUser) return res.status(404).json([{ message: "Username doesn't exist" }]);
    const passwordCorrect = await User.comparePassword(password, logedUser.password);
    if (!passwordCorrect) return res.status(400).json([{ message: "Invalid password" }]);

    logedUser = {
      username,
      email: logedUser.email,
      isAdmin: logedUser.isAdmin,
      _id: logedUser._id,
    };

    const token = JWT.sign(logedUser, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });

    return res.json(token);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* GET USER */

export const getUser = async (req, res) => {
  try {
    let { username, email, _id, isAdmin } = await User.findById(req.params.id);

    res.status(200).json({ username, email, _id, isAdmin });
  } catch (error) {
    console.log(error);
    res.status(404).json([{ message: "User doesn`t exist" }]);
  }
};

/* GET USERS */
export const getUsers = async (req, res) => {
  try {
    let users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(404).json([{ message: "Internal server error" }]);
  }
};

/* UPDATE USER */

export const updateUser = async (req, res) => {
  console.log(req.body.isAdmin);
  try {
    const user = await User.findById(req.params.id);

    if (!(user.username === req.body.username)) {
      const usernameInUse = await User.findOne({ username: req.body.username });
      if (usernameInUse) return res.status(400).json([{ message: "The username is already taken" }]);
    }

    if (!(user.email === req.body.email)) {
      const emailInUse = await User.findOne({ email: req.body.email });
      if (emailInUse) return res.status(400).json([{ message: "The email is already taken" }]);
    }

    if (req.body.password && user) {
      user.password = await User.hashPassword(req.body.password);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        password: user.password,
        isAdmin: req.body.isAdmin,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      _id: updatedUser._id,
      username: req.body.username,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });
  } catch (error) {
    res.status(500).json([{ message: "Internal server error" }]);
  }
};

/* DELETE USER */
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({});
  } catch (error) {
    console.log(error);
    res.status(404).json([{ message: "Internal server error" }]);
  }
};
