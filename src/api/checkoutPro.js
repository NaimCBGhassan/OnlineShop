import axios from "axios";

export const checkoutMP = async ({ cartItems, auth }) => {
  const { data } = await axios.post("/api/checkout", { cartItems, auth });

  if (data.global) {
    const script = document.getElementById("mercado-pago");
    script.setAttribute("data-preference-id", data.global);

    const mp = await new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
      locale: "es-AR",
    });

    const checkout = mp.checkout({
      preference: {
        id: data.global,
      },
    });
    return checkout;
  }
};
