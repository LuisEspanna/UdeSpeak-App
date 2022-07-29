import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { getDisplayName } from '../functions'

export default function CustomDrawer(props) {
    const user = useSelector((state) => state.user);

    return (
        <View style={styles.container}>
            <ImageBackground
                    source={require('../assets/drawerBg.png')}
                    style={styles.header}
                >
                    <View style={styles.userInfo}>
                        <Image source={{uri: user.photoURL}} style={styles.userImage}/>
                        <View>
                            <Text style={styles.name}>{getDisplayName(user)}</Text>
                            <Text style={styles.email}>{user.email}</Text>
                        </View>
                    </View>
            </ImageBackground>
            <DrawerContentScrollView {...props} contentContainerStyle={{padding: 0, margin:0}}>
                <DrawerItemList {...props} />
                <View>
                    <Text></Text>
                </View>                
            </DrawerContentScrollView>
            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3FAFF',
        flex: 1,
        padding: 0,
        margin: 0,
    },
    header:{
        height: 160,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 15,
    },
    userImage: {
        height: 72,
        width: 72,
        borderRadius: 37
    },
    name: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 8,
        marginBottom: 5
    },
    email:{
        color: '#FFF'
    },
    userInfo:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
        height: 73,
    }
});