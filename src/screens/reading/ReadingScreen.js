import { StyleSheet, Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import React from 'react';
import useQuestions from '../../hooks/useQuestions';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import SelectDropdown from 'react-native-select-dropdown'


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
                <Text>{item.title}</Text>


                <Image source={{ uri: item.image }} />
                
            
                <View style={styles.description}>
                {
                    item?.description && item?.description?.split(' ').map((word, i) => {
                        if (word.includes('@')) {
                            return (
                                <SelectDropdown
                                    key={i}
                                    data={getOptions(word).map( (opt, j) =>opt?.description )}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                            );
                        } else {
                            return <Text key={i} style={styles.word}>{word}</Text>
                        }
                    })
                }
                </View>               

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
    scrollView: {
        marginTop: 50
    },
    description : {
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    word : {
        marginEnd: 4
    }
})