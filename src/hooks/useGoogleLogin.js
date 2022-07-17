import { useState, useEffect } from 'react'
import { //Auth, 
  auth } from '../services/expoFirebase'
import { useDispatch } from 'react-redux'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup}  from 'firebase/auth'
import { getUserDataFromResult, getAuthErrorMessage } from '../services/functions'
import { COLLECTIONS } from '../constants'

// Redux actions
import { setUser } from '../state/reducers/userSlice'
import useUsers from './useUsers'
//import useDbCounters from './useDbCounters'



export default function useGoogleLogin () {
  const [provider, setProvider] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const {getUser} = useUsers()

  //const navigate = useNavigate()
  //const { incrementUsers } = useDbCounters()

  useEffect(() => {
    //setProvider(new GoogleAuthProvider())
  }, [])
  

  const autoLogin = () => {
    setIsLoading(true)

    setTimeout(()=>{
      if(auth?.currentUser?.uid !== undefined){
        readUserInfo(auth?.currentUser?.uid ).then((user)=>{
            if (user){
                const newUser = {...user}
                newUser.isLogged = true
                dispatch(setUser(newUser))
            }
        })
        .finally(()=>{
            setIsLoading(false)
        })
      }
    }, 2000)
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
    setIsLoading(true)
    return signInWithPopup(provider)
      .then(result => {
        login(result?.user)
      })
      .catch(err => {
        if(onError) onError(getAuthErrorMessage(err?.message))
        setError(err)
      }).finally(()=>{        
        setIsLoading(false)
      })
  }

  /**
   * Receive a next function that it will be executed
   * @param {function} next
   */
  const otherAccount = (onError) => {
  }

  /**
   * Receive a next function that it will be executed
   * @param {function} next
   */
  const logout = (next) => {
  }

  const register = (email, password, displayName, onError) => {
    
  }

  const loginWithEmailAndPassword = (email, password, onError) => {
  }

  /**
   * 
   * @param {String} email 
   */
  const recoverAccount = (email) => {
  }

  /**
   * Function that receive a login result, save info in local storage and
   * set the info in the state and the db
   * @param {*} user 
   */
  const login = (user) => {
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
