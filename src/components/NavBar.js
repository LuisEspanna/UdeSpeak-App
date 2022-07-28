import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import HamburguerIcon from './icons/HamburguerIcon'

export default function NavBar() {
  return (
    <TouchableOpacity>
        <HamburguerIcon/>
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