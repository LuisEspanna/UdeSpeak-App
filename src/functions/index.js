import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserDataFromResult = (userResult) => {
    let user = {
        displayName: `${userResult?.displayName}`,
        email: `${userResult?.email}`,
        photoURL: `${userResult?.photoURL}`,
        uid: `${userResult?.uid}`
    }
  
    if (userResult?.uid) 
    user.isLogged = true;
  
    return user;
}
  

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function emailValidator(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) return false
    else return true
}

function getAuthErrorMessage(errorMesssage) {
  return errorMesssage
    .replace('Firebase: ', '')
    .replace('Error ', '')
}

const localStorageSet = async (key,value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
        console.log(e)
    }
}

const localStorageGet = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return eval(value)
    } catch(e) {
      // error reading value
      console.log(e)
      return null
    }
}

const getDisplayName = (user) => {
    const userName = user.displayName.split(' ');
    return (`${userName[0]}  ${userName[2] ?userName[2] : userName[1]}`)
}
  
module.exports = {
    getUserDataFromResult,
    sleep,
    emailValidator,
    getAuthErrorMessage,
    localStorageSet,
    localStorageGet,
    getDisplayName
}