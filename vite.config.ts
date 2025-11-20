import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  css: {
    devSourcemap: true,
  },
  // server: {
  //     allowedHosts: [
  //         "f4a4-2001-ee0-519a-62e0-d9db-7627-d09-c524.ngrok-free.app",
  //     ],
  // },
});
