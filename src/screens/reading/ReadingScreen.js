import { StyleSheet, Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import CustomDropdown from '../../components/CustomDropdown';
import ButtonOptionCheck from '../../components/ButtonOptionCheck';
import { useIsFocused } from "@react-navigation/native";
import ButtonVerify from '../../components/ButtonVerify';
import useUserAnswers from '../../hooks/useUserAnswers';
import useQuestionsHandler from '../../hooks/useQuestionsHandler';
import { QUESTIONS_TYPE } from '../../constants';


export default function ReadingScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [item, setItem] = useState(props.route.params.item)
    const isFocused = useIsFocused();
    const { questions, setQuestions, setCoursedQuestion, isQuestionCoursed, navigate } = useQuestionsHandler();

    const user = useSelector((state) => state.user);    
    const { validateReading, reset, isCorrect, correctAnswers } = useUserAnswers();

    const handleValidate = () => {
        validateReading(item.questions, userAnswers);
    }

    //console.log(props.route.params.questions)

    const handleNext = () => {
        setCoursedQuestion(item, props.route.params.ids);

        navigate(props.navigation, item, (next) => {
            if(next.type === QUESTIONS_TYPE.READING){
                reset();
                setItem(next);
            }
        });
    }

    useEffect(() => {
        if(isFocused){ 
            setUserAnswers({});
            // TODO: check if it was answered
            reset();
            setItem(props.route.params.item);
            setQuestions(props.route.params.questions);
        }
    }, [isFocused]);

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
        //console.log({...userAnswers, [option.parent]: option.id});
        setUserAnswers({...userAnswers, [option.parent]: option.id})
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar 
                navigation={props.navigation} 
                toPrevScreen='_questions' 
                routeParams={{...props.route.params, item: null}}
            />
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
                                        correctAnswers = {correctAnswers}
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
                                            <ButtonOptionCheck
                                                key={j}
                                                letter={o.letter}
                                                description={o.description}
                                                onPress={() => handleAnswer({...o, parent: q.id})}
                                                active={userAnswers[q.id] === o.id}
                                                correctAnswers = {correctAnswers}
                                                parent = {q.id}
                                            />
                                        )
                                    }
                                </View>
                            </View>)
                    }
                </View>
                <View style={{height: 40}}/>
            </ScrollView>
            <ButtonVerify 
                text={'verify'} 
                onPress={handleValidate}
                onNext={handleNext}
                showNextBtn={isCorrect}
            />
            <LoadingOverlay isLoading={isLoading} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F6FBFF',
        flex: 1,
        height: '100%',
    },
    scrollView: {
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 8,
        borderWidth:2,
        borderColor: '#e3e1e1',
        padding: 9,
    },
    description: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
        textTransform: 'capitalize'
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
        marginBottom: 5,
        textTransform: 'capitalize'
    }
})