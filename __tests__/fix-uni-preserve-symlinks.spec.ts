import { fixUniPreserveSymlinks } from '../src';

describe('Normal test cases', () => {
  test('plugin name and enforce', () => {
    const plugin = fixUniPreserveSymlinks();
    expect(plugin.name).toBe('fix-uni-preserve-symlinks');
    expect(plugin.enforce).toBe('post');
  });

  test('config hook creates resolve object and sets preserveSymlinks false', () => {
    const plugin = fixUniPreserveSymlinks();
    const config: any = {};
    (plugin.config as any)(config);
    expect(config.resolve).toBeDefined();
    expect(config.resolve.preserveSymlinks).toBe(false);
  });

  test('config hook forces existing preserveSymlinks true to false', () => {
    const plugin = fixUniPreserveSymlinks();
    const config: any = { resolve: { preserveSymlinks: true } };
    (plugin.config as any)(config);
    expect(config.resolve.preserveSymlinks).toBe(false);
  });

  test('configResolved hook forces preserveSymlinks false', () => {
    const plugin = fixUniPreserveSymlinks();
    const resolved: any = { resolve: { preserveSymlinks: true } };
    (plugin.configResolved as any)(resolved);
    expect(resolved.resolve.preserveSymlinks).toBe(false);
  });
});
