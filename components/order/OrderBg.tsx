/* eslint-disable import/order */
/* eslint-disable react/jsx-curly-brace-presence */
import { View, Text, Image } from 'react-native';
import React from 'react';
import { Clock, CookingPot, MapPin, MessageSquareMore, Phone } from 'lucide-react-native';
import { Link } from 'expo-router';

interface OrderProps {
  item: {
    item: {
      _id: string;
      name: string;
      description: string;
      price: number | string | any;
      image: string;
      tags: string[];
      restaurant: string;
      isFavorite?: boolean;
    }[];

    paymentStatus: string;
  };
}

const OrderBg = ({ item }: OrderProps) => {
  // console.log(item);

  return (
    <View>
      {item.item.map((food) => (
        <View className="rounded-md bg-white p-4 shadow" key={food._id}>
          <View className=" flex-row items-center gap-5">
            <View className=" flex-row items-center gap-2 rounded-md bg-green-300 p-1">
              <CookingPot size={15} className=" text-green-800" color={'green'} />
              {/* this is for the food order status */}
              <Text className=" text-sm font-semibold text-green-800">Preparing</Text>
            </View>

            <View className=" flex-row items-center gap-2 rounded-md bg-green-300 p-1">
              <Clock size={15} color={'green'} />
              {/* this is for the food order status */}
              <Text className=" text-sm font-semibold text-green-800">11:00AM</Text>
            </View>
          </View>

          {/* this is for the food title */}
          <View className=" flex-row items-center justify-between">
            <View className=" mt-3 flex-row items-center gap-2">
              <Image
                source={{
                  uri: food.image,
                }}
                className=" h-14 w-14"
              />
              <View>
                <Text className=" font-bold">{food.name}</Text>
                {/* delivery time */}
                <Text className=" mt-1 text-sm text-gray-500">Delivery: 1Hour</Text>
              </View>
            </View>

            <Text className=" rounded-md bg-green-300 p-1 text-xs">{item.paymentStatus}</Text>
          </View>

          <View className=" mt-4 h-[0.7px] w-full bg-gray-300" />

          {/* delivery */}
          <View className=" mt-4 flex-row items-center justify-between gap-2">
            {/* this is for the delivery person contact info */}
            <View className=" flex-row items-center gap-2 ">
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800',
                }}
                className=" h-7 w-8 rounded-full"
              />

              <View>
                <Text className=" text-xs font-bold text-gray-400">Delivery Person</Text>
                <Text className=" text-sm">Nelson</Text>
              </View>
            </View>

            <View className=" flex-row items-center gap-5">
              <View className=" rounded-full bg-green-500 p-2">
                <Phone size={18} color={'green'} />
              </View>

              <View className=" rounded-full bg-sky-300 p-2">
                <MapPin size={18} color={'green'} />
              </View>

              <Link href={'/(chat)'} className=" rounded-full bg-green-500 p-2">
                <MessageSquareMore size={18} color={'green'} />
              </Link>
            </View>
          </View>

          {/* this is the white bg */}
        </View>
      ))}
    </View>
  );
};

export default OrderBg;
