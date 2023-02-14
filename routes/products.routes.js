import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controller.js";

const productsRoutes = Router();

productsRoutes.get("/", getProducts);
productsRoutes.post("/", createProduct);

export default productsRoutes;
