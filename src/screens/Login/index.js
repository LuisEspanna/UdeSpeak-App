import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import Button from '../../components/form/Button';
import LogoIcon from '../../components/icons/LogoIcon';
import useGoogleLogin from '../../hooks/useGoogleLogin';
import HeaderIcon from '../Onboarding/helpers/icons/HeaderIcon';
import GoogleIcon from './helpers/GoogleIcon'

export default function LoginScreen({navigation}) {
  const { googleLogin } = useGoogleLogin();

  return (
    <View style={styles.container}>
        <HeaderIcon/>
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
          <Text>Olvidaste tu contraseña?</Text>
          <Button>
            <Text>Iniciar sesión</Text>
          </Button>
          <TouchableOpacity>
            <Text>No tienes una cuenta?</Text>
            <Text>Registrate</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FBFF'
  },
  googleIcon:{
    width:25,
    height:25,
    marginRight: 10
  },
  form:{
    padding:25,
    flex:1,
    alignItems: 'center'
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
  }
});
