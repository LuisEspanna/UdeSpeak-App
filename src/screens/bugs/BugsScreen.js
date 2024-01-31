import { View, Text, Alert, Linking, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import HelpAsset from '../../components/assets/HelpAsset';
import NavBar from '../../components/NavBar';


const url = 'https://udespeak-b580c.web.app/dashboard/bugs';

export default function BugsScreen({navigation}) {
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
            <View style={styles.asset}>
                <HelpAsset/>
            </View>
            <NavBar navigation={navigation} show={true} title='Reportar un problema'/>
            <View style={{ padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.80)' }}>
                <Text style={{ color: '#000000' }}>
                    De momento los canales de atención se encuentran en nuestra página Web
                </Text>
                <TouchableOpacity onPress={openURL} style={styles.button}>
                    <Text style={styles.buttonText}>Abrir en navegador</Text>
                </TouchableOpacity>
            </View>       
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
        justifyContent: 'space-between',
        flexDirection: 'column',
        position: 'relative'
    },
    asset:{
        flex: 1,
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
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
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center'
    }
})