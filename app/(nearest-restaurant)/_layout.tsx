/* eslint-disable import/order */
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

const NearestRestaurantStackLayout = () => {
  const { name } = useLocalSearchParams();

  console.log(name);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          headerTitle: 'Find your Favorite Food',
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            fontSize: 30,
            // fontWeight: 'bold',
          },
          headerLargeTitleShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="[name]"
        options={{
          headerTransparent: true,
          headerTitle: `Favorite Restaurants`,
          headerLargeTitle: true,
          // headerShown: false,
        }}
      />
    </Stack>
  );
};

export default NearestRestaurantStackLayout;
