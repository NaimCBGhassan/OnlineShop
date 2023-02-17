import { Router } from "express";
import { createProduct, deleteProduct, getProducts } from "../controllers/product.controller.js";

const productsRoutes = Router();

productsRoutes.get("/", getProducts);
productsRoutes.post("/", createProduct);
productsRoutes.delete("/:id", deleteProduct);

export default productsRoutes;
