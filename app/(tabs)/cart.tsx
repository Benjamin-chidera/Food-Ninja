/* eslint-disable import/order */
import { View, Text, Image, ImageBackground, Alert, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '~/store/cart';
import { Button } from '~/components/ui/button';
import { useStripe } from '@stripe/stripe-react-native';

import cartTotal from '~/assets/cart-total.png';
import SwipeableRow from '~/components/SwipeableRow';
// import SwipeToPayButton from '~/components/buttons/swiper-to-pay';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';
import { SendToBack, ShoppingCart } from 'lucide-react-native';
import { Link } from 'expo-router';

const Cart = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const { cart } = useCartStore();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  console.log(totalPrice, totalQuantity);

  console.log(totalPrice, 'totalPrice');

  console.log(apiUrl);

  const initializePaymentSheet = async () => {
    try {
      // if (!cart || totalPrice) return;

      const token = await SecureStore.getItemAsync('token');

      if (!token) {
        return;
      }

      const { data } = await axios.post(`${apiUrl}/payment/request-payment`, {
        // item: cart.map((item) => ({
        //   foodId: item.food._id,
        //   quantity: item.quantity,
        // })),

        item: cart,
        amount: totalPrice,
        userId: token,

        // metadata: {
        //   item: JSON.stringify(cart), // Pass item data as a JSON string
        //   userId: token, // Pass user ID
        // },
      });

      // console.log(data);

      const { clientSecret } = data;

      const initSheet = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Food Ninja', // Display name on the payment sheet
      });

      if (initSheet.error) {
        alert(`Error initializing payment sheet: ${initSheet.error.message}`);
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const openPaymentSheet = async () => {
    const result = await presentPaymentSheet();
    console.log(result);

    if (result.error) {
      alert(`Payment failed: ${result.error.message}`);
    } else {
      alert('Payment successful!');
      // navigation.navigate('OrderPage'); // Navigate to the order page
    }
  };

  const handlePayment = async () => {
    // setLoading(true);

    const isInitialized = await initializePaymentSheet();
    if (isInitialized) {
      await openPaymentSheet();
    }

    // setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <Text className=" text-2xl font-bold">Your Cart</Text>

      {cart.length < 1 && (
        <View className=" mt-5 flex-1 items-center justify-center">
          <View className=" relative items-center justify-center">
            <ShoppingCart size={70} color="#53E88B" />

            <Text className=" absolute -top-4 text-2xl">🥲</Text>
          </View>

          <Text className=" items-center text-xl font-bold text-gray-500">Your Cart is Empty</Text>
        </View>
      )}

      <FlatList
        keyExtractor={(item) => item?._id}
        data={cart}
        renderItem={({ item }) => (
          <SwipeableRow id={item?._id}>
            <View className="mb-3 h-[95px] flex-row items-center justify-between gap-5 rounded-3xl bg-white p-3 shadow-sm">
              <View className=" flex-row items-center gap-3">
                <Image source={{ uri: item.image }} className="h-16 w-16 rounded-md" />

                <View>
                  <Text className=" font-bold">{item.name}</Text>
                  <Text className=" mt-1 capitalize text-gray-400">{item.restaurant}</Text>

                  <Text className=" mt-2 font-bold text-green-500">${item.price}</Text>
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
          </SwipeableRow>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName=" mt-5"
      />

      {/* this is for showing the total price */}
      {cart.length > 1 && (
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

            <Button className=" h-[325px] w-full rounded-xl bg-white" onPress={handlePayment}>
              <Text className=" font-bold text-green-500">Place My Order</Text>
            </Button>

            {/* <SwipeToPayButton /> */}
          </ImageBackground>
        </View>
      )}

      <Link
        href="/(orders)"
        className=" absolute bottom-3 right-3 w-12 rounded-full bg-green-500 p-2">
        <SendToBack color={'white'} />
      </Link>
    </SafeAreaView>
  );
};

export default Cart;
