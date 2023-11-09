import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import ButtonVerify from '../../components/ButtonVerify';
import useUserAnswers from '../../hooks/useUserAnswers';
import useQuestionsHandler from '../../hooks/useQuestionsHandler';
import { QUESTIONS_TYPE } from '../../constants';
import SoundControls from '../../components/SoundControls';
import useAudioControls from '../../hooks/useAudioControls';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AudioIcon from '../../components/icons/AudioIcon';
import RecordBtn from '../../components/RecordBtn';

export default function ListeningScreen(props) {
    const [userAnswers, setUserAnswers] = useState({});
    const [item, setItem] = useState(props.route.params.item)
    const isFocused = useIsFocused();
    const { setQuestions, setCoursedQuestion, nextNavigate } = useQuestionsHandler();
    const { validateStandard, reset, isCorrect, correctAnswers } = useUserAnswers();
    const { showAudioCtrl, handleAudioButton } = useAudioControls();

    const handleValidate = () => {
        //validateStandard(item.questions, userAnswers);
    }

    const handleNext = () => {
        setCoursedQuestion(item, props.route.params.ids);

        nextNavigate(props.navigation, props.route.params, item, (next) => {
            if (next.type === QUESTIONS_TYPE.LISTENING) {
                reset();
                setItem(next);
            }
        });
    }

    //console.log(item)

    useEffect(() => {
        if (isFocused) {
            setUserAnswers({});
            reset();
            setItem(props.route.params.item);
            setQuestions(props.route.params.questions);
        }
    }, [isFocused]);


    const handleAnswer = (option) => {
        setUserAnswers({ ...userAnswers, [option.parent]: option.id });
        if (!isCorrect) {
            reset();
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                showAudioCtrl && <SoundControls url={item.audio} />
            }

            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>{item.title}</Text>
                {
                    item?.image &&
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                }
                <View style={styles.subcontainer}>
                    {
                        item?.audio &&
                        <View style={styles.audioBtn}>
                            <TouchableOpacity onPress={handleAudioButton}>
                                <AudioIcon />
                            </TouchableOpacity>
                        </View>
                    }
                    <Text style={styles.description}>
                        {item?.description}
                    </Text>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
            <View style={styles.actionArea}>
                {
                    !isCorrect ? <RecordBtn/> : 
                    <ButtonVerify
                        text={'verify'}
                        onPress={handleValidate}
                        onNext={handleNext}
                        showNextBtn={isCorrect}
                    />
                }

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'relative'
    },
    scrollView: {
        marginTop: 5,
        borderRadius: 8,
        padding: 26,
        overflow: 'scroll',
    },
    description: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 0,
        textAlign: 'center',
        color: '#4C4C4C',
        alignItems: 'center',
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: 18,
        maxWidth: '80%'
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
        height: 330,
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
        backgroundColor: '#FFFFFF'
    },
    actionArea: {
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    audioBtn: {
        marginRight: 10
    },
    subcontainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    }
})