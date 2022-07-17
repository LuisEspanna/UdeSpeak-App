import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

// add firebase config here
let firebaseConfig = {
    apiKey: `AIzaSyAIMwu0uo_SZL37KerTQm1BbK7qJJdsSDw`,
    authDomain: `udespeak-b580c.firebaseapp.com`,
    projectId: `udespeak-b580c`,
    storageBucket: `udespeak-b580c.appspot.com`,
    messagingSenderId: `1096997546225`,
    appId: `1096997546225:web:e8bb8b6e179cced1fae150`,
    measurementId: `G-FLNKGZZFHK`
};

// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };