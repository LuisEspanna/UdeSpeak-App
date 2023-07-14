import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import LanguagesScreen from '../screens/languages/LanguagesScreen';
import LevelsScreen from '../screens/levels/LevelsScreen';

//Drawers
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
            <Drawer.Screen name="Explorar cursos" component={LanguagesScreen}/>
            <Drawer.Screen name="Mi cuenta" component={HomeScreen}/>
            <Drawer.Screen name="Configuración" component={SettingsScreen}/>
            <Drawer.Screen name="Reportar problema" component={HomeScreen}/>
            <Drawer.Screen name="Ayuda" component={SettingsScreen} />
            <Drawer.Screen name="_levels" component={LevelsScreen} />
        </Drawer.Navigator> : null
  )
}