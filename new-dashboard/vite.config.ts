import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/task': {
        target: 'http://localhost:3635',
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        target: 'http://localhost:3635',
        changeOrigin: true,
        secure: false,
      },
    }
}
})
