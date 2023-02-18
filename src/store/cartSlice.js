import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalAmount: localStorage.getItem("cartTotalAmount") ? JSON.parse(localStorage.getItem("cartTotalAmount")) : 0,
  cartTotalQuantity: localStorage.getItem("cartTotalQuantity")
    ? JSON.parse(localStorage.getItem("cartTotalQuantity"))
    : 0,
};

const cartLocalStorage = ({ cartItems, cartTotalAmount, cartTotalQuantity }) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartTotalAmount", JSON.stringify(cartTotalAmount));
  localStorage.setItem("cartTotalQuantity", JSON.stringify(cartTotalQuantity));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);
      const tempProduct = { ...action.payload, cartQuantity: 1 };

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`Increased ${action.payload.name} cart quantity`, { position: "bottom-left", autoClose: 1500 });
      } else {
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, { position: "bottom-left", autoClose: 1500 });
      }
      state.cartTotalAmount += action.payload.price;
      state.cartTotalQuantity += 1;
      cartLocalStorage(state);
    },
    removeToCart(state, action) {
      const removedItem = state.cartItems.find((item) => item._id === action.payload);
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      state.cartTotalQuantity -= removedItem.cartQuantity;
      state.cartTotalAmount -= removedItem.cartQuantity * removedItem.price;
      toast.error(`${removedItem.name} removed to cart`, { position: "bottom-left", autoClose: 1500 });
      cartLocalStorage(state);
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      toast.error(`Cart cleared`, { position: "bottom-left", autoClose: 1500 });
      cartLocalStorage(state);
    },
    decrementOne(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);
      state.cartItems[itemIndex].cartQuantity -= 1;

      state.cartTotalAmount -= action.payload.price;
      state.cartTotalQuantity -= 1;
      toast.info(`Decreased ${action.payload.name} cart quantity`, { position: "bottom-left", autoClose: 1500 });
      cartLocalStorage(state);
    },
  },
});

export const { addToCart, removeToCart, clearCart, decrementOne } = cartSlice.actions;
