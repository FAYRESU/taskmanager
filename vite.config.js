import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "0.0.0.0", // Allow access from external hosts (e.g., Ngrok)
        port: 5173, // You can set this explicitly if needed
        strictPort: true,
        cors: true, // Enable CORS to allow connections from your Ngrok URL
        hmr: {
            host: "localhost", // Or your machine's LAN IP or Ngrok domain
        },
        proxy: {
            "/api": "http://localhost:8000",
        },
    },
});
