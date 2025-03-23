import {Image, StyleSheet, Platform, View, Text} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import Slider from '@/components/Slider';
import {useState} from 'react';
import AppButton from '@/components/AppButton';

const INIT_VALUE = 0.38;

export default function DemoScreen() {
  const [number, setNumber] = useState(INIT_VALUE);

  const handleSliderChange = (newValue: number) => {
    console.log('slider change');
    setNumber(newValue);
  };

  return (
    <>
      <View style={styles.screen}>
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
        <View style={{paddingTop: 100}}>
          <AppButton primary> Im in my prime</AppButton>
          <AppButton primary disabled>
            you're cooked
          </AppButton>
          <AppButton secondary>second dairy</AppButton>
          <AppButton outline> built different</AppButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 50,
  },
});
