import * as React from "react"
import Svg, { Path } from "react-native-svg"

function StopIcon(props) {
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#fff" d="M6 6H18V18H6z" />
    </Svg>
  )
}

export default StopIcon;