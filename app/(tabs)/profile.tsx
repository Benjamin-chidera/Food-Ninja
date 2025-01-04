/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fingerprint, Mail, MapPinPlusIcon, Phone, ScanFace } from 'lucide-react-native';
import { Switch } from '~/components/ui/switch';
import { Label } from '~/components/ui/label';
import { Platform } from 'react-native';
import { EditProfile } from '~/components/profile/EditProfile';
import { useAuthStore } from '~/store/auth-store';
import axios from 'axios';
import useProfileStore from '~/store/profile-store';

const App = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const platform = Platform.OS;
  const [sheetIndex, setSheetIndex] = useState(-1);
  const { enable, setEnable } = useAuthStore();
  const { user, setUser } = useProfileStore();
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // console.log(apiUrl);

  // variables
  const snapPoints = useMemo(() => ['90%'], []);

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
    setSheetIndex(index);
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setSheetIndex(-1);
  }, []);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('token');
    console.log('Logged out');
    router.replace('/(auth)/signin');
  };

  const getUserData = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        return console.log('User not found');
      }

      const { data } = await axios.get(`${apiUrl}/auth/user/${token}`);
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // console.log(user);

  useEffect(() => {
    getUserData();
  }, []);

  const getYear = new Date(user?.createdAt).getFullYear();

  // console.log(getYear);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView className="bg-white px-3">
        <View className=" mb-10 items-center justify-center">
          <Image
            source={{
              uri: user?.photo,
            }}
            className="h-36 w-36 rounded-full object-top"
          />
          <Text className=" mt-2 text-2xl font-bold">
            {user?.firstName} {user?.lastName}
          </Text>
          <Text className="mt-1 text-gray-500">Member since {getYear}</Text>
        </View>

        <View className=" rounded-lg bg-green-500 p-5">
          <View className=" mb-5 flex-row items-center gap-3">
            <Mail color="white" size={24} />
            <View>
              <Text className=" text-white">Email</Text>
              <Text className=" text-lg font-semibold text-white">{user?.email}</Text>
            </View>
          </View>

          <View className=" mb-5 flex-row items-center gap-3">
            <Phone color="white" size={24} />
            <View>
              <Text className=" text-white">Phone</Text>
              <Text className=" text-lg font-semibold text-white">{user?.phoneNumber}</Text>
            </View>
          </View>

          <View className=" mb-5 flex-row items-center gap-3">
            <MapPinPlusIcon color="white" size={24} />
            <View>
              <Text className=" text-white">Default Address</Text>
              <Text className=" text-lg font-semibold text-white">{user?.location}</Text>
            </View>
          </View>

          <View className=" mb-5 flex-row items-center gap-3">
            {platform === 'ios' ? (
              <ScanFace color="white" size={24} />
            ) : (
              <Fingerprint color="white" size={24} />
            )}

            <View className="flex-row items-center justify-between gap-3">
              <Label
                nativeID="airplane-mode"
                className="text-lg font-semibold text-white"
                onPress={() => {
                  setEnable(!enable);
                }}>
                Enable {platform === 'ios' ? 'Face ID' : 'Fingerprint'}
              </Label>
              <Switch nativeID="airplane-mode" checked={enable} onCheckedChange={setEnable} />
            </View>
          </View>
        </View>

        <View className=" mb-5 mt-5 flex-row items-center justify-center gap-10">
          <View>
            <Text className=" text-3xl font-bold">32</Text>
            <Text>Orders</Text>
          </View>

          <View>
            <Text className="text-3xl font-bold">$520</Text>
            <Text>Total Spent</Text>
          </View>
        </View>

        <View className=" mt-5 flex-col gap-5">
          <Pressable
            onPress={() => handleSnapPress(0)}
            className=" w-full rounded-lg border border-green-500 py-3">
            <Text className=" text-center text-2xl font-semibold text-green-500">Edit Profile</Text>
          </Pressable>

          <Pressable onPress={handleLogout} className=" w-full rounded-lg bg-green-500 py-3">
            <Text className=" text-center text-2xl font-semibold text-white">Logout</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <BottomSheet
        ref={sheetRef}
        index={sheetIndex}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}>
        <BottomSheetView style={styles.contentContainer} className="relative">
          <EditProfile getUserData={getUserData} handleClosePress={handleClosePress}/>

          <Pressable
            onPress={handleClosePress}
            className=" absolute right-2 top-0 rounded-full bg-green-500 px-3.5 py-2">
            <Text className=" font-bold text-white">x</Text>
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
