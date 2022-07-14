import React, {useState} from 'react'
import { sleep } from '../services/functions'

const messageTypes = {
    ERROR: 'Error',
    SUCCESS: 'Success',
    WARNING: 'Warning',
    INFO: 'Info'
}

export default function useAlert() {
    const [alertMessage, setMessage] = useState('')
    const [alertType, setType] = useState(messageTypes.INFO)
    const [alertIsVisible, setIsVisible] = useState(false)
    const [alertValue, setValue] = useState(100)

    /**
     * 
     * @param {String} text
     * @param {messageTypes} typeMessage
     * @param {Boolean} autoClose
     * @returns
     */

    const showAlert = async(text, typeMessage, autoClose) => {
        setType(typeMessage)
        setMessage(text)
        setIsVisible(true)

        if(autoClose){
            const timer = setTimeout(async() => {
                for (let i = 0; i < 100; i++) {
                    setValue(100-i)
                    await sleep(35)
                }
                alertOnClose()
            }, 1000);
            return () => clearTimeout(timer)
        }
    }

    const alertOnClose = () => {
        setIsVisible(false)
        setValue(100)
    }

    return {
        alertIsVisible,
        alertMessage,
        alertType,
        alertValue,
        showAlert,
        alertOnClose,
    }
}
