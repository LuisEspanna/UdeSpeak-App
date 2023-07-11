import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useLevels from '../../hooks/useLevels';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import { getDisplayName } from '../../functions'

export default function LevelsScreen(props) {
    const [levels, setLevels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useLevels();
    const user = useSelector((state) => state.user);

    const handleLanguage = (item) => {
        //props.navigation.navigate('_levels', { id_language: item.id });
        console.log(item)
    }

    useEffect(() => {

        async function fetchLevels() {
            setIsLoading(true);
            const localLevels = await getAll(props.route.params.id_language);
            setLevels(localLevels);
            setIsLoading(false);
        }
        fetchLevels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <NavBar navigation={props.navigation} />
            <ScrollView>
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Text style={styles.greeting}>Hello,</Text>
                    <Text style={styles.name}>{getDisplayName(user)}</Text>
                    <Text style={styles.title}>Explore your course</Text>
                </View>

                {
                    levels.map((item, i) =>
                        <TouchableOpacity key={i} style={styles.levelItem} onPress={() => handleLanguage(item)}>
                            <Text style={styles.levelTitle}>{item.title}</Text>
                            <Text style={styles.levelText}>{item.description}</Text>
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
        alignItems: 'center'    
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
        
    }
})