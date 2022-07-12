import { StyleSheet, Text, View, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-web'
import Button from '../../components/form/Button'
import LogoIcon from '../../components/icons/LogoIcon'
import useGoogleLogin from '../../hooks/useGoogleLogin'
import HeaderIcon from '../Onboarding/helpers/icons/HeaderIcon'
import GoogleIcon from '../../components/icons/GoogleIcon'

export default function LoginScreen({navigation}) {
  const { googleLogin } = useGoogleLogin();

  const onRegister = () => {
    navigation.replace('RegisterScreen')
  }

  return (
    <View style={styles.container}>
        <View style={styles.headerIcon}>
          <HeaderIcon/>
        </View>
        <View style={styles.form}>
          <LogoIcon style={styles.logo}/>
          <Button onPress={googleLogin}>
            <GoogleIcon style={styles.googleIcon}/>
            <Text style={{ marginBottom: 3 }}>Iniciar sesión con google</Text>
          </Button>
          <View style={styles.hr}/>
          <Text style={{marginBottom: 20}}>Inicia con tu correo electrónico</Text>
          <TextInput style={styles.textInput} placeholder='Correo' keyboardType='email-address'/>
          <TextInput style={styles.textInput} placeholder='Contraseña' secureTextEntry/>
          <TouchableOpacity>
            <Text style={styles.textLink}>Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <Button style={styles.button}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </Button>
          <TouchableOpacity style={styles.footer} onPress={onRegister}>
            <Text>No tienes una cuenta? </Text>
            <Text style={styles.textLink}>Registrate</Text>
          </TouchableOpacity>
        </View>
    </View>
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
  googleIcon:{
    width:25,
    height:25,
    marginRight: 10
  },
  form:{
    padding:35,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 500,
  },
  hr:{
    borderTopWidth: 1,
    borderTopColor: '#B8BCBF59',
    marginTop:20,
    marginBottom: 20,
    width: '100%'
  },
  textInput:{
    width: '100%',
    height:54,
    borderWidth: 1,
    padding: 10,
    height:53,
    borderColor: '#B8BCBF',
    borderRadius:30,
    paddingLeft:25,
    paddingRight:25,
    marginBottom:20
  },
  logo:{
    width:'80%',
    marginBottom: 20
  },
  button:{
    backgroundColor: '#0FB4B9',
    borderRadius:30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height:53,
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
