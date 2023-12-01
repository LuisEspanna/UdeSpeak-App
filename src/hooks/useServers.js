import { useState } from 'react';
import { COLLECTIONS } from '../constants';
import { readFromFirestore } from '../services/firebase';
import { useEffect } from 'react';

const developMode = true;

export default function useServers() {
    const [isLoading, setIsLoading] = useState(false);
    const [servers, setServers] = useState([]);

    useEffect(() => {
        getServers();
    }, []);
    
    const getServers = async () => {
        setIsLoading(true);
        const snapshot = await readFromFirestore(COLLECTIONS.SERVERS);
        const myRes = [];

        snapshot.forEach(async (doc) => {
            const item = { ...doc.data() };
            item.id = doc.id;
            if(item?.env !== 'develop'){
                myRes.push(item);
            } 
            
            if(developMode && item?.env === 'develop'){
                myRes.push(item);
            }
        });

        setIsLoading(false);
        setServers(myRes);
    }

    return {
        isLoading,
        servers,
        setIsLoading
    };
}