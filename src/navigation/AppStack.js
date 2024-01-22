import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import LanguagesScreen from '../screens/languages/LanguagesScreen';
import LevelsScreen from '../screens/levels/LevelsScreen';
import GroupsScreen from '../screens/groups/GroupsScreen';
import QuestionnariesScreen from '../screens/questionnaries/QuestionnariesScreen';
import QuestionsScreen from '../screens/questions/QuestionsScreen';
import ReadingScreen from '../screens/reading/ReadingScreen';
import ListeningScreen from '../screens/listening/ListeningScreen';
import WritingScreen from '../screens/writing/WritingScreen';
import SpeakingScreen from '../screens/speaking/SpeakingScreen';
import BugsScreen from '../screens/bugs/BugsScreen';
import HelpScreen from '../screens/help/HelpScreen';
import AccountScreen from '../screens/account/AccountScreen';


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
            <Drawer.Screen name="Mi cuenta" component={AccountScreen}/>
            <Drawer.Screen name="_Configuración" component={SettingsScreen}/>
            <Drawer.Screen name="Reportar problema" component={BugsScreen}/>
            <Drawer.Screen name="Ayuda" component={HelpScreen} />
            <Drawer.Screen name="_levels" component={LevelsScreen} />
            <Drawer.Screen name="_groups" component={GroupsScreen} />
            <Drawer.Screen name="_questionnaries" component={QuestionnariesScreen} />
            <Drawer.Screen name="_questions" component={QuestionsScreen} />
            <Drawer.Screen name="_reading" component={ReadingScreen} />
            <Drawer.Screen name="_listening" component={ListeningScreen} />
            <Drawer.Screen name="_writing" component={WritingScreen} />
            <Drawer.Screen name="_speaking" component={SpeakingScreen} />
        </Drawer.Navigator> : null
  )
}