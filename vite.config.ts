/// <reference types="vitest" />

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import typescript from '@rollup/plugin-typescript';
import path from 'path';

export default defineConfig({
  plugins: [dts()],
  server: {
    port: 3000,
  },
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      fileName: 'main',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
      plugins: [
        typescript({
          sourceMap: true,
          declaration: true,
          outDir: 'dist',
        }),
      ],
    },
  },
  test: {
    setupFiles: './src/test/setup.ts',
  },
});
