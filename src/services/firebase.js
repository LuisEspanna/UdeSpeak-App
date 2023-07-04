import firestore from '@react-native-firebase/firestore';

/**
 * @param {String} collection 
 * @param {String} document 
 * @param {Object} data 
 * @returns 
 */
const saveOnFirestore = async(collection, document, data) => {
    if(document)return  firestore().collection(collection).doc(document).set(data);
    else return firestore().collection(collection).add(data);
}

/**
 * @param {String} collection 
 * @param {String} document 
 * @returns 
 */
const readFromFirestore = async(collection, document) => {
    if(document)return  firestore().collection(collection).doc(document).get();
    else return firestore().collection(collection).get();
}

/**
 * @param {String} collection 
 * @param {String} document 
 * @returns 
 */
const readFromFirestoreWhere = async(collection, field, operator, value) => {
    return  firestore().collection(collection).where(field, operator, value).get();
}

/**
 * 
 * @param {String} collection
 * @param {String} document
 * @param {*} data 
 */
const updateFirestoreDoc = async(collection, document, data) => {
    if(document)return  firestore().collection(collection).doc(document).update(data);
}

/**
 * 
 * @param {String} collection
 * @param {String} document
 * @param {*} data 
 */
 const incrementFieldValue = async(collection, document, value) => {
    const increment = firestore.FieldValue.increment(value);
    return firestore().collection(collection).doc(document).update({
       value : increment
    });
}

module.exports = {
    saveOnFirestore,
    readFromFirestore,
    updateFirestoreDoc,
    incrementFieldValue,
    readFromFirestoreWhere
}
