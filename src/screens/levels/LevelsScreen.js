import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import useLevels from '../../hooks/useLevels';
import { useState } from 'react';

export default function SettingsScreen(props) {
    const [levels, setLevels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { getAll } = useLevels();

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
        <View>
            <Text>Levels screen :v
                {JSON.stringify(levels)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({})