import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DrawerButton({onPress, route, icons, index, active}) {
  return (
    <TouchableOpacity onPress={onPress} style={active ? [styles.container, styles.btnActive] : styles.container}>
        <View style={styles.icon}>
            { icons[index] }
        </View>
        <Text>{route.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container : {
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20
    },
    icon: {
        marginRight: 20
    },
    btnActive:{
        backgroundColor: '#E9F1F7'
    }
})