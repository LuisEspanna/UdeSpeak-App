import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar
} from 'react-native';
import useApp from './src/hooks/useApp';


import LoginScreen from './src/screens/login/LoginScreen';

const App = () => {
  const { backgroundStyle, isDarkMode } = useApp();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <LoginScreen/>
    </SafeAreaView>
  );
};

export default App;
