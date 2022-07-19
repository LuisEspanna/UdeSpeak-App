import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import useApp from './src/hooks/useApp';
//import { Provider } from 'react-redux';
//import store from './src/state/store';


import LoginScreen from './src/screens/login/LoginScreen';

const App = () => {
  const { backgroundStyle, isDarkMode } = useApp();

  return (
    /*
    <Provider store={store}>
      
    </Provider>
     */
    
    <SafeAreaView style={[styles.container, {backgroundColor: backgroundStyle}]}>
      {
        /*
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        */
      }
      
      <LoginScreen/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;

