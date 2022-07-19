import React from 'react';
import { Provider } from 'react-redux';
import store from './src/state/store';

//Screens
import LoginScreen from './src/screens/login/LoginScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

GoogleSignin.configure({
  webClientId: '1096997546225-89pqegmr2fi0plrt4ccdqsfomfp0vta7.apps.googleusercontent.com',
});

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='LoginScreen' component={HomeScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
};

export default App;

