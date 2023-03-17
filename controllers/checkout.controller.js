import mercadopago from "mercadopago";

import { MPConfig, MPUpdateClient } from "../libs/mercadopago.js";

export const createPayment = async (req, res) => {
  const { cartItems, auth } = req.body;
  MPConfig();

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
      success: "http://localhost:5173/checkoutSuccess",
      failure: "http://localhost:5173",
      pending: "http://localhost:5173",
    },
    auto_return: "approved",
    metadata: {
      userId: auth.userId,
      username: auth.username,
    },
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ global: response.body.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ global: error });
  }
};
