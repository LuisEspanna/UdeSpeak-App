import React from 'react';
import { StyleSheet, View } from 'react-native';


function Indicator({active}) {
    return (
        <View style={ active ? styles.active : styles.inactive }/>
    )
}

const styles = StyleSheet.create({
    inactive: {
        backgroundColor: 'rgba(58, 160, 145, 0.5)',
        height: 5,
        width: 5,
        margin: 5,
        borderRadius:5
    },
    active: {
        backgroundColor: '#0FB4B9',
        height: 5,
        width: 10,
        margin: 5,
        borderRadius:5
    },
});

export default Indicator;
