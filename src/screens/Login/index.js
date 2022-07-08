import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import useGoogleLogin from '../../hooks/useGoogleLogin';

export default function index() {
  const { googleLogin, logout } = useGoogleLogin();

  return (
    <View>
        <TouchableOpacity onPress={googleLogin}>
          <Text>Iniciar sesión con google</Text>
        </TouchableOpacity>
    </View>
  )
}
