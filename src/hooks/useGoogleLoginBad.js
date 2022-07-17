import { useState } from 'react'
import { //Auth, 
  auth, db } from '../services/expoFirebase'
import { useDispatch } from 'react-redux'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail}  from 'firebase/auth'
import { getUserDataFromResult, getAuthErrorMessage } from '../services/functions'
import { COLLECTIONS } from '../constants'

// Redux actions
import { setUser } from '../state/reducers/userSlice'
import useUsers from './useUsers'
import useDbCounters from './useDbCounters'



export default function useGoogleLogin () {
  const [provider, setProvider] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const {getUser} = useUsers()

  //const navigate = useNavigate()
  const { incrementUsers } = useDbCounters()

  const autoLogin = () => {
    /*
    setProvider(new Auth.GoogleAuthProvider())
    setIsLoading(true)

    setTimeout(()=>{
      readUserInfo(auth?.currentUser?.uid).then((user)=>{
          if (auth?.currentUser?.uid !== undefined){
              const newUser = {...user}
              newUser.isLogged = true
              dispatch(setUser(newUser))
          }
      })
      .finally(()=>{
          setIsLoading(false)
      })
    }, 2000)
    */
  }
  
  const readUserInfo = async( uid ) => {
    const res = await getUser(uid)
    return res
  }
  

  /**
   * Receive a next function that it will be executed
   * @param {function} onError 
   */
  const googleLogin = (onError) => {
    /*
    setIsLoading(true)
    return Auth().signInWithPopup(provider)
      .then(result => {
        login(result?.user)
      })
      .catch(err => {
        if(onError) onError(getAuthErrorMessage(err?.message))
        setError(err)
      }).finally(()=>{        
        setIsLoading(false)
      })
      */
  }

  /**
   * Receive a next function that it will be executed
   * @param {function} next
   */
  const otherAccount = (onError) => {
    /*
    provider.setCustomParameters({
      prompt: 'select_account'
    })
    Auth().signInWithPopup(provider)
      .then(result => {
        readUserInfo(result?.user?.uid || '')
      })
      .catch(err => {
        setError(err)
      })
      */
  }

  /**
   * Receive a next function that it will be executed
   * @param {function} next
   */
  const logout = (next) => {
    /*
    setIsLoading(true)
    return Auth().signOut()
      .then(result => {
        console.log('Bye')
        window.sessionStorage.clear()
        dispatch(setUser({
          isLogged:false,
          displayName:undefined,
          email:undefined,
          photoURL:undefined,
          uid:undefined,
          permission: undefined
        }))
      })
      .finally(()=>{
        setIsLoading(false)
        //if(next) next()
      })
      */
  }

  const register = (email, password, displayName, onError) => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result?.user
        user.displayName=displayName
        login(user)
      })
      .catch((err) => {
        setError(err)
        if(onError) onError(getAuthErrorMessage(err?.message))
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }

  const loginWithEmailAndPassword = (email, password, onError) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        login(result?.user)
      })
      .catch((err) => {
        setError(err)
        if(onError)onError(getAuthErrorMessage(err?.message))
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }

  /**
   * 
   * @param {String} email 
   */
  const recoverAccount = (email) => {
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        /*
        Swal.fire({
          icon: 'success',
          title: 'Revisa tu correo: ',
          text: "El proceso finalizó correctamente, se envió un correo a " + email
        }).then(res => {
          if(res.isConfirmed || res.isDismissed){
            navigate("/", {replace: true})
          }
        })
        */
      })
      .catch((err) => {
        setError(err)
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }

  /**
   * Function that receive a login result, save info in local storage and
   * set the info in the state and the db
   * @param {*} user 
   */
  const login = (user) => {
    const uid = user?.uid || ''
    readUserInfo(uid).then(userRes => {
      if (userRes !== undefined) {
        console.log("Loading from database")
        const newUser = { ...userRes }
        newUser.isLogged = true
        dispatch(setUser(newUser))
      }
      else {
        // Save on database
        const localUser = getUserDataFromResult(user)
        console.log("Saving on database")
        const newUser = { ...localUser }
        delete newUser['isLogged']

        db.collection(COLLECTIONS.USERS).doc(localUser.uid).set(newUser).then(() => {
          dispatch(setUser(localUser))
          incrementUsers(1)
        })
      }
    })
    //window.sessionStorage.setItem('uid', uid)
  }

  return {
    error,
    isLoading,
    googleLogin,
    logout,
    otherAccount,
    register,
    loginWithEmailAndPassword,
    recoverAccount,
    autoLogin
  }
}
