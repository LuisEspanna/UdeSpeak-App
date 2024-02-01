import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { getDisplayName } from '../../functions'
import NavBar from '../../components/NavBar';
import SectionLanguages from './sections/SectionLanguages';
import SectionNews from './sections/SectionNews';
import SectionProgress from './sections/SectionProgress';

export default function HomeScreen({navigation}) {
    const user = useSelector((state) => state.user);

    return (
        <SafeAreaView style={styles.container}>
            <NavBar navigation={navigation} show={true}/>
            <ScrollView style={styles.scrollView}>
                <View style={{marginTop: 0, marginBottom: 20}}>
                    <Text style={styles.greeting}>Hola,</Text>
                    <Text style={styles.name}>{getDisplayName(user)}</Text>
                    <Text style={styles.title}>Explora los cursos disponibles</Text>
                </View>

                <SectionLanguages navigation={navigation} />
                <SectionNews/>
                <SectionProgress questions={user?.coursed?.questions}/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 0,
        backgroundColor: '#F6FBFF',
        flex: 1,
        height: 1500,
        position: 'relative'
    },
    greeting : {
        color: '#313233',
        fontSize: 23,
    },
    name: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#313233'
    },
    title:{
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0FB4B9'
    },
    scrollView: {
        padding: 15,
    }
});