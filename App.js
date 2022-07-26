import React from 'react';
import { Provider } from 'react-redux';
import store from './src/state/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';

GoogleSignin.configure({
  webClientId: '1096997546225-89pqegmr2fi0plrt4ccdqsfomfp0vta7.apps.googleusercontent.com',
});


const App = () => {
  return (
    <Provider store={store}>
        <Navigation/>
    </Provider>
  );
};

export default App;

