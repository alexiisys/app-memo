import React from 'react';
import Svg, {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  type SvgProps,
} from 'react-native-svg';

export const MessageIcon = ({
  color = '#919090',
  width = 26,
  height = 26,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 26 26" fill="none" {...props}>
    <G clipPath="url(#clip0)">
      <Path
        d="M5.34008 20.6606C4.33262 19.6557 3.53367 18.4617 2.98912 17.1471C2.44458 15.8325 2.16519 14.4232 2.167 13.0003C2.167 7.01708 7.01708 2.16699 13.0003 2.16699C18.9836 2.16699 23.8337 7.01708 23.8337 13.0003C23.8337 18.9836 18.9836 23.8337 13.0003 23.8337H2.167L5.34008 20.6606ZM8.667 14.0837C8.667 15.2329 9.12355 16.3351 9.9362 17.1478C10.7489 17.9604 11.8511 18.417 13.0003 18.417C14.1496 18.417 15.2518 17.9604 16.0645 17.1478C16.8771 16.3351 17.3337 15.2329 17.3337 14.0837H8.667Z"
        fill={color}
        fillOpacity={0.4}
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width={26} height={26} fill="none" />
      </ClipPath>
    </Defs>
  </Svg>
);
