import * as React from "react";
import Svg, { Path } from "react-native-svg";

function StarIcon(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11 1l3.09 6.26L21 8.27l-5 4.87 1.18 6.88L11 16.77l-6.18 3.25L6 13.14 1 8.27l6.91-1.01L11 1z"
        stroke="#54C8CD"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default StarIcon;