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
        height: 8,
        width: 8,
        margin: 8,
        borderRadius:10
    },
    active: {
        backgroundColor: '#0FB4B9',
        height: 8,
        width: 16,
        margin: 8,
        borderRadius:10
    },
});

export default Indicator;
