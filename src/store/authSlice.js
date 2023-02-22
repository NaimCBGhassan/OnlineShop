import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  username: localStorage.getItem("username") || "",
  email: localStorage.getItem("email") || "",
  role: localStorage.getItem("role") || "",
  userLoaded: localStorage.getItem("userLoaded") || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth(state, action) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.userLoaded = true;
      localStorage.setItem("token", state.token);
      localStorage.setItem("username", state.username);
      localStorage.setItem("email", state.email);
      localStorage.setItem("role", state.role);
      localStorage.setItem("userLoaded", state.userLoaded);
    },
    clearAuth(state, action) {
      state.token = "";
      state.username = "";
      state.email = "";
      state.role = "";
      state.userLoaded = false;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("userLoaded");
    },
  },
});

export const { auth, clearAuth } = authSlice.actions;
