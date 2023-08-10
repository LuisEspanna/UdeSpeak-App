import { StyleSheet, Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import React from 'react';
import useQuestions from '../../hooks/useQuestions';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import CustomDropdown from '../../components/CustomDropdown';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ReadingScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useQuestions();
    const user = useSelector((state) => state.user);
    const { item } = props.route.params;

    //console.log(item);

    const getOptions = (word) => {
        let options = [];
        if (item?.questions) {
            item?.questions?.forEach((q) => {
                if (q.title === word.replace('@', '')) {
                    options = q.options;
                }
            });
        }
        return options;
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
                                        data={getOptions(word).map((opt, j) => opt?.description)}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                        }}
                                    />
                                );
                            } else {
                                return <Text key={i} style={styles.word}>{word}</Text>
                            }
                        })
                    }
                </View>
                
                {
                    /*
                    <View style={styles.questions}>
                    {
                        item?.questions && item.questions.filter(q => q.type === 'question').map((q, i) =>
                            <View key={i}>
                                <Text>{q.title}</Text>

                                <View className='my-2'>
                                    {
                                        q?.options && q.options.map((o, j) =>
                                            <TouchableOpacity className='option' key={j}>
                                                <Text className='option-letter'>{o.letter}</Text>
                                                <Text>{o.description}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                            </View>)
                    }
                    </View>
                    */
                }
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
        flexWrap: 'wrap'
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
    questions: {

    }
})