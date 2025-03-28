import {View, type ViewProps} from 'react-native';

import {useThemeColor} from '@/hooks/useThemeColor';
import {Colors} from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorKey?: keyof typeof Colors.dark & keyof typeof Colors.light;
};

export function ThemedView({style, lightColor, darkColor, colorKey = 'background', ...otherProps}: ThemedViewProps) {
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

  return <View style={[{backgroundColor}, style]} {...otherProps} />;
}
