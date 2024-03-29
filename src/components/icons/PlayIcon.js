import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlayIcon(props) {
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M8 5v14l11-7L8 5z" fill="#fff" />
    </Svg>
  )
}

export default PlayIcon;