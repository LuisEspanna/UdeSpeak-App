import { useState } from 'react';
import { COLLECTIONS } from '../constants';
import { readFromFirestore } from '../services/firebase';
import { useEffect } from 'react';
import config from '../../config'

const developMode = config().appConfig === config().DEBUG;

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

        snapshot.forEach((doc) => {
            const item = { ...doc.data() };
            item.id = doc.id;

            if (developMode && item?.env === 'develop' && item?.status === 'online') {
                myRes.push(item);
            }

            if (item?.env !== 'develop' && item?.status === 'online') {
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