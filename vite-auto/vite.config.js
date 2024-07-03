import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { register } from 'node:module';

export default defineConfig({
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // index.html을 메인 페이지로 설정
        product: resolve(__dirname, 'src/pages/product/index.html'),
        register: resolve(__dirname, 'src/pages/register/index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
      },
    },
  },
});
