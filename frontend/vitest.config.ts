/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
})
