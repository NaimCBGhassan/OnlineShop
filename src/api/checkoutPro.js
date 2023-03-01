import axios from "axios";

export const checkoutMP = async ({ data }) => {
  const script = document.getElementById("mp");
  script.setAttribute("data-preference-id", data.global);
  const res = await axios.get("https://sdk.mercadopago.com/js/v2");
  script.innerText = res.data;
  console.log(new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY), { type: "text/javascript" });
  /*   const mp = await new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);
  console.log(mp);

  const checkout = mp.checkout({
    preference: {
      id: data.global,
    },
  });
  return checkout; */
};
