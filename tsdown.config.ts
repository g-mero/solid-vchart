import solid from 'rolldown-plugin-solid';
import { defineConfig } from 'tsdown';

// export both js and jsx
export default defineConfig([
  {
    entry: ['./src/index.ts'],
    platform: 'neutral',
    format: ['esm'],
    dts: true,
    plugins: [solid()],
  },
  {
    entry: ['./src/index.ts'],
    platform: 'neutral',
    dts: false,
    inputOptions: {
      jsx: 'preserve',
    },
    outExtensions: () => ({
      js: '.jsx',
    }),
  },
]);
