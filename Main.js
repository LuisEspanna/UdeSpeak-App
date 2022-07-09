import { View, Text, TouchableOpacity } from 'react-native'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Login from './src/screens/Login'
import useGoogleLogin from './src/hooks/useGoogleLogin';
import Onboarding from './src/screens/Onboarding'
import useLocalStorage from './src/hooks/useLocalStorage';
import { useState } from 'react';

export default function Main() {
    const auth = useSelector((state) => state.user?.isLogged)
    const { logout } = useGoogleLogin()
    const { getData, storeData } = useLocalStorage()
    const [firstSetup, setFirstSetup] = useState(false)

    useEffect(() => {
        let isMounted = true
        //storeData('onboarding', null)
        
        getData('onboarding').then((res) => {
            console.log(!res && isMounted)
            if (!res && isMounted) {
                setFirstSetup(true)
            }
        })
        

        return () => { isMounted = false }
    }, [])

    
    const onFinish = () => {
        setFirstSetup(false)
        storeData('onboarding', 'true')

        console.log('Finish')
    }

    return (
        <View>
            { 
                !auth ? ( firstSetup ? <Onboarding onFinish={onFinish}/> : <Login/>) :
                <View>
                    <TouchableOpacity onPress={logout}>
                        <Text>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}