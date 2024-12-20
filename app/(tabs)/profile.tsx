import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';

const Profile = () => {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('token');
    console.log('Logged out');
    router.replace('/(auth)/signin');
  };

  return (
    <View>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}
        className="h- full w-full object-cover object-top"
      />

      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
