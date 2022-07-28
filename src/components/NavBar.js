import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import HamburgerIcon from './icons/HamburgerIcon'

export default function NavBar({navigation}) {
  
  const onAction = () => {
    navigation.openDrawer();
  }

  return (
    <TouchableOpacity onPress={onAction}>
        <HamburgerIcon/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        flex: 1,
    }
})