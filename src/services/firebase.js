import firestore from '@react-native-firebase/firestore';

/**
 * @param {String} collection 
 * @param {String} document 
 * @param {Object} data 
 * @returns 
 */
const saveOnFirestore = async(collection, document, data) => {
    if(document)return  firestore().collection(collection).doc(document).set(data)
    else return firestore().collection(collection).add(data)
}

/**
 * @param {String} collection 
 * @param {String} document 
 * @returns 
 */
const readFromFirestore = async(collection, document) => {
    if(document)return  firestore().collection(collection).doc(document).get()
    else return firestore().collection(collection).get()
}

module.exports = {
    saveOnFirestore,
    readFromFirestore
}
