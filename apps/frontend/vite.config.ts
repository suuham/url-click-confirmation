import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `
          @use '@/styles/globals.scss' as *;
          @use '@/styles/colors.scss' as *;
          @use '@/styles/variables.scss' as *;
          @use '@/styles/mixins.scss' as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
