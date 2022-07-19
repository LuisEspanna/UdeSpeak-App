import React from 'react';
import Svg, { Path } from "react-native-svg"

function CloseIcon(props) {
  return (
    <Svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 10.881l9.81-9.81M1 1l10 10"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default CloseIcon