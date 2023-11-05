import { StyleSheet, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { TextInput } from 'react-native-gesture-handler';

export default function StudentInput({onChange, options, correctAnswers}) {

    const [text, setText] = useState('');
    const [pattern, setPattern] = useState('___');
    const [isCorrect, setIsCorrect] = useState(true);
    
    useEffect(() => {
        const wordToPattern = () => {
            let result = '';
            let aux = '__';
    
            options?.forEach(option => {
                if(aux.length < option?.description?.length){
                    aux = option?.description;
                }
            });
    
            for (let i = 0; i < aux.length; i++) {
                if(aux.charAt(i) !== ' ') {
                    result = result + '_';
                } else {
                    result = result + ' ';
                }
            }

            setPattern(result);
        }

        wordToPattern();

        if(correctAnswers !== null && !correctAnswers[options[0].parent]){
            setIsCorrect(false);
        } else {
            setIsCorrect(true);
        }

    }, [correctAnswers]);
    

    const handleChange = (value) => {
        setText(value);
        if(onChange)
            onChange({parent: options[0].parent, value});
    }

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder={pattern}
                onChangeText={handleChange} 
                value={text}
                style={(isCorrect ? styles.text : styles.textWrong)}
                multiline
            />
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        padding: 0,
        margin: 0,
        borderColor: '#cacaca',
        borderWidth: 1,
        marginRight: 5,
        paddingLeft: 5,
        paddingRight: 5,        
        borderRadius: 4,
    },
    text: {
        padding: 0,
        width: 100,
        borderBottomColor: '#cacaca',
        width: '100%',
        fontSize: 17,
        color: '#0FB4B9'
    },
    textWrong: {
        padding: 0,
        width: 100,
        borderBottomColor: '#cacaca',
        width: '100%',
        fontSize: 17,
        color: '#ff4242'
    }
});