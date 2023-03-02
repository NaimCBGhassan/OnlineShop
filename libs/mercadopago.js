import axios from "axios";
import mercadopago from "mercadopago";

import { MP_ACCESS_TOKEN, MP_TEST_EMAIL } from "../config.js";

/* Configuración */
export const MPConfig = () => mercadopago.configure({ access_token: MP_ACCESS_TOKEN });

/* Payments */

/* Client */

const axiosClient = axios.create({
  baseURL: "https://api.mercadopago.com/v1/customers",
  headers: {
    Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const MPCreateClient = async (email) => {
  try {
    return await axiosClient.post("/", {
      email: MP_TEST_EMAIL || email,
    });
  } catch (error) {
    throw error;
  }
};

export const MPUpdateClient = async ({ cartItems, auth }) => {
  try {
    return await axiosClient.put(`/${auth.customerId}`, {
      metadata: {
        userId: auth.id,
        customerId: auth.customerId,
        cart: cartItems,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const MPGetClient = async (email) => {
  try {
    return await axiosClient.get(`/search?email=test_user_1320346500@testuser.com`);
  } catch (error) {
    throw error;
  }
};
