import { StyleSheet, Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import React from 'react';
import useQuestions from '../../hooks/useQuestions';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import SelectDropdown from 'react-native-select-dropdown'
import SelectButton from '../../components/SelectButton';


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

    const getSizeDropdown = (list) => {
        let size = 0

        list.forEach(item => {
            if (item.length > size) {
                size = item.length;
            }
        });

        return size * 15;
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar navigation={props.navigation} title={'Reading view in progress'} />
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>{item.title}</Text>


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
                                    buttonStyle={
                                        [styles.btnDropDown, {
                                            width: getSizeDropdown(getOptions(word).map( opt =>opt?.description ))
                                        }]
                                    }
                                    buttonTextStyle={styles.btnDropDownText}
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
        padding: 30,
        backgroundColor: '#F6FBFF',
        flex: 1,
        height: 1500,
    },
    scrollView: {
        marginTop: 50,
    },
    description : {
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    word : {
        marginEnd: 4,
        marginBottom: 6,
        fontSize: 16
    },
    btnDropDown:{
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#cacaca',
        marginStart: 5,
        height: 25,
        marginRight: 5
    },
    btnDropDownText: {
        fontSize: 16,
        color: '#717171',
    },
    title: {
        fontSize: 23,
        marginBottom: 30,
        fontWeight: 'bold'
    }
})