import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SwipeToPayButton() {
  const [paid, setPaid] = useState(false);
  const translateX = useSharedValue(0);

  const handleSwipeComplete = () => {
    setPaid(true);
    Alert.alert('Payment Successful', 'Your payment has been processed!');
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < SCREEN_WIDTH * 0.6 ? 1 : 0,
    transform: [{ translateX: translateX.value / 2 }], // Text moves slower than the button
  }));

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.translationX > SCREEN_WIDTH * 0.8) {
      // If swiped far enough, complete the payment
      runOnJS(handleSwipeComplete)();
    } else {
      // Reset the button position if not far enough
      translateX.value = withSpring(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {paid ? 'Payment Completed 🎉' : 'Swipe to Pay'}
      </Text>
      <View style={styles.swipeContainer}>
        <Animated.Text style={[styles.swipeText, textAnimatedStyle]}>
          Swipe to Pay
        </Animated.Text>
        <PanGestureHandler
          onGestureEvent={Animated.event(
            [{ nativeEvent: { translationX: translateX } }],
            { useNativeDriver: false }
          )}
          onEnded={onHandlerStateChange}
        >
          <Animated.View style={[styles.swipeButton, buttonAnimatedStyle]}>
            <Text style={styles.buttonText}>Swipe</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  swipeContainer: {
    width: SCREEN_WIDTH * 0.9,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  swipeText: {
    position: 'absolute',
    left: 20,
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  },
  swipeButton: {
    width: 60,
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
