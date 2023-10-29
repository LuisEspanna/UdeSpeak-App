import { StyleSheet, Text, ScrollView, SafeAreaView, Image, View, Dimensions } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import CustomDropdown from '../../components/CustomDropdown';
import ButtonOptionCheck from '../../components/ButtonOptionCheck';
import { useIsFocused } from "@react-navigation/native";
import ButtonVerify from '../../components/ButtonVerify';
import useUserAnswers from '../../hooks/useUserAnswers';
import useQuestionsHandler from '../../hooks/useQuestionsHandler';
import { QUESTIONS_TYPE } from '../../constants';
import { getLetter } from '../../functions';


const windowWidth = Dimensions.get('window').width;

export default function ReadingScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [item, setItem] = useState(props.route.params.item)
    const isFocused = useIsFocused();
    const { setQuestions, setCoursedQuestion, nextNavigate } = useQuestionsHandler();
    const { validateReading, reset, isCorrect, correctAnswers } = useUserAnswers();


    const handleValidate = () => {
        validateReading(item.questions, userAnswers);
    }

    const handleNext = () => {
        
        setCoursedQuestion(item, props.route.params.ids);

        nextNavigate(props.navigation, props.route.params, item, (next) => {
            if(next.type === QUESTIONS_TYPE.READING){
                reset();
                setItem(next);
            }
        });
    }

    useEffect(() => {
        if(isFocused){ 
            setUserAnswers({});
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
        setUserAnswers({...userAnswers, [option.parent]: option.id});
        if(!isCorrect){
            reset();
        }
    }

    return (
        <SafeAreaView style={styles.container}>           
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>{item.title}</Text>
                {
                    item?.image && 
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.image }} style={styles.image}/>
                    </View>
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
                                                letter={getLetter(j)}
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
        backgroundColor: '#FFFFFF',
        flex: 1,
        height: '100%',
    },
    scrollView: {
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 8,
        padding: 6,
        overflow: 'scroll'
    },
    description: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
        textTransform: 'capitalize',
        textAlign: 'justify',
        color: '#212529',
    },
    word: {
        marginEnd: 4,
        marginBottom: 6,
        fontSize: 17
    },
    title: {
        fontSize: 23,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    questionsTitle: {
        marginTop: 20,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'justify'
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
    },

    imageContainer: {
        height: 250,
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
    }
})