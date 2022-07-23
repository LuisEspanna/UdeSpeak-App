import { COLLECTIONS } from '../constants'
import { incrementFieldValue } from '../services/firebase'


export default function useDBCounters() {

    const incrementUsers = (value) => {
        incrementFieldValue(COLLECTIONS.COUNTERS, COLLECTIONS.USERS, value);
    }

    return {
        incrementUsers
    }
}
