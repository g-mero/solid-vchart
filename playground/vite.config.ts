import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: './playground',
  plugins: [tsconfigPaths(), UnoCSS(), solidPlugin()],
  server: {
    port: 3000,
  },
});
