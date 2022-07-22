import { useState } from 'react';
import { emailValidator } from '../../../functions';
import useGoogleLogin from '../../../hooks/useGoogleLogin';

export default function useRegister(navigation, showAlert) {

    const { googleLogin, register, isLoading } = useGoogleLogin();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        rpassword: ''
    });

    const onLogin = () => {
        navigation.replace('LoginScreen');
    }

    const onChange = (e) => {
        setUser({ ...user, ...e });
    }

    const onRegister = () => {
        let isValid = emailValidator(user.email);
         if(!isValid) showAlert('Correo inválido', 'Error', true);

        for (const key in user) {
            if (Object.hasOwnProperty.call(user, key)) {
                if (user[key].length === 0 && user[key] === null && user[key] === 'null') {
                    isValid = false;
                    showAlert('Debe llenar todos los campos', 'Error', true);
                }
            }
        }

        if (user.password !== user.rpassword) {
            isValid = false;
            showAlert('Las contraseñas no coinciden', 'Error', true);
        }

        if(isValid)register(user.email, user.password, user.name, (err)=>{
            showAlert(err, 'Error', true);
        });
    }

    const onGoogleLogin = () => {
        googleLogin((err) => {
            showAlert(err, 'Error', true);
        });
    }

    return {
        isLoading,
        onLogin,
        onChange,
        onRegister,
        onGoogleLogin,
    }
}
