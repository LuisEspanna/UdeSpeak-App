import React from 'react';
import SplashScreen from '../screens/splash/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function SplashStack({isLoading}) {
  return (
    isLoading ?
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splashScreen" component={SplashScreen} />
    </Stack.Navigator> : null
  )
}