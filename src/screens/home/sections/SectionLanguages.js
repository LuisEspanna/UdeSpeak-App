import { View, Text } from 'react-native';
import React from 'react';
import useLanguages from '../../../hooks/useLanguages';
import { useState, useEffect } from 'react';

export default function Language() {
  const { getAll } = useLanguages();
    const [languages, setLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {        
        async function fetchLanguages() {
            setIsLoading(true);
            const localLanguages = await getAll();
            setLanguages(localLanguages);
            setIsLoading(false);
        }
        fetchLanguages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <View>
      {
        languages.map((item, i) =>
          <View key={i}>
            <Text>{item.name}</Text>
          </View>
        )        
      }
    </View>
  )
}