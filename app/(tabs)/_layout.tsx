/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Tabs } from 'expo-router';
import { Heart, House, MessageCircle, ShoppingCart, User } from 'lucide-react-native';
import React from 'react';
import { View, Text } from 'react-native';
import { useFoodStore } from '~/store/food';

const TabsLayout = () => {
  const { favorites } = useFoodStore();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Heart color={color} size={size} />
              {favorites.length > 0 && (
                <Text className=" absolute right-2.5 top-1 rounded-full text-sm  text-red-500">
                  {favorites?.length}
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
