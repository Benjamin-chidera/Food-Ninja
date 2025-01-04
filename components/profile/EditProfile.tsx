/* eslint-disable import/order */
import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Button } from '~/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';
import * as SecureStore from 'expo-secure-store';

import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '~/store/auth-store';
import axios from 'axios';
import { router } from 'expo-router';

type getUserDataProps = {
  getUserData: () => Promise<any>;
  handleClosePress: () => void;
};

export const EditProfile = ({ getUserData, handleClosePress }: getUserDataProps) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const [value, setValue] = useState('account');
  const [isDeleting, setIsDeleting] = useState('');

  const {
    photo,
    setPhoto,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    location,
    setLocation,
    phoneNumber,
    setPhoneNumber,
    loading,
    setLoading,
  } = useAuthStore();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleEditProfile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('location', location);

    if (photo) {
      formData.append('photo', {
        uri: photo,
        name: 'image.jpg',
        type: 'image/jpg',
      } as any);
    }

    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        return console.log('User not found');
      }
      const { data } = await axios.patch(`${apiUrl}/auth/user/${token}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(data);
      setLoading(false);
      getUserData();
      handleClosePress();
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setLocation('');
      setPhoneNumber('');
      setPhoto('');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // this is for deleting the account

  const handleDeleteAccount = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        return console.log('User not found');
      }
      const { data } = await axios.delete(`${apiUrl}/auth/user/${token}`);
      console.log(data);
      SecureStore.deleteItemAsync('token');
      router.replace('/(auth)/signin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="mx-auto w-full max-w-[400px] flex-col gap-1.5">
        <TabsList className="w-full flex-row">
          <TabsTrigger value="account" className="flex-1">
            <Text>Account</Text>
          </TabsTrigger>
          <TabsTrigger value="deleteAccount" className="flex-1">
            <Text>Delete Account</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ScrollView className=" mb-40" showsVerticalScrollIndicator={false}>
            {/* <Card> */}
            <CardHeader>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="native:gap-2 gap-4">
              <View className="gap-1">
                <Label nativeID="profilePicture">Profile Picture</Label>

                <Text className="h-36 w-36 rounded-full bg-gray-200" onPress={pickImage}>
                  {photo && <Image source={{ uri: photo }} className="h-36 w-36 rounded-full" />}
                </Text>
              </View>

              <View className="gap-1">
                <Label nativeID="FirstName">FirstName</Label>
                <Input
                  aria-aria-labelledby="FirstName"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>

              <View className="gap-1">
                <Label nativeID="LastName">LastName</Label>
                <Input id="LastName" value={lastName} onChangeText={setLastName} />
              </View>

              <View className="gap-1">
                <Label nativeID="Email">Email</Label>
                <Input
                  id="Email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View className="gap-1">
                <Label nativeID="NewPassword">New Password</Label>
                <Input
                  id="NewPassword"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View className="gap-1">
                <Label nativeID="address">Address</Label>
                <Input id="address" value={location} onChangeText={setLocation} />
              </View>

              <View className="gap-1">
                <Label nativeID="PhoneNumber">Phone Number</Label>
                <Input
                  id="PhoneNumber"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
            </CardContent>
            <CardFooter>
              <Button className=" bg-green-500" disabled={loading} onPress={handleEditProfile}>
                <Text className=" text-white">
                  {loading ? 'Saving Changes...' : 'Save Changes'}
                </Text>
              </Button>
            </CardFooter>
            {/* </Card> */}
          </ScrollView>
        </TabsContent>
        <TabsContent value="deleteAccount">
          {/* <Card> */}
          <CardHeader>
            <CardTitle>Delete your account</CardTitle>
            <CardDescription>This changes can not be undone.</CardDescription>
          </CardHeader>
          <CardContent className="native:gap-2 gap-4">
            <View className="gap-1">
              <Label nativeID="new">
                Type <Text className=" text-lg font-semibold">"DELETE"</Text> to confirm
              </Label>
              <Input
                placeholder="DELETE"
                aria-labelledby="new"
                value={isDeleting}
                onChangeText={setIsDeleting}
              />
            </View>
          </CardContent>
          <CardFooter>
            <Button
              className=" bg-red-500 "
              disabled={isDeleting !== 'DELETE' || loading}
              onPress={handleDeleteAccount}>
              <Text className="text-white">{loading ? 'Deleting...' : 'Delete Account'}</Text>
            </Button>
          </CardFooter>
          {/* </Card> */}
        </TabsContent>
      </Tabs>
    </View>
  );
};
