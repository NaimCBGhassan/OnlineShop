import { Router } from "express";
import { logIn, register } from "../controllers/user.controller.js";
import { exist } from "../middleware/validateExist.js";

const userRouter = Router();

userRouter.post("/register", exist, register);
userRouter.post("/login", logIn);

export default userRouter;
