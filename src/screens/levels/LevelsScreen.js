import { StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useLevels from '../../hooks/useLevels';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import useGenericSearch from '../../hooks/useGenericSearch';
import LoadingOverlay from '../../components/LoadingOverlay';

export default function LevelsScreen(props) {
    //const [levels, setLevels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useLevels();
    const user = useSelector((state) => state.user);
    const {results, search, setItems} = useGenericSearch();

    const handleLanguage = (item) => {
        props.navigation.navigate('_groups', { id_level: item.id, ids: {...props.route.params.ids, level: item.id} });
    }

    useEffect(() => {

        async function fetchLevels() {
            setIsLoading(true);
            const localLevels = await getAll(props.route.params.id_language);
            setItems(localLevels);
            setIsLoading(false);
        }
        fetchLevels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const evalCoursed = (curItem) => {
        let found = false;
        user?.coursed?.levels?.forEach(item => {
            if(item === curItem.id)
                found = true;
        });
        return found;
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar navigation={props.navigation} title={'Niveles'} handleSearch={(text) => search(text)}/>
            <ScrollView style={styles.scrollView}>
                {
                    results.map((item, i) =>
                        <TouchableOpacity key={i} style={styles.levelItem} onPress={() => handleLanguage(item)}>
                            <Text style={styles.levelTitle}>{item.title}</Text>
                            <Text style={styles.levelText}>{item.description}</Text>
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
    levelItem: {
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
        margin: 3
    },
    levelTitle: {
        height: 63,
        width: 63,
        fontSize: 46,
        fontWeight: 'bold',
        color: '#0FB4B9'
    },
    levelText: {
        marginLeft: 20,
        fontSize: 16,
        
    },
    scrollView: {
        marginTop: 50
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