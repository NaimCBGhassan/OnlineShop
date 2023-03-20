import axios from "axios";
import { useMutation } from "react-query";

export const checkoutMP = ({ data, script }) => {
  script.setAttribute("data-preference-id", data.global);

  const mp = new MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);

  const checkout = mp.checkout({
    preference: {
      id: data.global,
    },
    autoOpen: true,
  });
};

export function useMutateButtonId({ cartItems, auth }) {
  return useMutation({
    mutationKey: ["buttonId"],
    mutationFn: async () => {
      try {
        const res = await axios.post("/api/checkout", { cartItems, auth });
        return res.data;
      } catch (error) {
        throw error.response;
      }
    },
  });
}
