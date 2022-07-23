import { GoogleSignin } from '@react-native-google-signin/google-signin';
import  { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { getUserDataFromResult, getAuthErrorMessage } from '../functions';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/reducers/userSlice';
import useUsers from './useUsers';
import useDBCounters from '../hooks/useDBCounters';

export default function useGoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { getUser, createUser } = useUsers();
  const { incrementUsers } = useDBCounters();

  const autoLogin = async () => {
    setTimeout(()=>{
      const uid = auth().currentUser?.uid;
      if(uid === null || uid === undefined ) return;
      setIsLoading(true);
      getUser(uid).then((user)=>{
        const newUser = {...user};
        newUser.isLogged = true;
        dispatch(setUser(newUser));
      })
      .finally(()=>{
          setIsLoading(false);
      })
    }, 1000);
  }

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

  const login = (user) => {   
    if(user?.uid !== null && user?.uid !== undefined){
      getUser(user?.uid).then(userRes => {
        if (userRes !== undefined) {
          console.log("Loading from database")
          const newUser = { ...userRes }
          newUser.isLogged = true;
          dispatch(setUser(newUser));
        }
        else {
          const localUser = getUserDataFromResult(user);
          console.log("Saving on database");
          const newUser = { ...localUser };
          delete newUser['isLogged'];

          createUser(newUser).then(()=>{
            dispatch(setUser(localUser));
            incrementUsers(1);
          });
        }
      });
    }
  }

  const register = (email, password, displayName, onError) => {
    setIsLoading(true);
    auth().createUserWithEmailAndPassword( email, password)
      .then((result) => {
        const newUser = {
          displayName,
          email,
          uid: `${result?.user.uid}`
        };

        login(newUser);
      })
      .catch((err) => {
        if(onError) onError(getAuthErrorMessage(err?.message));
      })
      .finally(()=>{
        setIsLoading(false);
      });
  }

  return {
    isLoading,
    googleLogin,
    loginWithEmailAndPassword,
    autoLogin,
    register
  }
}
