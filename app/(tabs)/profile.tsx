import {StyleSheet, Image, Platform, Text} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import LanguagePicker from '@/components/LanguagePicker';
import LanguageSwitch from '@/components/LanguageSwitch';

export default function ProfileScreen() {
  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(161, 10, 10, 0.8)', 'transparent']}
        style={styles.background}>
        <LanguageSwitch />
        <Text>hello World</Text>
        <LanguagePicker />
        <Text>hello World</Text>

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
