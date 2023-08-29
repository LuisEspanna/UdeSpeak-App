import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function ButtonOptionCheck({letter, description, active, onPress, correctAnswers, parent}) {
    const [isCorrect, setIsCorrect] = useState(true);

    useEffect(() => {
        if(correctAnswers !== null &&!correctAnswers[parent]){
            setIsCorrect(false);
        } else {
            setIsCorrect(true);
        }
    }, [correctAnswers]);

  return (
    <TouchableOpacity onPress={onPress}>
        <View style={ active ? [styles.container, styles.active, (!isCorrect && styles.wContainer)] : styles.container}>
            <Text style={!isCorrect && active ? styles.wLetter : styles.letter}>{letter}.</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    letter:{
        width: 'auto',
        color: '#32BFC3',
        fontWeight: 'bold',
        marginRight: 15,
        fontSize: 16
    },
    description: {
        fontSize: 16,
        textTransform: 'capitalize'
    },
    container: {
        width: '100%',
        flexDirection:'row', 
        flexWrap:'nowrap',
        height: 45,
        marginTop: 4,
        flex: 1,
        alignItems: 'center',
        paddingLeft: 20
    },
    active: {
        backgroundColor: '#D8F3F4',        
        borderRadius: 10,
    },
    wLetter:{
        width: 'auto',
        color: '#D9491D',
        fontWeight: 'bold',
        marginRight: 15,
        fontSize: 16
    },
    wDescription: {
        fontSize: 16,
        textTransform: 'capitalize'
    },
    wContainer: {
        width: '100%',
        flexDirection:'row', 
        flexWrap:'nowrap',
        height: 45,
        marginTop: 4,
        flex: 1,
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: '#FBE9E7', 
    }
})