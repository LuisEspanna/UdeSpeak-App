import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useGoogleLogin from '../../hooks/useGoogleLogin'

export default function HomeScreen({}) {

  const { logout } = useGoogleLogin()

  const onLogout = () => {
    logout()
  }

  return (
    <View>
      <TouchableOpacity onPress={onLogout}>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}