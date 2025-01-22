/* eslint-disable import/order */
import '../global.css';
import { AuthProvider } from '~/store/auth-context';

import { PortalHost } from '@rn-primitives/portal';

import { Stack } from 'expo-router';
import { StatusBar, Text, View } from 'react-native';
import { CartProvider } from '~/store/cart-context';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function Layout() {
  return (
    <StripeProvider publishableKey="pk_test_51QhwtjD11tTSXeHkf57S8HNk8ykDXzLiuJ2rIyQQZPsC1YJKvPwokNtswi7OKMMYz44h47xBBIizoNh2pgan3jTE002lFHeN53">
      <GestureHandlerRootView>
        <AuthProvider>
          <CartProvider>
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
                name="(auth)/resetPassword"
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
                name="(user)/camera"
                options={{
                  headerShown: false,
                  presentation: 'modal',
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

              {/* this is for the restaurant screens  */}

              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />

              {/* this is for the more nearest restaurant screens  */}

              <Stack.Screen
                name="(nearest-restaurant)"
                options={{
                  headerShown: false,
                }}
              />

              {/* this is for the popular menu */}

              <Stack.Screen
                name="(popular-menu)"
                options={{
                  headerShown: false,
                }}
              />

              {/* this is for the popular menu */}

              {/* this is for the orders */}
              <Stack.Screen
                name="(orders)"
                options={{
                  headerShown: false,
                }}
              />
              {/* this is for the orders */}

              {/* this is for the chat screen */}

              <Stack.Screen
                name="(chat)"
                options={{
                  headerShown: false,
                }}
              />
              {/* this is for the chat screen */}

              {/* <statusbar /> */}
            </Stack>
            <PortalHost />
          </CartProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </StripeProvider>
  );
}
