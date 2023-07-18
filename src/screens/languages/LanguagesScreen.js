import { StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useLanguages from '../../hooks/useLanguages';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';

export default function LanguageScreen(props) {
    const [languages, setLevels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useLanguages();
    const user = useSelector((state) => state.user);

    const handleLanguage = (item) => {
        props.navigation.navigate('_levels', { id_language: item.id });
        //console.log(item)
    }

    useEffect(() => {

        async function fetchLevels() {
            setIsLoading(true);
            const localLanguages = await getAll();
            setLevels(localLanguages);
            setIsLoading(false);
        }
        fetchLevels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <NavBar navigation={props.navigation} title={'Idiomas'} onSearch={() => console.log('Searching languages ...')}/>
            <ScrollView style={styles.scrollView}>
                {
                    languages.map((item, i) =>
                    <TouchableOpacity key={i} style={styles.languageItem} onPress={() => handleLanguage(item)}>
                      <Image source={{ uri: item.image }} style={styles.languageImage} />
                      <Text style={styles.languageText}>{item.name}</Text>
                    </TouchableOpacity>
                    )
                }                
            </ScrollView>
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
    languageItem: {
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
        height: 100,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center'
    
      },
      languageImage: {
        height: 63,
        width: 63,
        borderRadius: 37
      },
      languageText: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0FB4B9'
      },
      scrollView: {
          marginTop: 50
      }

})