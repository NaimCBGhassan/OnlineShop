import { Router } from "express";
import { webhook } from "../controllers/webhook.controller.js";
const webhookRoutes = Router();

webhookRoutes.post("/", webhook);

export default webhookRoutes;
