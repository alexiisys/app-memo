import React from 'react';
import Svg, {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  type SvgProps,
} from 'react-native-svg';

export const HeartIcon = ({
  color = '#D3D3D3',
  width = 26,
  height = 26,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 26 26" fill="none" {...props}>
    <G clipPath="url(#clip0)">
      <Path
        d="M13.0014 4.90639C15.5462 2.62164 19.4787 2.69748 21.9303 5.15339C24.3808 7.61039 24.4653 11.5234 22.1859 14.0757L12.9992 23.2754L3.81475 14.0757C1.53542 11.5234 1.621 7.60389 4.07042 5.15339C6.52417 2.70073 10.4491 2.61839 13.0014 4.90639Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width={26} height={26} fill="none" />
      </ClipPath>
    </Defs>
  </Svg>
);
