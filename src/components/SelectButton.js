import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
//import { useEffect } from 'react';

export default function SelectButton({ data }) {
    const [active, setActive] = useState(false);
    const [currentOption, setcurrentOption] = useState(0);

    /*
    useEffect(() => {
      
    }, []);
    */
    

    return (
        <View style={styles.overlay}>
            <TouchableOpacity style={styles.button} onPress={()=>setActive(true)}>
                <Text>{data[currentOption]}</Text>
            </TouchableOpacity>
            {
                active && 

                <View style={styles.overlay}>
                    <TouchableOpacity onPress={()=> setActive(false)}>

                    </TouchableOpacity>
                </View>
            }
        </View>
    )   
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 'auto'
    }
});