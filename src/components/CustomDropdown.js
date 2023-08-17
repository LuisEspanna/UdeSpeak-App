import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

export default function CustomDropdown({ data, onSelect, buttonTextAfterSelection, rowTextForSelection }) {
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
            data={data}
            onSelect={onSelect}
            buttonTextAfterSelection={buttonTextAfterSelection}
            rowTextForSelection={rowTextForSelection}
            buttonStyle={
                [styles.btnDropDown, {
                    width: getSizeDropdown(data)
                }]
            }
            buttonTextStyle={styles.btnDropDownText}
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
    }
});