import { Router } from "express";
import { createProduct, deleteProduct, getProducts } from "../controllers/product.controller.js";
import { isAdmin, isLogged } from "../middleware/auth.js";

const productsRoutes = Router();

productsRoutes.get("/", getProducts);
productsRoutes.post("/", [isLogged, isAdmin], createProduct);
productsRoutes.delete("/:id", [isLogged, isAdmin], deleteProduct);

export default productsRoutes;
