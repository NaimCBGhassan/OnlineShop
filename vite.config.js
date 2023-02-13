import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/products": "http://localhost:4000/",
      "/api/auth/signup": "http://localhost:4000/",
      "/api/auth/signin": "http://localhost:4000/",
      "/api/users": "http://localhost:4000/",
    },
  },
});
