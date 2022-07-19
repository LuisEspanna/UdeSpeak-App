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
  
module.exports = {
    getUserDataFromResult,
    sleep,
    emailValidator,
    getAuthErrorMessage
}