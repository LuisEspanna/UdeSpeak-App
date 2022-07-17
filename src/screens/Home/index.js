import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import useGoogleLogin from '../../hooks/useGoogleLogin'

export default function HomeScreen({}) {

  const { logout, autoLogin } = useGoogleLogin()

  const onLogout = () => {
    logout()
  }

  useEffect(() => {
    autoLogin()
  }, [])
  

  return (
    <View>
      <TouchableOpacity onPress={onLogout}>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}