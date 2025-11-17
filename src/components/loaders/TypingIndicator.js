import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

// TypingIndicator - Animated three-dot bouncing loader

const TypingIndicator = ({ color = '#666' }) => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // bouncing animation - dots
    const createBounceAnimation = (animatedValue, delay) => {
      return Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: -10,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        ),
      ]);
    };

    // Animations with staggered delays
    Animated.parallel([
      createBounceAnimation(dot1, 0),
      createBounceAnimation(dot2, 133),
      createBounceAnimation(dot3, 266),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          { backgroundColor: color, transform: [{ translateY: dot1 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { backgroundColor: color, transform: [{ translateY: dot2 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { backgroundColor: color, transform: [{ translateY: dot3 }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export default TypingIndicator;
