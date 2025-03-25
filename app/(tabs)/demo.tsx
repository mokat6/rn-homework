import {StyleSheet, View, Text, ScrollView} from 'react-native';

import Slider from '@/components/Slider';
import {useState} from 'react';
import AppButton from '@/components/AppButton';
import SliderOg from '@/components/SliderOg';

const sliderDataSource = {
  minValue: -20,
  maxValue: 75,
  step: 5,
  initValue: 20,
};

export default function DemoScreen() {
  const [number, setNumber] = useState(sliderDataSource.initValue);
  const [number2, setNumber2] = useState(0.2);

  const handleSliderChange = (newValue: number) => {
    setNumber(newValue);
  };

  return (
    <>
      {/* <ScrollView contentContainerStyle={styles.screen}> */}
      <View>
        <View>
          <Text>With Data Source Obj, with step</Text>
          <Slider
            handleSliderChange={handleSliderChange}
            progressBarColor="#00A6F5"
            paddingHorizontal={70}
            // dataSource={sliderDataSource}
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
      </View>
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
