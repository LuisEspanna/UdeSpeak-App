import { COLLECTIONS } from '../constants'
import { readFromFirestore, saveOnFirestore, updateFirestoreDoc } from '../services/firebase'

export default function useUsers() {

    const getUser = async(uid) => {
        const res = await readFromFirestore(COLLECTIONS.USERS, uid);
        return res.data();
    }

    const createUser = async(user) => {
        return await saveOnFirestore(COLLECTIONS.USERS, user.uid, user);
    }

    /**
     * 
     * @param {object} coursed 
     * @param {string} uid 
     * @returns 
     */
    const editUserCoursed = async(coursed, uid) => {
        return await updateFirestoreDoc(COLLECTIONS.USERS, uid, {coursed: {...coursed}});
    }

    /**
     * 
     * @param {[]} keys 
     * @param {string} uid 
     * @returns 
     */
    const editUserKeys = async(keys, uid) => {
        return await updateFirestoreDoc(COLLECTIONS.USERS, uid, {keys: keys});
    }

    const deleteUser = (uid) => {
        console.log('Editing user' , uid);
    }

    return {
        getUser,
        createUser,
        editUserCoursed,
        deleteUser,
        editUserKeys
    };
}
