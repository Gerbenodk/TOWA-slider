import { defineConfig } from 'vite';
export default defineConfig({
    root: 'src',
    server: {
        port: 3000 // for cypres.config.ts have fixed port
    },
    build: {
        outDir: '../dist',
        sourcemap: true,
        cssCodeSplit: true,
        minify: 'esbuild',
    },
});