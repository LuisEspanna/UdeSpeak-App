import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export default function useApp() {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    GoogleSignin.configure({
        webClientId: '1096997546225-89pqegmr2fi0plrt4ccdqsfomfp0vta7.apps.googleusercontent.com',
    });

    useEffect(() => {
        /*
        GoogleSignin.configure({
            webClientId: '1096997546225-89pqegmr2fi0plrt4ccdqsfomfp0vta7.apps.googleusercontent.com',
        });
        */
    }, [])
    

    return {
        backgroundStyle,
        isDarkMode
    }
}
