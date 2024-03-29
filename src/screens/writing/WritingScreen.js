import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, Image, View, Animated } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import ButtonVerify from '../../components/ButtonVerify';
import useUserAnswers from '../../hooks/useUserAnswers';
import useQuestionsHandler from '../../hooks/useQuestionsHandler';
import { QUESTIONS_TYPE } from '../../constants';
import StudentInput from '../../components/StudentInput';
import useAudioControls from '../../hooks/useAudioControls';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AudioIcon from '../../components/icons/AudioIcon';
import SoundControls from '../../components/SoundControls';
import NavBar from '../../components/NavBar';
import useScroll from '../../hooks/useScroll';


export default function WritingScreen(props) {
    const [userAnswers, setUserAnswers] = useState({});
    const [item, setItem] = useState(props.route.params.item)
    const isFocused = useIsFocused();
    const { setQuestions, setCoursedQuestion, nextNavigate } = useQuestionsHandler();
    const { validateWriring, reset, isCorrect, correctAnswers } = useUserAnswers();
    const { showAudioCtrl, handleAudioButton } = useAudioControls();
    const { handleScrollStart, handleScrollEnd } = useScroll();

    const handleValidate = () => {
        validateWriring(item.questions, userAnswers);
    }

    const handleNext = () => {
        setCoursedQuestion(item, props.route.params.ids);

        nextNavigate(props.navigation, props.route.params, item, (next) => {
            if(next.type === QUESTIONS_TYPE.WRITING){
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
        setUserAnswers({...userAnswers, [option.parent]: option.value});
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar
                navigation={props.navigation}
                toPrevScreen='_questions'
                routeParams={{ ...props.route.params }}
                show={true}
            />
            {
                (showAudioCtrl && item?.audio) && <SoundControls url={item.audio}/>
            }           
            <Animated.ScrollView 
                style={styles.scrollView}              
                onScrollBeginDrag={handleScrollStart}
                onScrollEndDrag={handleScrollEnd}
            >
                <Text style={styles.title}>{item.title}</Text>
                {
                    (item?.audio) && 
                    <View style={styles.audioBtn}>
                        <TouchableOpacity onPress={handleAudioButton}>
                            <AudioIcon/>
                        </TouchableOpacity>
                    </View>
                }

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
                                    <StudentInput
                                        key={i}
                                        options={getOptions(word)}
                                        onChange={handleAnswer}
                                        correctAnswers={correctAnswers}
                                    />
                                );
                            } else {
                                return <Text key={i} style={styles.word}>{word}</Text>
                            }
                        })
                    }
                </View>
                <View style={{height: 40}}/>
            </Animated.ScrollView>
            <ButtonVerify 
                text={'verify'} 
                onPress={handleValidate}
                onNext={handleNext}
                showNextBtn={isCorrect}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'relative',
        padding: 0,
    },
    scrollView: {        
        borderRadius: 8,
        padding: 20,
        overflow: 'scroll',
        paddingTop: 0
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
        marginTop: 3,
        fontSize: 17,
        color: '#626466'
    },
    title: {
        fontSize: 23,
        marginBottom: 40,
        fontWeight: 'bold',
        color: '#626466'
    },
    questionsTitle: {
        marginTop: 20,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'justify',
        color: '#626466'
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
        backgroundColor: '#FFFFFF'
    },
    audioBtn:{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        flexDirection: 'row',
    }
})