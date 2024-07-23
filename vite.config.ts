import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router'],
      dts: "src/auto-import.d.ts",
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    //element按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式进行文件覆盖
        additionalData: `@use "@styles/theme/index.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@assets': resolve(__dirname, "./src/assets"),
      '@components': resolve(__dirname, "./src/components"),
      '@router': resolve(__dirname, "./src/router"),
      '@stores': resolve(__dirname, "./src/stores"),
      '@styles': resolve(__dirname, "./src/styles"),
      '@views': resolve(__dirname, "./src/views"),
    }
  },
  server: {
    // 开启热更新
    hmr: true,
    proxy: {
      '/api/admin': {
        target: 'https://zjkdongao.com',
        // target: 'http://127.0.0.1:7002',
        changeOrigin: true,
      },
    },
  },
})
