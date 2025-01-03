/* eslint-disable import/order */
import * as React from 'react';
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

import * as ImagePicker from 'expo-image-picker';

export const EditProfile = () => {
  const [value, setValue] = React.useState('account');

  const [image, setImage] = React.useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
                  {image && <Image source={{ uri: image }} className="h-36 w-36 rounded-full" />}
                </Text>
              </View>

              <View className="gap-1">
                <Label nativeID="FirstName">FirstName</Label>
                <Input aria-aria-labelledby="FirstName" />
              </View>

              <View className="gap-1">
                <Label nativeID="LastName">LastName</Label>
                <Input id="LastName" />
              </View>

              <View className="gap-1">
                <Label nativeID="Email">Email</Label>
                <Input id="Email" keyboardType="email-address" />
              </View>

              <View className="gap-1">
                <Label nativeID="Password">Old Password</Label>
                <Input id="Password" secureTextEntry />
              </View>

              <View className="gap-1">
                <Label nativeID="NewPassword">New Password</Label>
                <Input id="NewPassword" secureTextEntry />
              </View>

              <View className="gap-1">
                <Label nativeID="address">Address</Label>
                <Input id="address" />
              </View>

              <View className="gap-1">
                <Label nativeID="PhoneNumber">Phone Number</Label>
                <Input id="PhoneNumber" keyboardType="phone-pad" />
              </View>
            </CardContent>
            <CardFooter>
              <Button className=" bg-green-500">
                <Text className=" text-white">Save changes</Text>
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
              <Input placeholder="DELETE" aria-labelledby="new" secureTextEntry />
            </View>
          </CardContent>
          <CardFooter>
            <Button className=" bg-red-500 ">
              <Text className="text-white">Delete Account</Text>
            </Button>
          </CardFooter>
          {/* </Card> */}
        </TabsContent>
      </Tabs>
    </View>
  );
};
