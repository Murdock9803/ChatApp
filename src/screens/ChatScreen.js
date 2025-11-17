import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getMessagesByContactId, insertMessage, updateMessageStatus } from '../services/database';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/loaders/TypingIndicator';
import { useConfig } from '../services/configManager';
import { useNetwork } from '../services/networkUtils';

// Individual chat screen

const ChatScreen = ({ route, navigation }) => {
  const { contact } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const flatListRef = useRef(null);
  const { config } = useConfig();
  const { isOnline } = useNetwork();

  useFocusEffect(
    useCallback(() => {
      loadMessages();
      return () => {};
    }, [contact.id])
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: contact.name,
      headerRight: () => (
        <Text style={styles.onlineStatus}>
          {contact.online_status === 1 ? 'Online' : 'Offline'}
        </Text>
      ),
    });

    const typingInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setShowTyping(true);
        setTimeout(() => setShowTyping(false), 3000);
      }
    }, 10000);

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    });

    return () => {
      clearInterval(typingInterval);
      keyboardDidShowListener.remove();
    };
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getMessagesByContactId(contact.id);
      setMessages(data);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 100);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const messageText = inputText.trim();
    setInputText('');

    try {
      // Insert message into database
      const messageId = await insertMessage(contact.id, messageText, true);
      
      // Determine initial status based on online state
      const initialStatus = isOnline ? 'sent' : 'pending';
      
      // Create new message object
      const newMessage = {
        id: messageId,
        contact_id: contact.id,
        message_text: messageText,
        is_sent: 1,
        status: initialStatus,
        timestamp: new Date().toISOString(),
        synced: 0,
      };

      // If online, immediately update status in database
      if (isOnline) {
        await updateMessageStatus(messageId, 'sent');
        // Simulate delivery after a brief delay
        setTimeout(async () => {
          await updateMessageStatus(messageId, 'delivered');
          newMessage.status = 'delivered';
          setMessages(prev => {
            const updated = prev.map(m => m.id === messageId ? newMessage : m);
            if (!updated.find(m => m.id === messageId)) {
              updated.push(newMessage);
            }
            return updated;
          });
        }, 800);
      }

      // Add to UI
      setMessages(prev => [...prev, newMessage]);
      
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (error) {
      console.error('Error sending message:', error);
      setInputText(messageText);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={[styles.innerContainer, { backgroundColor: config.theme.backgroundColor }]}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={styles.messageList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No messages yet</Text>
            </View>
          }
        />

        {showTyping && (
          <View style={styles.typingContainer}>
            <TypingIndicator />
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={config.ui.messageInputPlaceholder}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[
              styles.sendButton, 
              { backgroundColor: inputText.trim() ? config.theme.primaryColor : '#CCC' }
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  messageList: {
    paddingVertical: 12,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  typingContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  onlineStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginRight: 16,
  },
});

export default ChatScreen;
