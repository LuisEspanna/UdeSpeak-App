import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  return (
      <NavigationContainer>
          <Drawer.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Settings" component={SettingsScreen} />
          </Drawer.Navigator>
      </NavigationContainer>
  )
}