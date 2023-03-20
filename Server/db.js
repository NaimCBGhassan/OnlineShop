import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(MONGODB_URI);
    console.log(`DB connected to ${db.connection.name}`);
  } catch (error) {
    console.log("DB connection failed");
  }
};
