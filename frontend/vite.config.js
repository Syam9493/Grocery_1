// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
//   server: {
//   proxy: {
//     '/api': {
//       target: 'http://localhost:5000',
//         changeOrigin: true,
//       secure: false,
//       // No rewrite (keeps /api in the backend URL)
//     },
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom'],
//           chart: ['chart.js'], // example for a big library
//         },
//       },
//     },
//   },
// }
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Local backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"]
        },
      },
    },
  },
});

