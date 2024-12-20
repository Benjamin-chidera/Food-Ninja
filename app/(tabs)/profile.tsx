/* eslint-disable import/order */
import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, ImageBackground, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

const App = () => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('token');
    console.log('Logged out');
    router.replace('/(auth)/signin');
  };

  // render
  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}
        style={styles.imageBackground}>
        <View style={styles.overlay}>
          <Pressable style={styles.openButton} onPress={() => handleSnapPress(0)}>
            <Text style={styles.buttonText}>Open Profile</Text>
          </Pressable>
        </View>
      </ImageBackground>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}>
        <BottomSheetView style={styles.contentContainer} className="relative">
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
          <Pressable
            style={styles.closeButton}
            onPress={handleClosePress}
            className=" absolute right-2 top-0">
            <Text style={styles.buttonText}>x</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: '10%',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4CD964',
    padding: 10,
    borderRadius: '50%',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
