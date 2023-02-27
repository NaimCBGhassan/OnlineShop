import { Router } from "express";
import { createPayment } from "../controllers/mp.controller.js";

const mpRoutes = Router();

mpRoutes.post("/", createPayment);

export default mpRoutes;
