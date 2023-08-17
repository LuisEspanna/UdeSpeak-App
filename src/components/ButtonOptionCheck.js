import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function ButtonOptionCheck({letter, description, active, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={active ? [styles.container, styles.active] : styles.container}>
            <Text style={styles.letter}>{letter}.</Text>
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
    }
})