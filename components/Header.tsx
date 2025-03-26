import {Dimensions, StyleSheet, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import LanguageSwitch from './LanguageSwitch';
import Arrows from '@/assets/images/arrows.svg';
import Svg, {Path} from 'react-native-svg';

const {height: screenHeight} = Dimensions.get('window'); // Get full screen height

const HEADER_HEIGHT = 280;

const Header = () => {
  const {width} = useWindowDimensions();
  const screenWidth = width + 10; // slightly wider, ensures no empty space near edges
  const CircularSeparator = () => {
    const quadBezierHeight = Math.floor(screenWidth / 9.5); // the aspect ratio for one eighth of a perfect circle

    const controlPoint = {
      x: screenWidth / 2,
      y: -quadBezierHeight,
    };

    const endPoint = {
      x: screenWidth,
      y: quadBezierHeight,
    };

    const svgPath = `
    M 0 ${quadBezierHeight} 
    Q ${controlPoint.x} ${controlPoint.y} ${endPoint.x} ${endPoint.y} 
    H 0 
    Z
    `;

    return (
      <View style={{alignSelf: 'center'}}>
        <Svg height={quadBezierHeight} width={screenWidth} viewBox={`0 0 ${screenWidth} ${quadBezierHeight}`}>
          <Path d={svgPath} fill="#fff" />
        </Svg>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <LinearGradient colors={['#2575FC', '#6A11CB']} style={[styles.headerContainer, {height: screenHeight}]}>
        <Arrows style={styles.arrow1} />
        <Arrows style={styles.arrow2} width={250} />
      </LinearGradient>
      <LanguageSwitch value={'en'} style={styles.languagePicker} />
      <CircularSeparator />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    justifyContent: 'space-between',
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
    width: 120,
    marginTop: 100,
    marginRight: 50,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
