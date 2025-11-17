import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllContacts, searchContacts } from '../services/database';
import ChatListItem from '../components/ChatListItem';
import SkeletonLoader from '../components/loaders/SkeletonLoader';
import OnlineIndicator from '../components/OnlineIndicator';
import { useConfig } from '../services/configManager';
import { useSyncManager } from '../services/syncManager';

// The Home screen - Chat Lists

const ChatListScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { config } = useConfig();
  
  useSyncManager();

  useFocusEffect(
    useCallback(() => {
      loadContacts();
      return () => {};
    }, [searchQuery])
  );

  const loadContacts = async () => {
    try {
      if (contacts.length === 0) setLoading(true);
      
      if (searchQuery.trim() !== '') {
        const results = await searchContacts(searchQuery);
        setContacts(results);
      } else {
        const data = await getAllContacts();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadContacts();
    setRefreshing(false);
  };

  const handleChatPress = (contact) => {
    navigation.navigate('Chat', { contact });
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  if (loading && contacts.length === 0) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: config.theme.headerColor }]}>
          <Text style={styles.headerTitle}>{config.ui.appName}</Text>
          <View style={styles.headerRight}>
            <OnlineIndicator />
            <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsButton}>
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SkeletonLoader count={8} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: config.theme.backgroundColor }]}>
      <View style={[styles.header, { backgroundColor: config.theme.headerColor }]}>
        <Text style={styles.headerTitle}>{config.ui.appName}</Text>
        <View style={styles.headerRight}>
          <OnlineIndicator />
          <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={config.ui.searchPlaceholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChatListItem contact={item} onPress={() => handleChatPress(item)} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No chats found' : 'No chats yet'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 24,
  },
  searchContainer: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default ChatListScreen;
