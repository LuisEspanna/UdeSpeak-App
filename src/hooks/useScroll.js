import { useState } from 'react';
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export default function useScrollDown() {
    const [isScrollDown, setIsScrollDown] = useState(true);
    const [value, setValue] = useState(0);
    
    const handleScrollStart = (e) => {
        setValue(e.nativeEvent.contentOffset.y);
    };

    const handleScrollEnd = (e) => {
        setValue(e.nativeEvent.contentOffset.y);
        if(value > e.nativeEvent.contentOffset.y){
            //Scroll Up
            setIsScrollDown(true);
        } else {
            //Scroll Down
            setIsScrollDown(false);
        }
    };

    return {
        isScrollDown,
        handleScrollStart,
        handleScrollEnd
    }
}