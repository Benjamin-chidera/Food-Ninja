import '../global.css';

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(onboarding)/onBoarding1"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(onboarding)/onBoarding2"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/signup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/signin"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/forgotPassword"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(user)/bio"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(user)/photo"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(user)/photo-preview"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(user)/user-location"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(user)/verification"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(user)/success-msg"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
