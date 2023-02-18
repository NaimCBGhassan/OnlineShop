import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;

export const cloud_name = process.env.cloud_name;
export const api_key = process.env.api_key;
export const api_secret = process.env.api_secret;

export const SECRET_KEY = process.env.SECRET_KEY;
