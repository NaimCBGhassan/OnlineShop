import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  userId: localStorage.getItem("userId") || "",
  username: localStorage.getItem("username") || "",
  email: localStorage.getItem("email") || "",
  role: localStorage.getItem("role") || "",
  customerId: localStorage.getItem("customerId") || "",
  userLoaded: localStorage.getItem("userLoaded") || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.customerId = action.payload.customerId;
      state.userLoaded = true;
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("username", state.username);
      localStorage.setItem("email", state.email);
      localStorage.setItem("role", state.role);
      localStorage.setItem("customerId", state.customerId);
      localStorage.setItem("userLoaded", state.userLoaded);
    },
    clearAuth(state, action) {
      state.token = "";
      state.userId = "";
      state.username = "";
      state.email = "";
      state.role = "";
      state.customerId = "";
      state.userLoaded = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("customerId");
      localStorage.removeItem("userLoaded");
    },
  },
});

export const { auth, clearAuth } = authSlice.actions;
