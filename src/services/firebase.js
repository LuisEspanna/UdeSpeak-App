import { initializeApp } from 'firebase/app';
import { collection } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
//import { User } from 'firebase/auth';
//import messaging from 'firebase/messaging';
import { getAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
/*
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import { getAuth } from 'firebase/auth';
*/
//import 'dotenv/config';

/*
let firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
};
*/

let firebaseConfig = {
  apiKey: `AIzaSyAIMwu0uo_SZL37KerTQm1BbK7qJJdsSDw`,
  authDomain: `udespeak-b580c.firebaseapp.com`,
  projectId: `udespeak-b580c`,
  storageBucket: `udespeak-b580c.appspot.com`,
  messagingSenderId: `1096997546225`,
  appId: `1096997546225:web:e8bb8b6e179cced1fae150`,
  measurementId: `G-FLNKGZZFHK`
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = { collection }
const rtdb = { database: getDatabase }
/*
const db = firebase.firestore();
const rtdb = firebase.database();
const Auth = firebase.auth;
const auth = getAuth(app);

const sendFCM = async (data = {}) => {
  const body = {
    to: '/topics/all',
    data
  };

  const response = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json; UTF-8',
      Authorization: `key=${firebaseConfig.serverKey}`
    }),
    body: JSON.stringify(body)
  });
  return response.json();
};
*/

export {
  
  db,
  rtdb,
  //Auth,
  //sendFCM,
  auth
};
