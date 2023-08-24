import React, {useRef} from 'react';
import {TouchableOpacity, StyleSheet, Text, Animated, Easing } from 'react-native';
import ArrowRight from './icons/ArrowRight';
import { useEffect } from 'react';

export default function ButtonVerify({onPress, text, onNext, showNextBtn}) {
  const widthAnim = useRef(new Animated.Value(1)).current;

  const width = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });  

  if(showNextBtn){
    Animated.timing(
      widthAnim,
      {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing.bounce
      }
    ).start();
  }

  useEffect(() => {
    if(!showNextBtn){
      Animated.timing(
        widthAnim,
        {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.bounce
        }
      ).start();
    }
  }, [showNextBtn])
  

  const handlePress = () => {
    if(onPress){
      onPress();
    }
  }

  const animatedStyles = [
    styles.btn,
    {
        width,
    }
  ];

  return (
    <Animated.View style={animatedStyles}>
          <TouchableOpacity onPress={showNextBtn ? onNext : handlePress} style={styles.children}>
            {
              showNextBtn ? <ArrowRight/>
              : <Text style={styles.text}>{text}</Text>
            }
          </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    text:{
      color: '#FFFFFF',
      fontSize: 17,
      textTransform: 'capitalize',
      fontWeight: 'bold'
    },
    btn:{
      width: '100%',
      backgroundColor: '#32BFC3',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      height:50,
      alignItems: 'center',
      borderRadius: 25,
      minWidth: 50,
      alignSelf: 'flex-end'
    },
    children: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }
});