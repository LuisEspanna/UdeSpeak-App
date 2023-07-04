import { COLLECTIONS } from '../constants';
import { readFromFirestoreWhere } from '../services/firebase';


export default function useLevels() {   
    const getAll = async(idLanguage) => {
        const snapshot = await readFromFirestoreWhere(COLLECTIONS.LEVELS, 'language_id', '==', idLanguage);
        const localLevels = [];

        snapshot.forEach(doc => {
            const item = {...doc.data()};
            item.id = doc.id;
            localLevels.push(item);
        });

        return(localLevels);
    }

    return {
        getAll
    };
}