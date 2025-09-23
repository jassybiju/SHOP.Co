import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server : {
    host : true,
    port : 5173,
    allowedHosts : ["https://244c0e04a6f43bedbf7b5600269244ad.serveo.net"]
  }
})
