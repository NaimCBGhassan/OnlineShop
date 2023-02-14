import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import productsRoutes from "./routes/products.routes.js";

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
app.use("/api/products", productsRoutes);

export default app;
