import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { getDisplayName } from '../functions'
import DrawerButton from './DrawerButton';

import StarIcon from './icons/StarIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import UserIcon from './icons/UserIcon';
import SettingIcon from './icons/SettingIcon';
import AlertIcon from './icons/AlertIcon';
import HelpIcon from './icons/HelpIcon';


const icons = [
    <StarIcon/>,
    <BookmarkIcon/>,
    <UserIcon/>,
    <SettingIcon/>,
    <AlertIcon/>,
    <HelpIcon/>
];

export default function CustomDrawer(props) {
    const user = useSelector((state) => state.user);
    return (
        <View style={styles.container}>
            <ImageBackground
                    source={require('../assets/drawerBg.png')}
                    style={styles.header}
                >
                    <View style={styles.userInfo}>
                        {                        
                            user.photoURL && typeof(user.photoURL) === 'string' && user.photoURL !== ''? 
                            <Image source={{uri: user.photoURL}} style={styles.userImage}/> :
                            <Image source={require('../assets/defaultUser.png')} style={styles.userImage}/> 
                        }
                        <View style={{marginLeft: 13}}>
                            <Text style={styles.name}>{getDisplayName(user)}</Text>
                            <Text style={styles.email}>{user.email}</Text>
                        </View>
                    </View>
            </ImageBackground>
            <DrawerContentScrollView {...props} contentContainerStyle={{padding: 0, margin:0}}>
                {
                    props.state.routes.map((route, i) => 
                        <DrawerButton 
                            key = {i}
                            route = {route}
                            icons = {icons}
                            index = {i}
                            active = {props.state.index === i}
                            onPress = {() => props.navigation.navigate(route.name)}
                        />)
                }
            </DrawerContentScrollView>
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
        height: 63,
        width: 63,
        borderRadius: 37
    },
    name: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 8,
        marginBottom: 10
    },
    email:{
        color: '#FFF',
        fontSize: 11
    },
    userInfo:{
        flexDirection: 'row',
        alignContent: 'center',
        height: 73,
    }
});