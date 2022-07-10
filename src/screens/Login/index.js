import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import useGoogleLogin from '../../hooks/useGoogleLogin';

export default function LoginScreen() {
  const { googleLogin } = useGoogleLogin();

  return (
    <View>
        <TouchableOpacity onPress={googleLogin}>
          <Text>Iniciar sesión con google</Text>
        </TouchableOpacity>
    </View>
  )
}
