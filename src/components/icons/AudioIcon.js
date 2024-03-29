import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function AudioIcon(props) {
  return (
    <Svg
      width={47}
      height={47}
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={23.5} cy={23.5} r={16.5} fill="#0FB4B9" />
      <Circle cx={23.5} cy={23.5} r={22.5} stroke="#0FB4B9" />
      <Path
        d="M22.924 16.626c.003-.521-.34-.682-.758-.363l-4.433 3.334c-.157.12-.304.436-.426.436h-3.325c-.531-.003-.982.532-.982 1.053v6.354c0 .522.45.92.982.92h3.252c.146.168.338.487.555.62l4.244 2.684c.447.281.814.089.817-.433l.074-14.605zM28.456 14.238l-.3-.185c-.108-.065-.272.004-.367.155l-.53.833c-.095.151-.088.326.02.391l.378.23c.007.004.01.004.017.007 2.805 1.695 4.674 4.738 4.674 8.21 0 3.64-2.054 6.803-5.086 8.443-.018.004-.032.01-.049.017l-.388.213c-.111.062-.129.237-.042.391l.49.861c.087.155.25.234.36.172l.341-.189c3.588-1.904 6.022-5.626 6.022-9.911.004-4.087-2.218-7.665-5.54-9.638z"
        fill="#fff"
      />
      <Path
        d="M30.172 23.903c0-3.156-1.74-5.911-4.325-7.4v.003l-.003-.003a.238.238 0 00-.325.09l-.402.63c-.073.114-.045.261.063.326l.346.213c2.04 1.31 3.388 3.572 3.388 6.141 0 2.687-1.47 5.033-3.668 6.313a.124.124 0 00-.031.014l-.388.212c-.112.062-.147.206-.077.326l.374.659c.067.12.213.165.322.106l.387-.212a.188.188 0 00.032-.024c2.574-1.496 4.307-4.248 4.307-7.394z"
        fill="#fff"
      />
    </Svg>
  )
}

export default AudioIcon;