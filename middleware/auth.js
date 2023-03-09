import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../config.js";

export const isLogged = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json([{ message: "Acces denied. Not authenticated" }]);
  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;
  } catch (error) {
    return res.status(400).json([{ message: "Acces denied. Invalid auth token" }]);
  }

  return next();
};

export const isUser = (req, res, next) => {
  if (req.user._id === req.params.id || req.user.isAdmin) {
    return next();
  }

  return res.status(403).json([{ message: "Acces denied. Not authorized" }]);
};

export const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }

  return res.status(403).json([{ message: "Acces denied. Not authorized" }]);
};
