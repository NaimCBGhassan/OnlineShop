import User from "../models/User.js";

import JWT from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export const register = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;

    const user = {
      username,
      email,
      password: await User.hashPassword(password),
      role,
    };

    const newUser = new User(user);
    await newUser.save();

    const token = JWT.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });

    return res.json({ newUser, token });
  } catch (error) {
    console.log(error);
    if (error.errors) {
      return res.status(400).json(Object.keys(error.errors).map((key) => error.errors[key].properties));
    }
    if (error.message) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    let logedUser = await User.findOne({ username });
    if (!logedUser) return res.status(404).json({ message: "Username doesn't exist" });
    const passwordCorrect = await User.comparePassword(password, logedUser.password);
    console.log(passwordCorrect);
    if (!passwordCorrect) return res.status(400).json({ message: "Invalid password" });

    const token = JWT.sign({ id: logedUser._id }, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });

    logedUser = {
      username,
      email: logedUser.email,
      _id: logedUser._id,
      token,
    };

    return res.json(logedUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
