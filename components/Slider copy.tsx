import {transform} from '@babel/core';
import React, {useEffect} from 'react';
// import { View } from "react-native-reanimated/lib/typescript/Animated";
import {Easing, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {FadeIn, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

interface SliderProps {
  initValue: number;
  color: string;
  padding: number;
}

let cc = 0;

const SliderOG = (props: SliderProps) => {
  const color = useSharedValue('red');
  const width = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: color.value,
      width: width.value,
    };
  });

  const handleClick = () => {
    // "worklet";
    console.log(color.value);
    console.log('width >>> ', width.value);
    color.value = withTiming(cc === 0 ? 'red' : 'blue', {
      duration: 2000,
    });
    width.value = withTiming(cc === 0 ? 222 : 40, {duration: 2000});
    cc = cc === 0 ? 1 : 0;
  };
  console.log('rerenderf');

  const handleShit = () => {
    handleClick();
    blockJsThread();
  };

  return (
    <>
      <Text>Slider goes here</Text>
      <View style={styles.container}>
        <View style={styles.track}></View>
      </View>
      <Pressable onPress={handleShit}>
        <Animated.View entering={FadeIn} style={[colorB, animatedStyle]}>
          <Text style={title}>CCxC</Text>
        </Animated.View>
      </Pressable>
    </>
  );
};

const colorB = {
  // backgroundColor: "blue",
  // width: 200,
  height: 144,
};

const circle = {
  backgroundColor: 'yellow',
  width: 200,
  height: 200,
  borderRadius: 666,
};

const title = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    height: 400, // Fixed height
    alignItems: 'center', // Horizontally center the child
    justifyContent: 'center', // Vertically center the child
    flexDirection: 'column', // Default behavior (can be omitted)
  },
  track: {
    backgroundColor: '#fff',
    height: 50, // Increase the height to include padding
    width: '100%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default SliderOG;
let bb = 0;
const blockJsThread = () => {
  const start = Date.now();
  while (Date.now() - start < 200) {
    // Blocks the JS thread for 5 seconds
    console.log('working lol');
    if (bb < 3) {
      console.log('bb >> ', bb);

      bb = bb + 1;
      blockJsThread();
    }
  }
  console.log('Unblocked now!');
};
