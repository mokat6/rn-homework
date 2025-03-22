import {Image, StyleSheet, Platform, View, Text, Dimensions, TextInput} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import Slider from '@/components/Slider';
import {useCallback, useState} from 'react';
import {LinearGradient} from 'expo-linear-gradient';

// import {SvgXml} from 'react-native-svg';
// import svgXmlData from '@/sassets/images/arrows.svg'; // Assuming it's an SVG file you want to import
import Arrows from '@/assets/images/arrows.svg';
import LanguagePicker from '@/components/LanguagePicker';
import LanguageSwitch from '@/components/LanguageSwitch';
import MyInput from '@/components/MyInput';
import AppButton from '@/components/AppButton';
import {login} from '@/api/auth';
// import * as Svg from 'react-native-svg';

const INIT_VALUE = 0.38;
const {height: screenHeight} = Dimensions.get('window'); // Get full screen height

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const headerX = () => {
    return (
      <LinearGradient colors={['#2575FC', '#6A11CB']} style={[styles.headerContainer, {height: screenHeight}]}>
        <Arrows style={styles.arrow1} />
        <Arrows style={styles.arrow2} width={250} />
        <LanguageSwitch value={'en'} style={styles.languagePicker} />
      </LinearGradient>
    );
  };

  const handleChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const handleChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const handleEndEditing = () => {
    console.log('handleEndEditing!!!!! >> ');
  };

  const onPress = async () => {
    console.log('pressing');
    console.log('id: ', email);
    console.log('password: ', password);

    try {
      await login({email, password});
      console.log('in component try after log in');
    } catch (err) {
      console.log('catching errors');
      setError('Login failed, please try again.');
    }
  };

  return (
    <ParallaxScrollView headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}} headerImage={headerX()}>
      <MyInput placeholder="El. paštas" onChangeText={handleChangeEmail} onEndEditing={handleEndEditing} />
      <MyInput placeholder="Slaptažodis" onChangeText={handleChangePassword} isPassword />
      <AppButton primary onPress={onPress}>
        Im in my prime
      </AppButton>
      {error ? <Text>{error}</Text> : null}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'flex-end',
  },
  arrow1: {
    position: 'absolute',
    left: '-40%',
    top: 30,
    transform: [{rotateZ: '0deg'}],
  },
  arrow2: {
    position: 'absolute',
    left: '80%',
    top: 30,
    transform: [{rotateZ: '55deg'}],
  },

  languagePicker: {
    marginTop: 100,
    marginRight: 50,
    borderWidth: 1, // Sets the border thickness to 1px
    borderColor: 'black', // Sets the border color to black
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
