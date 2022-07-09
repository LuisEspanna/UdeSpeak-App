import React, { useEffect } from 'react';
import {View, TouchableOpacity, StyleSheet } from 'react-native';

export default function CanvasSemiCircle(props) {
  const { value } = props;
  const canvasRef = React.createRef();

  const draw = (ctx) => {
    ctx.clearRect(0, 0, 72, 72);
    ctx.beginPath();
    if (value > 0) ctx.arc(36, 36, 35, 0, ((2 * value) / 100) * Math.PI);
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = '#0FB4B9';
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    //Our draw come here
    draw(context);
  }, [draw]);

  return (
    <View style={styles.container}>
        <canvas ref={canvasRef} width="72" height="72" />
    </View>
  );
}

CanvasSemiCircle.defaultProps = {
  value: 0,
};

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        transform:'rotateZ(-90deg)'
    }
});
