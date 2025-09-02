import Svg, { Path, type SvgProps } from 'react-native-svg';

export const Minus = ({
  width = 18,
  height = 18,
  color = '#5E64FC',
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
  </Svg>
);
