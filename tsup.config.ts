import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  clean: true,
  minify: true,
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.js' : '.mjs' }
  },
})
