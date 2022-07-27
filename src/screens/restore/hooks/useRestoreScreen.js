import { useState } from 'react';
import { emailValidator } from '../../../functions';
import useGoogleLogin from '../../../hooks/useGoogleLogin';

export default function useRestoreScreen(navigation, showAlert) {

    const { isLoading, restore} = useGoogleLogin()
    const [user, setUser] = useState({
        email: '',
    });
    
    const onLogin = () => {
        navigation.replace('LoginScreen')
    }

    const onChange = (e) => {
        setUser({ ...user, ...e });
    }

    const onSend = () => {
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
        
        showAlert('Revisa tu bandeja de entrada o en Spam', 'Success', true);

        if(isValid)restore(user.email,(err)=>{
            showAlert(err, 'Error', true);
        });
    }

    return {
        isLoading,
        onChange,
        onSend,
        onLogin,
    }
}
