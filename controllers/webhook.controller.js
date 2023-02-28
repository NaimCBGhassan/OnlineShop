import axios from "axios";
import mercadopago from "mercadopago";
import { MP_ACCESS_TOKEN } from "../config.js";

const axiosWebhook = axios.create({
  baseURL: "https://api.mercadopago.com/v1/payments",
  headers: {
    Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
  },
});

export const webhook = async (req, res) => {
  console.log(req.body);

  try {
    const paymentData = await axiosWebhook.get(`/${req.body.id}`);
    console.log(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Webhokk Error: ${error.message}`);
  }
  if (data.type === "payment") {
  }

  return res.status(200);
};
