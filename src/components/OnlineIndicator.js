import { View, Text, StyleSheet } from 'react-native';
import { useNetwork } from '../services/networkUtils';


// OnlineIndicator - Shows real-time online/offline status
 
const OnlineIndicator = () => {
  const { isOnline } = useNetwork();

  return (
    <View style={[styles.container, isOnline ? styles.online : styles.offline]}>
      <View style={[styles.dot, isOnline ? styles.dotOnline : styles.dotOffline]} />
      <Text style={styles.text}>{isOnline ? 'Online' : 'Offline'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  online: {
    backgroundColor: '#E8F5E9',
  },
  offline: {
    backgroundColor: '#FFEBEE',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  dotOnline: {
    backgroundColor: '#4CAF50',
  },
  dotOffline: {
    backgroundColor: '#F44336',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default OnlineIndicator;
