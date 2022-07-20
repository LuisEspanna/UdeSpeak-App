import React from 'react';
import {StyleSheet, View, TouchableOpacity } from 'react-native';
//import CanvasSemiCircle from './CanvasSemiCircle';
import Svg, { G, Circle, Path, Defs } from "react-native-svg";

function SkipButton({ onPress, value }) {
    return (
        <TouchableOpacity onPress={onPress} >
            <View>
                <Svg
                    width={72}
                    height={72}
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <G filter="url(#filter0_d_0_1)">
                        <Circle cx={36} cy={36} r={25} fill="#0FB4B9" />
                    </G>
                    <Path
                        d="M43.707 36.707a1 1 0 000-1.414l-6.364-6.364a1 1 0 00-1.414 1.414L41.586 36l-5.657 5.657a1 1 0 001.414 1.414l6.364-6.364zM28 37h15v-2H28v2z"
                        fill="#fff"
                    />
                    <Defs></Defs>
                </Svg>
                {/*
                <CanvasSemiCircle value={value} />
                */}
                
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6FBFF',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    }
});

export default SkipButton;
