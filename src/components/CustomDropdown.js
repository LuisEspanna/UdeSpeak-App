import { StyleSheet } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function CustomDropdown({ data, onSelect, buttonTextAfterSelection, rowTextForSelection, correctAnswers }) {
    const [isCorrect, setIsCorrect] = useState(true);
    const dropdownRef = useRef({});  

    useEffect(() => {
        if(correctAnswers !== null &&!correctAnswers[data[0].parent]){
            setIsCorrect(false);
        } else {
            setIsCorrect(true);
        }
    }, [correctAnswers]);

    const getSizeDropdown = (list) => {
        let size = 0;

        list.forEach(item => {
            if (item.description.length > size) {
                size = item.description.length;
            }
        });        
        return size * 15;
    }

    return (
        <SelectDropdown
            ref={dropdownRef}
            data={data}
            onSelect={onSelect}
            buttonTextAfterSelection={buttonTextAfterSelection}
            rowTextForSelection={rowTextForSelection}
            buttonStyle={
                [(isCorrect? styles.btnDropDown : styles.btnWrong), {
                    width: getSizeDropdown(data)
                }]
            }
            buttonTextStyle={(isCorrect ? styles.btnDropDownText : styles.btnTextWrong)}
            dropdownStyle = {{borderRadius: 8}}
            rowStyle={{height: 40}}
        />
    )
}

const styles = StyleSheet.create({
    btnDropDown:{
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#cacaca',
        marginStart: 5,
        height: 25,
        marginRight: 5
    },
    btnDropDownText: {
        fontSize: 16,
        color: '#717171',
    },
    btnWrong: {
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: '#FBE9E7',
        borderColor: '#FADDD4',
        marginStart: 5,
        height: 25,
        marginRight: 5,
    },
    btnTextWrong: {
        fontSize: 16,
        color: '#D9491D',
    }
});