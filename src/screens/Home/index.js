import { View, Text } from 'react-native'
import React from 'react'
import useGoogleLogin from '../../hooks/useGoogleLogin'

export default function HomeScreen() {

  const { logout } = useGoogleLogin()

  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}