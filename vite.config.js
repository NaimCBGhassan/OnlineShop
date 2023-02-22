import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/products": "http://localhost:4000/",
      "/api/register": "http://localhost:4000/",
      "/api/login": "http://localhost:4000/",
    },
  },
});
