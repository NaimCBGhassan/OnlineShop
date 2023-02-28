import { useEffect } from "react";
import { useSelector } from "react-redux";

import { checkoutMP } from "../api/checkoutPro";

export default function MPButton() {
  const { cartItems } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  let checkout;

  useEffect(() => {
    checkoutMP({ cartItems, auth })
      .then((res) => (checkout = res))
      .catch((err) => console.log(err));
  }, []);

  const handleCheckout = () => {
    if (checkout) checkout.open();
    return;
  };

  console.log(checkout);
  return (
    <button
      className="cho-container py-2 mt-3 tracking-[1.15px] rounded text-lg w-full bg-yellow-300 hover:bg-yellow-400 text-black text-center"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
}
