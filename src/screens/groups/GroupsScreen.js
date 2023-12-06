import { StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useGroups from '../../hooks/useGroups';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar';
import GroupItem from './helper/GroupItem';
import useGenericSearch from '../../hooks/useGenericSearch';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useIsFocused } from "@react-navigation/native";
import KeyPrompt from './helper/KeyPrompt';
import { addKey } from '../../state/reducers/userSlice';
import useUsers from '../../hooks/useUsers';


export default function GroupsScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useGroups();
    const user = useSelector((state) => state.user);
    const {results, search, setItems} = useGenericSearch();
    const isFocused = useIsFocused();
    const [showPrompt, setShowPrompt] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const dispatch = useDispatch();
    const { editUserKeys } = useUsers();

    const handleItem = (item) => {
        let found = false;
        if(item?.access_key){
            user?.keys?.forEach((k)=>{
                if(k === item?.access_key){
                    found = true;
                    props.navigation.navigate('_questionnaries', { group_id: item.id, ids: {...props.route.params.ids, group: item.id} });
                }
            });

            if(!found){
                setShowPrompt(true);
                setCurrentItem(item);
            }
        }    
    }

    const handlePrompt = (key) => {
        setShowPrompt(false);
        
        if(key === currentItem?.access_key){
            dispatch(addKey(key));
            let  keys =  [];
            user?.keys?.forEach((k)=>{
                keys.push(k)
            });
            keys.push(key);
            editUserKeys(keys, user?.uid);
            props.navigation.navigate('_questionnaries', { group_id: currentItem.id, ids: {...props.route.params.ids, group: currentItem.id} });
        } else {
            Alert.alert('Error', 'Clave de grupo incorrecta', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }
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
        const items = await getAll(props.route.params.id_level);
        items.forEach((item) => { item.collapsed = true });
        setItems(items);
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
            <KeyPrompt isVisible={showPrompt} onHandle={handlePrompt}/>
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