import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

export const Plus = ({
  width = 18,
  height = 18,
  color = '#FFFFFF',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      d="M3.75 9H14.25"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 3.75V14.25"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
