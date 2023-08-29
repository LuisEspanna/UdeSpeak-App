import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowRight(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9 .333L7.473 1.861l6.045 6.056H.332v2.166h13.184L7.474 16.14 9 17.667 17.667 9 9 .333z"
        fill="#fff"
      />
    </Svg>
  )
}

export default ArrowRight;