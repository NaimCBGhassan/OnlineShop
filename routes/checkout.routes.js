import { Router } from "express";
import { createPayment } from "../controllers/checkout.controller.js";

const checkoutRoutes = Router();

checkoutRoutes.post("/", createPayment);

export default checkoutRoutes;
