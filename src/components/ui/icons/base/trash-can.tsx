import Svg, { Path, type SvgProps } from 'react-native-svg';

export const TrashCan = ({
  color = '#6A77A2',
  width = 20,
  height = 20,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M2.5 5H17.5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.8333 5V16.6667C15.8333 17.5 15 18.3333 14.1666 18.3333H5.83329C4.99996 18.3333 4.16663 17.5 4.16663 16.6667V5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.66663 4.99996V3.33329C6.66663 2.49996 7.49996 1.66663 8.33329 1.66663H11.6666C12.5 1.66663 13.3333 2.49996 13.3333 3.33329V4.99996"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.33337 9.16663V14.1666"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.6666 9.16663V14.1666"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
