import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

const Stack = createNativeStackNavigator();

export default function OnboardingStack({isFirstSetup, isLoading, onFinish}) {
    return (
        isFirstSetup && !isLoading ?
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnboardingScreen">
                {props => <OnboardingScreen {...props} onFinish={onFinish} />}
            </Stack.Screen>
        </Stack.Navigator> : null
    )
}