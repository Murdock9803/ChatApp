import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';


// SkeletonLoader - Animated placeholder chat bubbles with shimmer effect


const SkeletonLoader = ({ count = 5 }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Shimmer animation
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmer.start();

    return () => shimmer.stop();
  }, []);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <Animated.View key={index} style={[styles.skeletonItem, { opacity }]}>
          <View style={styles.avatar} />
          <View style={styles.content}>
            <View style={styles.nameLine} />
            <View style={styles.messageLine} />
          </View>
          <View style={styles.timeLine} />
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  skeletonItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D0D0D0',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  nameLine: {
    width: '60%',
    height: 16,
    backgroundColor: '#D0D0D0',
    borderRadius: 4,
    marginBottom: 8,
  },
  messageLine: {
    width: '80%',
    height: 14,
    backgroundColor: '#D0D0D0',
    borderRadius: 4,
  },
  timeLine: {
    width: 40,
    height: 12,
    backgroundColor: '#D0D0D0',
    borderRadius: 4,
  },
});

export default SkeletonLoader;
