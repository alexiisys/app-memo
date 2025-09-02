import Svg, {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  type SvgProps,
} from 'react-native-svg';

export const Pen = ({
  color = 'white',
  width = 18,
  height = 18,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 18 18" fill="none" {...props}>
    <Defs>
      <ClipPath id="clip0_8_997">
        <Rect width="18" height="18" fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0_8_997)">
      <Path
        d="M15.8805 5.10904C16.277 4.71261 16.4999 4.17489 16.4999 3.61418C16.5 3.05347 16.2773 2.5157 15.8809 2.11917C15.4845 1.72263 14.9467 1.49983 14.386 1.49976C13.8253 1.49969 13.2875 1.72236 12.891 2.11879L2.88151 12.1305C2.70738 12.3042 2.5786 12.5179 2.50651 12.753L1.51576 16.017C1.49638 16.0819 1.49491 16.1508 1.51153 16.2164C1.52814 16.2821 1.5622 16.342 1.61011 16.3898C1.65802 16.4376 1.71798 16.4716 1.78363 16.4881C1.84928 16.5046 1.91818 16.503 1.98301 16.4835L5.24776 15.4935C5.48264 15.4221 5.69639 15.2941 5.87026 15.1208L15.8805 5.10904Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.25 3.75L14.25 6.75"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
