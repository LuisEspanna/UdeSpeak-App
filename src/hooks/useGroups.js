import { COLLECTIONS } from '../constants';
import { readFromFirestoreWhere } from '../services/firebase';


export default function useLevels() {   
    const getAll = async(idLevel) => {
        const snapshot = await readFromFirestoreWhere(COLLECTIONS.GROUPS, 'level_id', '==', idLevel);
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