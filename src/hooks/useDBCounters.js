import { COLLECTIONS } from '../constants'
import { incrementFieldValue } from '../services/firebase'
//import { increment } from 'firebase/firestore'

export default function useDBCounters() {

    const incrementUsers = (value) => {
        incrementFieldValue(COLLECTIONS.COUNTERS, COLLECTIONS.USERS, value);
    }

    return {
        incrementUsers
    }
}
