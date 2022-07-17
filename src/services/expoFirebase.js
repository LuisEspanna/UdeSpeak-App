import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {  } from 'firebase/auth';
import { getDoc, setDoc, getFirestore, doc } from 'firebase/firestore';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

//https://travis.media/how-to-use-firebase-with-react/

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

const firestore = getFirestore()

const readFromFirebase = (collection, document) => {
  return getDoc(doc(firestore, collection, document))
}

const saveOnFirebase = (collection, document, data) => {
  return setDoc(doc(firestore, collection, document, data))
}

export { 
  auth,
  saveOnFirebase,
  readFromFirebase
};