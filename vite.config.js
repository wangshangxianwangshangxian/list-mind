import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 自定义插件
// function writeToDist() {
//   return {
//     name: 'write-to-dist',
//     handleHotUpdate({ file, modules }) {
//       exec('npm run build')
//     }
//   }
// }

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // writeToDist()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // build: {
  //   outDir: 'dist',
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: 'assets/[name].js',
  //       chunkFileNames: 'assets/[name].js',
  //       assetFileNames: 'assets/[name].[ext]'
  //     }
  //   }
  // },
  // server: {
  //   watch: {
  //     // 使用文件系统事件来检测变化
  //     usePolling: true
  //   }
  // }
})
