import { isLogged, isAdmin, isUser } from "../middleware/auth.js";
import { Router } from "express";

import {
  orderStats,
  userStats,
  incomeStats,
  weekSales,
  getOrders,
  totalIncomes,
  editOrder,
  getOrder,
} from "../controllers/stats.js";

const statsRoutes = Router();

statsRoutes.get("/users", [isLogged, isUser, isAdmin], userStats);
statsRoutes.get("/orders", [isLogged, isUser, isAdmin], orderStats);
statsRoutes.get("/incomes", [isLogged, isUser, isAdmin], incomeStats);
statsRoutes.get("/weekSales", [isLogged, isUser, isAdmin], weekSales);

statsRoutes.get("/getOrders", [isLogged, isUser, isAdmin], getOrders);
statsRoutes.get("/getOrder/:id", [isLogged, isUser, isAdmin], getOrder);
statsRoutes.put("/editOrder/:id", [isLogged, isUser, isAdmin], editOrder);

statsRoutes.get("/totalIncomes", [isLogged, isUser, isAdmin], totalIncomes);

export default statsRoutes;
