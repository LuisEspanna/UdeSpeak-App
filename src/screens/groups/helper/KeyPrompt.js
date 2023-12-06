import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default function KeyPrompt({ isVisible, onHandle }) {
    const [value, setValue] = useState("");
    
    if(isVisible)
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setValue(text)}
                    value={value}
                />
                <TouchableOpacity 
                    onPress={() => onHandle(value)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Aceptar
                    </Text>
                </TouchableOpacity>
            </View>
        )
    else return null;
    } 

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#606060',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        alignItems: "center"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderRadius: 10,
        borderColor: "#FFFFFF",
        width: "70%"
    },
    button: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#32BFC3",
    },
    buttonText: {
        color: '#FFFFFF',
    },
});
