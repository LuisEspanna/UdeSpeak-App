import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PauseIcon(props) {
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#fff" d="M8 5H11V19H8z" />
      <Path fill="#fff" d="M13 5H16V19H13z" />
    </Svg>
  )
}

export default PauseIcon;