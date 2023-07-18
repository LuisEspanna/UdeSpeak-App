import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function SearchIcon(props) {
  return (
    <Svg
      width={31}
      height={31}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_2527_386)"
        stroke="#32BFC3"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M3.875 12.917a9.042 9.042 0 1018.084 0 9.042 9.042 0 00-18.084 0zM27.125 27.125l-7.75-7.75" />
      </G>
      <Defs>
        <ClipPath id="clip0_2527_386">
          <Path fill="#fff" d="M0 0H31V31H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SearchIcon;