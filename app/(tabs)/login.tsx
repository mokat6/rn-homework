import {Image, StyleSheet, Platform, View, Text, Dimensions} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import Slider from '@/components/Slider';
import {useState} from 'react';
import {LinearGradient} from 'expo-linear-gradient';

// import {SvgXml} from 'react-native-svg';
// import svgXmlData from '@/sassets/images/arrows.svg'; // Assuming it's an SVG file you want to import
import Arrows from '@/assets/images/arrows.svg';
import LanguagePicker from '@/components/LanguagePicker';
import LanguageSwitch from '@/components/LanguageSwitch';
// import * as Svg from 'react-native-svg';

const INIT_VALUE = 0.38;
const {height: screenHeight} = Dimensions.get('window'); // Get full screen height

export default function LoginScreen() {
  const [number, setNumber] = useState(INIT_VALUE);

  const handleSliderChange = (newValue: number) => {
    console.log('slider change');
    setNumber(newValue);
  };

  const headerX = () => {
    return (
      <LinearGradient colors={['#2575FC', '#6A11CB']} style={[styles.headerContainer, {height: screenHeight}]}>
        <Arrows style={styles.arrow1} />
        <Arrows style={styles.arrow2} width={250} />
        <LanguageSwitch value={'en'} style={styles.languagePicker} />
      </LinearGradient>
    );
  };

  return (
    <ParallaxScrollView headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}} headerImage={headerX()}>
      <Slider
        handleSliderChange={handleSliderChange}
        initValue={INIT_VALUE}
        color="#00A6F5"
        paddingHorizontal={40}
        // height={10}
      />
      <Slider
        handleSliderChange={handleSliderChange}
        initValue={INIT_VALUE}
        color="#00A6F5"
        paddingHorizontal={40}
        // height={10}
      />
      <Slider
        handleSliderChange={handleSliderChange}
        initValue={INIT_VALUE}
        color="#00A6F5"
        paddingHorizontal={40}
        // height={10}
      />
      <View>
        <Text>{number}</Text>
      </View>
    </ParallaxScrollView>
    // <View>
    //   <Dnd />
    // </View>
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
});
