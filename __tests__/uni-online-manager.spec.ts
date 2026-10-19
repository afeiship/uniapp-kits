import { setupUniOnlineManager } from '../src';
import type { OnlineManagerLike, SetOnline } from '../src';
import { onlineManager } from '@tanstack/query-core';

describe('Normal test cases', () => {
  afterEach(() => {
    delete (globalThis as any).uni;
  });

  test('accepts the real tanstack onlineManager without a cast', () => {
    expect(setupUniOnlineManager(onlineManager)).toBe(false);
  });

  test('returns false and never calls setEventListener when uni is absent', () => {
    const setEventListener = jest.fn();
    const result = setupUniOnlineManager({ setEventListener } as OnlineManagerLike);
    expect(result).toBe(false);
    expect(setEventListener).not.toHaveBeenCalled();
  });

  test('returns false when uni.getNetworkType is not a function', () => {
    (globalThis as any).uni = {};
    const setEventListener = jest.fn();
    const result = setupUniOnlineManager({ setEventListener } as OnlineManagerLike);
    expect(result).toBe(false);
    expect(setEventListener).not.toHaveBeenCalled();
  });

  test('returns true and wires network events through setEventListener', () => {
    const calls = {
      getNetworkType: [] as Array<{ success: (res: { networkType: string }) => void }>,
      onNetworkStatusChange: [] as Array<(res: { isConnected: boolean }) => void>,
      offNetworkStatusChange: [] as Array<(res: { isConnected: boolean }) => void>
    };
    (globalThis as any).uni = {
      getNetworkType(opts) {
        calls.getNetworkType.push(opts);
      },
      onNetworkStatusChange(cb) {
        calls.onNetworkStatusChange.push(cb);
      },
      offNetworkStatusChange(cb) {
        calls.offNetworkStatusChange.push(cb);
      }
    };

    let setupFn: ((setOnline: SetOnline) => (() => void) | void) | undefined;
    const onlineManager: OnlineManagerLike = {
      setEventListener(fn) {
        setupFn = fn;
      }
    };

    const result = setupUniOnlineManager(onlineManager);
    expect(result).toBe(true);
    expect(setupFn).toBeDefined();

    const setOnline = jest.fn();
    const cleanup = setupFn!(setOnline);

    // initial getNetworkType: wifi -> online
    expect(calls.getNetworkType).toHaveLength(1);
    calls.getNetworkType[0].success({ networkType: 'wifi' });
    expect(setOnline).toHaveBeenLastCalledWith(true);

    // initial getNetworkType: none -> offline
    calls.getNetworkType[0].success({ networkType: 'none' });
    expect(setOnline).toHaveBeenLastCalledWith(false);

    // status change handler
    expect(calls.onNetworkStatusChange).toHaveLength(1);
    const handler = calls.onNetworkStatusChange[0];
    handler({ isConnected: false });
    expect(setOnline).toHaveBeenLastCalledWith(false);

    // cleanup unregisters with the same handler reference
    expect(typeof cleanup).toBe('function');
    (cleanup as () => void)();
    expect(calls.offNetworkStatusChange).toEqual([handler]);
  });
});
