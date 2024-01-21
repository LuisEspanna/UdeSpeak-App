import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BarChart } from "react-native-gifted-charts";

export default function CBarChart() {
    const data = [
        {
          value: 25,
          frontColor: '#006DFF',
          gradientColor: '#009FFF',
          spacing: 6,
          label: 'Jan',
        },
        {value: 24, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    
        {
          value: 35,
          frontColor: '#006DFF',
          gradientColor: '#009FFF',
          spacing: 6,
          label: 'Feb',
        },
        {value: 30, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    
        {
          value: 45,
          frontColor: '#006DFF',
          gradientColor: '#009FFF',
          spacing: 6,
          label: 'Mar',
        },
        {value: 40, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    
        {
          value: 52,
          frontColor: '#006DFF',
          gradientColor: '#009FFF',
          spacing: 6,
          label: 'Apr',
        },
        {value: 49, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    
        {
          value: 30,
          frontColor: '#006DFF',
          gradientColor: '#009FFF',
          spacing: 6,
          label: 'May',
        },
        {value: 28, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
      ];
    
      return (
        <View
          style={{
            margin: 10,
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#202454',
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            Overview
          </Text>
          <View style={{padding: 20, alignItems: 'center'}}>
            <BarChart
              data={data}
              barWidth={16}
              initialSpacing={10}
              spacing={14}
              barBorderRadius={4}
              showGradient
              yAxisThickness={0}
              xAxisColor={'lightgray'}
              yAxisTextStyle={{color: 'lightgray'}}
              stepValue={10}
              maxValue={60}
              noOfSections={6}
              labelWidth={40}
              xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}
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

const styles = StyleSheet.create({})