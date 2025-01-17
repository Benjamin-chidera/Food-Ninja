import { Trash2 } from 'lucide-react-native';
import React, { Component, PropsWithChildren } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager, Alert } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

export default class SwipeableRow extends Component<PropsWithChildren<unknown>> {
  private renderRightAction = (
    text: React.ReactNode,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      // this is where the delete action will be called
      Alert.alert(
        'Action Confirmed',
        'You pressed the trash button!',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => console.log('Trash action confirmed'),
          },
        ],
        { cancelable: true }
      );
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View
      style={{
        width: '100%',
        height: 95,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {this.renderRightAction(<Trash2 color="white" />, 'orange', 192, progress)}
    </View>
  );

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };

  private close = () => {
    this.swipeableRow?.close();
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
        onSwipeableOpen={(direction) => {
          // this is where the delete action will be called
          Alert.alert(`Swipeable Opened`, `You swiped from the ${direction} side.`);
        }}
        onSwipeableClose={(direction) => {
          console.log(`Closing swipeable to the ${direction}`);
        }}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
