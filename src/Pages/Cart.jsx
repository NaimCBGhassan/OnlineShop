import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Empty from "../assets/svg/Empty";
import { CartRow } from "../components";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <h2 className="text-[5vh] font-normal col-span-full text-center py-3">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="flex justify-center text-center">
          <Link to="/">
            <p>Your cart is currently empty</p>
            <p>Start Shopping</p>
            <Empty />
          </Link>
        </div>
      ) : (
        <table className="w-[80%] mx-auto">
          <thead className="h-28 border-b-8 border-black border-solid">
            <tr className=" my-4 font-normal">
              <td className="w-[45%] text-left ">PRODUCT</td>
              <td>PRICE</td>
              <td>QUANTITY</td>
              <td>TOTAL</td>
            </tr>
          </thead>

          {cart.cartItems?.map((item) => (
            <CartRow key={item._id} item={item} />
          ))}
        </table>
      )}
    </div>
  );
};
