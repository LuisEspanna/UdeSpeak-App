import { ScrollView, StyleSheet, View, Image } from 'react-native'
import React from 'react'
import NavBar from '../../components/NavBar'
import { useSelector } from 'react-redux'
import UserCard from './helper/UserCard'
import CDonutChart from './helper/CDonutChart'

export default function AccountScreen(props) {
    const user = useSelector((state) => state.user)

    return (
        <View style={styles.container}>
            <NavBar
                navigation={props.navigation}
                title={'Mi Cuenta'}
                show={true}
            />
            <ScrollView style={styles.scrollView}>
                <UserCard user={user}/>
                {
                    user?.coursed && <CDonutChart coursed={user?.coursed}/>
                }                
            </ScrollView> 
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        padding: 10
    },
    container: {
        padding: 0,
        backgroundColor: '#FFFFFF',
        flex: 1,
        height: 1500,
        position: 'relative',
        height: '50%'
    },
})