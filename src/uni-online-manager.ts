export type SetOnline = (online?: boolean) => void;

export interface OnlineManagerLike {
  setEventListener: (setup: (setOnline: SetOnline) => (() => void) | void) => void;
}

interface UniNetworkApi {
  getNetworkType(opts: { success: (res: { networkType: string }) => void }): void;
  onNetworkStatusChange(cb: (res: { isConnected: boolean }) => void): void;
  offNetworkStatusChange(cb: (res: { isConnected: boolean }) => void): void;
}

export function setupUniOnlineManager(onlineManager: OnlineManagerLike): boolean {
  const uni = (globalThis as { uni?: UniNetworkApi }).uni;
  if (!uni || typeof uni.getNetworkType !== 'function') return false;

  onlineManager.setEventListener((setOnline) => {
    uni.getNetworkType({
      success: (res) => {
        setOnline(res.networkType !== 'none');
      }
    });
    const onStatusChange = (res: { isConnected: boolean }) => {
      setOnline(res.isConnected);
    };
    uni.onNetworkStatusChange(onStatusChange);
    return () => {
      uni.offNetworkStatusChange(onStatusChange);
    };
  });

  return true;
}
