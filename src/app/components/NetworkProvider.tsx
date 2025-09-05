'use client';

import { createContext, useContext } from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import OfflineOverlay from './OfflineOverlay';

interface NetworkContextType {
  isOnline: boolean;
  checkAndShowOffline: () => void;
}

const NetworkContext = createContext<NetworkContextType | null>(null);

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within NetworkProvider');
  }
  return context;
}

interface NetworkProviderProps {
  children: React.ReactNode;
}

export default function NetworkProvider({ children }: NetworkProviderProps) {
  const { isOnline, showOfflineOverlay, checkAndShowOffline, hideOfflineOverlay } = useNetworkStatus();

  return (
    <NetworkContext.Provider value={{ isOnline, checkAndShowOffline }}>
      {children}
      <OfflineOverlay isVisible={showOfflineOverlay} onClose={hideOfflineOverlay} />
    </NetworkContext.Provider>
  );
}
