import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BookmarkIcon(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15 19l-7-5-7 5V3a2 2 0 012-2h10a2 2 0 012 2v16z"
        stroke="#54C8CD"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default BookmarkIcon;