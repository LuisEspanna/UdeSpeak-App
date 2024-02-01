import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PencilAsset(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5 28.75V35h6.25l18.433-18.433-6.25-6.25L5 28.75zm29.517-17.017c.65-.65.65-1.7 0-2.35l-3.9-3.9a1.66 1.66 0 00-2.35 0l-3.05 3.05 6.25 6.25 3.05-3.05z"
        fill="#000"
        fillOpacity={0.1}
      />
    </Svg>
  )
}

export default PencilAsset