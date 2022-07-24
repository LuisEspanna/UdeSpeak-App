import React from 'react';
import { StyleSheet, View  } from 'react-native';
import LogoIcon from "../../../components/icons/LogoIcon";

export default function ColorLogoIcon() {
    return (
        <View style={styles.layout}>
            <LogoIcon style={styles.logoIcon}/>
        </View>
    )
}

const styles = StyleSheet.create({
    layout:{  
    },
    logoIcon: {
        width: 264,
        height: 71,
    }
})