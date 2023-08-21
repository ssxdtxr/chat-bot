import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath, URL} from "node:url";
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [svgr({ include: '**/*.svg' }), react(), tsconfigPaths()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
