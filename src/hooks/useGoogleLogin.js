import { GoogleSignin } from '@react-native-google-signin/google-signin';
import  { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { getUserDataFromResult } from '../functions';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/reducers/userSlice';
import useUsers from './useUsers';


export default function useGoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { getUser } = useUsers();

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

  const readUserInfo = async( uid ) => {
    const res = await getUser(uid);
    return res;
  }

  const loginWithEmailAndPassword = async (email, password, onError) => {
    setIsLoading(true);
    auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        login(result?.user);
      })
      .catch((err) => {
        if (onError) onError(getAuthErrorMessage(err?.message));
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const autoLogin = async () => {

  }

  const login = (user) => {   
    if(user?.uid !== null && user?.uid !== undefined){
      readUserInfo(user?.uid).then(userRes => {
        if (userRes !== undefined) {
          console.log("Loading from database")
          const newUser = { ...userRes }
          newUser.isLogged = true;
          dispatch(setUser(newUser));
        }
        else {
          const localUser = getUserDataFromResult(user)
          console.log("Saving on database");
          const newUser = { ...localUser };
          delete newUser['isLogged'];

          db.collection(COLLECTIONS.USERS).doc(localUser.uid).set(newUser).then(() => {
            dispatch(setUser(localUser));
            incrementUsers(1);
          });
        }
      });
    }
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
