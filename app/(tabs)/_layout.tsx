/* eslint-disable prettier/prettier */
import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          
        }}
        
      />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default TabsLayout;
