import { GoogleSignin } from '@react-native-google-signin/google-signin';
import  { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { getUserDataFromResult } from '../functions'


export default function useGoogleLogin() {
  const [isLoading, setIsLoading] = useState(false)

  const googleLogin = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const user = getUserDataFromResult(auth().currentUser);
      console.log(user)
    } catch (error) {
      console.log(error);
    }
  }

  const loginWithEmailAndPassword = async () => {

  }

  const autoLogin = async () => {

  }

  return {
    //state
    isLoading,
    //functions
    googleLogin,
    loginWithEmailAndPassword,
    autoLogin
  }
}
