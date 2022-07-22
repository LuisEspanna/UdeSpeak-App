import { COLLECTIONS } from '../constants'
import { readFromFirestore, saveOnFirestore,  } from '../services/firebase'

export default function useUsers() {

    const getUser = async(uid) => {
        const res = await readFromFirestore(COLLECTIONS.USERS, uid);
        return res.data();
    }

    const createUser = async(user) => {
        return await saveOnFirestore(COLLECTIONS.USERS, user.uid, user);
    }

    const editUser = (user, data) => {
        return;
    }

    const deleteUser = (uid) => {
        console.log('Editing user' , uid);
    }    

    return {
        getUser,
        createUser,
        editUser,
        deleteUser
    };
}
