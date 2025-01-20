import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderBg from '~/components/order/OrderBg';

const OrderPage = () => {
  return (
    <View className="flex-1 bg-white">
      <View className=" m-4">
        <OrderBg />
      </View>
    </View>
  );
};

export default OrderPage;
