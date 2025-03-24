import {Image, StyleSheet, Platform, View, Text, ScrollView} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import Slider from '@/components/Slider';
import {useState} from 'react';
import AppButton from '@/components/AppButton';
import SliderOg from '@/components/SliderOg';

const INIT_VALUE = 20;

const sliderDataSource = {
  minValue: 0,
  maxValue: 100,
  step: 10,
};

export default function DemoScreen() {
  const [number, setNumber] = useState(INIT_VALUE);
  const [number2, setNumber2] = useState(0.2);

  const handleSliderChange = (newValue: number) => {
    console.log('slider change');
    setNumber(newValue);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.screen}>
        <View>
          <Text>With Data Source Obj, with step</Text>
          <Slider
            handleSliderChange={handleSliderChange}
            initValue={INIT_VALUE}
            color="#00A6F5"
            paddingHorizontal={70}
            dataSource={sliderDataSource}
            // height={10}
          />
          <View>
            <Text>{number}</Text>
          </View>
        </View>
        <View>
          <Text>Debounced</Text>
          <SliderOg
            handleSliderChange={setNumber2}
            initValue={0.2}
            color="#00A6F5"
            paddingHorizontal={40}
            dataSource={sliderDataSource}
            // height={10}
          />
          <View>
            <Text>{number2}</Text>
          </View>
        </View>
        <View style={styles.buttonsCont}>
          <AppButton primary> type: primary</AppButton>
          <AppButton primary disabled>
            primary and disabled
          </AppButton>
          <AppButton secondary>type: secondary</AppButton>
          <AppButton outline> type: outline </AppButton>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingTop: 50,
    gap: 50,
  },
  buttonsCont: {
    paddingTop: 60,
    paddingHorizontal: 20,
    gap: 10,
  },
});
