import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

/*Middelwares */
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

export default app;
