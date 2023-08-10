import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useQuestionnaries from '../../hooks/useQuestionnaries';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import useGenericSearch from '../../hooks/useGenericSearch';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useIsFocused } from "@react-navigation/native";

export default function QuestionnariesScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useQuestionnaries();
    const user = useSelector((state) => state.user);
    const { results, search, setItems } = useGenericSearch();
    const isFocused = useIsFocused();

    const handleItem = (item) => {
        props.navigation.navigate('_questions', { questionnary_id: item.id, ids: { ...props.route.params.ids, questionnary: item.id } });
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    const fetchData = async () => {
        setIsLoading(true);
        const localQuestionnaries = await getAll(props.route.params.group_id);
        setItems(localQuestionnaries);
        setIsLoading(false);
    }

    const evalCoursed = (curItem) => {
        let found = false;
        user?.coursed?.qestionnaries?.forEach(item => {
            if (item === curItem.id)
                found = true;
        });
        return found;
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar navigation={props.navigation} title={'Cuestionarios'} handleSearch={(text) => search(text)} />
            <ScrollView style={styles.scrollView}>
                {
                    results.map((item, i) =>
                        <TouchableOpacity key={i} style={styles.item} onPress={() => handleItem(item)}>
                            <Text style={styles.itemTitle}>{item.name}</Text>
                            <Text style={styles.itemText}>{item.description}</Text>
                            {
                                evalCoursed(item) && <View style={styles.coursedIndicator} />
                            }
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
            <LoadingOverlay isLoading={isLoading} />
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
        fontSize: 16,
        marginTop: 7
    },
    scrollView: {
        marginTop: 50
    },
    coursedIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0FB4B9',
        height: 5,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4
    }
})