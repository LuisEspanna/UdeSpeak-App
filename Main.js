import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Login from './src/screens/Login'
import { TouchableOpacity } from 'react-native-web';
import useGoogleLogin from './src/hooks/useGoogleLogin';

export default function Main() {
    const auth = useSelector((state) => state.user?.isLogged)
    const { logout } = useGoogleLogin()
    

    return (
        <View>
            {
                !auth ? <Login/> :
                <TouchableOpacity onPress={logout}>
                    <Text>Cerrar sesión</Text>
                </TouchableOpacity>
            }
        </View>
    )
}