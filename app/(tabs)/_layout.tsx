/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
    </Tabs>
  );
};

export default TabsLayout;