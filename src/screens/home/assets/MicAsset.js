import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MicAsset(props) {
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
        d="M20 23.333a4.98 4.98 0 004.983-5l.017-10c0-2.766-2.233-5-5-5s-5 2.234-5 5v10c0 2.767 2.233 5 5 5zm8.833-5c0 5-4.233 8.5-8.833 8.5-4.6 0-8.833-3.5-8.833-8.5H8.333c0 5.684 4.534 10.384 10 11.2V35h3.334v-5.467c5.466-.8 10-5.5 10-11.2h-2.834z"
        fill="#000"
        fillOpacity={0.1}
      />
    </Svg>
  )
}

export default MicAsset