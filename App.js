import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeDatabase } from './src/services/database';
import { ConfigProvider } from './src/services/configManager';
import { NetworkProvider } from './src/services/networkUtils';
import PulseLoader from './src/components/loaders/PulseLoader';

export default function App() {
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize database on app launch
    const init = async () => {
      try {
        await initializeDatabase();
        setIsDbInitialized(true);
      } catch (err) {
        console.error('Database initialization error:', err);
        setError(err.message);
      }
    };
    init();
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to initialize app: {error}</Text>
      </View>
    );
  }

  if (!isDbInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <PulseLoader />
        <Text style={styles.loadingText}>Initializing Chat App...</Text>
      </View>
    );
  }

  return (
    <SQLiteProvider databaseName="chatapp.db">
      <NetworkProvider>
        <ConfigProvider>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </ConfigProvider>
      </NetworkProvider>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
  },
});
