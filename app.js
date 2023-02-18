import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import productsRoutes from "./routes/products.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

/*Middelwares */
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

/*Routes */
app.get("/", (req, res) => res.json({ products: "/api/products" }));
app.get("/api", (req, res) => res.json({ products: "/api/products" }));

app.use("/api/products", productsRoutes);
app.use("/api", userRouter);
export default app;
