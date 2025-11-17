import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatTime } from '../utils/utilFunc';
import { useConfig } from '../services/configManager';

// Message Component - Message bubbles
const MessageBubble = ({ message }) => {
  const { config } = useConfig();
  const isSent = message.is_sent === 1;

  const getStatusIcon = () => {
    if (!isSent) return null;

    switch (message.status) {
      case 'pending':
        return '🕐';
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, isSent ? styles.sentContainer : styles.receivedContainer]}>
      <View
        style={[
          styles.bubble,
          isSent
            ? { backgroundColor: config.theme.sentMessageColor }
            : { backgroundColor: config.theme.receivedMessageColor },
        ]}
      >
        <Text style={[styles.messageText, isSent ? styles.sentText : styles.receivedText]}>
          {message.message_text}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.time, isSent ? styles.sentTime : styles.receivedTime]}>
            {formatTime(message.timestamp)}
          </Text>
          {getStatusIcon() && (
            <Text style={styles.status}> {getStatusIcon()}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 12,
  },
  sentContainer: {
    alignItems: 'flex-end',
  },
  receivedContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  time: {
    fontSize: 11,
  },
  sentTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  receivedTime: {
    color: '#666666',
  },
  status: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});

export default MessageBubble;
