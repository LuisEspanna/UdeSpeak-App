import React, { useState } from 'react'
import { emailValidator } from '../../../services/functions'
import useGoogleLogin from '../../../hooks/useGoogleLogin'

export default function useRegister(navigation) {

    const { googleLogin } = useGoogleLogin();
    const [error, setError] = useState(undefined)
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        rpassword: ''
    })

    const onLogin = () => {
        navigation.replace('LoginScreen')
    }

    const onChange = (e) => {
        setValues({ ...values, ...e })
    }

    const onRegister = () => {
        let isValid = emailValidator(values.email);
         if(!isValid) setError('Correo inválido')

        for (const key in values) {
            if (Object.hasOwnProperty.call(values, key)) {
                if (values[key].length === 0) {
                    isValid = false
                    setError('Debe llenar todos los campos')
                }
            }
        }

        if (values.password !== values.rpassword) {
            isValid = false
            setError('Las contraseñas no coinciden')
        }
        
        if(isValid)console.log('Registrando....')
    }

    return {
        onLogin,
        onChange,
        onRegister,
        googleLogin,
        error
    }
}
