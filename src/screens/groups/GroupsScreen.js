import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useGroups from '../../hooks/useGroups';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import GroupItem from './helper/GroupItem';
import useGenericSearch from '../../hooks/useGenericSearch';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useIsFocused } from "@react-navigation/native";

export default function GroupsScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useGroups();
    const user = useSelector((state) => state.user);
    const {results, search, setItems} = useGenericSearch();
    const isFocused = useIsFocused();

    const handleItem = (item) => {
        props.navigation.navigate('_questionnaries', { group_id: item.id, ids: {...props.route.params.ids, group: item.id} });
    }

    useEffect(() => {
        if(isFocused){
            if(!props?.route?.params?.fromBack){
                fetchGroups();
            }
        }
    }, [isFocused]);

    const fetchGroups = async() => {
        setIsLoading(true);
        const localLevels = await getAll(props.route.params.id_level);
        localLevels.forEach((item) => { item.collapsed = true });
        setItems(localLevels);
        setIsLoading(false);
    }

    // TODO: Show coursed

    return (
        <SafeAreaView style={styles.container}>
            <NavBar
                navigation={props.navigation} 
                title={'Grupos'} 
                handleSearch={(text) => search(text)}
                toPrevScreen='_levels'
                routeParams={{...props.route.params, id_level: null}}
            />
            <ScrollView style={styles.scrollView}>
                {
                    results.map((item, i) =>
                        <GroupItem item={item} key={i} handleItem={()=>handleItem(item)} user={user}/>                   
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
    scrollView: {
        marginTop: 50
    }
})