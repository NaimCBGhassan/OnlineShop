import axios from "axios";
import { MP_ACCESS_TOKEN } from "../config.js";
import Order from "../models/Order.js";

const axiosWebhook = axios.create({
  baseURL: "https://api.mercadopago.com/v1/payments",
  headers: {
    Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
  },
});

const createOrder = async (paymentData) => {
  const newOrder = new Order({
    userId: paymentData.metadata.userId,
    customerId: paymentData.metadata.customerId,
    paymentIntentId: paymentData.id,
    products: JSON.parse(paymentData.metadata.cartItems),
    subtotal: paymentData.transaction_details.net_received_amount,
    total: paymentData.transaction_details.total_paid_amount,
    paymentStatus: paymentData.status,
  });
  try {
    const savedOrder = await newOrder.save();
    console.log("ProcessedOrder:", savedOrder);
  } catch (error) {
    console.log(error.response.data);
  }
};

export const webhook = async (req, res) => {
  console.log(req.body);
  let paymentData;

  try {
    paymentData = await axiosWebhook.get(`/${req.body.data.id}`);
    console.log(paymentData.data);
  } catch (error) {
    console.log(error.response.data);
    return res.status(500).send(`Webhokk Error: ${error.message}`);
  }
  if (paymentData.type === "payment") {
    createOrder(paymentData.data);
  }

  return res.status(200);
};
