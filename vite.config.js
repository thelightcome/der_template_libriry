import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  viteSingleFile
} from "vite-plugin-singlefile"

export default defineConfig({
  base: "./",
  plugins: [vue(), viteSingleFile(),],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        manualChunks: () => "everything.js",
      },
    },
  },
  server: {
    open: true,
  },
  define: {
    'process.env': process.env
  }
})