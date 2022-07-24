import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';

export default function AnimatedLayout() {

    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false,
                easing: Easing.bounce
            }
        ).start();
    }, [opacity])

    const size = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    const animatedStyles = [
        styles.animView,
        {
            opacity,
            width: '100%',
            height: size
        }
    ];

    return (
        <Animated.View style={animatedStyles}>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    animView: {
        backgroundColor: '#0FB4B9',
        width: '100%',
        height: '30%',
        position: 'absolute',
        bottom: 0
    }
})