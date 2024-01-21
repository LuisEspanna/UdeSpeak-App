import { StyleSheet, View, Text } from 'react-native'
import React from 'react';
import { PieChart } from "react-native-gifted-charts";
import { useEffect } from 'react';
import { useState } from 'react';

const colors = [
    '#0088FF',
    '#40FCF1',
    '#AF9BFA',
    '#FF8EAE',
]

const TYPES = {
    'speaking': 0,
    'listening': 1,
    'reading': 2,
    'writing': 3
}

export default function CDonutChart({ coursed }) {

    const [data, setData] = useState([{ value: 0, color: colors[0] }, { value: 0, color: colors[1] }, { value: 0, color: colors[2] }, { value: 0, color: colors[3] }])
    const [labels, setLabels] = useState([0,0,0,0]);
    const [totalQuestions, setTotalQuestions] = useState(0);

    useEffect(() => {

        function transform() {
            const values = [{ value: 0, color: colors[0] }, { value: 0, color: colors[1] }, { value: 0, color: colors[2] }, { value: 0, color: colors[3] }]
    
            if (coursed?.questions) {
                const questions = coursed?.questions;
                let counter = 0;

                for (const key in questions) {
                    if (Object.hasOwnProperty.call(questions, key)) {
                        const question = questions[key];
                        values[TYPES[question.type]].value ++;
                        counter ++;
                    }
                }

                let newLabels = [];

                values.forEach((item, i) => {
                    newLabels.push(((item.value / counter) * 100))
                })

                setLabels(newLabels);
                setTotalQuestions(counter);
            }
    
            setData(values);
        }

        transform();
        
    }, [coursed])
    

    return (
        <View style={styles.container}>
            <PieChart
                data={data}
                toggleFocusOnPress
                showText
                focusOnPress
                donut
                innerRadius={80}
                innerCircleColor={'#202454'}
                textColor="black"
                centerLabelComponent={() =>
                    <View style={styles.centerLabel}>
                        <Text style={styles.centerLabelTitle}>{totalQuestions}</Text>
                        <Text style={styles.centerLabelDescription}>Ejercicios</Text>
                    </View>
                }
            />
            <View style={styles.description}>
                <View style={{ marginEnd: 50 }}>
                    <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.descriptionIcon, { backgroundColor: colors[3] }]} />
                        <Text style={styles.descriptionLabel}>Writing: {labels[3]}%</Text>
                    </View>
                    <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.descriptionIcon, { backgroundColor: colors[0] }]} />
                        <Text style={styles.descriptionLabel}>Speaking: {labels[0]}%</Text>
                    </View>
                </View>
                <View>
                    <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.descriptionIcon, { backgroundColor: colors[1] }]} />
                        <Text style={styles.descriptionLabel}>Listening: {labels[1]}%</Text>
                    </View>
                    <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.descriptionIcon, { backgroundColor: colors[2] }]} />
                        <Text style={styles.descriptionLabel}>Reading: {labels[2]}%</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 360,
        backgroundColor: '#202454',
        borderRadius: 10,
        display: 'flex',
        alignSelf: 'center',
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerLabel: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerLabelTitle: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold'
    },
    centerLabelDescription: {
        color: '#FFFFFF',
        fontSize: 15
    },
    description: {
        flex: 1,
        flexDirection: 'row',
    },
    descriptionLabel: {
        color: '#FFFFFF',
        margin: 5
    },
    descriptionIcon: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        height: 10,
        width: 10
    }
})