import React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

export const FilterIcon = ({
  color = '#222020',
  width = 24,
  height = 24,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M14 13V19C14 19.2833 13.9043 19.5207 13.713 19.712C13.521 19.904 13.2833 20 13 20H11C10.7167 20 10.4793 19.904 10.288 19.712C10.096 19.5207 10 19.2833 10 19V13L4.2 5.6C3.95 5.26667 3.91267 4.91667 4.088 4.55C4.26267 4.18333 4.56667 4 5 4H19C19.4333 4 19.7377 4.18333 19.913 4.55C20.0877 4.91667 20.05 5.26667 19.8 5.6L14 13Z"
      fill={color}
    />
  </Svg>
);
