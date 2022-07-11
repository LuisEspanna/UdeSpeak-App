import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


const {width, height} = Dimensions.get('window');

export default function OnboardingItem({item}) {

    return (
        <View style={styles.container}>
         
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
        flex: 1,
        alignItems: 'center',
        width,
        justifyContent: 'center'
    },
    image:{
        width: '70%'
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
});
