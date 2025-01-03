/* eslint-disable import/order */
import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, ImageBackground, Pressable, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, MapPinPlusIcon, Phone } from 'lucide-react-native';

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
      <SafeAreaView className="mt-20 px-3">
        <View className=" mb-10 items-center justify-center">
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
            }}
            className="h-36 w-36 rounded-full object-top"
          />
          <Text className=" mt-2 text-2xl font-bold">Sarah Johnson</Text>
          <Text className="mt-1 text-gray-500">Member since 2021</Text>
        </View>

        <View className="">
          <View className=" mb-5 flex-row items-center gap-3">
            <Mail />
            <View>
              <Text>Email</Text>
              <Text>johnson@example.com</Text>
            </View>
          </View>

          <View className=" mb-5 flex-row items-center gap-3">
            <Phone />
            <View>
              <Text>Phone</Text>
              <Text>johnson@example.com</Text>
            </View>
          </View>

          <View className=" mb-5 flex-row items-center gap-3">
            <MapPinPlusIcon />
            <View>
              <Text>Default Address</Text>
              <Text>123 Main St, Anytown USA</Text>
            </View>
          </View>

          {/* <View className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </View> */}
        </View>
      </SafeAreaView>

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
