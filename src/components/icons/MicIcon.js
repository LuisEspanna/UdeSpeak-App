import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function MicIcon(props) {
  return (
    <Svg
      width={42}
      height={42}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={21} cy={21} r={21} fill="#0FB4B9" />
      <Path
        d="M26.086 36.01h-9.999a.922.922 0 01-.918-.92c0-.507.413-.92.918-.92h10.007c.506 0 .92.413.92.92a.93.93 0 01-.928.92z"
        fill="#FAFDFF"
      />
      <Path
        d="M21.087 36.01a.922.922 0 01-.92-.92v-7.542c0-.507.414-.92.92-.92s.919.413.919.92v7.542c0 .507-.413.92-.92.92zM21.137 24.254h-.1a4.955 4.955 0 01-4.95-4.958V10.53a4.955 4.955 0 014.95-4.958h.1a4.955 4.955 0 014.95 4.958v8.767a4.955 4.955 0 01-4.95 4.958z"
        fill="#FAFDFF"
      />
      <Path
        d="M21.137 27.92h-.1a8.536 8.536 0 01-6.088-2.526 8.568 8.568 0 01-2.52-6.098c0-.506.413-.92.918-.92.506 0 .92.414.92.92 0 1.816.708 3.514 1.98 4.798a6.707 6.707 0 004.79 1.984h.1c1.813 0 3.508-.709 4.789-1.984a6.732 6.732 0 001.981-4.798c0-.506.413-.92.919-.92s.919.414.919.92a8.568 8.568 0 01-2.52 6.098 8.536 8.536 0 01-6.088 2.526z"
        fill="#FAFDFF"
      />
    </Svg>
  )
}

export default MicIcon;