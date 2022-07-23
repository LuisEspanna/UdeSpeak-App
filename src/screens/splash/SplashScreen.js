import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import React from 'react';

export default function SplashScreen() {

    console.log('Splash')

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>SplashScreen</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        padding: 200
    }
})