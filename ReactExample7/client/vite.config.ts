import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/users'로 시작하는 요청을 백엔드 서버로 보냅니다.
      // Send requests starting with '/users' to the backend server.
      "/users": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
