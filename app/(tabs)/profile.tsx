import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { View, Text } from 'react-native';

const Profile = () => {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('token');
    console.log('Logged out');
    router.replace('/(auth)/signin');
  };

  return (
    <View>
      <Text>Profile</Text>

      {/* <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable> */}
    </View>
  );
};

export default Profile;
