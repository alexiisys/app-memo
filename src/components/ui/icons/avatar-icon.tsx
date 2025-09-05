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
  color = 'rgba(224,224,224,0.4)',
  width = 29,
  height = 28,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 29 28" fill="none" {...props}>
      <Path
        d="M14.796 15.1667C18.0176 15.1667 20.6293 12.555 20.6293 9.33333C20.6293 6.11167 18.0176 3.5 14.796 3.5C11.5743 3.5 8.96265 6.11167 8.96265 9.33333C8.96265 12.555 11.5743 15.1667 14.796 15.1667ZM14.796 15.1667C17.2713 15.1667 19.6453 16.15 21.3956 17.9003C23.146 19.6507 24.1293 22.0246 24.1293 24.5M14.796 15.1667C12.3206 15.1667 9.94666 16.15 8.19632 17.9003C6.44598 19.6507 5.46265 22.0246 5.46265 24.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
  </Svg>
);
