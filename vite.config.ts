import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { resolve } from 'path'

const pathSrc = path.resolve(__dirname, 'playground')
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': pathSrc
    }
  },
  server: {
    port: 8765,
    proxy: {
      '/dev-api': {
        target: 'http://xxx.com:80/xxx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, '')
      }
    }
  }
})
