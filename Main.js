import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoginScreen from './src/screens/Login'
import useGoogleLogin from './src/hooks/useGoogleLogin';
import OnboardingScreen from './src/screens/Onboarding'
import useLocalStorage from './src/hooks/useLocalStorage';
import { useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/Home';

const reset  = true;

const Stack = createStackNavigator();

export default function Main() {
    const auth = useSelector((state) => state.user?.isLogged)
    const { getData, storeData } = useLocalStorage()
    const [firstSetup, setFirstSetup] = useState(reset) //false

    useEffect(() => {
        let isMounted = true

        if(reset) storeData('onboarding', null)
        else 
        getData('onboarding').then((res) => {
            if (!res && isMounted) {
                setFirstSetup(true)
            }
        })
        
        return () => { isMounted = false }
    }, [])

    
    const onFinish = () => {
        setFirstSetup(false)
        storeData('onboarding', 'true')
    }

    return (
        firstSetup && (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {firstSetup && (
                        <Stack.Screen
                            name="OnboardingScreen"
                            component={OnboardingScreen}
                        />
                    )}
                    {
                        !auth && <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    }
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )            
    )
}