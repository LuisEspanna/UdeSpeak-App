import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import HamburgerIcon from './icons/HamburgerIcon';
import SearchIcon from './icons/SearchIcon';

export default function NavBar({navigation, title, onSearch}) {
  
  const onAction = () => {
    navigation.openDrawer();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAction} style={styles.hamburguerBtn}>
        <HamburgerIcon/>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {
        onSearch ?
        <TouchableOpacity onPress={onSearch} style={styles.searchBtn}>
          <SearchIcon/>
        </TouchableOpacity> : <View style={styles.searchBtn}></View>
      }      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        marginBottom:15,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#0FB4B9',
      textAlignVertical: 'bottom'
    },
    hamburguerBtn: {
    },
    searchBtn: {
      width: 35,
      height: 35
    }
})