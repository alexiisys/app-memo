import React from 'react';
import Svg, {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  type SvgProps,
} from 'react-native-svg';

export const EditIcon = ({
  color = '#919090',
  width = 23,
  height = 23,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 23 23" fill="none" {...props}>
    <G clipPath="url(#clip0)">
      <Path
        d="M7.03004 16.777H3.14062V12.8875L13.6227 2.40545C13.7946 2.2336 14.0277 2.13706 14.2708 2.13706C14.5139 2.13706 14.747 2.2336 14.9189 2.40545L17.5121 4.9987C17.684 5.1706 17.7805 5.40372 17.7805 5.64678C17.7805 5.88985 17.684 6.12297 17.5121 6.29487L7.03004 16.777Z"
        fill={color}
      />
      <Path
        d="M3.14062 18.6103H19.6406V20.4436H3.14062V18.6103Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect
          width={22}
          height={22}
          fill="none"
          transform="translate(0.390625 0.276947)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
