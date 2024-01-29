import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function NewsCard({ title, description, image, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginTop: 10,
        marginBottom: 10,
        height: 200,
        flexDirection: 'row',
        alignItems: 'flex-end',
        position: 'relative',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 7
    },
    image: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        resizeMode: 'cover',
        width: '100%',
        
    },
    textContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        width: '95%',
        marginBottom: '2.5%'
    },
    title: {
        margin: 10,
        color: '#0FB4B9',
        fontWeight: 'bold'
    },
    description: {
        margin: 10,
        color: '#000000'
    }
})