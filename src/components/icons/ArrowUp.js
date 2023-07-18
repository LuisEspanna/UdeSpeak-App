import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function ArrowUp(props) {
  return (
    <Svg
      width={33}
      height={33}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_2530_470)">
        <Path
          d="M24.75 20.625l-8.25-8.25-8.25 8.25"
          stroke="#32BFC3"
          strokeWidth={2.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2530_470">
          <Path
            fill="#fff"
            transform="rotate(-180 16.5 16.5)"
            d="M0 0H33V33H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ArrowUp;