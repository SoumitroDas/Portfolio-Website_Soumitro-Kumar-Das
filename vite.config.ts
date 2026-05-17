import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'async-css',
        enforce: 'post',
        transformIndexHtml(html, ctx) {
          if (!ctx.bundle) return html;
          return html.replace(
            /<link rel="stylesheet"(.*?)>/g,
            '<link rel="preload" as="style"$1>\n    <link rel="stylesheet" media="print" onload="this.media=\'all\'"$1>\n    <noscript><link rel="stylesheet"$1></noscript>'
          );
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-three': ['three'],
            'vendor-gsap': ['gsap'],
            'vendor-d3': ['d3'],
            'vendor-framer': ['motion/react']
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
