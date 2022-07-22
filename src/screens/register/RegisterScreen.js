import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Button from '../../components/Button';
import HeaderIcon from '../../components/icons/HeaderIcon';
import GoogleIcon from '../../components/icons/GoogleIcon';
import useRegister from './hooks/useRegister';
import Toast from '../../components/Toast';
import useToast from '../../hooks/useToast';
import LoadingOverlay from '../../components/LoadingOverlay';

export default function RegisterScreen({ navigation }) {

  const alertProps = useToast();
  const {
    isLoading,
    onLogin,
    onRegister,
    onChange,
    onGoogleLogin
  } = useRegister(navigation, alertProps.showAlert);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerIcon}>
            <HeaderIcon />
          </View>
          <View style={styles.form}>
            <Button onPress={onGoogleLogin}>
              <GoogleIcon style={styles.googleIcon} />
              <Text style={{ marginBottom: 3 }}>Iniciar sesión con google</Text>
            </Button>
            <View style={styles.hr} />
            <TextInput style={styles.textInput} placeholder='Nombre completo' onChangeText={(text) => onChange({ name: text })} />
            <TextInput style={styles.textInput} placeholder='Correo' keyboardType='email-address' onChangeText={(text) => onChange({ email: text })} />
            <TextInput style={styles.textInput} placeholder='Contraseña' secureTextEntry onChangeText={(text) => onChange({ password: text })} />
            <TextInput style={styles.textInput} placeholder='Confirmar contraseña' secureTextEntry onChangeText={(text) => onChange({ rpassword: text })} />
            <Button style={styles.button} onPress={onRegister}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </Button>
            <TouchableOpacity style={styles.footer} onPress={onLogin}>
              <Text>¿ya tienes una cuenta? </Text>
              <Text style={styles.textLink}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
          <Toast {...alertProps} />
          <LoadingOverlay isLoading={isLoading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FBFF',
    alignItems: 'center'
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
    maxWidth: 500
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
    width: '80%',
    marginBottom: 20
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
});