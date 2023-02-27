// This is just the package (installed via npm or yarn) and its types
import mercadopago from "mercadopago";
import { MP_ACCESS_TOKEN } from "../config.js";

export const createPayment = async (req, res) => {
  mercadopago.configure({ access_token: MP_ACCESS_TOKEN });

  const { cartItems, auth } = req.body;
  const items = cartItems.map((item) => {
    return {
      title: item.name,
      description: item.desc,
      picture_url: item.image.url,
      currency_id: "ARS",
      quantity: item.cartQuantity,
      unit_price: item.price,
    };
  });
  const preference = {
    binary_mode: true,
    items,
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
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    console.log(response);
    res.status(200).json({ global: response.body.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ global: error });
  }
};

// IMPORTANT

/*
  This is the only code needed, but you can save in your DB all the data you need.
  If this does not works, check your MP keys, your .env file, or the enviroment variables in your deployment.
  In case of not finding a solution to a supposed error, open an issue in this repo so i'll fix it in the future.
*/
