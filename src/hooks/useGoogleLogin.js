//import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function useGoogleLogin() {

    const googleLogin = async () => {
        /*
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
        */
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //this.setState({ userInfo });
            console.log('-------------------------------------------')
            console.log(':v')
            console.log('-------------------------------------------')
            console.log(userInfo)
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
    }

    return {
        googleLogin
    }
}
