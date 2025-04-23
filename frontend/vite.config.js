import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  // base: "/BlogSite_MERN",
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8800",
    //     changeOrigin: true,
    //   },
    // },
  },
});
