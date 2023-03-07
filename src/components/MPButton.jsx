import { useEffect } from "react";
import { useSelector } from "react-redux";

import { checkoutMP, useMutateButtonId } from "../api/checkoutPro";
import Loading from "../assets/svg/Loading";

export default function MPButton() {
  const { cartItems } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  let { mutateAsync, data, isLoading } = useMutateButtonId({ cartItems, auth });

  useEffect(() => {
    const script = document.getElementById("mercado-pago");
    if (data) {
      checkoutMP({ data, script });
    }
  }, [data]);

  const handleCheckout = async () => {
    await mutateAsync({ cartItems, auth });
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
