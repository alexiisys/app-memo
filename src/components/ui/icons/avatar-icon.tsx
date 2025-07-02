import React from 'react';
import Svg, {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  type SvgProps,
} from 'react-native-svg';

export const AvatarIcon = ({
  color = '#BBD5EE',
  width = 45,
  height = 44,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 45 44" fill="none" {...props}>
    <G clipPath="url(#clip0)">
      <Path
        d="M7.36133 40.3328C7.36133 36.4429 8.90656 32.7124 11.6571 29.9619C14.4076 27.2113 18.1382 25.6661 22.028 25.6661C25.9178 25.6661 29.6484 27.2113 32.3989 29.9619C35.1494 32.7124 36.6947 36.4429 36.6947 40.3328H7.36133ZM22.028 23.8328C15.9505 23.8328 11.028 18.9103 11.028 12.8328C11.028 6.75528 15.9505 1.83278 22.028 1.83278C28.1055 1.83278 33.028 6.75528 33.028 12.8328C33.028 18.9103 28.1055 23.8328 22.028 23.8328Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect
          width={44}
          height={44}
          fill="none"
          transform="translate(0.0285645)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
