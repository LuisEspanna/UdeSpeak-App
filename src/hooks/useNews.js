import { COLLECTIONS } from "../constants";
import { readFromFirestore } from '../services/firebase';

export default function useNews() {

    const getAllNews = async() => {
        const snapshot = await readFromFirestore(COLLECTIONS.NEWS);
        const localItems = [];

        snapshot.forEach(doc => {
            const item = {...doc.data()};
            item.id = doc.id;
            localItems.push(item);
        });

        return(localItems);
    }

    return {
        getAllNews
    };
}
