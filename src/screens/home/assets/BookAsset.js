import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BookIcon(props) {
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
        d="M31.667 1.667L23.333 10v18.333l8.334-7.5V1.667zM1.667 10v24.417c0 .416.416.833.833.833.167 0 .25-.083.417-.083 2.25-1.084 5.5-1.834 7.916-1.834 3.25 0 6.75.667 9.167 2.5V10c-2.417-1.833-5.917-2.5-9.167-2.5s-6.75.667-9.166 2.5zm36.666 22.5V10c-1-.75-2.083-1.25-3.333-1.667v22.5C33.167 30.25 31.167 30 29.167 30c-2.834 0-6.917 1.083-9.167 2.5v3.333c2.25-1.416 6.333-2.5 9.167-2.5 2.75 0 5.583.5 7.916 1.75.167.084.25.084.417.084.417 0 .833-.417.833-.834V32.5z"
        fill="#000"
        fillOpacity={0.1}
      />
    </Svg>
  )
}

export default BookIcon
