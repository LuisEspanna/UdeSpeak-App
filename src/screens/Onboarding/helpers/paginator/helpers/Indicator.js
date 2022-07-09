import { StyleSheet, View } from 'react-native';


function Indicator({active}) {
    return (
        <View style={ active ? styles.active : styles.inactive }/>
    )
}

const styles = StyleSheet.create({
    inactive: {
        backgroundColor: 'rgba(58, 160, 145, 0.5)',
        height: '0.313em',
        width: '0.313em',
        margin: '0.313em',
        borderRadius:'0.125em'
    },
    active: {
        backgroundColor: '#0FB4B9',
        height: '0.313em',
        width: '0.625em',
        margin: '0.313em',
        borderRadius:'0.125em'
    },
});

export default Indicator;
