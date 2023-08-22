import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import HamburgerIcon from './icons/HamburgerIcon';
import SearchIcon from './icons/SearchIcon';
import CloseIcon from './icons/CloseIcon';
import BackIcon from './icons/BackIcon';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';


/**
 * 
 * @param {object} props 
 * @param {object} props.navigation
 * @param {string} props.toPrevScreen
 * @param {object} props.routeParams
 * @returns 
 */
export default function NavBar({ navigation, title, handleSearch, toPrevScreen, routeParams }) {

  const [isSearching, setIsSearching] = useState(false);


  const onAction = () => {
    navigation.openDrawer();
  }

  const onSearchBtn = () => {
    setIsSearching(!isSearching);

    if(isSearching){
      handleSearch("");
    }
  }

  const handleChange = (text) => {
    handleSearch(text);
  }

  const handleBack = () => {
    navigation.navigate(toPrevScreen, {...routeParams, fromBack: true });
  }

  if (isSearching) {
    return (
      <View style={styles.searchContainer}>
        <TextInput placeholder='Search' style={styles.searchText}  onChangeText={handleChange}/>  
        <TouchableOpacity onPress={onSearchBtn} style={styles.closeBtn}>    
          <CloseIcon style={styles.closeIcon}/>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onAction} style={styles.hamburguerBtn}>
          <HamburgerIcon />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        {
          handleSearch ?
            <TouchableOpacity onPress={onSearchBtn} style={styles.searchBtn}>
              <SearchIcon />
            </TouchableOpacity> : <View style={styles.searchBtn}></View>
        }
        {
          toPrevScreen &&
            <TouchableOpacity onPress={handleBack} style={styles.searchBtn}>
              <BackIcon style={styles.backBtn}/>
            </TouchableOpacity>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    marginBottom: 15,
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
  },
  searchText: {
    borderRadius: 4,
    borderColor: '#cacaca',
    borderWidth: 1,
    padding: 5,
    flex: 3
  },
  searchContainer:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  closeBtn: {
    backgroundColor: '#FBE9E7',
    minWidth: 40,
    maxWidth: 40,
    marginLeft: 8,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    padding: 13,
    borderRadius: 5
  },
  closeIcon: {
    fill: '#D9491D', 
    stroke: '#D9491D'
  },
  backBtn: {
    width: 37,
    height: 37,
  }
})