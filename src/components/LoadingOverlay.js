import { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"

const BgIcon = (props) => {
    return (
        <Svg
            width={86}
            height={86}
            viewBox="0 0 86 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M86 43c0 23.748-19.252 43-43 43S0 66.748 0 43 19.252 0 43 0s43 19.252 43 43zM4.904 43C4.904 64.04 21.96 81.096 43 81.096c21.04 0 38.096-17.056 38.096-38.096C81.096 21.96 64.04 4.904 43 4.904 21.96 4.904 4.904 21.96 4.904 43z"
                fill="#D9D9D9"
                fillOpacity={0.72}
            />
        </Svg>
    )
}

const IndicatorIcon = (props) => {
    const rotateAnim = useRef(new Animated.Value(0)).current

    const runAnimation = () => {
        rotateAnim.setValue(0)
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 9000,
            useNativeDriver: false
        }).start(() => runAnimation())
    }

    useEffect(() => {
        runAnimation()
    }, [])

    const rotationData = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '3240deg']
    })

    return (
        <Animated.View
            style={[styles.indicator, {
                transform: [{ rotate: rotationData }]
            }]}
        >
            <Svg
                width={90}
                height={90}
                viewBox="0 0 90 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <Path
                    d="M84.522 42.184c2.963-.21 5.569 2.026 5.425 4.992A45.001 45.001 0 0156.294 88.56c-2.875.745-5.596-1.35-5.993-4.294-.397-2.943 1.687-5.61 4.532-6.462a34.245 34.245 0 0024.287-29.866c.255-2.959 2.441-5.543 5.403-5.754z"
                    fill="#fff"
                />
                <Path
                    d="M90 45c0 24.853-20.147 45-45 45S0 69.853 0 45 20.147 0 45 0s45 20.147 45 45zm-79.245 0c0 18.913 15.332 34.245 34.245 34.245 18.913 0 34.245-15.332 34.245-34.245 0-18.913-15.332-34.245-34.245-34.245-18.913 0-34.245 15.332-34.245 34.245z"
                    fill="#fff"
                    fillOpacity={0.01}
                />
            </Svg>
        </Animated.View>
    )
}

export default function LoadingOverlay({isLoading}) {
    return ( isLoading ?
        <View style={styles.container}>
            <BgIcon />
            <IndicatorIcon style={{ transform: [{ rotate: '118 deg' }] }} />
        </View> : null
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator:{
        position: 'absolute',
        transform: [{rotate: '10 deg'}]
    }
})