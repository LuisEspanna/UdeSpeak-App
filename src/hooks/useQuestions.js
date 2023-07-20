import { COLLECTIONS } from '../constants';
import { readFromFirestoreWhere } from '../services/firebase';


export default function useQuestions() {   
    const getAll = async(id) => {
        const snapshot = await readFromFirestoreWhere(COLLECTIONS.QUESTIONS, 'questionnary_id', '==', id);
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