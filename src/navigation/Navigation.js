import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import LoginScreen from '../screens/login/LoginScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import RestoreScreen from '../screens/restore/RestoreScreen';

//functions
import { localStorageGet, sleep } from '../functions';
import useGoogleLogin from '../hooks/useGoogleLogin';

//Drawer
import AppStack from './AppStack';
import SplashStack from './SplashStack'
import AuthStack from './AuthStack';
import OnboardingStack from './OnboardingStack';


const Navigation = () => {
  const isAuth = useSelector((state) => state.user?.isLogged);
  const [isFirstSetup, setIsFirstSetup] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { autoLogin } = useGoogleLogin();
  
  useEffect(() => {
    let isMounted = true;

    localStorageGet('onboarding').then(async(res) => {
      if (res !== null && isMounted) {
        setIsFirstSetup(false);
      }
      autoLogin();
      await sleep(3000);
      setIsLoading(false);
    });

    return () => { isMounted = false; }
  }, [])
  

  return (
    <NavigationContainer>
      <SplashStack isLoading={isLoading} />
      <OnboardingStack isFirstSetup={isFirstSetup} isLoading={isLoading} onFinish={() => setIsFirstSetup(false)}/>
      <AuthStack isAuth={isAuth} isLoading={isLoading} isFirstSetup={isFirstSetup}/>
      <AppStack isAuth={isAuth} isLoading={isLoading}/>
    </NavigationContainer>
  )
};

export default Navigation;