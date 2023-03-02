import mercadopago from "mercadopago";

import { MPConfig, MPUpdateClient } from "../libs/mercadopago.js";

export const createPayment = async (req, res) => {
  let customer;
  const { cartItems, auth } = req.body;
  MPConfig();

  try {
    let { data } = await MPUpdateClient({ cartItems, auth });
    customer = data;
  } catch (error) {
    console.log(error);
  }

  const preference = {
    binary_mode: true,
    items: cartItems.map((item) => {
      return {
        title: item.name,
        description: item.desc,
        picture_url: item.image.url,
        currency_id: "ARS",
        quantity: item.cartQuantity,
        unit_price: item.price,
      };
    }),
    payer: {
      name: auth.username,
      surname: "",
      email: auth.email,
    },

    back_urls: {
      success: "http://localhost:5173",
      failure: "http://localhost:5173",
      pending: "http://localhost:5173",
    },
    auto_return: "approved",
    metadata: { customer },
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ global: response.body.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ global: error });
  }
};
