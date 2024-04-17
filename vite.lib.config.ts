import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import dts from 'vite-plugin-dts'

const pathSrc = path.resolve(__dirname, 'packages')
export default defineConfig({
  publicDir: false,
  plugins: [
    vue(),
    eslintPlugin({
      include: ['packages'],
      cache: false,
      fix: true
    }),
    dts({
      rollupTypes: true,
      tsconfigPath: 'tsconfig.lib.json'
    })
  ],
  build: {
    outDir: 'lib',
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'dji-kmz-parser',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': pathSrc
    }
  }
})
