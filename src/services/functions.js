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
  
module.exports = {
    getUserDataFromResult,
    sleep
}