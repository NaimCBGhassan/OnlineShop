import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArrowLeft from "../assets/svg/ArrowLeft";

import Empty from "../assets/svg/Empty";
import { CartRow } from "../components";
import { clearCart } from "../store/cartSlice";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="w-[90%] md:w-[80%] mx-auto">
      <h2 className="text-[6vh] font-normal col-span-full text-center py-3">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="flex justify-center text-center">
          <Link to="/">
            <p>Your cart is currently empty</p>
            <p className="text-sm hover:text-base flex flex-col items-center justify-center text-gray-500">
              <span className="flex items-center">
                <ArrowLeft />
                Start Shopping
              </span>
              <Empty />
            </p>
          </Link>
        </div>
      ) : (
        <section>
          <header className="flex items-center mt-[2rem] mb-[1rem] font-normal text-[2vh]">
            <p className="w-[35%] text-left">PRODUCT</p>
            <p className="w-[18%]">PRICE</p>
            <p className="w-[29%]">QUANTITY</p>
            <p className="w-[18%]">TOTAL</p>
          </header>
          {cart.cartItems?.map((item) => (
            <CartRow key={item._id} item={item} />
          ))}
        </section>
      )}
      {cart.cartItems.length !== 0 && (
        <footer className="flex flex-col-reverse md:flex-row justify-between items-center my-8 w-[70%] md:w-full mx-auto">
          <button
            className="py-2 tracking-[1.15px] w-[80%] md:w-[30%] bg-transparent border-solid border-gray-400 border-[1px] rounded text-lg  hover:bg-black text-gray-400 hover:text-white mt-4 mx-auto md:mx-0 md:mt-0 self-start"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
          <div className="w-[80%] md:self-end md:w-[40%] text-lg">
            <p className="flex justify-between font-[1.5rem]">
              <span>Subtotal</span>
              <span className="font-bold">${cart.cartTotalAmount}</span>
            </p>
            <p className="text-sm text-gray-500 py-2 mt-2">Taxes and shipping calculated at checkout</p>
            <Link to="/">
              <span className="text-sm hover:text-base flex items-center text-gray-500">
                <ArrowLeft /> Continue Shopping
              </span>
            </Link>
            <button className="py-2 mt-3 tracking-[1.15px] rounded text-lg w-full bg-yellow-300 hover:bg-yellow-400 text-black">
              Check out
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};
