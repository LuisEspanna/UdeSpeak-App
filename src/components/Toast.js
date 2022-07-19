import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CloseIcon from './icons/CloseIcon'
import ToastInfoIcon from './icons/ToastInfoIcon'
import ToastSuccessIcon from './icons/ToastSuccessIcon'
import ToastWarningIcon from './icons/ToastWarningIcon'

const messageTypes = {
    'Error': {
        color: '#D9491D',
        icon: <CloseIcon style={{fill: '#fff', stroke: '#fff'}}/>
    },
    'Success': {
        color: '#2BDE3F',
        icon: <ToastSuccessIcon style={{fill: '#fff'}}/>
    },
    'Warning': {
        color: '#FFC007',
        icon: <ToastWarningIcon style={{fill: '#fff'}}/>
    },
    'Info': {
        color: '#1D72F3',
        icon: <ToastInfoIcon style={{fill: '#fff'}}/>
    }
}

export default function Toast({
    isVisible,
    message,
    type,
    value,
    onClose
}) {
    

    return (isVisible ?
        <View style={styles.container}>
            <View style={[styles.iconContainer, {backgroundColor: messageTypes[type].color}]}>
                {messageTypes[type].icon}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{type}</Text>
                <Text style={styles.description}>{message}</Text>
            </View>
            <TouchableOpacity style={styles.btnCloseIcon} onPress={onClose}>
                <CloseIcon style={[styles.closeIcon, {stroke: '#878787'}]} />
            </TouchableOpacity>
            <View style={[styles.loadbar, {width: `${value}%`}]}></View>
            <View style={[styles.indicator, {backgroundColor: messageTypes[type].color}]}/>
        </View> : null
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 8,
        left: 8,
        right: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingLeft: 5,
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    closeIcon:{
        width: 15,
        height: 15
    },
    loadbar:{
        width: '100%',
        backgroundColor: '#D4D4D4',
        height: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    indicator:{
        height: 85,
        backgroundColor: '#FFC007',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        position: 'absolute',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    iconContainer:{
        width: 25,
        height: 25,
        margin: 20,
        borderRadius: 50,
        padding: 5
    },
    textContainer: {
        width: '75%'
    },
    title: {
        fontWeight: 'bold',
        color: '#3E3E3E',
        marginBottom: 4
    },
    description:{
        color: '#878787',
        textAlign: 'left',
    }
})