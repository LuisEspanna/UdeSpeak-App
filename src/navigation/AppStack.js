import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StarIcon from '../components/icons/StarIcon';

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
            <Drawer.Screen name="Mis cursos" component={HomeScreen}/>
            <Drawer.Screen name="Explorar cursos" component={SettingsScreen}/>
            <Drawer.Screen name="Mi cuenta" component={HomeScreen}/>
            <Drawer.Screen name="Configuración" component={SettingsScreen}/>
            <Drawer.Screen name="Reportar problema" component={HomeScreen}/>
            <Drawer.Screen name="Ayuda" component={SettingsScreen}/>
        </Drawer.Navigator> : null
  )
}