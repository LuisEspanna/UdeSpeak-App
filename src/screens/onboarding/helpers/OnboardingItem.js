import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


//const {width, height} = Dimensions.get('window');

export default function OnboardingItem({item, width}) {
    return (
        <View style={[styles.container, {width}]}>
         
            {item.image({style: styles.image})}
            
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        width: '70%'
    },
    title:{
        fontWeight: '700',
        fontSize: 23,
        marginBottom: 20,
        color: '#1F1F1F',
        textAlign: 'center', 
        marginHorizontal: 20,
        padding: 0,
        marginTop: 10
    },
    description:{
        fontWeight: '400',
        color: '#1F1F1F',
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 20,
    },
});
