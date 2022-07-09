import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import HeaderIcon from "./icons/HeaderIcon";

export default function OnboardingItem({item}) {

    const {width} = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            <View style={styles.header}>
                <HeaderIcon/>
            </View>
            <View>
                {item.image}
            </View>
            
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  image: {
      flex: 0.7,
      justifyContent: 'center'
  },
  title:{
      fontWeight: '700',
      fontSize: '1.25em',
      marginBottom: '0.75em',
      color: '#1F1F1F',
      textAlign: 'center', 
      marginHorizontal: '2em',
      padding: 0,
      marginTop: '1.063em'
  },
  description:{
    fontWeight: '400',
    color: '##1F1F1F',
    textAlign: 'center',
    fontSize: '0.875em',
    marginHorizontal: '2.75em',
  },
  header: {
      alignSelf: 'flex-start'
  }
});
