import React from 'react';
import {StyleSheet, View, TouchableOpacity } from 'react-native';
import CanvasSemiCircle from './CanvasSemiCircle';

function SkipButton({onPress, value}) {
  return (
      <TouchableOpacity onPress={onPress} >
          <View>
                <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_d_0_1)">
                <circle cx="36" cy="36" r="25" fill="#0FB4B9" />
                </g>
                <path
                d="M43.7071 36.7071C44.0976 36.3166 44.0976 35.6834 43.7071 35.2929L37.3431 28.9289C36.9526 28.5384 36.3195 28.5384 35.9289 28.9289C35.5384 29.3195 35.5384 29.9526 35.9289 30.3431L41.5858 36L35.9289 41.6569C35.5384 42.0474 35.5384 42.6805 35.9289 43.0711C36.3195 43.4616 36.9526 43.4616 37.3431 43.0711L43.7071 36.7071ZM28 37H43V35H28V37Z"
                fill="white"
                />
                <defs>
                <filter
                    id="filter0_d_0_1"
                    x="7"
                    y="9"
                    width="58"
                    height="58"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                    />
                    <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_0_1"
                    />
                    <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_0_1"
                    result="shape"
                    />
                </filter>
                </defs>
            </svg>
            <CanvasSemiCircle value={value}/>
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
