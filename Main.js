import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useLocalStorage from './src/hooks/useLocalStorage'
import { useState } from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from './src/screens/Home'
import LoginScreen from './src/screens/Login'
import OnboardingScreen from './src/screens/Onboarding'
import RegisterScreen from './src/screens/Register'

const Stack = createStackNavigator();

export default function Main() {
    const auth = useSelector((state) => state.user?.isLogged)
    const { getData } = useLocalStorage()
    const [firstSetup, setFirstSetup] = useState(true)

    useEffect(() => {
        let isMounted = true

        getData('onboarding').then((res) => {
            if (res !== null && isMounted) {
                setFirstSetup(false)
            }
        })
        
        return () => { isMounted = false }
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {firstSetup && (
                    <Stack.Screen name="OnboardingScreen">
                        {props => <OnboardingScreen {...props} onFinish={() => setFirstSetup(false)} />}
                    </Stack.Screen>
                )}
                {!auth ? (
                    <>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />                       
                        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    </>
                ) : (
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}