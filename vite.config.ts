import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
import Sonda from 'sonda/vite';
import { defineConfig, type PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const plugins: PluginOption[] = [react()];

  const isAnalyze: boolean =
    command === 'build' && process.env.ANALYZE === 'true';

  if (isAnalyze) {
    plugins.push(
      Sonda({
        open: true,
        filename: 'stats.html',
        deep: true,
        gzip: true,
      }),
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      sourcemap: isAnalyze,
      assetsDir: 'static',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/[hash].chunk.js',
          assetFileNames: 'static/[hash].[ext]',
        },
      },
    },
  };
});
