import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import Toast from '../../components/Toast';
import Button from '../../components/Button';
import LoadingOverlay from '../../components/LoadingOverlay';

import HeaderIcon from '../../components/icons/HeaderIcon';

import useRestoreScreen from './hooks/useRestoreScreen';
import useToast from '../../hooks/useToast';


export default function RestoreScreen({navigation}) {

    const alertProps = useToast();
    const {
        isLoading,
        onChange,
        onSend,
        onLogin,
    } = useRestoreScreen(navigation, alertProps.showAlert);
        
    return (
        <SafeAreaView style={{flex: 1, height: '100%', backgroundColor: '#F6FBFF'}}>
            <ScrollView style={{flex: 1, height: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.headerIcon}>
                        <HeaderIcon />
                    </View>
                    <View style={styles.form}>        
                        <Text style={styles.title}>Ingresa el correo electrónico asociado a tu cuenta</Text>
                        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%'}}>
                            <TextInput style={styles.textInput} placeholder='Correo electrónico' keyboardType='email-address' onChangeText={(text) => onChange({ 'email': text })} />
                        </View>                        
                        <Button style={styles.button} onPress={onSend}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </Button>
                        <TouchableOpacity style={styles.footer} onPress={onLogin}>
                            <Text>¿ya tienes una cuenta? </Text>
                            <Text style={styles.textLink}>Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <LoadingOverlay isLoading={isLoading} />
            <Toast {...alertProps} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6FBFF',
        alignItems: 'center',
        height: 660
    },
    title:{
        fontSize: 22,        
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#08677C'
    },
    headerIcon: {
        width: '100%',
    },
    googleIcon: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    form: {
        padding: 35,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 500,
    },
    textInput: {
        width: '100%',
        height: 54,
        borderWidth: 1,
        padding: 10,
        height: 53,
        borderColor: '#B8BCBF',
        borderRadius: 30,
        paddingLeft: 25,
        paddingRight: 25,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0FB4B9',
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 53,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold'
    },
    textLink: {
        color: '#0FB4B9',
        fontWeight: 'bold',
        display: 'flex'
    },
    footer: {
        flexDirection: 'row'
    }
})