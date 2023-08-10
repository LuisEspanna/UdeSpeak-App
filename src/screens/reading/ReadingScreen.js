import { StyleSheet, Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import React from 'react';
import useQuestions from '../../hooks/useQuestions';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import CustomDropdown from '../../components/CustomDropdown';
import ButtonOptionCheck from '../../components/ButtonOptionCheck';


export default function ReadingScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useQuestions();
    const user = useSelector((state) => state.user);
    const { item } = props.route.params;
    const [userAnswers, setUserAnswers] = useState({});

    //console.log(item);

    const getOptions = (word) => {
        let options = [];
        if (item?.questions) {
            item?.questions?.forEach((q) => {
                if (q.title === word.replace('@', '')) {
                    options = q.options;
                    options = options.map(op => {return {...op, parent: q.id}});
                }
            });
        }
        return options;
    }

    const handleAnswer = (option) => {
        // TODO: implementar para preguntas tambien (actualmente funciona para dropdowns)
        console.log({...userAnswers, [option.parent]: option.id});
        setUserAnswers({...userAnswers, [option.parent]: option.id})
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar navigation={props.navigation} title={'Reading view in progress'} />
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>{item.title}</Text>
                {
                    item.image && <Image source={{ uri: item.image }} />
                }

                <View style={styles.description}>
                    {
                        item?.description && item?.description?.split(' ').map((word, i) => {
                            if (word.includes('@')) {
                                return (
                                    <CustomDropdown
                                        key={i}
                                        data={getOptions(word)}
                                        onSelect={(selectedItem) => {
                                            handleAnswer(selectedItem);
                                        }}
                                        buttonTextAfterSelection={(selectedItem) => {
                                            return selectedItem.description;
                                        }}
                                        rowTextForSelection={(item) => {
                                            return item.description;
                                        }}
                                    />
                                );
                            } else {
                                return <Text key={i} style={styles.word}>{word}</Text>
                            }
                        })
                    }
                </View>

                <View style={styles.questions}>
                    {
                        item?.questions && item.questions.filter(q => q.type === 'question').map((q, i) =>
                            <View key={i}>
                                <Text style={styles.questionsTitle}>{q.title}</Text>

                                <View className='my-2'>
                                    {
                                        q?.options && q.options.map((o, j) =>
                                            <ButtonOptionCheck key={j} letter={o.letter} description={o.description}/>
                                        )
                                    }
                                </View>                                
                            </View>)
                    }
                </View>
            </ScrollView>
            <LoadingOverlay isLoading={isLoading} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#F6FBFF',
        flex: 1,
        height: 1500,
    },
    scrollView: {
        marginTop: 50,
    },
    description: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10
    },
    word: {
        marginEnd: 4,
        marginBottom: 6,
        fontSize: 16
    },
    title: {
        fontSize: 23,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    questionsTitle: {
        marginTop: 20,
        marginBottom: 5
    }
})