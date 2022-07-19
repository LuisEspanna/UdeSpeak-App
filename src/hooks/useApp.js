import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';



export default function useApp() {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const getStatusBar = () => {
        return (<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />)
    }

    return {
        backgroundStyle,
        isDarkMode,
        getStatusBar
    }
}
