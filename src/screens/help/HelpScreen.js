import { View, Text, Alert, Linking, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';


const url = 'https://udespeak-b580c.web.app/help';

export default function HelpScreen() {
    const openURL = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openURL} style={styles.button}>
                    <Text style={styles.buttonText}>Abrir en navegador</Text>
            </TouchableOpacity>       
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'relative',
        padding: 0,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#0FB4B9',
        height: 40,
        padding: 10, 
        borderRadius: 5,
        top: '40%',        
    },
    buttonText: {
        color: '#FFFFFF'
    }
})