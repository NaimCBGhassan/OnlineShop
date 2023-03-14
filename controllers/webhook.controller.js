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
    userId: paymentData.metadata.user_id,
    username: paymentData.metadata.username,
    customerId: paymentData.metadata.customer_id,
    paymentIntentId: paymentData.id,
    products: paymentData.additional_info.items,
    subtotal: paymentData.transaction_details.net_received_amount,
    total: paymentData.transaction_details.total_paid_amount,
    paymentStatus: paymentData.status,
  });

  try {
    await newOrder.save();
    console.log("Solicitud de gurdar en base de dato la orden exitosa");
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
    console.log(error.response.data);
    return res.status(500).send(`Webhokk Error: ${error.message}`);
  }

  if (paymentData.data.operation_type === "regular_payment") {
    createOrder(paymentData.data);
  }

  return res.status(200);
};
