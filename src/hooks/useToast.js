import {useState} from 'react'
import { sleep } from '../functions'

const messageTypes = {
    ERROR: 'Error',
    SUCCESS: 'Success',
    WARNING: 'Warning',
    INFO: 'Info'
}

export default function useToast() {
    const [message, setMessage] = useState('')
    const [type, setType] = useState(messageTypes.INFO)
    const [isVisible, setIsVisible] = useState(false)
    const [value, setValue] = useState(100)

    /**
     * 
     * @param {String} text
     * @param {String: ['Error', 'Success', 'Warning', 'Info']} typeMessage
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
                onClose()
            }, 1000)
            return () => clearTimeout(timer)
        }
    }

    const onClose = () => {
        setIsVisible(false)
        setValue(100)
    }

    return {
        isVisible,
        message,
        type,
        value,
        showAlert,
        onClose,
    }
}
