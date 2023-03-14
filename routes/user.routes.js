import { Router } from "express";
import { isLogged, isAdmin, isUser } from "../middleware/auth.js";
import { getUser, getUsers, logIn, register } from "../controllers/user.controller.js";
import { exist } from "../middleware/validateExist.js";

const userRouter = Router();

userRouter.post("/register", exist, register);
userRouter.post("/login", logIn);
userRouter.get("/user/:id", [isLogged, isUser, isAdmin], getUser);
userRouter.get("/users", [isLogged, isUser, isAdmin], getUsers);

export default userRouter;
