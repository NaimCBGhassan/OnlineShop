import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeToCart, addToCart, decrementOne } from "../store/cartSlice";

export const CartRow = ({ item }) => {
  const dispatch = useDispatch();

  const handleDecrement = (item) => {
    if (item.cartQuantity === 1) {
      dispatch(removeToCart(item._id));
      return;
    }
    dispatch(decrementOne(item));
  };

  return (
    <>
      <hr />
      <article className="flex items-center my-4 font-normal">
        <div className="w-[35%] flex">
          <div className="w-[40%] h-[8vw] hidden md:inline">
            <Link to={`/product/${item._id}`}>
              <img src={item.image.url} alt={item.name} className="h-[100%]" />
            </Link>
          </div>
          <div>
            <p className="text-base">{item.name}</p>
            <p className="text-sm">{item.desc}</p>
            <button
              className="text-xs text-gray-600 hover:text-black hover:text-[0.82rem] bg-transparent"
              onClick={() => dispatch(removeToCart(item._id))}
            >
              Remove
            </button>
          </div>
        </div>
        <p className="w-[18%]">${item.price}</p>
        <div className="w-[29%] self-stretch flex  items-center">
          <p className="w-[85%] md:w-[45%] flex justify-around items-center border-solid border-gray-500 border-[1px] rounded">
            <button
              className="bg-transparent text-lg w-full hover:bg-black hover:text-white"
              onClick={() => handleDecrement(item)}
            >
              -
            </button>
            <span className="px-2">{item.cartQuantity}</span>
            <button
              className="bg-transparent text-lg w-full hover:bg-black hover:text-white"
              onClick={() => dispatch(addToCart(item))}
            >
              +
            </button>
          </p>
        </div>
        <p className="w-[18%] font-bold">${item.price * item.cartQuantity}</p>
      </article>
    </>
  );
};
