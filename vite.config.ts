import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { version } from './package.json'
import { deploymentVersion } from './src/lib/version'
export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(
      deploymentVersion(version, process.env.DEPLOY_RUN_NUMBER)
    )
  },
  plugins: [preact(), tailwindcss()],
  base: process.env.BASE_PATH || '/',
  server: { port: 4173, strictPort: true }
})
