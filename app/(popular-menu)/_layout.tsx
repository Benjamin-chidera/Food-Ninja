import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const PopularMenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          headerTitle: 'Popular Menu',
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
          },
          headerLargeTitleShadowVisible: false,
        }}
      />

      {/* this is for the popular menu id */}

      <Stack.Screen
        name="[id]"
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
      />
      {/* this is for the popular menu id */}
    </Stack>
  );
};

export default PopularMenuLayout;
