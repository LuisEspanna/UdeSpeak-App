import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useQuestions from '../../hooks/useQuestions';
import { useState } from 'react';
import NavBar from '../../components/NavBar';
import useGenericSearch from '../../hooks/useGenericSearch';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useIsFocused } from "@react-navigation/native";
import useQuestionsHandler from '../../hooks/useQuestionsHandler';
import useToast from '../../hooks/useToast';
import Toast from '../../components/Toast';

export default function QuestionsScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useQuestions();
    const { results, search, setItems } = useGenericSearch();
    const isFocused = useIsFocused();
    const toastProps = useToast();
    const { setQuestions, isQuestionCoursed, navigate } = useQuestionsHandler(toastProps);

    const handleItem = (item) => {
        navigate(props.navigation, props.route.params, item);
    }

    useEffect(() => {
        if (isFocused) {
            if (!props?.route?.params?.fromBack) {
                fetchData();
            }
        }
    }, [isFocused]);

    const fetchData = async () => {
        setIsLoading(true);
        const local = await getAll(props.route.params.questionnary_id);
        setItems(local);
        setQuestions(local.filter(q => !isQuestionCoursed(q)));
        setIsLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar
                navigation={props.navigation}
                title={'Preguntas/Ejercicios'}
                handleSearch={(text) => search(text)}
                toPrevScreen='_questionnaries'
                routeParams={{ ...props.route.params, questionnary_id: null }}
                show={true}
            />
            <ScrollView style={styles.scrollView}>
                {
                    results.filter(p => !isQuestionCoursed(p)).map((item, i) =>
                        <TouchableOpacity key={i} style={styles.item} onPress={() => handleItem(item)}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemText}>{item.type}</Text>
                        </TouchableOpacity>
                    )
                }

                {
                    results.filter(p => isQuestionCoursed(p)).map((item, i) =>
                        <View key={i}>
                            {
                                i === 0 &&
                                <View style={styles.separatorCard}>
                                    <Text style={styles.separatorText}>Ejercicios realizados</Text>
                                </View>
                            }
                            <TouchableOpacity  style={styles.item} onPress={() => handleItem(item)}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemText}>{item.type}</Text>
                                <View style={styles.coursedIndicator} />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </ScrollView>
            <Toast {...toastProps} />
            <LoadingOverlay isLoading={isLoading} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
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
        textTransform: 'capitalize',
        color: '#626466'
    },
    scrollView: {
        padding: 20,
        paddingTop: 0
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
    },
    separatorCard: {
        width: '100%',
        backgroundColor: '#0FB4B9',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: 30,
        marginBottom: 10
    },
    separatorText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold'
    }
})