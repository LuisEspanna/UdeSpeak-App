import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Button({children, onPress}) {
  return (
      <TouchableOpacity onPress={onPress} style={styles.googleButton}>
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