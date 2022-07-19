import React from 'react';
import Svg, { Path, Circle } from "react-native-svg";

function ToastInfoIcon(props) {
  return (
    <Svg
      className="toast__svg"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 32 32"
      enableBackground="new 0 0 32 32"
      {...props}
    >
      <Path d="M10 16a2 2 0 012 2v8a2 2 0 01-2 2H8v4h16v-4h-1.992c-1.102 0-2-.895-2-2L20 12H8v4h2z" />
      <Circle cx={16} cy={4} r={4} />
    </Svg>
  )
}

export default ToastInfoIcon