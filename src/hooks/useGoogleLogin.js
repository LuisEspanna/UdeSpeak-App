import { GoogleSignin } from '@react-native-google-signin/google-signin';
import  { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { getUserDataFromResult } from '../functions'
import { useDispatch } from 'react-redux'
import { setUser } from '../state/reducers/userSlice';


export default function useGoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const googleLogin = async () => {
    try {
      setIsLoading(true)
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const user = getUserDataFromResult(auth().currentUser);
      login(user);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }

  const loginWithEmailAndPassword = async () => {

  }

  const autoLogin = async () => {

  }

  const login = (user) => {
    dispatch(setUser(user));
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
