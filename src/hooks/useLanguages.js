import { COLLECTIONS } from '../constants';
import { readFromFirestore } from '../services/firebase';


export default function useLanguages() {   
    const getAll = async() => {
        const snapshot = await readFromFirestore(COLLECTIONS.LANGUAGES);
        const localLanguages = [];

        snapshot.forEach(doc => {
            const item = {...doc.data()};
            item.id = doc.id;
            localLanguages.push(item);
        });

        return(localLanguages);
    }

    return {
        getAll
    };
}