import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function ArrowDown(props) {
  return (
    <Svg
      width={33}
      height={33}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_2530_466)">
        <Path
          d="M8.25 12.375l8.25 8.25 8.25-8.25"
          stroke="#32BFC3"
          strokeWidth={2.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2530_466">
          <Path fill="#fff" d="M0 0H33V33H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ArrowDown;