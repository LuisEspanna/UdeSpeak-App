import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useGroups from '../../hooks/useGroups';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import GroupItem from './helper/GroupItem';
//import { getDisplayName } from '../../functions'

export default function GroupsScreen(props) {
    const [levels, setLevels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useGroups();
    const user = useSelector((state) => state.user);

    const handleGroup = (item) => {
        //props.navigation.navigate('_levels', { id_language: item.id });
        console.log(item)
    }

    useEffect(() => {

        async function fetchLevels() {
            setIsLoading(true);
            const localLevels = await getAll(props.route.params.id_level);
            localLevels.forEach((item) => { item.collapsed = true });
            setLevels(localLevels);
            setIsLoading(false);
        }
        fetchLevels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <NavBar navigation={props.navigation} title={'Grupos'} onSearch={() => console.log('Searching groups ...')}/>
            <ScrollView style={styles.scrollView}>
                {
                    levels.map((item, i) =>
                        <GroupItem item={item} key={i}/>                   
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
    scrollView: {
        marginTop: 50
    }
})