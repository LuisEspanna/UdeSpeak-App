import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarChart } from "react-native-gifted-charts";


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function CBarChart({ coursed }) {
  const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState(10);

  useEffect(() => {
    function transform() {
      var cdata = [];

      if (coursed?.questions) {
        const questions = coursed?.questions;

        for (const key in questions) {
          if (Object.hasOwnProperty.call(questions, key)) {
            const question = questions[key];
            cdata.push(question.date)
          }
        }
      }

      cdata.sort((a, b) => b - a);

      var res = {}

      cdata.forEach((d, i) => {
        var date = new Date(d);
        res[`${date.getFullYear()}-${date.getMonth()}`] = {
          year: date.getFullYear(),
          counter: 1 + (res[`${date.getFullYear()}-${date.getMonth()}`] ? res[`${date.getFullYear()}-${date.getMonth()}`].counter : 0),
          month: months[date.getMonth()],
          milliseconds: d
        }
      });

      var countArr = [];
      var newMaxValue = 0;

      for (const key in res) {
        if (Object.hasOwnProperty.call(res, key)) {
          const counter = res[key];
          countArr.push({ value: counter.counter, frontColor: '#3BE9DE', gradientColor: '#93FCF8' });
          countArr.push(
            {
              value: counter.counter,
              frontColor: '#006DFF',
              gradientColor: '#009FFF',
              spacing: 6,
              label: counter.month,
            }
          );
          if (newMaxValue < counter.counter) newMaxValue = counter.counter;
        }
      }

      setMaxValue(newMaxValue * 2);
      countArr.sort((a, b) => b.milliseconds - a.milliseconds);
      var newData = countArr.slice(0, 10);
      setData(newData.reverse());
    }
    transform();
  }, [coursed])

  if (data.length > 0)
    return (
      <View
        style={styles.container}>
        <Text style={styles.title}>
          Ejercicios resueltos por mes
        </Text>
        <View style={styles.graph}>
          <BarChart
            data={data}
            barWidth={16}
            initialSpacing={10}
            spacing={14}
            barBorderRadius={4}
            showGradient
            yAxisThickness={0}
            xAxisColor={'lightgray'}
            yAxisTextStyle={{ color: 'lightgray' }}
            maxValue={maxValue}
            noOfSections={8}
            labelWidth={40}
            xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center' }}
            showLine
            lineConfig={{
              color: '#F29C6E',
              thickness: 3,
              curved: true,
              hideDataPoints: true,
              shiftY: 20,
              initialSpacing: -30,
            }}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#202454',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  graph: {
    padding: 20,
    alignItems: 'center'
  }
})