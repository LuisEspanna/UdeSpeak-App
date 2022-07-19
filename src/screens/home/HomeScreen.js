import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
    const user = useSelector((state) => state.user);
    return (
        <View>
            <Text>HomeScreen
            {
                JSON.stringify(user)
            }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({})