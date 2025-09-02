import Svg, {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  type SvgProps,
} from 'react-native-svg';

export const Date = ({
  color = '#6A77A2',
  width = 19,
  height = 19,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 19 19" fill="none" {...props}>
    <Defs>
      <ClipPath id="clipCalendar19">
        <Rect
          width="18"
          height="18"
          fill="white"
          transform="translate(0.5 0.867615)"
        />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clipCalendar19)">
      <Path
        d="M6.5 2.36761V5.36761"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 2.36761V5.36761"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.75 3.86761H4.25C3.42157 3.86761 2.75 4.53919 2.75 5.36761V15.8676C2.75 16.696 3.42157 17.3676 4.25 17.3676H14.75C15.5784 17.3676 16.25 16.696 16.25 15.8676V5.36761C16.25 4.53919 15.5784 3.86761 14.75 3.86761Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.75 8.36761H16.25"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
