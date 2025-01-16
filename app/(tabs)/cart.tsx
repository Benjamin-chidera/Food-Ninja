import { View, Text, Image, ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '~/store/cart';
import { Button } from '~/components/ui/button';

import cartTotal from '~/assets/cart-total.png';

const Cart = () => {
  const { cart } = useCartStore();
  console.log(cart, '8');

  const totalPrice = cart.reduce((acc, item) => acc + item.food.price, 0);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  console.log(totalPrice, totalQuantity);

  console.log(totalPrice, 'totalPrice');

  return (
    <SafeAreaView className="flex-1 p-5">
      <Text className=" text-2xl font-bold">Your Cart</Text>

      <View className=" mt-5">
        {cart.map((item) => (
          <View
            key={item.food._id}
            className="mb-5 flex-row items-center justify-between gap-5 rounded-3xl bg-white p-3 shadow-sm">
            <View className=" flex-row items-center gap-3">
              <Image source={{ uri: item.food.image }} className="h-16 w-16 rounded-md" />

              <View>
                <Text className=" font-bold">{item.food.name}</Text>
                <Text className=" mt-1 capitalize text-gray-400">{item.food.restaurant}</Text>

                <Text className=" mt-2 font-bold text-green-500">${item.food.price}</Text>
              </View>
            </View>

            <View className=" flex-row items-center gap-2">
              <Button className=" bg-[#53E88B] opacity-35" size="sm">
                <Text className=" font-bold text-[#15BE77]">-</Text>
              </Button>
              <Text>{item.quantity}</Text>
              <Button className=" bg-[#53E88B]" size="sm">
                <Text className=" font-bold text-white">+</Text>
              </Button>
            </View>
          </View>
        ))}
      </View>

      <View className=" absolute bottom-2 left-0 right-0 m-3 h-[206px] rounded-xl bg-[#15BE77]">
        <ImageBackground source={cartTotal} className=" h-full w-full p-5">
          <View className=" flex-1">
            <View className=" flex-row items-center justify-between">
              {/* this is for the sub total */}
              <Text className=" text-xl font-bold text-white"> SubTotal</Text>
              <Text className=" text-xl font-bold text-white"> SubTotal</Text>
            </View>

            <View className=" flex-row items-center justify-between">
              {/* this is for the delivery charges */}
              <Text className=" text-xl font-bold text-white">Delivery Charges</Text>
              <Text className=" text-xl font-bold text-white">Delivery Charges</Text>
            </View>

            <View className=" mt-7 flex-row items-center justify-between">
              {/* this is for the total */}

              <Text className=" text-xl font-bold text-white">Total</Text>
              <Text className=" text-xl font-bold text-white">Total</Text>
            </View>
          </View>

          <Button className=" h-[325px] w-full rounded-xl bg-white">
            <Text className=" font-bold text-green-500">Place My Order</Text>
          </Button>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
