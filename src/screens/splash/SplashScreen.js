import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import CustomLogoIcon from './helpers/CustomLogoIcon';
import ColorLogoIcon from './helpers/ColorLogoIcon'
import AnimatedLayout from './helpers/AnimatedLayout';

export default function SplashScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <AnimatedLayout/>
            <ColorLogoIcon/>
            <CustomLogoIcon/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        backgroundColor: '#F6FBFF',
        alignItems: 'center',
        justifyContent: 'center'
    }
})