import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import ArrowDown from "../../../components/icons/ArrowDown";
import ArrowUp from "../../../components/icons/ArrowUp";
import { toDateFormatShort } from '../../../functions';

export default function GroupItem({ item, handleItem, user }) {
    const [collapsed, setCollapsed] = useState(true);

    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const evalCoursed = (curItem) => {
        let found = false;
        user?.coursed?.groups?.forEach(item => {
            if(item === curItem.id)
                found = true;
        });
        return found;
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleItem}>
            <View style={styles.header}>
                <Text style={styles.title}>{item.name}</Text>
                <TouchableOpacity onPress={handleCollapsed} style={styles.arrowIcon}>
                    {!collapsed ? <ArrowUp /> : <ArrowDown />}
                </TouchableOpacity>
            </View>

            <Text style={styles.descriptionText}>{item.description}</Text>
            {!collapsed &&
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>Creado: {toDateFormatShort(item.created_at)}</Text>
                    <Text style={styles.dateText}>Última actualización : {toDateFormatShort(item.edited_at)}</Text>
                    {item.access_key && <Text style={styles.infoText}>Necesita clave de acceso</Text>}
                </View>
            }
            <Text style={styles.creatorText}>{item.displayName}</Text>
            {
                evalCoursed(item) && <View style={styles.coursedIndicator} />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 3,
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
        height: 'auto',
        padding: 20,
        position: 'relative'
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#0FB4B9',
        marginBottom: 15,
        flex: 10,
    },
    descriptionText: {
        fontSize: 15,
        color: '#626466'
    },
    creatorText: {
        fontWeight: 'bold',
        fontSize: 10,
        color: '#000000',
        marginTop: 16
    },
    dateText: {
        fontSize: 10,
        color: '#626466'
    },
    infoText: {
        color: '#0FB4B9',
        fontSize: 10,
    },
    dateContainer: {
        marginTop: 15,
    },
    arrowIcon: {
    },
    header: {
        flexDirection: 'row'
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