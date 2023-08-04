import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useQuestions from '../../hooks/useQuestions';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import LoadingOverlay from '../../components/LoadingOverlay';


export default function ReadingScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useQuestions();
    const user = useSelector((state) => state.user);
    const {item} = props.route.params;

    console.log(item);

    return (
        <SafeAreaView style={styles.container}>
            <NavBar navigation={props.navigation} title={'Reading view in progress'}/>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.itemText}>{JSON.stringify(item)}</Text>  
                {                    
                    /*
                    <Text style={styles.itemText}>{item.type}</Text>         
                    */
                }
                  
            </ScrollView>
            <LoadingOverlay isLoading={isLoading}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#F6FBFF',
        flex: 1,
        height: 1500,
        position: 'relative'
    },
    scrollView: {
        marginTop: 50
    },
})