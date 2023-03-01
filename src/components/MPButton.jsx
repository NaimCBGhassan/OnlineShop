import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMutation } from "react-query";

import { checkoutMP } from "../api/checkoutPro";
import Loading from "../assets/svg/Loading";

function useMutateButtonId({ cartItems, auth }) {
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

export default function MPButton() {
  const { cartItems } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  let { mutateAsync, data, isLoading } = useMutateButtonId({ cartItems, auth });

  const handleCheckout = async () => {
    const data = await mutateAsync({ cartItems, auth });
    checkoutMP({ data })
      .then((checkout) => (async () => checkout.open())())
      .catch((err) => console.log(err));
  };

  return (
    <button
      className="cho-container py-2 mt-3 tracking-[1.15px] rounded text-lg w-full bg-yellow-300 hover:bg-yellow-400 text-black text-center"
      onClick={handleCheckout}
    >
      {isLoading ? <Loading className="animate-spin" size={"20px"} /> : <div>Checkout</div>}
    </button>
  );
}
