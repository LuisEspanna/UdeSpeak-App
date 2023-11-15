import { useState } from 'react';
import { COLLECTIONS } from '../constants';
import { readFromFirestore } from '../services/firebase';


export default function useServers() {

    const [serverOnline, setServerOnline] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const getServers = async () => {
        setIsLoading(true);
        const snapshot = await readFromFirestore(COLLECTIONS.SERVERS);
        const myRes = [];

        snapshot.forEach(async (doc) => {
            const item = { ...doc.data() };
            item.id = doc.id;
            myRes.push(item);
        });

        for (let i = 0; i < myRes.length; i++) {
            const server = myRes[i];
            
            try {
                const response = await fetch(
                    server?.url,
                );
                const json = await response.json();
                item.status = json?.status;
                console.log('Server:', json);
                setServerOnline(server?.url);
                setIsLoading(false);
                break;
            }
            catch (error) {                
                console.log('Error al conectarse con el servidor:  ', server?.url);
            }
        }

        setIsLoading(false);

        return (myRes);
    }

    return {
        serverOnline,
        isLoading,
        getServers,
        setIsLoading
    };
}