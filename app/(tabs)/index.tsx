/* eslint-disable prettier/prettier */
import { View, Text, Pressable } from 'react-native';
import React from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

const Home = () => {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('token');
    console.log('Logged out');
    router.replace('/(auth)/signin');
  };

  return (
    <View>
      <Text>Home</Text>

      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Home;
