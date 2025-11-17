import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Network from 'expo-network';

const NetworkContext = createContext({
  isOnline: true,
  networkType: 'UNKNOWN',
});


//  NetworkProvider - Provides real-time network status
//  Checks for connection changes and updates all components automatically

export const NetworkProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [networkType, setNetworkType] = useState('UNKNOWN');

  useEffect(() => {
    // Checking initial network state
    checkNetworkStatus();

    // Setting up polling to check network status every 5 seconds
    const interval = setInterval(checkNetworkStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const checkNetworkStatus = async () => {
    try {
      // Checking network state using expo-network
      const networkState = await Network.getNetworkStateAsync();
      
      setIsOnline(networkState.isConnected && networkState.isInternetReachable);
      setNetworkType(networkState.type || 'UNKNOWN');

      console.log('Network Status:', {
        isConnected: networkState.isConnected,
        isInternetReachable: networkState.isInternetReachable,
        type: networkState.type,
      });
    } catch (error) {
      console.error('Error checking network status:', error);
      setIsOnline(true);
    }
  };

  return (
    <NetworkContext.Provider value={{ isOnline, networkType }}>
      {children}
    </NetworkContext.Provider>
  );
};


// Hook to access network status in any component
export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within NetworkProvider');
  }
  return context;
};

// Utility function to wait for online connection
export const waitForOnline = (timeout = 30000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkInterval = setInterval(async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        
        if (networkState.isConnected && networkState.isInternetReachable) {
          clearInterval(checkInterval);
          resolve(true);
        }

        if (Date.now() - startTime > timeout) {
          clearInterval(checkInterval);
          reject(new Error('Timeout waiting for online connection'));
        }
      } catch (error) {
        clearInterval(checkInterval);
        reject(error);
      }
    }, 1000);
  });
};
