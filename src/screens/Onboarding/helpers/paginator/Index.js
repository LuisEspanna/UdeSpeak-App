import React from 'react';
import { StyleSheet, View } from 'react-native';
import Indicator from './helpers/Indicator';

function Paginator({currentPage, slides}) {    
    return (
        <View style={styles.container}>
            {
                slides.map((slide, key) => 
                    <Indicator 
                        active={key === currentPage} 
                        key={key}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
  });

export default Paginator;
