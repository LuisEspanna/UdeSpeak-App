import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from '../../components/Toast'
import Button from '../../components/Button'

//import HeaderIcon from '../Onboarding/helpers/icons/HeaderIcon'
/*
import LogoIcon from '../../components/icons/LogoIcon'
import GoogleIcon from '../../components/icons/GoogleIcon'
*/
import useLoginScreen from './helpers/useLoginScreen';
import useToast from '../../hooks/useToast';
/*

*/
export default function LoginScreen() {

    
    const alertProps = useToast();
    const {
        isLoading,
        onRegister,
        onChange,
        onGoogleLogin,
        iforgotMyPassword,
        onLogin
    } = useLoginScreen(
        //navigation, 
        alertProps.showAlert);
        
    return (
        <View style={styles.container}>
            <Text>Hola</Text>
            {
                /*
                <View style={styles.headerIcon}>
                    <HeaderIcon />
                </View>
                 */
            }
            
            <Button style={styles.button} onPress={onLogin}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </Button>
            
            
            {/*
            
        <View style={styles.form}>
                
                <LogoIcon style={styles.logo} />
                <Button onPress={onGoogleLogin}>
                    <GoogleIcon style={styles.googleIcon} />
                    <Text style={{ marginBottom: 3 }}>Iniciar sesión con google</Text>
                </Button>
                <View style={styles.hr} />
                <Text style={{ marginBottom: 20 }}>Inicia con tu correo electrónico</Text>
                <TextInput style={styles.textInput} placeholder='Correo' keyboardType='email-address' onChangeText={(text) => onChange({ 'email': text })} />
                <TextInput style={styles.textInput} placeholder='Contraseña' secureTextEntry onChangeText={(text) => onChange({ 'password': text })} />
                <TouchableOpacity onPress={iforgotMyPassword}>
                    <Text style={styles.textLink}>Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                <Button style={styles.button} onPress={onLogin}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </Button>
                <TouchableOpacity style={styles.footer} onPress={onRegister}>
                    <Text>No tienes una cuenta? </Text>
                    <Text style={styles.textLink}>Registrate</Text>
                </TouchableOpacity>
            </View>
        <LoadingOverlay isLoading={isLoading}/>
         */}
            <Toast {...alertProps} />
        </View>
    )
}
//F6FBFF
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6FBFF',
        alignItems: 'center',
    },
    headerIcon: {
        width: '100%'
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
    hr: {
        borderTopWidth: 1,
        borderTopColor: '#B8BCBF59',
        marginTop: 20,
        marginBottom: 20,
        width: '100%'
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
        marginBottom: 20
    },
    logo: {
        marginBottom: 20,
        height: 70,
        width: 300,
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
        flex: 1,
        flexDirection: 'row',
        maxHeight: 20
    }
})