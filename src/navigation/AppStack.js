import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function NavigationDrawer({isAuth, isLoading}) {
  return (
    isAuth && !isLoading ?
        <Drawer.Navigator
          screenOptions={{ headerShown: false }} initialRouteName="Home"
          drawerContent={props => <CustomDrawer {...props}/>}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator> : null
  )
}