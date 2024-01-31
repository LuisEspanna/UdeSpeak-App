import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { getDisplayName } from '../../../functions'


export default function UserCard({ user }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {
                    (user.photoURL && typeof (user.photoURL) === 'string' && user.photoURL !== '' && user.photoURL !== 'null') ?
                        <Image source={{ uri: user.photoURL }} style={styles.userImage} /> :
                        <Image source={require('../../../assets/defaultUser.png')} style={styles.userImage} />
                }
            </View>
            <View style={styles.userDescription}>
                <Text style={styles.name}>{getDisplayName(user)}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '95%',
        height: 100,
        borderRadius: 10,
        shadowOffset: { width: -2, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 7,
        margin: 5,
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImage: {
        borderRadius: 40,
        width: 60,
        height: 60
    },
    userDescription: {
        flex: 3,
        justifyContent: 'center',
    },
    name: {
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 3,
        fontSize: 17
    },
    email: {
        color: '#84888B'
    }
})