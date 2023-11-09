import { StyleSheet, Text, View, Animated, Easing, TouchableHighlight, Touchable } from 'react-native';
import React, { useRef, useState } from 'react';
import MicIcon from './icons/MicIcon';
import { useEffect } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';


const BgCircleAnimation = () => {
  const anim = useRef(new Animated.Value(0.7)).current;

  const runAnimation = (num) => {
    anim.setValue(num || 0.8);
    Animated.timing(anim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
          easing: Easing.bounce
    }).start(
        () => {
          anim.setValue(1);
          Animated.timing(anim, {
                toValue: 0.9,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.bounce
          }).start(
            ()=> {
              runAnimation(0.9)
            }
          )
        }
      )
  }

  useEffect(() => {
    runAnimation();
  }, [])

  const animData = anim.interpolate({
      inputRange: [0.8, 1],
      outputRange: [0.8, 1]
  });

  return (
      <Animated.View
          style={[styles.bgIcon, {
              transform: [{scaleX: animData}, {scaleY: animData}]
          }]}
      >
      </Animated.View>
  )
}

export default function RecordBtn({onStart, onFinish}) {
  const [run, setRun] = useState(false);

  const handlePress = () => {
    if(onStart){
      onStart();
    }
    setRun(true);
  }

  const handlePressOut = () => {
    if(onFinish){
      onFinish();
    }
    setRun(false);
  }

  return (
    <View style = {styles.container}>
      {
        run ? <BgCircleAnimation/> : <View style={styles.bgIconStatic}/>
      }      
      <TouchableWithoutFeedback onPressIn={handlePress} onPressOut={handlePressOut}>
        <MicIcon/>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    //backgroundColor: '#cacaca',
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    borderColor: '#0FB4B9',
    //borderWidth: 2,
    borderRadius: 100
  },
  bgIcon : {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#0fb4b92f',
  },
  bgIconStatic : {
    position: 'absolute',
    left: 4,
    right: 4,
    top: 4,
    bottom: 4,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#0fb4b9c9',
    //backgroundColor: '#0fb4b92f',
  }
});