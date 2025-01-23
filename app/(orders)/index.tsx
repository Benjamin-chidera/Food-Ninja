import { View, Text, ScrollView, Image, FlatList, RefreshControl } from 'react-native';
import React from 'react';
import OrderBg from '~/components/order/OrderBg';
import { useOrderStore } from '~/store/order';
import { useGlobalCart } from '~/store/cart-context';

const OrderPage = () => {
  const orderContext = useGlobalCart();

  const {
    order: { item: orders },
    refreshing,
    setRefreshing,
  } = useOrderStore();

  console.log(orders);

  if (!orderContext) {
    return null;
  }

  const { getOrders } = orderContext;

  const refresh = () => {
    setRefreshing(true);
    getOrders();

    const timeOut = setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    console.log('refresh');
    return () => clearTimeout(timeOut);
  };

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        keyExtractor={(item) => item._id}
        data={orders}
        renderItem={({ item }) => <OrderBg item={item as any} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
      />
    </View>
  );
};

export default OrderPage;
