import { Router } from "express";
import { isLogged, isAdmin, isUser } from "../middleware/auth.js";
import { deleteUser, getUser, getUsers, logIn, register, updateUser } from "../controllers/user.controller.js";
import { exist } from "../middleware/validateExist.js";

const userRouter = Router();

userRouter.post("/register", exist, register);
userRouter.post("/login", logIn);
userRouter.get("/user/:id", [isLogged, isUser, isAdmin], getUser);
userRouter.get("/users", [isLogged, isUser, isAdmin], getUsers);
userRouter.put("/user/:id", [isLogged, isUser, isAdmin], updateUser);
userRouter.delete("/user/:id", [isLogged, isUser, isAdmin], deleteUser);

export default userRouter;
