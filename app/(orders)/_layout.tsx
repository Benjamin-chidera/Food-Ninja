import { Stack } from 'expo-router';
import { Bell } from 'lucide-react-native';
import React from 'react';

const OrderLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // headerTransparent: true,
          headerTitle: 'Your Orders',
          headerRight: () => (
            <>
              <Bell />
            </>
          ),
        }}
      />
    </Stack>
  );
};

export default OrderLayout;
