import Svg, { Path, type SvgProps } from 'react-native-svg';

export const Close = ({
  color = '#081030',
  width = 33,
  height = 32,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 33 32" fill="none" {...props}>
    <Path
      d="M24.5 8L8.5 24"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.5 8L24.5 24"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
