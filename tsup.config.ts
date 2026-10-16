import { defineConfig, Options } from 'tsup';
import tsupBanner from '@jswork/tsup-banner';

const baseOptions: Options = {
  entry: ['src/index.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  tsconfig: './tsconfig.json',
  dts: true,
  sourcemap: true,
  cjsInterop: true,
  banner: {
    js: tsupBanner()
  },
  outExtension({ format }) {
    return {
      js: `.${format}.js`
    };
  }
};

export default defineConfig({
  ...baseOptions,
  splitting: true
});
