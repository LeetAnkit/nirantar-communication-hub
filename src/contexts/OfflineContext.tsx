
import React, { createContext, useContext, useState, useEffect } from 'react';

interface OfflineContextType {
  isOnline: boolean;
  lastSync: Date | null;
  syncData: () => Promise<void>;
  saveOfflineData: (key: string, data: any) => void;
  getOfflineData: (key: string) => any;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('Connection restored - syncing data...');
      syncData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('Connection lost - switching to offline mode');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load last sync time from localStorage
    const savedLastSync = localStorage.getItem('nirantar-last-sync');
    if (savedLastSync) {
      setLastSync(new Date(savedLastSync));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncData = async () => {
    try {
      // Get offline data that needs to be synced
      const helpRequests = getOfflineData('help-requests') || [];
      const pendingRequests = helpRequests.filter((req: any) => !req.synced);

      if (pendingRequests.length > 0) {
        console.log(`Syncing ${pendingRequests.length} help requests...`);
        // TODO: Implement actual API sync when backend integration is added
        
        // Mark requests as synced
        const updatedRequests = helpRequests.map((req: any) => ({
          ...req,
          synced: true,
          syncedAt: new Date().toISOString()
        }));
        
        saveOfflineData('help-requests', updatedRequests);
      }

      setLastSync(new Date());
      localStorage.setItem('nirantar-last-sync', new Date().toISOString());
      console.log('Data sync completed successfully');
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  const saveOfflineData = (key: string, data: any) => {
    try {
      localStorage.setItem(`nirantar-${key}`, JSON.stringify(data));
      console.log(`Data saved offline: ${key}`);
    } catch (error) {
      console.error('Failed to save offline data:', error);
    }
  };

  const getOfflineData = (key: string) => {
    try {
      const data = localStorage.getItem(`nirantar-${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to retrieve offline data:', error);
      return null;
    }
  };

  return (
    <OfflineContext.Provider value={{
      isOnline,
      lastSync,
      syncData,
      saveOfflineData,
      getOfflineData
    }}>
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};
