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
  console.log(paymentData);
  const newOrder = new Order({
    userId: paymentData.metadata.userId,
    customerId: paymentData.metadata.customerId,
    paymentIntentId: paymentData.id,
    products: paymentData.metadata.cartItems,
    subtotal: paymentData.transaction_details.net_received_amount,
    total: paymentData.transaction_details.total_paid_amount,
    paymentStatus: paymentData.status,
  });
  try {
    const savedOrder = await newOrder.save();
    console.log("solicitud de gurdar en base de dato la orden exitosa");
  } catch (error) {
    console.log(error);
  }
};

export const webhook = async (req, res) => {
  let paymentData;

  try {
    paymentData = await axiosWebhook.get(`/${req.body.data.id}`);
    console.log("Solicitud de pago exiotosa");
  } catch (error) {
    console.log("Error en payment");
    return res.status(500).send(`Webhokk Error: ${error.message}`);
  }

  if (paymentData.data.operation_type === "regular_payment") {
    createOrder(paymentData.data);
  }

  return res.status(200);
};
