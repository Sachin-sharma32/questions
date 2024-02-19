import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

//1 -> add support for older browsers 
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //2 -> add support for older browsers
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
});
