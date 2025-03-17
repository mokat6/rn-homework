import {Image, StyleSheet, Platform, View, Text} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import Slider from '@/components/Slider';
import {useState} from 'react';

// import {SvgXml} from 'react-native-svg';
// import svgXmlData from '@/sassets/images/arrows.svg'; // Assuming it's an SVG file you want to import
import Arrows from '@/assets/images/arrows.svg';
// import * as Svg from 'react-native-svg';

const INIT_VALUE = 0.38;

export default function LoginScreen() {
  const [number, setNumber] = useState(INIT_VALUE);

  const handleSliderChange = (newValue: number) => {
    console.log('slider change');
    setNumber(newValue);
  };

  const headerX = () => {
    return (
      <View style={styles.headerContainer}>
        {/* <Image source={require('@/assets/images/arrows.svg')} style={styles.reactLogo} /> */}
        <Arrows style={styles.arrow1} />
        <Arrows style={styles.arrow2} width={250} />
      </View>
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
    flex: 1,
    backgroundColor: '#2575FC',
  },
  arrow1: {
    position: 'absolute',
    left: '-40%',
    top: '10%',
    transform: [{rotateZ: '0deg'}],
  },
  arrow2: {
    position: 'absolute',
    left: '80%',
    top: '10%',
    transform: [{rotateZ: '55deg'}],
  },
});
