import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import RestoreScreen from '../screens/restore/RestoreScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack({ isAuth, isLoading, isFirstSetup }) {
  return (
    !isAuth && !isLoading && !isFirstSetup?
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="RestoreScreen" component={RestoreScreen} />
    </Stack.Navigator> : null
  )
}