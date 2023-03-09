import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  userId: localStorage.getItem("userId") || "",
  username: localStorage.getItem("username") || "",
  email: localStorage.getItem("email") || "",
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
  customerId: localStorage.getItem("customerId") || "",
  userLoaded: JSON.parse(localStorage.getItem("userLoaded")) || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authAction(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.customerId = action.payload.customerId;
      state.userLoaded = true;
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("username", state.username);
      localStorage.setItem("email", state.email);
      localStorage.setItem("isAdmin", state.isAdmin);
      localStorage.setItem("customerId", state.customerId);
      localStorage.setItem("userLoaded", state.userLoaded);
    },
    clearAuth(state, action) {
      state.token = "";
      state.userId = "";
      state.username = "";
      state.email = "";
      state.isAdmin = false;
      state.customerId = "";
      state.userLoaded = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("customerId");
      localStorage.removeItem("userLoaded");
    },
  },
});

export const { authAction, clearAuth } = authSlice.actions;
