import React from 'react';
import {TouchableOpacity, StyleSheet } from 'react-native';

export default function Button({children, onPress, style}) {
  return (
      <TouchableOpacity onPress={onPress} style={style ? style : styles.googleButton}>
        {children}
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    googleButton:{
        borderRadius:30,
        borderWidth:1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height:53,
        borderColor: '#B8BCBF',
        alignItems: 'center',
        width: '100%'
    }
});