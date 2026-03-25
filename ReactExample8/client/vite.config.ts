import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // axios사용하면 이거 사용안해보 됨.
  // server: {
  //   proxy: {
  //     "/users": "http://localhost:3000",
  //   },
  // },
});
