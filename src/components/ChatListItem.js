import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatTime, getInitials } from '../utils/utilFunc';
import { useConfig } from '../services/configManager';

const ChatListItem = ({ contact, onPress }) => {
  const { config } = useConfig();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.avatar, { backgroundColor: config.theme.primaryColor }]}>
        <Text style={styles.avatarText}>{getInitials(contact.name)}</Text>
        {contact.online_status === 1 && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {contact.name}
          </Text>
          <Text style={styles.time}>
            {formatTime(contact.last_message_time)}
          </Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {contact.last_message || 'No messages yet'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666',
  },
});

export default ChatListItem;
