import { StyleSheet, View, Appearance, Text, ScrollView } from 'react-native';
import React from 'react';
import Markdown from 'react-native-markdown-display';
import { useState } from 'react';
import NavBar from '../../components/NavBar';

const theme = Appearance.getColorScheme();

export default function NoteScreen(props) {
    const [item] = useState(props.route.params.item);

    return (
        <View style={styles.container}>
            <NavBar
                navigation={props.navigation}
                toPrevScreen='_questions'
                routeParams={{ ...props.route.params }}
                show={true}
            />
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>
                    {item.title}
                </Text>
                <Markdown>
                    {item?.description}
                </Markdown>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme === 'dark' ? '#303841' : '#FFFFFF',
        flex: 1,
    },
    title: {
        color: theme === 'dark' ? '#FFFFFF' : '#4D4D4D',
        fontWeight: 'bold',
        fontSize: 32,
        marginBottom: 11
    },
    scrollView: {
        flex: 1,
        padding: 23,
        paddingTop: 2,
    }
})