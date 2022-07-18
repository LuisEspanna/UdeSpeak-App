import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import useGoogleLogin from '../../hooks/useGoogleLogin'

export default function LoginScreen() {
    const { googleLogin } = useGoogleLogin();
    return (
        <View>
            <Text>LoginScreen</Text>
            <Button
                title="Google Sign-In"
                onPress={() => googleLogin().then(() => console.log('Signed in with Google!'))}
            />
            <Button title='example'/>
        </View>
    )
}

const styles = StyleSheet.create({})