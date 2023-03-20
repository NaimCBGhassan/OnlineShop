import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { authSlice } from "./authSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
