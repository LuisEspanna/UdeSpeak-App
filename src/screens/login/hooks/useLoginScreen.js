import { useState, useEffect } from 'react'
import { emailValidator } from '../../../functions'
import useGoogleLogin from '../../../hooks/useGoogleLogin'

export default function useLoginScreen(navigation, showAlert) {

    const { isLoading, googleLogin, loginWithEmailAndPassword, autoLogin} = useGoogleLogin()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        let isMounted = true;
        autoLogin();
        return () => { isMounted = false }
    }, [])
    

    const onRegister = () => {
        navigation.replace('RegisterScreen')
    }

    const onChange = (e) => {
        setUser({ ...user, ...e });
    }

    const onLogin = () => {
        let isValid = emailValidator(user.email)
         if(!isValid) showAlert('Correo inválido', 'Error', true);

        for (const key in user) {
            if (Object.hasOwnProperty.call(user, key)) {
                if (user[key].length === 0) {
                    isValid = false;
                    showAlert('Debe llenar todos los campos', 'Error', true);
                }
            }
        }
        
        if(isValid)loginWithEmailAndPassword(user.email, user.password, (err)=>{
            showAlert(err, 'Error', true);
        })
    }

    const onGoogleLogin = () => {
        googleLogin((err) => {
            showAlert(err, 'Error', true);
        })
    }

    const iforgotMyPassword = () => {
        console.log('Olvidé la constraseña');
    }

    return {
        isLoading,
        onRegister,
        onChange,
        onLogin,
        onGoogleLogin,
        iforgotMyPassword
    }
}
