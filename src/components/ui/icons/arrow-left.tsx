import React from 'react';
import Svg, {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  type SvgProps,
} from 'react-native-svg';

export const ArrowLeft = ({
  color = '#919090',
  width = 25,
  height = 24,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 25 24" fill="none" {...props}>
    <G clipPath="url(#clip0)">
      <Path
        d="M10.8566 11.9997L15.8066 16.9497L14.3926 18.3637L8.02856 11.9997L14.3926 5.63574L15.8066 7.04974L10.8566 11.9997Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect
          width={24}
          height={24}
          fill="none"
          transform="translate(0.0285645)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
