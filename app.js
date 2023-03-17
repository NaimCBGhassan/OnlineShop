import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import productsRoutes from "./routes/products.routes.js";
import userRouter from "./routes/user.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import statsRoutes from "./routes/stats.routes.js";

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

const routes = {
  products: "/api/products",
  auth: {
    login: "/api/login",
    register: "/api/register",
  },
  mercadoPagoApi: {
    checkout: "/api/checkout",
    webhook: "/api/webhook",
  },
};

app.get("/", (req, res) => res.json(routes));
app.get("/api", (req, res) => res.json(routes));

app.use("/api/products", productsRoutes);
app.use("/api", userRouter);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/stats", statsRoutes);

export default app;
