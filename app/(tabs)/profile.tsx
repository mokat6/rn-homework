import {StyleSheet, Image, Platform, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import LanguagePicker from '@/components/LanguagePicker';
import LanguageSwitch from '@/components/LanguageSwitch';
import Svg, {Circle, Path} from 'react-native-svg';

const CURVE_HEIGHT = 50; // Adjust for the circular separation
const CIRCLE_RADIUS = 125; // Adjust this for the size of the circle

export default function ProfileScreen() {
  const FullCircleSeparator = () => (
    <View style={{borderWidth: 1}}>
      <Svg
        height={CIRCLE_RADIUS * 2} // full height of the circle
        width={CIRCLE_RADIUS * 2} // full width of the circle
        viewBox={`0 0 ${CIRCLE_RADIUS * 2} ${CIRCLE_RADIUS * 2}`}>
        <Circle cx={CIRCLE_RADIUS} cy={CIRCLE_RADIUS} r={CIRCLE_RADIUS} fill="pink" />
      </Svg>
    </View>
  );

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(161, 10, 10, 0.8)', 'transparent']}
        style={styles.background}>
        <Text>hello World</Text>
        <LanguagePicker />
        <Text>hello World</Text>
        <FullCircleSeparator />
        <Text>hello World</Text>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 200,
  },
});
