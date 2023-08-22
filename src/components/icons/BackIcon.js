import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackIcon(props) {
  return (
    <Svg
      width={38}
      height={38}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.642 19.139h18.714a1.861 1.861 0 010 3.722H11.642a1.861 1.861 0 010-3.722z"
        fill="#32BFC3"
      />
      <Path
        d="M17.88 12.901a1.86 1.86 0 011.316 3.177L14.273 21l4.923 4.922a1.86 1.86 0 01-2.632 2.631l-6.238-6.237a1.86 1.86 0 010-2.632l6.238-6.237c.365-.365.84-.546 1.316-.546z"
        fill="#32BFC3"
      />
      <Path
        d="M21 0c11.579 0 21 9.419 21 21 0 11.579-9.421 21-21 21S0 32.579 0 21C0 9.419 9.419 0 21 0zm0 38.278c9.528 0 17.28-7.752 17.28-17.278 0-9.528-7.752-17.278-17.28-17.278-9.528 0-17.278 7.752-17.278 17.278C3.72 30.528 11.472 38.278 21 38.278z"
        fill="#32BFC3"
      />
    </Svg>
  )
}

export default BackIcon;