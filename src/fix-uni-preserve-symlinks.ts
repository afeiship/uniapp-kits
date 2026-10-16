// resolution-mode: vite 的 CJS 类型入口(index.d.cts)是空 stub，需按 ESM 条件解析真实类型
import type { Plugin } from 'vite' with { 'resolution-mode': 'import' };

export function fixUniPreserveSymlinks(): Plugin {
  return {
    name: 'fix-uni-preserve-symlinks',
    enforce: 'post',
    config(config) {
      config.resolve ??= {};
      config.resolve.preserveSymlinks = false;
    },
    configResolved(config) {
      config.resolve.preserveSymlinks = false;
    }
  };
}
