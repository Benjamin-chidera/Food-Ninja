import { Stack } from 'expo-router';
import { Bell, Dot } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

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
              <View className=" shadow-xsm relative mr-4 rounded-full bg-green-500 p-2 shadow-black">
                <Bell color={'white'} size={20} />

                <View className="absolute right-0 top-0 rounded-full bg-red-500 ">
                  <Dot color={'white'} size={10} />
                </View>
              </View>
            </>
          ),
        }}
      />
    </Stack>
  );
};

export default OrderLayout;
