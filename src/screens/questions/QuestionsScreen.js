import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useQuestions from '../../hooks/useQuestions';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import useGenericSearch from '../../hooks/useGenericSearch';

export default function QuestionsScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useQuestions();
    const user = useSelector((state) => state.user);
    const { results, search, setItems } = useGenericSearch();

    const handleItem = (item) => {
        // TODO: IFs cons tipos de questions
        //props.navigation.navigate('_questionnaries', { id_level: item.id });
        console.log('go to questions list...');
    }

    useEffect(() => {

        async function fetchLevels() {
            setIsLoading(true);
            const local = await getAll(props.route.params.questionnary_id);
            setItems(local);
            setIsLoading(false);
        }
        fetchLevels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <NavBar navigation={props.navigation} title={'Preguntas/Ejercicios'} handleSearch={(text) => search(text)}/>
            <ScrollView style={styles.scrollView}>
                {
                    results.map((item, i) =>
                        <TouchableOpacity key={i} style={styles.item} onPress={() => handleItem(item)}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemText}>{item.type}</Text>
                        </TouchableOpacity>
                    )
                }                
            </ScrollView>
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
    greeting: {
        color: '#313233',
        fontSize: 23,
    },
    name: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#313233'
    },
    title: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0FB4B9'
    },
    item: {
        margin: 3,
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
        borderRadius: 7,
        height: 'auto',
        padding: 20,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#0FB4B9'
    },
    itemText: {
        fontSize: 14,
        marginTop: 7,
        textTransform: 'capitalize'
    },
    scrollView: {
        marginTop: 50
    }
})