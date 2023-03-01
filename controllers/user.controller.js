import JWT from "jsonwebtoken";

import User from "../models/User.js";
import { MPConfig, MPCreateClient, MPGetClient } from "../libs/mercadopago.js";
import { SECRET_KEY } from "../config.js";

export const register = async (req, res) => {
  try {
    let customer;
    let { username, email, password, role } = req.body;
    MPConfig();
    try {
      const { data } = await MPCreateClient(email);
      customer = data;
    } catch (error) {
      console.log(error);
    }

    const user = {
      username,
      email,
      password: await User.hashPassword(password),
      role,
      customerId: customer.id,
    };

    let newUser = new User(user);
    await newUser.save();

    delete user.password;

    const token = JWT.sign({ ...user, id: newUser._id }, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });

    return res.json(token);
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
    if (!logedUser) return res.status(404).json([{ message: "Username doesn't exist" }]);
    const passwordCorrect = await User.comparePassword(password, logedUser.password);
    if (!passwordCorrect) return res.status(400).json([{ message: "Invalid password" }]);

    logedUser = {
      username,
      email: logedUser.email,
      role: logedUser.role,
      customerId: logedUser.customerId,
      _id: logedUser._id,
    };

    const token = JWT.sign(logedUser, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });

    return res.json(token);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
