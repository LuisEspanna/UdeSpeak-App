import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image } from 'react-native';
import React from 'react';
import useLanguages from '../../../hooks/useLanguages';
import { useState, useEffect } from 'react';

export default function Language() {
  const { getAll } = useLanguages();
    const [languages, setLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {        
        async function fetchLanguages() {
            setIsLoading(true);
            const localLanguages = await getAll();
            setLanguages(localLanguages);
            setIsLoading(false);
        }
        fetchLanguages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <View style={styles.container}>
      {
        languages.map((item, i) =>
          <View key={i} style={styles.languageItem}>
            <Image source={{uri: item.image}} style={styles.languageImage}/>
            <Text style={styles.languageText}>{item.name}</Text>
          </View>
        )        
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      height: 'auto',
      position: 'relative',
      padding:2
  },
  languageItem:{
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop:10,
    marginBottom:10,
    borderRadius: 7,
    height: 100,
    padding:20,
    flexDirection: 'row',
    alignItems: 'center'

  },
  languageImage: {
    height: 63,
    width: 63,
    borderRadius: 37
  },
  languageText:{
    marginLeft:20,    
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0FB4B9'
  }
});