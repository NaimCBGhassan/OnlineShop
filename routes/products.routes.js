import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { isAdmin, isLogged } from "../middleware/auth.js";

const productsRoutes = Router();

productsRoutes.get("/", getProducts);
productsRoutes.get("/:id", getProduct);
productsRoutes.post("/", [isLogged, isAdmin], createProduct);
productsRoutes.put("/:id", [isLogged, isAdmin], updateProduct);
productsRoutes.delete("/:id", [isLogged, isAdmin], deleteProduct);

export default productsRoutes;
