import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CONFIG_KEY = '@app_config';
const CONFIG_CHECK_INTERVAL = 60000; // Check for config updates every 60 seconds

// Default configuration
const DEFAULT_CONFIG = {
  theme: {
    primaryColor: '#2196F3',
    secondaryColor: '#E0E0E0',
    sentMessageColor: '#2196F3',
    receivedMessageColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
    headerColor: '#2196F3',
  },
  features: {
    enableTypingIndicator: true,
    enableOnlineStatus: true,
    enableMessageStatus: true,
    enableSearch: true,
  },
  ui: {
    appName: 'ChatApp',
    messageInputPlaceholder: 'Type a message...',
    searchPlaceholder: 'Search chats...'
  },
};

const ConfigContext = createContext({
  config: DEFAULT_CONFIG,
  updateConfig: () => {},
  refreshConfig: () => {},
});


//  ConfigProvider - Manages backend-driven UI configuration
//  Allows dynamic updates to theme, features, and labels without app restart

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    // Load cached config on mount
    loadConfig();

    // Periodically check for config updates
    const interval = setInterval(fetchConfigUpdates, CONFIG_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, []);


  // Load config from AsyncStorage cache
  const loadConfig = async () => {
    try {
      const cachedConfig = await AsyncStorage.getItem(CONFIG_KEY);
      if (cachedConfig) {
        const parsed = JSON.parse(cachedConfig);
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
        console.log('Config loaded from cache');
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
  };

  
  //  Fetch config updates from backend - demo
  const fetchConfigUpdates = async () => {
    try {
      // For demo, we'll use the default config
      const newConfig = DEFAULT_CONFIG;

      // Save to AsyncStorage
      await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
      
      // Apply config immediately
      setConfig({ ...DEFAULT_CONFIG, ...newConfig });
      
      console.log('Config updated successfully');
    } catch (error) {
      console.error('Error fetching config updates:', error);
    }
  };

  
  //  Manually update config (for testing backend-driven changes)
  const updateConfig = async (newConfig) => {
    try {
      const updatedConfig = { ...config, ...newConfig };
      await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(updatedConfig));
      setConfig(updatedConfig);
      console.log('Config manually updated');
    } catch (error) {
      console.error('Error updating config:', error);
    }
  };

  
  //  Force refresh config from backend
  const refreshConfig = () => {
    fetchConfigUpdates();
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, refreshConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};


//  Hook to access config in any component
export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
};



// Example for testing the config inside any component
// import { useConfig } from '../services/configManager';

// const TestConfigButton = () => {
//   const { updateConfig } = useConfig();

//   const changeTheme = () => {
//     updateConfig({
//       theme: {
//         primaryColor: '#FF5722', // Change to orange
//         headerColor: '#FF5722',
//         sentMessageColor: '#FF5722',
//       },
//       ui: {
//         appName: 'MyChat Pro', // Change app name
//       }
//     });
//   };

//   return (
//     <TouchableOpacity onPress={changeTheme}>
//       <Text>Change Theme to Orange</Text>
//     </TouchableOpacity>
//   );
// };
