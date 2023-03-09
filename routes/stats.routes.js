import { isLogged, isAdmin, isUser } from "../middleware/auth.js";
import { Router } from "express";

import { orderStats, userStats, incomeStats } from "../controllers/stats.js";
const userStatsRouter = Router();
const orderStatsRouter = Router();
const incomeStatsRouter = Router();

userStatsRouter.get("/stats", [isLogged, isUser, isAdmin], userStats);
orderStatsRouter.get("/stats", [isLogged, isUser, isAdmin], orderStats);
incomeStatsRouter.get("/stats", [isLogged, isUser, isAdmin], incomeStats);

export { userStatsRouter, orderStatsRouter, incomeStatsRouter };
