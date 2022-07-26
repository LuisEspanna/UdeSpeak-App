import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import LoginScreen from '../screens/login/LoginScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import SplashScreen from '../screens/splash/SplashScreen';

//functions
import { localStorageGet, sleep } from '../functions';
import useGoogleLogin from '../hooks/useGoogleLogin';

//Drawer
import NavigationDrawer from './NavigationDrawer';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  const auth = useSelector((state) => state.user?.isLogged);
  const [firstSetup, setFirstSetup] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { autoLogin } = useGoogleLogin();
  
  useEffect(() => {
    let isMounted = true;

    localStorageGet('onboarding').then(async(res) => {
      if (res !== null && isMounted) {
        setFirstSetup(false);
      }
      autoLogin();
      await sleep(3000);
      setIsLoading(false);
    });

    return () => { isMounted = false; }
  }, [])
  

  return (
    !isLoading ? (
      !auth ?
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {
            firstSetup && (
              <Stack.Screen name="OnboardingScreen">
                {props => <OnboardingScreen {...props} onFinish={() => setFirstSetup(false)} />}
              </Stack.Screen>
          )}
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      : <NavigationDrawer/>
      )
      : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="splashScreen" component={SplashScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
  );
};

export default Navigation;


/*




*/