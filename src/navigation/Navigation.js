import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import LoginScreen from '../screens/login/LoginScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';

//functions
import { localStorageGet } from '../functions'


const Stack = createNativeStackNavigator();

const Navigation = () => {
  const auth = useSelector((state) => state.user?.isLogged);
  const [firstSetup, setFirstSetup] = useState(false);
  //const { getData } = useLocalStorage()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          firstSetup && <Stack.Screen name='Onboarding' component={OnboardingScreen} />
        }
        {!auth ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
