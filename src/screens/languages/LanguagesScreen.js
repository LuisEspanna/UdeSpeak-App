import { StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useLanguages from '../../hooks/useLanguages';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import useGenericSearch from '../../hooks/useGenericSearch';
import { useIsFocused } from '@react-navigation/native';

export default function LanguageScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useLanguages();
    const user = useSelector((state) => state.user);
    const { results, search, setItems } = useGenericSearch();
    const isFocused = useIsFocused();

    const handleLanguage = (item) => {
        props.navigation.navigate('_levels', { id_language: item.id, ids: {language: item.id} });
    }

    useEffect(() => {
        if(isFocused){ 
            if(!props?.route?.params?.fromBack || results.length === 0){
                fetchLanguages();
            }
        }
    }, [isFocused]);

    const fetchLanguages = async() => {
        setIsLoading(true);
        const localLanguages = await getAll();
        setItems(localLanguages);
        setIsLoading(false);
    }

    const evalCoursed = (curItem) => {
        let found = false;
        user?.coursed?.languages?.forEach(item => {
            if(item === curItem.id)
                found = true;
        });
        return found;
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar
                navigation={props.navigation} 
                title={'Idiomas'} handleSearch={(text) => search(text)}
                toPrevScreen='Inicio'
                routeParams={{...props.route.params}}
                show={true}
            />
            <ScrollView style={styles.scrollView}>
                {
                    results.map((item, i) =>
                    <TouchableOpacity key={i} style={styles.languageItem} onPress={() => handleLanguage(item)}>
                      <Image source={{ uri: item.image }} style={styles.languageImage} />
                      <Text style={styles.languageText}>{item.name}</Text>
                      {
                        evalCoursed(item) && <View style={styles.coursedIndicator}/>
                      }
                    </TouchableOpacity>
                    )
                }                
            </ScrollView>
            <LoadingOverlay isLoading={isLoading}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
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
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2
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
          padding: 15,
          paddingTop: 0
      },
      coursedIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0FB4B9',
        height: 5,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4
      }
})