import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import BookAsset from '../assets/BookAsset';
import HearAsset from '../assets/HearAsset';
import MicAsset from '../assets/MicAsset';
import PencilAsset from '../assets/PencilAsset';

export default function SectionProgress({questions}) {

    const [slides, setSlides] = useState([]);

    useEffect(() => {
        var counter = {
            'speaking': 0,
            'listening': 0,
            'reading': 0,
            'writing': 0
        }

        for (const key in questions) {
            if (Object.hasOwnProperty.call(questions, key)) {
                const question = questions[key];
                counter[question.type] = counter[question.type] + 1;
            }
        }

        var temList = [
            {
                value: counter.speaking,
                name: 'Speaking',
                id: 0,
                icon: <MicAsset style={styles.icon}/>
            },
            {
                value: counter.listening,
                name: 'Listening',
                id: 1,
                icon: <HearAsset style={styles.icon}/>
            },
            {
                value: counter.reading,
                name: 'Reading',
                id: 2,
                icon: <BookAsset style={styles.icon}/>
            },
            {
                value: counter.writing,
                name: 'Writing',
                id: 3,
                icon: <PencilAsset style={styles.icon}/>
            },
        ]

        setSlides(temList);
    }, [])
    

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Tu progreso</Text>
           <FlatList
                keyExtractor={(item) => item.id}
                data={slides}
                horizontal
                renderItem={({item}) => 
                <View style={styles.itemContainer}>
                    <Text style={styles.value}>{item.value}</Text>
                    <Text style={styles.description}>{item.name}</Text>
                    { item.icon }
                </View>}
            />            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 155,
        backgroundColor: '#F6FBFF',
        borderRadius: 7,
        marginTop: 20,
        marginBottom: 20,
        alignContent: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    itemContainer: {
        backgroundColor: '#FFFFFF',
        height: 90,
        width: 150,
        margin: 10,
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        padding: 20,
        position: 'relative'
    },
    value: {
        color: '#6C6C6C',
        fontWeight: 'bold',
        fontSize: 15
    },
    description: {
        color: '#6C6C6C',
        fontSize: 14
    },
    sectionTitle:{
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0FB4B9',
        marginLeft: 5
    },
    icon:{
        position: 'absolute',
        right: 10
    }
})